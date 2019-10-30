import * as _ from '@antv/util';
import { FIELD_ORIGIN, GROUP_ATTRS } from '../constant';
import { Attribute, Scale } from '../dependents';
import Geometry from '../geometry/base';
import { Data, Datum, Point } from '../interface';
import { getName } from './scale';

function snapEqual(v1: any, v2: any, scale: Scale) {
  const value1 = scale.translate(v1);
  const value2 = scale.translate(v2);

  if (scale.isCategory) {
    return value1 === value2;
  }
  return _.isNumberEqual(value1, value2);
}

function getXValueByPoint(point: Point, geometry: Geometry): number {
  let result = 0;
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

  result = xScale.invert(xValue);
  if (xScale.isCategory) {
    // 分类类型，要将字符串类型转换成数字
    result = xScale.translate(result);
  }

  return result;
}

function filterYValue(arr: Data, point: Point, geometry: Geometry) {
  const coordinate = geometry.coordinate;
  const yScale = geometry.getYScale();
  const yField = yScale.field;
  const invertPoint = coordinate.invert(point);

  const yValue = yScale.invert(invertPoint.y);
  let rst = arr[arr.length - 1];

  _.each(arr, (obj) => {
    const origin = obj[FIELD_ORIGIN];
    if (origin[yField][0] <= yValue && origin[yField][1] >= yValue) {
      rst = obj;
      return false;
    }
  });
  return rst;
}

