/**
 * @description Element 上 tooltip 的辅助类
 */

import * as _ from '@antv/util';
import { Scale, Attribute } from '../../dependents';
import Element from '../base';
import { PointObject, DataPointType } from '../../interface';

const FIELD_ORIGIN = '_origin';

function _snapEqual(v1, v2, scale) {
  const value1 = scale.translate(v1);
  const value2 = scale.translate(v2);

  if (scale.isCategory) {
    return value1 === value2;
  }
  return _.isNumberEqual(value1, value2);
}

function _getScaleName(scale) {
  return scale.alias || scale.field;
}

export default class TooltipController {
  readonly element: Element = null;
  private _xDistance: number = null;

  constructor(element) {
    this.element = element;
  }

  /**
   * 根据画布坐标在 source 中查找匹配的数据
   * @param point 画布坐标
   * @param source 数据源(已排序)
   */
  findPoint(point: PointObject, source: DataPointType[]) {
    if (source.length === 0) return null; // 数据为空

    const element = this.element;
    const elementType = element.get('type');
    const xScale = element.getXScale();
    const yScale = element.getYScale();
    const xField = xScale.field;
    const yField = yScale.field;

    let rst = null;

    if (elementType === 'point' || elementType === 'heatmap') {
      // 将 point 画布坐标转换为原始数据值
      const coord = element.get('coord');
      const invertPoint = coord.invert(point); // 转换成归一化的数据
      const xValue = xScale.invert(invertPoint.x); // 转换为原始值
      const yValue = yScale.invert(invertPoint.y); // 转换为原始值

      // 根据最小逼近原则查找 point 击中的数据
      let min = Infinity;
      _.each(source, (obj) => {
        const originData = obj[FIELD_ORIGIN];
        const distance = Math.pow((originData[xField] - xValue), 2) +
          Math.pow((originData[yField] - yValue), 2);
        if (distance < min) {
          min = distance;
          rst = obj;
        }
      });

      return rst;
    }

    // 其他 Element 类型按照 x 字段数据进行查找
    const first = source[0];
    let last = source[source.length - 1];

    const xValue = this._getXValueByPoint(point);
    const firstXValue = first[FIELD_ORIGIN][xField];
    const firstYValue = first[FIELD_ORIGIN][yField];
    const lastXValue = last[FIELD_ORIGIN][xField];
    const isYArray = yScale.isLinear && _.isArray(firstYValue); // 考虑 x 维度相同，y 是数组区间的情况

    // 如果 x 的值是数组
    if (_.isArray(firstXValue)) {
      _.each(source, (record) => {
        const origin = record[FIELD_ORIGIN];
        // xValue 在 origin[xField] 的数值区间内
        if (xScale.translate(origin[xField][0]) <= xValue && xScale.translate(origin[xField][1]) >= xValue) {
          if (isYArray) { // 层叠直方图场景，x 和 y 都是数组区间
            if (!_.isArray(rst)) {
              rst = [];
            }
            rst.push(record);
          } else {
            rst = record;
            return false;
          }
        }
      });
      if (_.isArray(rst)) {
        rst = this._filterYValue(rst, point);
      }
    } else {
      let next;
      if (!xScale.isLinear && xScale.type !== 'timeCat') {  // x 轴对应的数据为非线性以及非时间类型的数据采用遍历查找
        _.each(source, (record, index) => {
          const origin = record[FIELD_ORIGIN];
          if (_snapEqual(origin[xField], xValue, xScale)) {
            if (isYArray) {
              if (!_.isArray(rst)) {
                rst = [];
              }
              rst.push(record);
            } else {
              rst = record;
              return false;
            }
          } else if (xScale.translate(origin[xField]) <= xValue) {
            last = record;
            next = source[index + 1];
          }
        });

        if (_.isArray(rst)) {
          rst = this._filterYValue(rst, point);
        }
      } else { // x 轴对应的数据为线性以及时间类型，进行二分查找，性能更好
        if (xValue > xScale.translate(lastXValue) || xValue < xScale.translate(firstXValue)) { // 不在数据范围内
          return null;
        }

        let firstIdx = 0;
        let lastIdx = source.length - 1;
        let middleIdx;
        while (firstIdx <= lastIdx) {
          middleIdx = Math.floor((firstIdx + lastIdx) / 2);
          const item = source[middleIdx][FIELD_ORIGIN][xField];
          if (_snapEqual(item, xValue, xScale)) {
            return source[middleIdx];
          }

          if (xScale.translate(item) <= xScale.translate(xValue)) {
            firstIdx = middleIdx + 1;
            last = source[middleIdx];
            next = source[middleIdx + 1];
          } else {
            if (lastIdx === 0) {
              last = source[0];
            }
            lastIdx = middleIdx - 1;
          }
        }
      }

      if (last && next) { // 计算最逼近的
        if (Math.abs(xScale.translate(last[FIELD_ORIGIN][xField]) - xValue) >
          Math.abs(xScale.translate(next[FIELD_ORIGIN][xField]) - xValue)) {
          last = next;
        }
      }
    }

    const distance = this._getXDistance(); // 每个分类间的平均间距
    if (!rst && Math.abs(xScale.translate(last[FIELD_ORIGIN][xField]) - xValue) <= distance / 2) {
      rst = last;
    }

    return rst;
  }

