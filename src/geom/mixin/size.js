/**
 * @fileOverview 需要计算所占x轴上的宽度的辅助类
 * @author sima.zhang1990@gmail.com
 * @author dxq613@gmail.com
 */

const Global = require('../../global');
const Util = require('../../util');

// 已经排序后的数据查找距离最小的
function findMinDistance(arr, scale) {
  const count = arr.length;
  // 日期类型的 values 经常上文本类型，所以需要转换一下
  if (Util.isString(arr[0])) {
    arr = arr.map(function(v) {
      return scale.translate(v);
    });
  }
  let distance = arr[1] - arr[0];
  for (let i = 2; i < count; i++) {
    const tmp = arr[i] - arr[i - 1];
    if (distance > tmp) {
      distance = tmp;
    }
  }
  return distance;
}

const SizeMixin = {
  getDefalutSize() {
    let defaultSize = this.get('defaultSize');
    if (!defaultSize) {
      const coord = this.get('coord');
      const xScale = this.getXScale();
      const xValues = xScale.values;
      const dataArray = this.get('dataArray');
      let count;
      if (xScale.isLinear && xValues.length > 1) {
        xValues.sort();
        const interval = findMinDistance(xValues, xScale);
        count = (xScale.max - xScale.min) / interval;
        if (xValues.length > count) {
          count = xValues.length;
        }
      } else {
        count = xValues.length;
      }
      const range = xScale.range;
      let normalizeSize = 1 / count;
      let widthRatio = 1;

      if (this.isInCircle()) {
        if (coord.isTransposed && count > 1) { // 极坐标下多层环图
          widthRatio = Global.widthRatio.multiplePie;
        } else {
          widthRatio = Global.widthRatio.rose;
        }
        /* if (dataArray.length > 1) {
          normalizeSize *= (range[1] - range[0]);
        } */
      } else {
        if (xScale.isLinear) {
          normalizeSize *= (range[1] - range[0]);
        }
        widthRatio = Global.widthRatio.column; // 柱状图要除以2
      }
      normalizeSize *= widthRatio;
      if (this.hasAdjust('dodge')) {
        const dodgeCount = this._getDodgeCount(dataArray);
        normalizeSize = normalizeSize / dodgeCount;
      }
      defaultSize = normalizeSize;
      this.set('defaultSize', defaultSize);
    }
    return defaultSize;
  },
  _getDodgeCount(dataArray) {
    const adjusts = this.get('adjusts');
    let dodgeBy;
    let count = dataArray.length;
    Util.each(adjusts, function(adjust) {
      if (adjust.type === 'dodge') {
        dodgeBy = adjust.dodgeBy;
      }
    });

    if (dodgeBy) {
      const mergeData = Util.Array.merge(dataArray);
      const values = Util.Array.values(mergeData, dodgeBy);
      count = values.length;
    }

    return count;
  },
  getDimWidth(dimName) {
    const coord = this.get('coord');
    const start = coord.convertPoint({
      x: 0,
      y: 0
    });
    const end = coord.convertPoint({
      x: dimName === 'x' ? 1 : 0,
      y: dimName === 'x' ? 0 : 1
    });
    let width = 0;
    if (start && end) {
      width = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
    }
    return width;
  },
  _getWidth() {
    const coord = this.get('coord');
    let width; // x轴的长度
    if (this.isInCircle() && !coord.isTransposed) { // 极坐标下 width 为弧长
      width = (coord.endAngle - coord.startAngle) * coord.radius;
    } else {
      width = this.getDimWidth('x'); // 不需要判断transpose
    }
    return width;
  },
  _toNormalizedSize(size) {
    const width = this._getWidth();
    return size / width;
  },
  _toCoordSize(normalizeSize) {
    const width = this._getWidth();
    return width * normalizeSize;
  },
  getNormalizedSize(obj) {
    let size = this.getAttrValue('size', obj);
    if (Util.isNil(size)) {
      size = this.getDefalutSize();
    } else {
      size = this._toNormalizedSize(size);
    }
    return size;
  },
  getSize(obj) {
    let size = this.getAttrValue('size', obj);
    if (Util.isNil(size)) {
      const normalizeSize = this.getDefalutSize();
      size = this._toCoordSize(normalizeSize);
    }
    return size;
  }
};

module.exports = SizeMixin;
