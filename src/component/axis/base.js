/**
 * @fileOverview the base class of Axis
 * @author sima.zhang
 */
const Util = require('../../util');
const { LabelsRenderer } = require('../label/index');
const { Group } = require('@antv/g');
const Grid = require('./grid');
const Global = require('../../global');

class Base extends Group {
  getDefaultCfg() {
    return {
      /**
       * 用于动画，唯一标识的 id
       * @type {[type]}
       */
      _id: null,
      zIndex: 4,
      /**
       * 坐标轴上的坐标点
       * @type {Array}
       */
      ticks: null,
      /**
       * 坐标轴线的配置信息，如果设置成null，则不显示轴线
       * @type {Object}
       */
      line: null,
      /**
       * 坐标轴刻度线的配置,如果设置成null，则不显示刻度线
       * @type {Object}
       */
      tickLine: null,
      /**
       * 次刻度线个数配置
       * @type {Number}
       */
      subTickCount: 0,
      /**
       * 次刻度线样式配置
       * @type {Object}
       */
      subTickLine: null,
      /**
       * 网格线配置，如果值为 null，则不显示
       * @type {Object}
       */
      grid: null,
      /**
       * 坐标轴文本配置
       * @type {Object}
       */
      label: {
        textStyle: {}, // 坐标轴文本样式
        autoRotate: true,
        formatter: null // 坐标轴文本格式化回调函数
      },
      /**
       * 坐标轴标题配置
       * @type {Object}
       */
      title: {
        autoRotate: true, // 文本是否自动旋转
        textStyle: {} // 坐标轴标题样式
      },
      autoPaint: true,
      alignWithLabel: false
    };
  }