  /**
   * 根据数据获取对应的 tooltip items 信息
   * @param data 数据记录
   * @param titleField tooltip title 字段名
   */
  getTooltipItems(data: DataPointType, titleField: string) {
    const element = this.element;
    const origin = data[FIELD_ORIGIN];
    const tooltipTitle = this._getTooltipTitle(origin, titleField);
    const tooltipOptions = element.get('tooltipOptions');
    const { defaultColor } = element.get('theme');
    const size = this._getSize(data);
    const items = [];
    let name;
    let value;

    function addItem(itemName, itemValue) {
      if (!_.isNil(itemValue) && itemValue !== '') { // 值为 null的时候，忽视
        const item = {
          title: tooltipTitle,
          point: data,
          name: itemName || tooltipTitle,
          value: itemValue,
          color: data.color || defaultColor,
          marker: true,
          size,
        };

        items.push(item);
      }
    }

    if (tooltipOptions) {
      const { fields, callback } = tooltipOptions;
      if (callback) { // 用户定义了回调函数
        const callbackParams = fields.map((field: string) => {
          return data[FIELD_ORIGIN][field];
        });
        const cfg = callback(...callbackParams);
        const itemCfg = {
          point: data,
          title: tooltipTitle,
          color: data.color || defaultColor,
          marker: true, // 默认展示 marker
          size,
          ...cfg,
        };

        items.push(itemCfg);
      } else {
        const scales = element.get('scales');
        _.each(fields, (field: string) => {
          if (!_.isNil(origin[field])) { // 字段数据为null, undefined 时不显示
            const scale = scales[field];
            name = _getScaleName(scale);
            value = scale.getText(origin[field]);
            addItem(name, value);
          }
        });
      }
    } else {
      const valueScale = this._getTooltipValueScale();
      if (!_.isNil(origin[valueScale.field])) { // 字段数据为null ,undefined时不显示
        value = this._getTooltipValue(origin, valueScale);
        name = this._getTooltipName(origin);
        addItem(name, value);
      }
    }
    return items;
  }

  clear() {
    this._xDistance = null;
  }

  // 返回画布坐标点对应的 x 字段数值
  private _getXValueByPoint(point: PointObject): number {
    let result = 0;
    const element = this.element;
    const coord = element.get('coord');
    const xScale = element.getXScale();
    const range = xScale.range;
    const rangeMax = range[range.length - 1];
    const rangeMin = range[0];

    const invertPoint = coord.invert(point);

    let xValue = invertPoint.x;
    if (element.isInCircle() && xValue > (1 + rangeMax) / 2) {
      xValue = rangeMin; // 极坐标下，scale 的 range 被做过特殊处理 see view.js#L88
    }

    result = xScale.invert(xValue);
    if (xScale.isCategory) { // 分类类型，要将字符串类型转换成数字
      result = xScale.translate(result);
    }

    return result;
  }

