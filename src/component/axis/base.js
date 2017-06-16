const Util = require('../../util');
const { LabelsRenderer } = require('../label/index');
const { Group } = require('@ali/g');
const Grid = require('./grid');

class Base extends Group {
  getDefaultCfg() {
    return {
      zIndex: 4,
      /**
       * 坐标轴上的坐标点
       * @type {Array}
       */
      ticks: null,
      /**
       * 坐标轴线的图形属性配置，如果设置成null，则不显示
       * @type {Object}
       */
      line: null,
      /**
       * 刻度线的样式配置，如果设置成null，则不显示
       * @type {Object}
       */
      tickLine: null,
      /**
       * 次刻度线个数，如果未设置该属性，则不显示
       * @type {Number}
       */
      subTickCount: 0,
      /**
       * 次刻度线样式配置
       * @type {Object}
       */
      subTickLine: null,
      /**
       * 坐标轴栅格线样式配置，如果设置为 null，则不显示
       * @type {Object}
       */
      grid: null,
      /**
       * 坐标轴上的文本相关配置
       * @type {Object}
       */
      label: {
        textStyle: {}, // 文本样式配置
        autoRotate: true,
        formatter: null, //  格式化坐标轴文本显示
        offset: 10 // 文本距离坐标轴线的距离，对应原属性 labelOffset
      },
      /**
       * 坐标轴标题样式配置
       * @type {Object}
       */
      title: {
        textStyle: {}, // 标题文本样式配置
        offset: 20 // 标题离坐标轴线的距离
      },
      autoPaint: true, // @type {Boolean} 是否自动绘制
      // labelOffset: 10, // @type {Number} 距离坐标轴的距离
      // titleOffset: 20, // @type {Number} 标题距离坐标轴的位置
      // formatter: null, // @type {Function} 格式化坐标轴上的节点
      // firstTick: true // @type {Boolean} 是否显示第一个标注
    };
  }

  _renderUI() {
    const labelCfg = this.get('label');
    if (labelCfg) {
      this.renderLabels();
    }
    if (this.get('autoPaint')) {
      this.paint();
    }
    if (!Util.isNil(this.get('title'))) {
      this.renderTitle();
    }
    this.sort();
  }

  _parseTicks(ticks = []) {
    const ticksLength = ticks.length;
    for (let i = 0; i < ticksLength; i++) {
      let item = ticks[i];
      if (!Util.isObject(item)) {
        ticks[i] = this.parseTick(item, i, ticksLength);
      }
    }
    this.set('ticks', ticks);
    return ticks;
  }

  _addTickItem(index, point, length) {
    const tickItems = this.get('tickItems');
    const end = this.getTickEnd(point, length, index);

    const cfg = {
      x1: point.x,
      y1: point.y,
      x2: end.x,
      y2: end.y
    };

    if (!tickItems) {
      tickItems = [];
    }

    tickItems.push(cfg);
    this.set('tickItems', tickItems);
  }

  // TODO: rename
  _formatPoint(value) {
    const label = this.get('label');
    if (label && label.formatter) {
      value = label.formatter.call(this, value);
    }

    return value;
  }

  // TODO: rename
  _renderLines() {
    let lineCfg = this.get('line');
    let path;
    if (lineCfg) {
      path = this.getLinePath();
      lineCfg = Util.mix({
        path: path
      }, lineCfg);
      const lineShape = this.addShape('path', {
        attrs: lineAttrs
      });
      lineShape.name = 'axis-line';
      this.set('lineShape', lineShape);
    }
  }

  _processTicks() {
    const self = this;
    const labelCfg = self.get('label');
    const subTickCount = self.get('subTickCount');
    const tickLineCfg = self.get('tickLine');
    let ticks = self.get('ticks');
    ticks = self._parseTicks(ticks);

    Util.each(ticks, function(tick, index) {
      const tickPoint = self.getTickPoint(tick.value, index);
      if (tickLineCfg) {
        self._addTickItem(index, tickPoint);
      }
      if (labelCfg) {
        self.addLabel(self._formatPoint(tick.text), tickPoint, index, tick.value);
      }
    });

    if (subTickCount) { // 如果有设置次级分点，添加次级tick
      Util.each(ticks, function(tick, index) {
        let diff = index ? tick.value - ticks[index - 1].value : tick.value;
        diff = diff / self.get('subTick');

        for (let i = 1; i < subTickCount; i++) {
          const subTick = {
            text: '',
            value: index ? ticks[index - 1].value + i * diff : i * diff
          };

          const tickPoint = self.getTickPoint(subTick.value);
          const subTickCfg = self.get('subTickCfg');
          let subTickLength;
          if (subTickCfg && subTickCfg.length) {
            subTickLength = subTickCfg.length;
          } else {
            subTickLength = parseInt(tickLineCfg.length * (3 / 5), 10);
          }
          self._addTickItem(i - 1, tickPoint, subTickLength);
        }
      });
    }
  }

