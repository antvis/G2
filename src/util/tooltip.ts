import { contains, filter, find, hasKey, isArray, isFunction, isNil, isNumberEqual, isObject, memoize, values } from '@antv/util';
import { FIELD_ORIGIN, GROUP_ATTRS } from '../constant';
import { Attribute, Scale } from '../dependents';
import Geometry from '../geometry/base';
import { Data, Datum, MappingDatum, Point, TooltipTitle } from '../interface';
import { getName } from './scale';

function snapEqual(v1: any, v2: any, scale: Scale) {
  const value1 = scale.translate(v1);
  const value2 = scale.translate(v2);

  return isNumberEqual(value1, value2);
}

function getXValueByPoint(point: Point, geometry: Geometry): number {
  const coordinate = geometry.coordinate;
  const xScale = geometry.getXScale();
  const range = xScale.range;
  const rangeMax = range[range.length - 1];
  const rangeMin = range[0];

  const invertPoint = coordinate.invert(point);

  let xValue = invertPoint.x;
  if (coordinate.isPolar && xValue > (1 + rangeMax) / 2) {
    xValue = rangeMin; // 极坐标下，scale 的 range 被做过特殊处理
  }
  return xScale.translate(xScale.invert(xValue));
}

function filterYValue(data: Data, point: Point, geometry: Geometry) {
  const coordinate = geometry.coordinate;
  const yScale = geometry.getYScale();
  const yField = yScale.field;
  const invertPoint = coordinate.invert(point);
  const yValue = yScale.invert(invertPoint.y);

  const result = find(data, (obj: Datum) => {
    const originData = obj[FIELD_ORIGIN];
    return originData[yField][0] <= yValue && originData[yField][1] >= yValue;
  });
  return result || data[data.length - 1];
}

const getXDistance = memoize((scale: Scale) => {
  if (scale.isCategory) {
    return 1;
  }
  const scaleValues = scale.values; // values 是无序的
  const length = scaleValues.length;
  let min = scale.translate(scaleValues[0]);
  let max = min;

  for (let index = 0; index < length; index++) {
    const value = scaleValues[index];
    // 时间类型需要 translate
    const numericValue = scale.translate(value);
    if (numericValue < min) {
      min = numericValue;
    }
    if (numericValue > max) {
      max = numericValue;
    }
  }
  return (max - min) / (length - 1);
});

/**
 * 获得 tooltip 的 title
 * @param originData
 * @param geometry
 * @param title
 */
function getTooltipTitle(originData: Datum, geometry: Geometry, title: TooltipTitle): string {
  const positionAttr = geometry.getAttribute('position');
  const fields = positionAttr.getFields();
  const scales = geometry.scales;

  const titleField = isFunction(title) || !title ? fields[0] : title;
  const titleScale = scales[titleField];

  // 如果创建了该字段对应的 scale，则通过 scale.getText() 方式取值，因为用户可能对数据进行了格式化
  // 如果没有对应的 scale，则从原始数据中取值，如果原始数据中仍不存在，则直接放回 title 值
  const tooltipTitle = titleScale ? titleScale.getText(originData[titleField]) : originData[titleField] || titleField;

  return isFunction(title) ? title(tooltipTitle, originData) : tooltipTitle;
}

function getAttributesForLegend(geometry: Geometry) {
  const attributes = values(geometry.attributes);
  return filter(attributes, (attribute: Attribute) => contains(GROUP_ATTRS, attribute.type));
}

function getTooltipValueScale(geometry: Geometry) {
  const attributes = getAttributesForLegend(geometry);
  let scale;
  for (const attribute of attributes) {
    const tmpScale = attribute.getScale(attribute.type);
    if (tmpScale && tmpScale.isLinear) {
      // 如果指定字段是非 position 的，同时是连续的
      scale = tmpScale;
      break;
    }
  }

  const xScale = geometry.getXScale();
  const yScale = geometry.getYScale();

  return scale || yScale || xScale;
}