  private _filterYValue(arr, point) {
    const element = this.element;
    const coord = element.get('coord');
    const yScale = element.getYScale();
    const yField = yScale.field;
    const invertPoint = coord.invert(point);

    const yValue = yScale.invert(invertPoint.y);
    let rst = arr[arr.length - 1];

    _.each(arr, (obj) => {
      const origin = obj[FIELD_ORIGIN];
      if ((origin[yField][0] <= yValue) && (origin[yField][1] >= yValue)) {
        rst = obj;
        return false;
      }
    });
    return rst;
  }

  private _getXDistance() {
    let distance = this._xDistance;
    if (!distance) {
      const element = this.element;
      const xScale = element.getXScale();
      if (xScale.isCategory) {
        distance = 1;
      } else {
        const values = xScale.values; // values 是无序的
        let min = xScale.translate(values[0]);
        let max = min;
        _.each(values, (value) => { // 时间类型需要 translate
          const numericValue = xScale.translate(value);
          if (numericValue < min) {
            min = numericValue;
          }
          if (numericValue > max) {
            max = numericValue;
          }
        });
        const length = values.length;
        // 应该是除以 length - 1
        distance = (max - min) / (length - 1);
      }
      this._xDistance = distance; // 缓存，防止重复计算
    }

    return distance;
  }

  // 获取 title 字段对应的度量
  private _getTooltipTitleScale(titleField: string) {
    const element = this.element;
    const scales = element.get('scales');
    if (titleField) {
      return scales[titleField];
    }
    const positionAttr = element.getAttr('position');
    const fields = positionAttr.getFields();
    return scales[fields[0]];
  }

  // 获取原始数据的 tooltip title 字符串
  private _getTooltipTitle(originData: DataPointType, titleField: string) {
    let tooltipTitle = '';

    const element = this.element;
    const titleScale = this._getTooltipTitleScale(titleField);

    if (titleScale) {
      const value = originData[titleScale.field];
      tooltipTitle = titleScale.getText(value);
    } else if (element.get('type') === 'heatmap') { // 热力图在不存在 title 的时候特殊处理
      const xScale = element.getXScale();
      const yScale = element.getYScale();
      const xValue = xScale.getText(originData[xScale.field]);
      const yValue = yScale.getText(originData[yScale.field]);
      tooltipTitle = `( ${xValue}, ${yValue} )`;
    }
    return tooltipTitle;
  }

  // 获取 tooltip value 值对应的度量
  private _getTooltipValueScale() {
    const element = this.element;
    const attrs = element.getAttrsForLegend();
    let scale;
    _.each(attrs, (attr: Attribute) => {
      const tmpScale = attr.getScale(attr.type);
      if (tmpScale && tmpScale.isLinear) { // 如果指定字段是非 position 的，同时是连续的
        scale = tmpScale;
        return false;
      }
    });

    const xScale = element.getXScale();
    const yScale = element.getYScale();

    return scale || yScale || xScale;
  }

  // 根据原始数据以及对应的 value 度量获取 tooltip 对应的 value 值
  private _getTooltipValue(originData: DataPointType, valueScale: Scale) {
    const field = valueScale.field;
    const value = originData[field];

    if (_.isArray(value)) {
      const values = value.map((eachValue) => {
        return valueScale.getText(eachValue);
      });
      return values.join('-');
    }
    return valueScale.getText(value);
  }

  // 根据原始数据获取 tooltip item 中 name 值
  private _getTooltipName(originData: DataPointType) {
    let nameScale: Scale;
    const element = this.element;
    const groupScales = element.getGroupScales();
    if (groupScales.length) { // 如果存在分组类型，取第一个分组类型
      _.each(groupScales, (scale: Scale) => {
        nameScale = scale;
        return false;
      });
    }
    if (nameScale) {
      const field = nameScale.field;
      return nameScale.getText(originData[field]);
    }

    const valueScale = this._getTooltipValueScale();
    return _getScaleName(valueScale);
  }

  // TODO: 需要改造
  private _getSize(obj) {
    const element = this.element;
    const coord = element.get('coord');
    let size = element.getSize(obj[FIELD_ORIGIN]);
    if (coord.isRect && size) {
      const dim = coord.isTransposed ? 'y' : 'x';
      if (_.isArray(obj[dim])) {
        const width = Math.abs(obj[dim][1] - obj[dim][0]);
        size = size < width ? null : size; // 直方图计算错误
      }
    }
    return size;
  }
}
