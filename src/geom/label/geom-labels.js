const { Group } = require('../../renderer');
const Labels = require('../../component/label/index');
const Global = require('../../global');
const Util = require('../../util');
const IGNORE_ARR = [ 'line', 'point', 'path' ];
const ORIGIN = '_origin';

function avg(arr) {
  let sum = 0;
  Util.each(arr, function(value) {
    sum += value;
  });
  return sum / arr.length;
}

class GeomLabels extends Group {
  getDefaultCfg() {
    return {
      label: Global.label,
      /**
       * 用户传入的文本配置信息
       * @type {Object}
       */
      labelCfg: null,
      /**
       * 所在的坐标系
       * @type {Object}
       */
      coord: null,
      /**
       * 图表的类型
       * @type {String}
       */
      geomType: null,
      zIndex: 6
    };
  }

  _renderUI() {
    super._renderUI.call(this);
    this.initLabelsCfg();
    this.renderLabels(); // 调用入口文件
  }

  // 初始化labels的配置项
  initLabelsCfg() {
    const self = this;
    const labels = self.getDefaultLabelCfg();
    const labelCfg = self.get('labelCfg');
    // Util.merge(labels, labelCfg.cfg);
    Util.deepMix(labels, labelCfg.cfg);
    self.set('label', labels);
  }

  /**
   * @protected
   * 默认的文本样式
   * @return {Object} default label config
   */
  getDefaultLabelCfg() {
    const self = this;
    const labelCfg = self.get('labelCfg').cfg;
    const geomType = self.get('geomType');
    const viewTheme = self.get('viewTheme') || Global;
    if (geomType === 'polygon' || (labelCfg && labelCfg.offset < 0 && Util.indexOf(IGNORE_ARR, geomType) === -1)) {
      return Util.deepMix({}, self.get('label'), viewTheme.innerLabels);
    }
    return Util.deepMix({}, viewTheme.label, self.get('label'));
  }

  /**
   * @protected
   * 获取labels
   * @param {Array} points points
   * @return {Array} label items
   */
  getLabelsItems(points) {
    const self = this;
    const items = [];
    const geom = self.get('geom');
    const coord = self.get('coord');

    self._getLabelCfgs(points);
    const labelCfg = self.get('labelItemCfgs');

    // 获取label相关的x，y的值，获取具体的x,y,防止存在数组
    Util.each(points, (point, i) => {
      const origin = point[ORIGIN];
      const label = labelCfg[i];
      if (!label) {
        return;
      }
      if (!Util.isArray(label.text)) {
        label.text = [ label.text ];
      }
      const total = label.length;

      Util.each(label.text, (sub, subIndex) => {
        if (Util.isNil(sub) || sub === '') {
          return;
        }
        let obj = self.getLabelPoint(label, point, subIndex);
        obj = Util.mix({}, label, obj);
        if (!obj.textAlign) {
          obj.textAlign = self.getLabelAlign(obj, subIndex, total);
        }
        if (geom) {
          obj._id = geom._getShapeId(origin) + '-glabel-' + subIndex + '-' + obj.text;
        }
        obj.coord = coord;
        items.push(obj);
      });
    });
    return items;
  }

  /**
   * @protected
   * 如果发生冲突则会调整文本的位置
   * @param {Array} items 文本的集合
   * @return {Array} adjusted items
   */
  adjustItems(items) {
    return items;
  }

  /**
   * drawing lines to labels
   * @param  {Array} items labels
   * @param  {Object} labelLine configuration for label lines
   */
  drawLines(items) {
    const self = this;
    Util.each(items, function(point) {
      if (point._offset[0] > 0 || point._offset[1] > 0) {
        self.lineToLabel(point);
      }
    });
  }