  _beforeRenderUI() {
    const title = this.get('title');
    const label = this.get('label');
    const grid = this.get('grid');
    if (title) {
      this.setSilent('title', Util.deepMix({
        autoRotate: true,
        textStyle: {
          fontSize: 12,
          fill: '#ccc',
          textBaseline: 'middle',
          fontFamily: Global.fontFamily,
          textAlign: 'center'
        },
        offset: 48
      }, title));
    }
    if (label) {
      this.setSilent('label', Util.deepMix({
        autoRotate: true,
        textStyle: {
          fontSize: 12,
          fill: '#ccc',
          textBaseline: 'middle',
          fontFamily: Global.fontFamily
        },
        offset: 10
      }, label));
    }
    if (grid) {
      this.setSilent('grid', Util.deepMix({
        lineStyle: {
          lineWidth: 1,
          stroke: '#C0D0E0'
        }
      }, grid));
    }
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

  _parseTicks(ticks) {
    ticks = ticks || [];
    const ticksLength = ticks.length;
    for (let i = 0; i < ticksLength; i++) {
      const item = ticks[i];
      if (!Util.isObject(item)) {
        ticks[i] = this.parseTick(item, i, ticksLength);
      }
    }
    this.set('ticks', ticks);
    return ticks;
  }

  _addTickItem(index, point, length, type = '') {
    let tickItems = this.get('tickItems');
    let subTickItems = this.get('subTickItems');
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

    if (!subTickItems) {
      subTickItems = [];
    }

    if (type === 'sub') {
      subTickItems.push(cfg);
    } else {
      tickItems.push(cfg);
    }

    this.set('tickItems', tickItems);
    this.set('subTickItems', subTickItems);
  }

  _renderLine() {
    let lineCfg = this.get('line');
    let path;
    if (lineCfg) {
      path = this.getLinePath();
      lineCfg = Util.mix({
        path
      }, lineCfg);
      const lineShape = this.addShape('path', {
        attrs: lineCfg
      });
      lineShape.name = 'axis-line';
      this.get('appendInfo') && lineShape.setSilent('appendInfo', this.get('appendInfo'));
      this.set('lineShape', lineShape);
    }
  }

  _processCatTicks() {
    const self = this;
    const labelCfg = self.get('label');
    const tickLineCfg = self.get('tickLine');
    let ticks = self.get('ticks');
    ticks = self._parseTicks(ticks);
    let tickSeg = 0;
    if (ticks.length > 1) {
      tickSeg = (ticks[1].value - ticks[0].value) / 2;
    }

    Util.each(ticks, function(tick, index) {
      const tickPoint = self.getTickPoint(tick.value, index);
      const tickPoint0 = self.getTickPoint(tick.value - tickSeg, index);
      const tickPoint1 = self.getTickPoint(tick.value + tickSeg, index);
      if (tickLineCfg) {
        self._addTickItem(index, tickPoint0, tickLineCfg.length);
        self._addTickItem(index, tickPoint1, tickLineCfg.length);
      }
      if (labelCfg) {
        self.addLabel(tick, tickPoint, index);
      }
    });
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
        self._addTickItem(index, tickPoint, tickLineCfg.length);
      }
      if (labelCfg) {
        self.addLabel(tick, tickPoint, index);
      }
    });

    if (subTickCount) { // 如果有设置次级分点，添加次级tick
      const subTickLineCfg = self.get('subTickLine');
      Util.each(ticks, function(tick, index) {
        if (index > 0) {
          let diff = tick.value - ticks[index - 1].value;
          diff = diff / (self.get('subTickCount') + 1);

          for (let i = 1; i <= subTickCount; i++) {
            const subTick = {
              text: '',
              value: index ? ticks[index - 1].value + i * diff : i * diff
            };

            const tickPoint = self.getTickPoint(subTick.value);
            let subTickLength;
            if (subTickLineCfg && subTickLineCfg.length) {
              subTickLength = subTickLineCfg.length;
            } else {
              subTickLength = parseInt(tickLineCfg.length * (3 / 5), 10);
            }
            self._addTickItem(i - 1, tickPoint, subTickLength, 'sub');
          }
        }
      });
    }
  }

  _addTickLine(ticks, lineCfg) {
    const self = this;
    const cfg = Util.mix({}, lineCfg);
    const path = [];
    Util.each(ticks, function(item) {
      path.push([ 'M', item.x1, item.y1 ]);
      path.push([ 'L', item.x2, item.y2 ]);
    });
    delete cfg.length;
    cfg.path = path;
    const tickShape = self.addShape('path', {
      attrs: cfg
    });
    tickShape.name = 'axis-ticks';
    tickShape._id = self.get('_id') + '-ticks';
    tickShape.set('coord', self.get('coord'));
    self.get('appendInfo') && tickShape.setSilent('appendInfo', self.get('appendInfo'));
  }

  _renderTicks() {
    const self = this;
    const tickItems = self.get('tickItems');
    const subTickItems = self.get('subTickItems');

    if (!Util.isEmpty(tickItems)) {
      const tickLineCfg = self.get('tickLine');
      self._addTickLine(tickItems, tickLineCfg);
    }

    if (!Util.isEmpty(subTickItems)) {
      const subTickLineCfg = self.get('subTickLine') || self.get('tickLine');
      self._addTickLine(subTickItems, subTickLineCfg);
    }
  }

  _renderGrid() {
    const grid = this.get('grid');
    if (!grid) {
      return;
    }
    grid.coord = this.get('coord');
    grid.appendInfo = this.get('appendInfo');
    this.set('gridGroup', this.addGroup(Grid, grid));
  }

  paint() {
    this._renderLine();
    const type = this.get('type');
    if (type === 'cat' || type === 'timecat') {
      this._processCatTicks();
    } else {
      this._processTicks();
    }
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
    const ratio = Math.abs(vector[1] / vector[0]);
    let align;
    if (ratio >= 1) { // 上面或者下面
      align = 'center';
    } else {
      if (vector[0] > 0) { // 右侧
        align = 'start';
      } else { // 左侧
        align = 'end';
      }
    }
    return align;
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
   * 渲染标题
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
   * 获取 tick 在画布上的位置
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

Util.assign(Base.prototype, LabelsRenderer, {
  addLabel(tick, point, index) {
    const labelsGroup = this.get('labelsGroup');
    const label = {};
    let rst;

    if (labelsGroup) {
      let offset = this.get('_labelOffset');
      if (!Util.isNil(this.get('label').offset)) {
        offset = this.get('label').offset;
      }
      const vector = this.getSideVector(offset, point, index);
      point = {
        x: point.x + vector[0],
        y: point.y + vector[1]
      };
      label.text = tick.text;
      label.x = point.x;
      label.y = point.y;
      label.textAlign = this.getTextAnchor(vector);
      rst = labelsGroup.addLabel(label);
      if (rst) {
        rst.name = 'axis-label';
        rst._id = this.get('_id') + '-' + tick.tickValue;
        rst.set('coord', this.get('coord'));
        this.get('appendInfo') && rst.setSilent('appendInfo', this.get('appendInfo'));
      }
    }
    return rst;
  }
});

module.exports = Base;
