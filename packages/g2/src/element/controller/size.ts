/**
 * @description 计算 element shape 的 size 辅助类
 */
import * as _ from '@antv/util';
import { AdjustCfg } from '../../interface';
import Element from '../base';

// 已经排序后的数据查找距离最小的
function findMinDistance(arr, scale) {
  const count = arr.length;
  let sourceArr = arr;
  // 日期类型的 values 经常上文本类型，所以需要转换一下
  if (_.isString(sourceArr[0])) {
    sourceArr = arr.map((v: string) => {
      return scale.translate(v);
    });
  }
  let distance = sourceArr[1] - sourceArr[0];
  for (let i = 2; i < count; i++) {
    const tmp = sourceArr[i] - sourceArr[i - 1];
    if (distance > tmp) {
      distance = tmp;
    }
  }
  return distance;
}

export default class SizeController {
  public readonly element: Element = null;
  private _defaultSize: number;

  constructor(element) {
    this.element = element;
  }

  /**
   * 获取数据对应的实际画布大小
   * @param record 图形数据
   */
  public getSize(record) {
    const size = this._getSizeValue(record);
    if (_.isUndefined(size)) {
      const defaultSize = this._getDefaultSize();
      return this._toCoordinateSize(defaultSize);
    }

    return size;
  }

  /**
   * 获取数据对应归一化后的 size 值
   * @param record 图形数据
   */
  public getNormalizedSize(record) {
    const size = this._getSizeValue(record);
    if (_.isUndefined(size)) {
      return this._getDefaultSize();
    }

    return this._toNormalizedSize(size);
  }

  public clear() {
    this._defaultSize = null;
  }

  // 根据 size 图形属性对应获取数据映射后的 size 值
  private _getSizeValue(record) {
    let result;
    const element = this.element;
    const sizeAttr = element.getAttr('size');
    if (sizeAttr) {
      result = element.getAttrValues(sizeAttr, record)[0];
    }
    return result;
  }

  private _getDodgeCount(dataArray) {
    const element = this.element;
    const adjusts = element.get('adjustOptions');
    let dodgeBy: string;
    _.each(adjusts, (adjust: AdjustCfg) => {
      if (adjust.type === 'dodge') {
        dodgeBy = adjust.dodgeBy;
        return false;
      }
    });

    if (dodgeBy) {
      const mergeData = _.flatten(dataArray);
      const values = _.valuesOfKey(mergeData, dodgeBy);
      return values.length;
    }

    return dataArray.length;
  }

  // 计算默认大小
  private _getDefaultSize() {
    const widthRatio = this.element.get('widthRatio');
    const defaultSize = this._defaultSize;
    if (!defaultSize) {
      const element = this.element;
      const coord = element.get('coord');
      const xScale = element.getXScale();
      const xValues = xScale.values;
      const dataArray = element.get('dataArray');
      let count: number = xValues.length;
      if (xScale.isLinear && xValues.length > 1) {
        // Linear 类型用户有可能设置了 min, max 范围所以需要根据数据最小区间计算 count
        xValues.sort();
        const interval = findMinDistance(xValues, xScale);
        count = (xScale.max - xScale.min) / interval;
        if (xValues.length > count) {
          count = xValues.length;
        }
      }

      const range = xScale.range;
      let normalizedSize = 1 / count;
      let wr = 1;
      if (element.isInCircle()) {
        if (coord.isTransposed && count > 1) { // 极坐标下多层环图
          wr = widthRatio.multiplePie;
        } else {
          wr = widthRatio.rose;
        }
        /* if (dataArray.length > 1) {
          normalizedSize *= (range[1] - range[0]);
        } */
      } else {
        if (xScale.isLinear) {
          normalizedSize *= (range[1] - range[0]);
        }
        wr = widthRatio.column; // 柱状图要除以2
      }
      normalizedSize *= wr;
      if (element.hasAdjust('dodge')) {
        const dodgeCount = this._getDodgeCount(dataArray);
        normalizedSize = normalizedSize / dodgeCount;
      }

      this._defaultSize = normalizedSize;
      return normalizedSize;
    }
    return defaultSize;
  }

  // 获取坐标系 x 轴的长度
  private _getCoordinateWidth(): number {
    const element = this.element;
    const coord = element.get('coord');
    if (element.isInCircle() && !coord.isTransposed) { // 极坐标下 width 为弧长
      return (coord.endAngle - coord.startAngle) * coord.getRadius();
    }

    const start = coord.convertPoint({
      x: 0,
      y: 0,
    });
    const end = coord.convertPoint({
      x: 1,
      y: 0,
    });
    let width = 0;
    if (start && end) {
      width = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
    }
    return width;
  }

  // 将归一化的数值转换成实际像素大小
  private _toCoordinateSize(normalizedSize: number): number {
    const coordinateWidth = this._getCoordinateWidth();
    return normalizedSize * coordinateWidth;
  }

  // 将实际像素大小进行归一化处理
  private _toNormalizedSize(size: number): number {
    const coordinateWidth = this._getCoordinateWidth();
    return size / coordinateWidth;
  }
}