  // 连接线
  lineToLabel(label) {
    const labelLine = label.labelLine;
    const self = this;
    const coord = self.get('coord');
    const start = {
      x: label.x - label._offset.x,
      y: label.y - label._offset.y
    };
    const inner = {
      x: (start.x + label.x) / 2,
      y: (start.y + label.y) / 2
    };
    let lineGroup = self.get('lineGroup');
    // var lineShape;
    if (!lineGroup) {
      lineGroup = self.addGroup({
        elCls: 'x-line-group'
      });
      self.set('lineGroup', lineGroup);
    }
    const lineShape = lineGroup.addShape('path', {
      attrs: Util.mix({
        path: [ 'M' + start.x, start.y + ' Q' + inner.x, inner.y + ' ' + label.x, label.y ].join(','),
        fill: null,
        stroke: label.color
      }, labelLine)
    });
    // label 对应线的动画关闭
    lineShape.name = 'labelLine';
    // generate labelLine id according to label id
    lineShape._id = label._id && label._id.replace('glabel', 'glabelline');
    lineShape.set('coord', coord);
  }

  /**
   * @protected
   * 获取文本的位置信息
   * @param {Array} labelCfg labels
   * @param {Object} point point
   * @param {Number} index index
   * @return {Object} point
   */
  getLabelPoint(labelCfg, point, index) {
    const self = this;
    const coord = self.get('coord');
    const total = labelCfg.text.length;

    function getDimValue(value, idx) {
      if (Util.isArray(value)) {
        if (labelCfg.text.length === 1) { // 如果仅一个label,多个y,取最后一个y
          if (value.length <= 2) {
            value = value[value.length - 1];
            // value = value[0];
          } else {
            value = avg(value);
          }
        } else {
          value = value[idx];
        }
      }
      return value;
    }

    const label = {
      x: getDimValue(point.x, index),
      y: getDimValue(point.y, index),
      text: labelCfg.text[index]
    };

    // get nearest point of the shape as the label line start point
    if (point && point.nextPoints && (point.shape === 'funnel' || point.shape === 'pyramid')) {
      let maxX = -Infinity;
      point.nextPoints.forEach(p => {
        p = coord.convert(p);
        if (p.x > maxX) {
          maxX = p.x;
        }
      });
      label.x = (label.x + maxX) / 2;
    }
    // sharp edge of the pyramid
    if (point.shape === 'pyramid' && !point.nextPoints && point.points) {
      point.points.forEach(p => {
        p = coord.convert(p);
        if ((Util.isArray(p.x) && point.x.indexOf(p.x) === -1) || (Util.isNumber(p.x) && point.x !== p.x)) {
          label.x = (label.x + p.x) / 2;
        }
      });
    }

    if (labelCfg.position) {
      self.setLabelPosition(label, point, index, labelCfg.position);
    }
    const offsetPoint = self.getLabelOffset(labelCfg, index, total);
    self.transLabelPoint(label);
    label.x += offsetPoint[0];
    label.y += offsetPoint[1];
    label.color = point.color;
    label._offset = offsetPoint;
    return label;
  }
  setLabelPosition() {}
  transLabelPoint(point) {
    const self = this;
    const coord = self.get('coord');
    const tmpPoint = coord.applyMatrix(point.x, point.y, 1);
    point.x = tmpPoint[0];
    point.y = tmpPoint[1];
  }

  // 获取默认的偏移量
  getDefaultOffset(point) {
    const offset = point.offset || [ 0, 0 ];
    const coord = this.get('coord');
    const vector = coord.applyMatrix(offset[0], offset[1]);
    return [ vector[0], vector[1] ];
  }

  // 获取文本的偏移位置，x,y
  getLabelOffset(point, index, total) {
    const self = this;
    const offset = self.getDefaultOffset(point);
    const coord = self.get('coord');
    const transposed = coord.isTransposed;
    const xField = transposed ? 'y' : 'x';
    const yField = transposed ? 'x' : 'y';
    let factor = transposed ? 1 : -1; // y 方向上越大，像素的坐标越小
    const offsetPoint = {
      x: 0,
      y: 0
    };

    // 一个shape对应多个label时，第二个label的offset与第一个相反
    if (index <= 0 && total !== 1) {
      factor *= -1;
    }
    offsetPoint[xField] = offset[0] * factor;
    offsetPoint[yField] = offset[1] * factor;
    return [ offsetPoint.x, offsetPoint.y ];
  }

