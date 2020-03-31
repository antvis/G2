import { isArray } from '@antv/util';
import { Point, RangePoint, ShapeVertices } from '../../../interface';

function isValueEmpty(value) {
  if (value) {
    return false;
  }
  return value === null || value === undefined || isNaN(value);
}

function isYNil(point: Point[] | RangePoint) {
  if (isArray(point)) {
    // 特殊处理 area 的关键点数据，其关键点结构为 [{x: 0, y: 1}, {x: 0, y: 2}]
    return isValueEmpty(point[1].y);
  }
  const value = point.y;
  return isArray(value) ? isValueEmpty(value[0]) : isValueEmpty(value);
}

/**
 * @ignore
 * 分割数据，用于处理在一组点数据中，y 对应的数值存在 null/undefined/NaN 的情况
 * 应用于折线图、区域图以及路径图
 *
 * ```typescript
 * // return [[{x: 1, y: 2}, {x: 3, y: 3}]]
 * getPathPoints([{x: 1, y: 2}, {x: 2, y: null}, {x: 3, y: 3}], true);
 * // return [[{x: 1, y: 2}], [{x: 3, y: 3}]]
 * getPathPoints([{x: 1, y: 2}, {x: 2, y: null}, {x: 3, y: 3}], false);
 * // return [[[{ x: 1, y: 10 }, { x: 2, y: 2 }], [{ x: 9, y: 34 }, { x: 1, y: 1 }]]]
 * getPathPoints([
 *   [{ x: 1, y: 10 }, { x: 2, y: 2 }],
 *   [{ x: 4, y: 2 }, { x: 8, y: NaN }],
 *   [{ x: 9, y: 34 }, { x: 1, y: 1 }],
 * ], true);
 * ```
 *
 * @param points 要进行处理点集合
 * @param connectNulls 是否连接空值数据
 * @returns 返回处理后的点集合
 */
export function getPathPoints(points: ShapeVertices, connectNulls?: boolean) {
  if (!points.length) {
    return [];
  }

  if (connectNulls) {
    // 即 y 值为空的场景
    const filtered = [];
    for (let i = 0, len = points.length; i < len; i++) {
      const point = points[i];
      if (!isYNil(point)) {
        filtered.push(point);
      }
    }
    return [filtered];
  }

  const result = [];
  let tmp = [];
  for (let i = 0, len = points.length; i < len; i++) {
    const point = points[i];
    if (isYNil(point)) {
      if (tmp.length) {
        result.push(tmp);
        tmp = [];
      }
    } else {
      tmp.push(point);
    }
  }

  if (tmp.length) {
    result.push(tmp);
  }
  return result;
}