function getTooltipValue(originData: Datum, valueScale: Scale) {
  const field = valueScale.field;
  const value = originData[field];

  if (isArray(value)) {
    const texts = value.map((eachValue) => {
      return valueScale.getText(eachValue);
    });
    return texts.join('-');
  }
  return valueScale.getText(value);
}

// 根据原始数据获取 tooltip item 中 name 值
function getTooltipName(originData: Datum, geometry: Geometry) {
  let nameScale: Scale;
  const groupScales = geometry.getGroupScales();
  if (groupScales.length) {
    // 如果存在分组类型，取第一个分组类型
    nameScale = groupScales[0];
  }
  if (nameScale) {
    const field = nameScale.field;
    return nameScale.getText(originData[field]);
  }

  const valueScale = getTooltipValueScale(geometry);
  return getName(valueScale);
}

/**
 * @ignore
 * Finds data from geometry by point
 * @param point canvas point
 * @param data an item of geometry.dataArray
 * @param geometry
 * @returns
 */
export function findDataByPoint(point: Point, data: MappingDatum[], geometry: Geometry) {
  if (data.length === 0) {
    return null;
  }

  const geometryType = geometry.type;
  const xScale = geometry.getXScale();
  const yScale = geometry.getYScale();

  const xField = xScale.field;
  const yField = yScale.field;

  let rst = null;

  // 热力图采用最小逼近策略查找 point 击中的数据
  if (geometryType === 'heatmap' || geometryType === 'point') {
    // 将 point 画布坐标转换为原始数据值
    const coordinate = geometry.coordinate;
    const invertPoint = coordinate.invert(point); // 转换成归一化的数据
    const x = xScale.invert(invertPoint.x); // 转换为原始值
    const y = yScale.invert(invertPoint.y); // 转换为原始值

    let min = Infinity;
    for (let index = 0; index < data.length; index++) {
      const obj = data[index];
      const originData = obj[FIELD_ORIGIN];
      const range = (originData[xField] - x) ** 2 + (originData[yField] - y) ** 2;
      if (range < min) {
        min = range;
        rst = obj;
      }
    }

    return rst;
  }

  // 其他 Geometry 类型按照 x 字段数据进行查找
  const first = data[0];
  let last = data[data.length - 1];
  const xValue = getXValueByPoint(point, geometry);
  const firstXValue = first[FIELD_ORIGIN][xField];
  const firstYValue = first[FIELD_ORIGIN][yField];
  const lastXValue = last[FIELD_ORIGIN][xField];
  const isYArray = yScale.isLinear && isArray(firstYValue); // 考虑 x 维度相同，y 是数组区间的情况

  // 如果 x 的值是数组
  if (isArray(firstXValue)) {
    for (let index = 0; index < data.length; index++) {
      const record = data[index];
      const originData = record[FIELD_ORIGIN];
      // xValue 在 originData[xField] 的数值区间内
      if (xScale.translate(originData[xField][0]) <= xValue && xScale.translate(originData[xField][1]) >= xValue) {
        if (isYArray) {
          // 层叠直方图场景，x 和 y 都是数组区间
          if (!isArray(rst)) {
            rst = [];
          }
          rst.push(record);
        } else {
          rst = record;
          break;
        }
      }
    }
    if (isArray(rst)) {
      rst = filterYValue(rst, point, geometry);
    }
  } else {
    let next;
    if (!xScale.isLinear && xScale.type !== 'timeCat') {
      // x 轴对应的数据为非线性以及非时间类型的数据采用遍历查找
      for (let index = 0; index < data.length; index++) {
        const record = data[index];
        const originData = record[FIELD_ORIGIN];
        if (snapEqual(originData[xField], xValue, xScale)) {
          if (isYArray) {
            if (!isArray(rst)) {
              rst = [];
            }
            rst.push(record);
          } else {
            rst = record;
            break;
          }
        } else if (xScale.translate(originData[xField]) <= xValue) {
          last = record;
          next = data[index + 1];
        }
      }

      if (isArray(rst)) {
        rst = filterYValue(rst, point, geometry);
      }
    } else {
      // x 轴对应的数据为线性以及时间类型，进行二分查找，性能更好
      if (
        (xValue > xScale.translate(lastXValue) || xValue < xScale.translate(firstXValue)) &&
        (xValue > xScale.max || xValue < xScale.min)
      ) {
        // 不在数据范围内
        return null;
      }

      let firstIdx = 0;
      let lastIdx = data.length - 1;
      let middleIdx;
      while (firstIdx <= lastIdx) {
        middleIdx = Math.floor((firstIdx + lastIdx) / 2);
        const item = data[middleIdx][FIELD_ORIGIN][xField];
        if (snapEqual(item, xValue, xScale)) {
          return data[middleIdx];
        }

        if (xScale.translate(item) <= xScale.translate(xValue)) {
          firstIdx = middleIdx + 1;
          last = data[middleIdx];
          next = data[middleIdx + 1];
        } else {
          if (lastIdx === 0) {
            last = data[0];
          }
          lastIdx = middleIdx - 1;
        }
      }
    }

    if (last && next) {
      // 计算最逼近的
      if (
        Math.abs(xScale.translate(last[FIELD_ORIGIN][xField]) - xValue) >
        Math.abs(xScale.translate(next[FIELD_ORIGIN][xField]) - xValue)
      ) {
        last = next;
      }
    }
  }

  const distance = getXDistance(geometry.getXScale()); // 每个分类间的平均间距
  if (!rst && Math.abs(xScale.translate(last[FIELD_ORIGIN][xField]) - xValue) <= distance / 2) {
    rst = last;
  }

  return rst;
}