  _renderTicks() {
    const self = this;
    const tickItems = self.get('tickItems');
    const tickLineCfg = self.get('tickLine');
    let path = '';
    const cfg = Util.mix({}, tickLineCfg);

    if (tickItems) {
      const stringCompiler = Util.template('M${ x1 } ${ y1 }L${ x2 } ${ y2 }');
      Util.each(tickItems, function(item) {
        const subPath = stringCompiler({x1: item.x1, y1: item.y1, x2: item.x2, y2: item.y2})
        path += subPath;
      });
      delete cfg.value;
      cfg.path = path;
      const tickShape = self.addShape('path', {
        attrs: cfg
      });
      tickShape.name = 'axis-ticks';
      self.set('tickShape', tickShape);
    }
  }

  _renderGrid() {
    const grid = this.get('grid');
    if (!grid) {
      return;
    }

    if (this.get('start')) {
      grid.start = this.get('start');
    }

    this.set('gridGroup', this.addGroup(Grid, grid));
  }

  paint() {
    this._renderLines();
    this._processTicks();
    this._renderTicks();
    this._renderGrid();
    const labelCfg = this.get('label');
    if (labelCfg && labelCfg.autoRotate) {
      this.autoRotateLabels();
    }
  }

  parseTick(tick, index, length) {
    return {
      text: tick,
      value: index / (length - 1)
    };
  }

  getTextAnchor(vector) {
    const ratio = Math.abs(vector.y / vector.x);
    let align;
    if (ratio >= 1) { // 上面或者下面
      align = 'center';
    } else {
      if (vector.x > 0) { // 右侧
        align = 'left';
      } else { // 左侧
        align = 'right';
      }
    }
    return align;
  }

  addLabel(value, point, index) {
    const labelsGroup = this.get('labelsGroup');
    const label = {};
    let rst;

    if (labelsGroup) {
      const offset = this.get('label').offset;
      const vector = this.getSideVector(offset, point, index);
      point = {
        x: point.x + vector.x,
        y: point.y + vector.y
      };

      label.text = value;
      label.x = point.x;
      label.y = point.y;
      label.textAlign = this.getTextAnchor(vector);
      rst = labelsGroup.addLabel(label);
    }
    return rst;
  }

  getMaxLabelWidth(labelsGroup) {
    const labels = labelsGroup.get('children');
    let max = 0;
    Util.each(labels, function(label) {
      const bbox = label.getBBox();
      const width = bbox.width;
      if (max < width) {
        max = width;
      }
    });
    return max;
  }

  remove() {
    super.remove();
    const gridGroup = this.get('gridGroup');
    gridGroup && gridGroup.remove();
    this.removeLabels();
  }

  /**
   * 旋转文本
   * @abstract
   * @return {[type]} [description]
   */
  autoRotateLabels() {}

  /**
   * 渲染坐标轴标题
   * @abstract
   * @return {[type]} [description]
   */
  renderTitle() {}

  /**
   * 获取坐标轴线的 path
   * @abstract
   * @return {[type]} [description]
   */
  getLinePath() {}

  /**
   * 获取tick在画布上的位置
   * @abstract
   * @return {[type]} [description]
   */
  getTickPoint() {}

  /**
   * 获取标示坐标点的线的终点
   * @abstract
   * @return {[type]} [description]
   */
  getTickEnd() {}

  /**
   * 获取距离坐标轴的向量
   * @abstract
   * @return {[type]} [description]
   */
  getSideVector() {}
}

Util.assign(Base.prototype, LabelsRenderer);

module.exports = Base;
