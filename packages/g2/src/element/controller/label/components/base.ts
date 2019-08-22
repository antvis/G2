import { Label } from '@antv/component';
import { Group } from '@antv/g';
import * as _ from '@antv/util';
import { DataPointType } from '../../../../interface';

const IGNORE_ARR = [ 'line', 'point', 'path' ];
const ORIGIN = '_origin';

function avg(arr) {
  let sum = 0;
  _.each(arr, (value) => {
    sum += value as number;
  });
  return sum / arr.length;
}

// 计算多边形重心: https://en.wikipedia.org/wiki/Centroid#Of_a_polygon
function getCentroid(xs, ys) {
  if (_.isNumber(xs) && _.isNumber(ys)) { // 普通色块图，xs 和 ys 是数值
    return [ xs, ys ];
  }
  let i = -1;
  let x = 0;
  let y = 0;
  let former;
  let current = xs.length - 1;
  let diff;
  let k = 0;
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

export type ElementLabelsConstructor = new (cfg: any) => ElementLabels;

export default class ElementLabels extends Group {
  constructor(cfg) {
    super({
      labelOptions: null,
      coord: null,
      elementType: null,
      zIndex: 6,
      ...cfg,
    });

    this.set('defaultLabelCfg', this.get('theme').label);
  }

  public _renderUI() {
    super._renderUI();

    const labelsGroup = this.addGroup({
      name: 'element-labels-group',
    });
    const lineGroup = this.addGroup({
      name: 'element-labels-line-group',
    });

    const labelsRenderer = new Label();
    labelsRenderer.set('coord', this.get('coord'));
    labelsRenderer.set('group', labelsGroup);
    labelsRenderer.set('lineGroup', lineGroup);

    this.set('labelsRenderer', labelsRenderer);
    this.set('labelsGroup', labelsGroup);
    this.set('lineGroup', lineGroup);
  }

  public destroy() {
    this.get('labelsRenderer').destroy(); // 清理文本
    super.destroy.call(this);
  }

  public showLabels(points, originShapes) {
    const labelsRenderer = this.get('labelsRenderer');
    let items = this.getLabelsItems(points, originShapes);
    const shapes = [].concat(originShapes);
    const type = this.get('type');
    items = this.adjustItems(items, shapes);
    this.drawLines(items);
    labelsRenderer.set('items', items.filter((item, i) => {
      if (!item) {
        shapes.splice(i, 1);
        return false;
      }
      return true;
    }));
    if (type) {
      labelsRenderer.set('shapes', shapes);
      labelsRenderer.set('type', type);
      labelsRenderer.set('points', points);
    }
    labelsRenderer.set('canvas', this.get('canvas'));
    labelsRenderer.draw();
  }

  public adjustItems(items, shapes?) {
    _.each(items, (item: any) => {
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
  public drawLines(items) {
    _.each(items, (point: any) =>  {
      if (!point) {
        return;
      }
      if (point.offset > 0 && point.labelLine) {
        this.lineToLabel(point);
      }
    });
  }

  // 定义连接线
  public lineToLabel(point?) {}

  public setLabelPosition(label?, point?, index?, position?) {}

  public transLabelPoint(point) {
    const coord = this.get('coord');
    const tmpPoint = coord.applyMatrix(point.x, point.y, 1);
    point.x = tmpPoint[0];
    point.y = tmpPoint[1];
  }

  public getOffsetVector(point) {
    const offset = point.offset || 0;
    const coord = this.get('coord');
    let vector;
    if (coord.isTransposed) { // 如果x,y翻转，则偏移x
      vector = coord.applyMatrix(offset, 0);
    } else { // 否则，偏转y
      vector = coord.applyMatrix(0, offset);
    }
    return vector;
  }

  // 获取默认的偏移量
  public getDefaultOffset(point) {
    let offset = 0;
    const coord = this.get('coord');
    const vector = this.getOffsetVector(point);
    if (coord.isTransposed) { // 如果x,y翻转，则偏移x
      offset = vector[0];
    } else { // 否则，偏转y
      offset = vector[1];
    }
    return offset;
  }

  // 获取文本的偏移位置，x,y
  public getLabelOffset(point, index, total) {
    const offset = this.getDefaultOffset(point);
    const coord = this.get('coord');
    const transposed = coord.isTransposed;
    const yField = transposed ? 'x' : 'y';
    const factor = transposed ? 1 : -1; // y 方向上越大，像素的坐标越小，所以transposed时将系数变成
    const offsetPoint = {
      x: 0,
      y: 0,
    };
    if (index > 0 || total === 1) { // 判断是否小于0
      offsetPoint[yField] = offset * factor;
    } else {
      offsetPoint[yField] = offset * factor * -1;
    }
    return offsetPoint;
  }

  /**
   * @protected
   * 获取labels
   * @param {Array} points points
   * @param {Array} shapes shapes
   * @return {Array} label items
   */
  protected getLabelsItems(points, shapes) {
    const items = [];
    const element = this.get('element');
    const coord = this.get('coord');

    const labelOptions = this._getlabelOptions(points, shapes);
    // 获取label相关的x，y的值，获取具体的x,y,防止存在数组
    _.each(points, (point, i) => {
      const origin = point[ORIGIN];
      const label = labelOptions[i];
      if (!label) {
        items.push(null);
        return;
      }
      if (!_.isArray(label.text)) {
        label.text = [ label.text ];
      }
      const total = label.length;

      _.each(label.text, (sub, subIndex) => {
        if (_.isNil(sub) || sub === '') {
          items.push(null);
          return;
        }
        let obj = this.getLabelPoint(label, point, subIndex) as any;
        obj = _.mix({}, label, obj);
        if (!obj.textAlign) {
          obj.textAlign = this.getLabelAlign(obj, subIndex, total);
        }
        if (element) {
          obj.id = `${element.getShapeId(origin)}-glabel-${subIndex}-${obj.text}`;
        }
        obj.coord = coord;
        items.push(obj);
      });
    });
    return items;
  }

  /**
   * @protected
   * 获取文本的位置信息
   * @param {Array} labelOptions labels
   * @param {Object} point point
   * @param {Number} index index
   * @return {Object} point
   */
  protected getLabelPoint(labelOptions: DataPointType, point, index): DataPointType {
    const coord = this.get('coord');
    const total = labelOptions.text.length;

    function getDimValue(value, idx) {
      let v = value;
      if (_.isArray(v)) {
        if (labelOptions.text.length === 1) { // 如果仅一个label,多个y,取最后一个y
          if (v.length <= 2) {
            v = v[value.length - 1];
          } else {
            v = avg(v);
          }
        } else {
          v = v[idx];
        }
      }
      return v;
    }

    const label = {
      text: labelOptions.text[index],
      x: 0,
      y: 0,
      start: { x: 0, y: 0 },
      color: '#fff',
    };
    // 多边形场景,多用于地图
    if (point && this.get('elementType') === 'polygon') {
      const centroid = getCentroid(point.x, point.y);
      label.x = centroid[0];
      label.y = centroid[1];
    } else {
      label.x = getDimValue(point.x, index);
      label.y = getDimValue(point.y, index);
    }

    // get nearest point of the shape as the label line start point
    if (point && point.nextPoints && (point.shape === 'funnel' || point.shape === 'pyramid')) {
      let maxX = -Infinity;
      point.nextPoints.forEach((p) => {
        const p1 = coord.convert(p);
        if (p1.x > maxX) {
          maxX = p1.x;
        }
      });
      label.x = (label.x + maxX) / 2;
    }
    // sharp edge of the pyramid
    if (point.shape === 'pyramid' && !point.nextPoints && point.points) {
      point.points.forEach((p) => {
        let p1 = p;
        p1 = coord.convert(p1);
        if ((_.isArray(p1.x) && point.x.indexOf(p1.x) === -1) || (_.isNumber(p1.x) && point.x !== p1.x)) {
          label.x = (label.x + p1.x) / 2;
        }
      });
    }

    if (labelOptions.position) {
      this.setLabelPosition(label, point, index, labelOptions.position);
    }
    const offsetPoint = this.getLabelOffset(labelOptions, index, total);
    if (labelOptions.offsetX) {
      offsetPoint.x += labelOptions.offsetX;
    }
    if (labelOptions.offsetY) {
      offsetPoint.y += labelOptions.offsetY;
    }
    this.transLabelPoint(label);
    label.start = { x: label.x, y: label.y };
    label.x += offsetPoint.x;
    label.y += offsetPoint.y;
    label.color = point.color;
    return label;
  }

  protected getLabelAlign(point, index, total) {
    let align = 'center';
    const coord = this.get('coord');
    if (coord.isTransposed) {
      const offset = this.getDefaultOffset(point);
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

  private _getLabelValue(origin, originScales) {
    let scales = originScales;
    if (!_.isArray(scales)) {
      scales = [ scales ];
    }
    const text = [];
    _.each(scales, (scale: any) => {
      let value = origin[scale.field];
      if (_.isArray(value)) {
        const tmp = [];
        _.each(value, (subVal) => {
          tmp.push(scale.getText(subVal));
        });
        value = tmp;
      } else {
        value = scale.getText(value);
      }
      if (_.isNil(value) || value === '') {
        text.push(null);
      } else {
        text.push(value);
      }
    });
    return text;
  }

  // 获取每个label的配置
  private _getlabelOptions(points, shapes?) {
    const elementType = this.get('elementType');
    const theme = this.get('theme');
    const labelOptions = this.get('labelOptions');
    const scales = labelOptions.scales;

    const cfgs = [];
    _.each(points, (point: DataPointType, i: number) => {
      let cfg: DataPointType = {};
      const origin = point[ORIGIN];
      const originText = this._getLabelValue(origin, scales);
      if (labelOptions.callback) {
        // callback 中应使用原始数据，而不是数据字符串
        const originValues = scales.map((scale) => origin[scale.field]);
        cfg = labelOptions.callback(...originValues);
      }
      if (_.isNil(cfg)) {
        cfgs.push(null);
        return;
      }

      if (_.isString(cfg.content)) {
        cfg.text = cfg.content;
        delete cfg.content;
      } else if (_.isFunction(cfg.content)) {
        cfg.text = cfg.content(origin, point, i);
        delete cfg.content;
      } else {
        cfg.text = originText[0]; // 默认展示声明的第一个字段对应的值
      }

      if (cfg.htmlTemplate) {
        cfg.useHtml = true;
        cfg.text = cfg.htmlTemplate(origin, point, i);
        delete cfg.htmlTemplate;
      }
      if (cfg.formatter) {
        cfg.text = cfg.formatter.call(null, cfg.text, point, i);
        delete cfg.formatter
      }

      if (
        elementType === 'polygon' ||
        (cfg.offset < 0 && _.indexOf(IGNORE_ARR, elementType) === -1)
      ) {
        cfg = _.deepMix({}, this.get('defaultLabelCfg'), theme.innerLabels, cfg);
      } else {
        cfg = _.deepMix({}, this.get('defaultLabelCfg'), theme.label, cfg);
      }

      // 将 shape 的原始数据存入
      cfg.origin = origin;
      // delete cfg.items;
      cfgs.push(cfg);
    });

    return cfgs;
  }
}