/**
 * @ignore
 * Gets tooltip items
 * @param data
 * @param geometry
 * @param [title]
 * @returns
 */
export function getTooltipItems(data: MappingDatum, geometry: Geometry, title: TooltipTitle = '', showNil: boolean = false) {
  const originData = data[FIELD_ORIGIN];
  const tooltipTitle = getTooltipTitle(originData, geometry, title);
  const tooltipOption = geometry.tooltipOption;
  const { defaultColor } = geometry.theme;
  const items = [];
  let name;
  let value;

  function addItem(itemName, itemValue) {
    if (showNil || (!isNil(itemValue) && itemValue !== '')) {
      // 值为 null的时候，忽视
      const item = {
        title: tooltipTitle,
        data: originData, // 原始数据
        mappingData: data, // 映射后的数据
        name: itemName,
        value: itemValue,
        color: data.color || defaultColor,
        marker: true,
      };

      items.push(item);
    }
  }

  if (isObject(tooltipOption)) {
    const { fields, callback } = tooltipOption;
    if (callback) {
      // 用户定义了回调函数
      const callbackParams = fields.map((field: string) => {
        return data[FIELD_ORIGIN][field];
      });
      const cfg = callback(...callbackParams);
      const itemCfg = {
        data: data[FIELD_ORIGIN], // 原始数据
        mappingData: data, // 映射后的数据
        title: tooltipTitle,
        color: data.color || defaultColor,
        marker: true, // 默认展示 marker
        ...cfg,
      };

      items.push(itemCfg);
    } else {
      const scales = geometry.scales;
      for (const field of fields) {
        if (!isNil(originData[field])) {
          // 字段数据为null, undefined 时不显示
          const scale = scales[field];
          name = getName(scale);
          value = scale.getText(originData[field]);
          addItem(name, value);
        }
      }
    }
  } else {
    const valueScale = getTooltipValueScale(geometry);
    // 字段数据为null ,undefined时不显示
    value = getTooltipValue(originData, valueScale);
    name = getTooltipName(originData, geometry);
    addItem(name, value);
  }
  return items;
}