function getXDistance(geometry: Geometry) {
  // @ts-ignore 缓存，但是不对外暴露
  let distance = geometry._xDistance;
  if (!distance) {
    const xScale = geometry.getXScale();
    if (xScale.isCategory) {
      distance = 1;
    } else {
      const values = xScale.values; // values 是无序的
      let min = xScale.translate(values[0]);
      let max = min;
      _.each(values, (value) => {
        // 时间类型需要 translate
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
    // @ts-ignore
    geometry._xDistance = distance; // 缓存，防止重复计算
  }

  return distance;
}

function getTooltipTitle(originData: Datum, geometry: Geometry) {
  const scales = geometry.scales;
  const positionAttr = geometry.getAttribute('position');
  const fields = positionAttr.getFields();
  const titleScale = scales[fields[0]];

  if (titleScale) {
    return titleScale.getText(originData[titleScale.field]);
  }
  return '';
}

function getAttributesForLegend(geometry: Geometry) {
  const attributes = _.values(geometry.attributes);
  return _.filter(attributes, (attribute: Attribute) => _.contains(GROUP_ATTRS, attribute.type));
}

function getTooltipValueScale(geometry: Geometry) {
  const attributes = getAttributesForLegend(geometry);
  let scale;
  _.each(attributes, (attribute: Attribute) => {
    const tmpScale = attribute.getScale(attribute.type);
    if (tmpScale && tmpScale.isLinear) {
      // 如果指定字段是非 position 的，同时是连续的
      scale = tmpScale;
      return false;
    }
  });

  const xScale = geometry.getXScale();
  const yScale = geometry.getYScale();

  return scale || yScale || xScale;
}

function getTooltipValue(originData: Datum, valueScale: Scale) {
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
function getTooltipName(originData: Datum, geometry: Geometry) {
  let nameScale: Scale;
  const groupScales = geometry.getGroupScales();
  if (groupScales.length) {
    // 如果存在分组类型，取第一个分组类型
    _.each(groupScales, (scale: Scale) => {
      nameScale = scale;
      return false;
    });
  }
  if (nameScale) {
    const field = nameScale.field;
    return nameScale.getText(originData[field]);
  }

  const valueScale = getTooltipValueScale(geometry);
  return getName(valueScale);
}

export function findDataByPoint(point: Point, data: Data, geometry: Geometry) {
  if (data.length === 0) {
    return null;
  }

  const geometryType = geometry.type;
  const xScale = geometry.getXScale();
  const yScale = geometry.getYScale();

  const xField = xScale.field;
  const yField = yScale.field;

  let rst = null;

  // 点图以及热力图采用最小逼近策略查找 point 击中的数据
  if (geometryType === 'point' /* || geometryType === 'heatmap' */) {
    // 将 point 画布坐标转换为原始数据值
    const coordinate = geometry.coordinate;
    const invertPoint = coordinate.invert(point); // 转换成归一化的数据
    const x = xScale.invert(invertPoint.x); // 转换为原始值
    const y = yScale.invert(invertPoint.y); // 转换为原始值

    let min = Infinity;
    _.each(data, (obj: Datum) => {
      const originData = obj[FIELD_ORIGIN];
      const range = (originData[xField] - x) ** 2 + (originData[yField] - y) ** 2;
      if (range < min) {
        min = range;
        rst = obj;
      }
    });

    return rst;
  }

  // 其他 Geometry 类型按照 x 字段数据进行查找
  const first = data[0];
  let last = data[data.length - 1];

  const xValue = getXValueByPoint(point, geometry);
  const firstXValue = first[FIELD_ORIGIN][xField];
  const firstYValue = first[FIELD_ORIGIN][yField];
  const lastXValue = last[FIELD_ORIGIN][xField];
  const isYArray = yScale.isLinear && _.isArray(firstYValue); // 考虑 x 维度相同，y 是数组区间的情况

  // 如果 x 的值是数组
  if (_.isArray(firstXValue)) {
    _.each(data, (record: Datum) => {
      const origin = record[FIELD_ORIGIN];
      // xValue 在 origin[xField] 的数值区间内
      if (xScale.translate(origin[xField][0]) <= xValue && xScale.translate(origin[xField][1]) >= xValue) {
        if (isYArray) {
          // 层叠直方图场景，x 和 y 都是数组区间
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
      rst = filterYValue(rst, point, geometry);
    }
  } else {
    let next;
    if (!xScale.isLinear && xScale.type !== 'timeCat') {
      // x 轴对应的数据为非线性以及非时间类型的数据采用遍历查找
      _.each(data, (record: Datum, index: number) => {
        const origin = record[FIELD_ORIGIN];
        if (snapEqual(origin[xField], xValue, xScale)) {
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
          next = data[index + 1];
        }
      });

      if (_.isArray(rst)) {
        rst = filterYValue(rst, point, geometry);
      }
    } else {
      // x 轴对应的数据为线性以及时间类型，进行二分查找，性能更好
      if (xValue > xScale.translate(lastXValue) || xValue < xScale.translate(firstXValue)) {
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

  const distance = getXDistance(geometry); // 每个分类间的平均间距
  if (!rst && Math.abs(xScale.translate(last[FIELD_ORIGIN][xField]) - xValue) <= distance / 2) {
    rst = last;
  }

  return rst;
}

export function getTooltipItems(data: Datum, geometry: Geometry) {
  const origin = data[FIELD_ORIGIN];
  const tooltipTitle = getTooltipTitle(origin, geometry);
  const tooltipOption = geometry.tooltipOption;
  const { defaultColor } = geometry.theme;
  const items = [];
  let name;
  let value;

  function addItem(itemName, itemValue) {
    if (!_.isNil(itemValue) && itemValue !== '') {
      // 值为 null的时候，忽视
      const item = {
        title: tooltipTitle,
        data: origin, // 原始数据
        name: itemName || tooltipTitle,
        value: itemValue,
        color: data.color || defaultColor,
        marker: true,
      };

      items.push(item);
    }
  }

  if (_.isObject(tooltipOption)) {
    const { fields, callback } = tooltipOption;
    if (callback) {
      // 用户定义了回调函数
      const callbackParams = fields.map((field: string) => {
        return data[FIELD_ORIGIN][field];
      });
      const cfg = callback(...callbackParams);
      const itemCfg = {
        data: data[FIELD_ORIGIN], // 原始数据
        title: tooltipTitle,
        color: data.color || defaultColor,
        marker: true, // 默认展示 marker
        ...cfg,
      };

      items.push(itemCfg);
    } else {
      const scales = geometry.scales;
      _.each(fields, (field: string) => {
        if (!_.isNil(origin[field])) {
          // 字段数据为null, undefined 时不显示
          const scale = scales[field];
          name = getName(scale);
          value = scale.getText(origin[field]);
          addItem(name, value);
        }
      });
    }
  } else {
    const valueScale = getTooltipValueScale(geometry);
    if (!_.isNil(origin[valueScale.field])) {
      // 字段数据为null ,undefined时不显示
      value = getTooltipValue(origin, valueScale);
      name = getTooltipName(origin, geometry);
      addItem(name, value);
    }
  }
  return items;
}
