import { flatten, isString, valuesOfKey } from '@antv/util';
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

export function getDefaultSize(geometry): number {
  const theme = geometry.theme;
  const coordinate = geometry.coordinate;
  const xScale = geometry.getXScale();
  const xValues = xScale.values;
  const dataArray = geometry.beforeMappingData;
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
  if (coordinate.isPolar) {
    if (coordinate.isTransposed && count > 1) {
      // 极坐标下多层环图
      wr = theme.multiplePieWidthRatio;
    } else {
      wr = theme.roseWidthRatio;
    }
  } else {
    if (xScale.isLinear) {
      normalizedSize *= range[1] - range[0];
    }
    wr = theme.columnWidthRatio;
  }
  normalizedSize *= wr;
  if (geometry.getAdjust('dodge')) {
    const dodgeAdjust = geometry.getAdjust('dodge');
    const dodgeBy = dodgeAdjust.dodgeBy;
    const dodgeCount = getDodgeCount(dataArray, dodgeBy);

    normalizedSize = normalizedSize / dodgeCount;
  }

  // 最大和最小限制
  const { maxColumnWidth, minColumnWidth } = theme;
  const xDimensionLength = getXDimensionLength(geometry.coordinate);
  if (maxColumnWidth) {
    const normalizedMaxColumnWidth = maxColumnWidth / xDimensionLength;
    if (normalizedSize > normalizedMaxColumnWidth) {
      normalizedSize = normalizedMaxColumnWidth;
    }
  }

  if (minColumnWidth) {
    const normalizedMinColumnWidth = minColumnWidth / xDimensionLength;
    if (normalizedSize < normalizedMinColumnWidth) {
      normalizedSize = normalizedMinColumnWidth;
    }
  }

  return normalizedSize;
}
