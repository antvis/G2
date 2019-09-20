import * as Util from '@antv/util';

// 已经排序后的数据查找距离最小的
function findMinDistance(arr, scale) {
  const count = arr.length;
  let sourceArr = arr;
  if (Util.isString(sourceArr[0])) {
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

function getDodgeCount(dataArray, adjustOption) {
  let dodgeBy;
  Util.each(adjustOption, (opt) => {
    if (opt.type === 'dodge') {
      dodgeBy = opt.dodgeBy;
      return false;
    }
  });

  if (dodgeBy) {
    const mergeData = Util.flatten(dataArray);
    const values = Util.valuesOfKey(mergeData, dodgeBy);
    return values.length;
  }

  return dataArray.length;
}

export function getDefaultSize(geometry): number {
  // TODO: @simaq 重命名
  const widthRatio = geometry.theme.widthRatio;
  const coordinate = geometry.coord;
  const xScale = geometry.getXScale();
  const xValues = xScale.values;
  const dataArray = geometry.dataArray;
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
      wr = widthRatio.multiplePie;
    } else {
      wr = widthRatio.rose;
    }
  } else {
    if (xScale.isLinear) {
      normalizedSize *= range[1] - range[0];
    }
    wr = widthRatio.column; // 柱状图要除以2
  }
  normalizedSize *= wr;
  if (geometry.hasAdjust('dodge')) {
    const dodgeCount = getDodgeCount(dataArray, geometry.adjustOption);
    normalizedSize = normalizedSize / dodgeCount;
  }

  return normalizedSize;
}
