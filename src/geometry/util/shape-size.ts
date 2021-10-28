import { flatten, isString, valuesOfKey, isNil } from '@antv/util';
import { getXDimensionLength } from '../../util/coordinate';

// 已经排序后的数据查找距离最小的
function findMinDistance(arr, scale) {
  const count = arr.length;
  let sourceArr = arr;
  if (isString(sourceArr[0])) {
    // 日期类型的 values 经常上文本类型，所以需要转换一下
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

function getDodgeCount(dataArray, dodgeBy) {
  if (dodgeBy) {
    const mergeData = flatten(dataArray);
    const values = valuesOfKey(mergeData, dodgeBy);
    return values.length;
  }

  return dataArray.length;
}

/** @ignore */
export function getDefaultSize(geometry): number {
  const theme = geometry.theme;
  const coordinate = geometry.coordinate;
  const xScale = geometry.getXScale();
  const xValues = xScale.values;
  const dataArray = geometry.beforeMappingData;
  let count: number = xValues.length;
  const xDimensionLength = getXDimensionLength(geometry.coordinate);
  // 获取柱宽相关配置项
  const { intervalPadding, dodgePadding } = geometry;
  // 兼容theme配置
  const maxColumnWidth = geometry.maxColumnWidth || theme.maxColumnWidth;
  const minColumnWidth = geometry.minColumnWidth || theme.minColumnWidth;
  const columnWidthRatio = geometry.columnWidthRatio || theme.columnWidthRatio;
  const multiplePieWidthRatio = geometry.multiplePieWidthRatio || theme.multiplePieWidthRatio;
  const roseWidthRatio = geometry.roseWidthRatio || theme.roseWidthRatio;

  // 线性情况下count值
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
  if (coordinate.isPolar) {
    // 极坐标场景
    if (coordinate.isTransposed && count > 1) {
      // 极坐标下多层环图
      wr = multiplePieWidthRatio;
    } else {
      wr = roseWidthRatio;
    }
  } else {
    // 非极坐标场景
    if (xScale.isLinear) {
      normalizedSize *= range[1] - range[0];
    }
    wr = columnWidthRatio;
  }

  // 基础柱状图
  if (!isNil(intervalPadding) && intervalPadding >= 0) {
    // 配置组间距情况
    const normalizedIntervalPadding = intervalPadding / xDimensionLength;
    normalizedSize = (1 - (count - 1) * normalizedIntervalPadding) / count;
  } else {
    // 默认情况
    normalizedSize *= wr;
  }
  // 分组柱状图
  if (geometry.getAdjust('dodge')) {
    const dodgeAdjust = geometry.getAdjust('dodge');
    const dodgeBy = dodgeAdjust.dodgeBy;
    const dodgeCount = getDodgeCount(dataArray, dodgeBy);
    if (!isNil(dodgePadding) && dodgePadding >= 0) {
      // 仅配置组内间距情况
      const normalizedDodgePadding = dodgePadding / xDimensionLength;
      normalizedSize = (normalizedSize - normalizedDodgePadding * (dodgeCount - 1)) / dodgeCount;
    } else if (!isNil(intervalPadding) && intervalPadding >= 0) {
      // 设置组间距但未设置组内间距情况，避免组间距过小导致图形重叠，需乘以wr
      normalizedSize *= wr;
      normalizedSize = normalizedSize / dodgeCount;
    } else {
      // 组间距和组内间距均未配置
      normalizedSize = normalizedSize / dodgeCount;
    }
    normalizedSize = normalizedSize >= 0 ? normalizedSize : 0;
  }

  // 最大和最小限制
  if (!isNil(maxColumnWidth) && maxColumnWidth >= 0) {
    const normalizedMaxColumnWidth = maxColumnWidth / xDimensionLength;
    if (normalizedSize > normalizedMaxColumnWidth) {
      normalizedSize = normalizedMaxColumnWidth;
    }
  }

  // minColumnWidth可能设置为0
  if (!isNil(minColumnWidth) && minColumnWidth >= 0) {
    const normalizedMinColumnWidth = minColumnWidth / xDimensionLength;
    if (normalizedSize < normalizedMinColumnWidth) {
      normalizedSize = normalizedMinColumnWidth;
    }
  }

  return normalizedSize;
}
