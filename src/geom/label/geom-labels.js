const { Group } = require('../../renderer');
const { Label } = require('@antv/component/lib');
// const visualCenter = require('@antv/component/lib/label/utils/visual-center');
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

// 计算多边形重心: https://en.wikipedia.org/wiki/Centroid#Of_a_polygon
function getCentroid(xs, ys) {
  if (Util.isNumber(xs) && Util.isNumber(ys)) {
    return [ xs, ys ];
  }
  let i = -1,
    x = 0,
    y = 0;
  let former,
    current = xs.length - 1;
  let diff,
    k = 0;
  while (++i < xs.length) {
    former = current;
    current = i;
    k += diff = xs[former] * ys[current] - xs[current] * ys[former];
    x += (xs[former] + xs[current]) * diff;
    y += (ys[former] + ys[current]) * diff;
  }
  k *= 3;
  return [ x / k, y / k ];
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
    const labelsGroup = this.addGroup();
    const lineGroup = this.addGroup({
      elCls: 'x-line-group'
    });
    const labelRenderer = this.get('labelRenderer');
    this.set('labelsGroup', labelsGroup);
    this.set('lineGroup', lineGroup);
    this.get('labelRenderer').set('group', labelsGroup);
    labelRenderer.set('group', labelsGroup);
    labelRenderer.set('lineGroup', lineGroup);
  }

  // 初始化labels的配置项
  initLabelsCfg() {
    const self = this;
    const labelRenderer = new Label();
    const labels = self.getDefaultLabelCfg();
    const labelCfg = self.get('labelCfg');
    // Util.merge(labels, labelCfg.cfg);
    Util.deepMix(labels, labelCfg.globalCfg || labelCfg.cfg);
    labelRenderer.set('config', false);
    if (labels.labelLine) {
      labelRenderer.set('labelLine', labels.labelLine);
    }
    labelRenderer.set('coord', self.get('coord'));
    this.set('labelRenderer', labelRenderer);
    self.set('label', labels);
  }

  /**
   * @protected
   * 默认的文本样式
   * @return {Object} default label config
   */
  getDefaultLabelCfg() {
    const self = this;
    const labelCfg = self.get('labelCfg').cfg || self.get('labelCfg').globalCfg;
    const geomType = self.get('geomType');
    const viewTheme = self.get('viewTheme') || Global;
    if (geomType === 'polygon' || (labelCfg && labelCfg.offset < 0 && Util.indexOf(IGNORE_ARR, geomType) === -1)) {
      return Util.deepMix({}, self.get('label'), viewTheme.innerLabels, labelCfg);
    }
    return Util.deepMix({}, self.get('label'), viewTheme.label, labelCfg);
  }

  /**
   * @protected
   * 获取labels
   * @param {Array} points points
   * @param {Array} shapes shapes
   * @return {Array} label items
   */
  getLabelsItems(points, shapes) {
    const self = this;
    const items = [];
    const geom = self.get('geom');
    const coord = self.get('coord');

    self._getLabelCfgs(points, shapes);
    const labelCfg = self.get('labelItemCfgs');
    // 获取label相关的x，y的值，获取具体的x,y,防止存在数组
    Util.each(points, (point, i) => {
      const origin = point[ORIGIN];
      const label = labelCfg[i];
      if (!label) {
        items.push(null);
        return;
      }
      if (!Util.isArray(label.text)) {
        label.text = [ label.text ];
      }
      const total = label.length;

      Util.each(label.text, (sub, subIndex) => {
        if (Util.isNil(sub) || sub === '') {
          items.push(null);
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

  /* /!*
   * @protected
   * 如果发生冲突则会调整文本的位置
   * @param {Array} items 文本的集合
   * @param {Array} shapes 关联形状
   * @return {Array} adjusted items
   *!/
  adjustItems(items, shapes) {
    // 多边形shape的label位于其可视中心
    if (this.get('geomType') === 'polygon') {
      let index,
        shape,
        path,
        center,
        points;
      Util.each(items, (item, i) => {
        if (!item) return;
        shape = shapes[ i ];
        path = shape.attr('path');
        points = [[]];
        index = 0;
        path.forEach((segment, i) => {
          if (segment[ 0 ] === 'z' || segment[ 0 ] === 'Z' && i !== path.length - 1) {
            points.push([]);
            index += 1;
          }
          if (segment.length === 3) {
            points[ index ].push([ segment[ 1 ], segment[ 2 ] ]);
          }
        });
        center = visualCenter(points);
        item.x = center.x;
        item.y = center.y;
      });
    }
    return items;
  }
*/
  adjustItems(items) {
    Util.each(items, function(item) {
      if (!item) {
        return;
      }
      if (item.offsetX) {
        item.x += item.offsetX;
      }
      if (item.offsetY) {
        item.y += item.offsetY;
      }
    });
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
      if (!point) {
        return;
      }
      if (point.offset > 0) {
        self.lineToLabel(point);
      }
    });
  }

  // 定义连接线
  lineToLabel() {}

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
      text: labelCfg.text[index]
    };
    // 多边形场景,多用于地图
    if (point && this.get('geomType') === 'polygon') {
      const centroid = getCentroid(point.x, point.y);
      // 多边形的场景也有 x 和 y 只是数字的情况，譬如当 x 和 y 都是分类字段的时候 @see #1184
      label.x = centroid[0];
      label.y = centroid[1];
    } else {
      label.x = getDimValue(point.x, index);
      label.y = getDimValue(point.y, index);
    }

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
    if (labelCfg.offsetX) {
      offsetPoint.x += labelCfg.offsetX;
    }
    if (labelCfg.offsetY) {
      offsetPoint.y += labelCfg.offsetY;
    }
    self.transLabelPoint(label);
    label.start = { x: label.x, y: label.y };
    label.x += offsetPoint.x;
    label.y += offsetPoint.y;
    label.color = point.color;
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

  getOffsetVector(point) {
    const self = this;
    const offset = point.offset || 0;
    const coord = self.get('coord');
    let vector;
    if (coord.isTransposed) { // 如果x,y翻转，则偏移x
      vector = coord.applyMatrix(offset, 0);
    } else { // 否则，偏转y
      vector = coord.applyMatrix(0, offset);
    }
    return vector;
  }

  // 获取默认的偏移量
  getDefaultOffset(point) {
    const self = this;
    let offset = 0;

    const coord = self.get('coord');
    const vector = self.getOffsetVector(point);
    if (coord.isTransposed) { // 如果x,y翻转，则偏移x
      offset = vector[0];
    } else { // 否则，偏转y
      offset = vector[1];
    }
    return offset;
  }

  // 获取文本的偏移位置，x,y
  getLabelOffset(point, index, total) {
    const self = this;
    const offset = self.getDefaultOffset(point);
    const coord = self.get('coord');
    const transposed = coord.isTransposed;
    const yField = transposed ? 'x' : 'y';
    const factor = transposed ? 1 : -1; // y 方向上越大，像素的坐标越小，所以transposed时将系数变成
    const offsetPoint = {
      x: 0,
      y: 0
    };
    if (index > 0 || total === 1) { // 判断是否小于0
      offsetPoint[yField] = offset * factor;
    } else {
      offsetPoint[yField] = offset * factor * -1;
    }
    return offsetPoint;
  }

  getLabelAlign(point, index, total) {
    const self = this;
    let align = 'center';
    const coord = self.get('coord');
    if (coord.isTransposed) {
      const offset = self.getDefaultOffset(point);
      // var vector = coord.applyMatrix(offset,0);
      if (offset < 0) {
        align = 'right';
      } else if (offset === 0) {
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
  _getLabelValue(origin, scales) {
    if (!Util.isArray(scales)) {
      scales = [ scales ];
    }
    const text = [];
    Util.each(scales, scale => {
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
        text.push(null);
      }
      text.push(value);
    });
    return text;
  }
  // 获取每个label的配置
  _getLabelCfgs(points) {
    const self = this;
    const labelCfg = this.get('labelCfg');
    const scales = labelCfg.scales;
    const defaultCfg = this.get('label');
    const viewTheme = self.get('viewTheme') || Global;
    const cfgs = [];
    if (labelCfg.globalCfg && labelCfg.globalCfg.type) {
      self.set('type', labelCfg.globalCfg.type);
    }
    Util.each(points, (point, i) => {
      let cfg = {};
      const origin = point[ORIGIN];
      const originText = self._getLabelValue(origin, scales);
      if (labelCfg.callback) {
        // callback中应使用原始数据，而不是数据字符串
        const originValues = scales.map(scale => origin[scale.field]);
        cfg = labelCfg.callback.apply(null, originValues);
      }
      if (!cfg && cfg !== 0) {
        cfgs.push(null);
        return;
      }
      if (Util.isString(cfg) || Util.isNumber(cfg)) {
        cfg = { text: cfg };
      } else {
        cfg.text = cfg.content || originText[0];
        delete cfg.content;
      }
      cfg = Util.mix({}, defaultCfg, labelCfg.globalCfg || {}, cfg);
      // 兼容旧的源数据写在item.point中
      point.point = origin;
      if (cfg.htmlTemplate) {
        cfg.useHtml = true;
        cfg.text = cfg.htmlTemplate.call(null, cfg.text, point, i);
        delete cfg.htmlTemplate;
      }
      if (cfg.formatter) {
        cfg.text = cfg.formatter.call(null, cfg.text, point, i);
        delete cfg.formatter;
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
        const textStyle = cfg.textStyle;
        if (Util.isFunction(textStyle)) {
          cfg.textStyle = textStyle.call(null, cfg.text, point, i);
        }
      }
      if (cfg.labelLine) {
        cfg.labelLine = Util.mix({}, defaultCfg.labelLine, cfg.labelLine);
      }
      // 因为 defaultCfg.textStyle 有可能是函数，所以这里可能没有把主题的 label 样式合进来
      cfg.textStyle = Util.mix({}, defaultCfg.textStyle, viewTheme.label.textStyle, cfg.textStyle);
      delete cfg.items;
      cfgs.push(cfg);
    });
    this.set('labelItemCfgs', cfgs);
  }
  showLabels(points, shapes) {
    const self = this;
    const labelRenderer = self.get('labelRenderer');
    let items = self.getLabelsItems(points, shapes);
    shapes = [].concat(shapes);
    const type = self.get('type');
    items = self.adjustItems(items, shapes);
    self.drawLines(items);
    labelRenderer.set('items', items.filter((item, i) => {
      if (!item) {
        shapes.splice(i, 1);
        return false;
      }
      return true;
    }));
    if (type) {
      labelRenderer.set('shapes', shapes);
      labelRenderer.set('type', type);
      labelRenderer.set('points', points);
    }
    labelRenderer.set('canvas', this.get('canvas'));
    labelRenderer.draw();
  }

  destroy() {
    this.get('labelRenderer').destroy(); // 清理文本
    super.destroy.call(this);
  }
}

// Util.assign(GeomLabels.prototype, Labels.LabelslabelRenderer);

module.exports = GeomLabels;