  getLabelAlign(point, index, total) {
    const self = this;
    let align = 'center';
    const coord = self.get('coord');
    if (coord.isTransposed) {
      const offset = point._offset;
      // var vector = coord.applyMatrix(offset,0);
      if (offset[1] < 0) {
        align = 'right';
      } else if (offset[1] === 0) {
        align = 'center';
      } else {
        align = 'left';
      }
      if (total > 1 && index === 0) {
        if (align === 'right') {
          align = 'left';
        } else if (align === 'left') {
          align = 'right';
        }
      }
    }
    return align;
  }
  _getLabelValue(record) {
    const self = this;
    const originRecord = record[ORIGIN];
    const labelCfg = self.get('labelCfg');
    const scales = labelCfg.scales;
    const callback = labelCfg.cfg && labelCfg.cfg.content;
    let value;
    if (callback) {
      const params = [];
      Util.each(scales, function(scale) {
        params.push(originRecord[scale.field]);
      });
      value = callback.apply(null, params);
    } else {
      const scale = scales[0];
      value = originRecord[scale.field];
      if (Util.isArray(value)) {
        const tmp = [];
        Util.each(value, function(subVal) {
          tmp.push(scale.getText(subVal));
        });
        value = tmp;
      } else {
        value = scale.getText(value);
      }
    }
    return value;
  }
  // 获取每个label的配置
  _getLabelCfgs(points) {
    const labelCfg = this.get('labelCfg');
    const defaultCfg = this.get('label');
    const cfgs = [];
    const scales = labelCfg.scales;
    const globalCfg = defaultCfg.textStyle;
    globalCfg.offset = defaultCfg.offset;

    Util.each(points, (point, i) => {
      let cfg = {};
      const origin = point[ORIGIN];
      if (labelCfg.callback) {
        cfg = labelCfg.callback.call(null, origin[scales[0].field], origin, i);
      }
      if (!cfg && cfg !== 0) {
        cfgs.push(null);
        return;
      }
      if (Util.isString(cfg) || Util.isNumber(cfg)) {
        cfg = { text: cfg };
      } else {
        const scale = scales[0];
        let value = origin[scale.field];
        if (Util.isArray(value)) {
          const tmp = [];
          Util.each(value, function(subVal) {
            tmp.push(scale.getText(subVal));
          });
          value = tmp;
        } else {
          value = scale.getText(value);
        }
        if (Util.isNil(value) || value === '') {
          cfgs.push(null);
          return;
        }
        cfg.text = value;
      }
      cfg = Util.mix({}, defaultCfg, labelCfg.globalCfg || {}, cfg);

      if (cfg.formatter) {
        cfg.text = cfg.formatter.call(null, origin[scales[0].field], origin, i);
      }
      if (cfg.label) {
        // 兼容有些直接写在labelCfg.label的配置
        const label = cfg.label;
        delete cfg.label;
        cfg = Util.mix(cfg, label);
      }
      if (cfg.textStyle) {
        // 兼容旧写法，globalCfg的offset优先级高
        delete cfg.textStyle.offset;
        let textStyle = cfg.textStyle;
        if (Util.isFunction(textStyle)) {
          textStyle = textStyle.call(null, origin[scales[0].field], origin, i);
        }
        delete cfg.textStyle;
        cfg = Util.mix(cfg, textStyle);
      }
      let offset = cfg.offset || [ 0, 0 ];
      if (!Util.isArray(offset)) {
        offset = [ 0, offset ];
      }
      cfg.offset = offset;
      delete cfg.items;
      cfgs.push(cfg);
    });
    this.set('labelItemCfgs', cfgs);
  }
  showLabels(points) {
    const self = this;
    let items = self.getLabelsItems(points);
    items = self.adjustItems(items);
    self.resetLabels(items);
    self.drawLines(items);
  }

  destroy() {
    this.removeLabels(); // 清理文本
    super.destroy.call(this);
  }
}

Util.assign(GeomLabels.prototype, Labels.LabelsRenderer);

module.exports = GeomLabels;
