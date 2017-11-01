/**
 * @fileOverview the base class of guide
 * @author sima.zhang
 */
const Util = require('../../util');
const KEYWORDS = [ 'min', 'max', 'median' ];

function getFirstScale(scales) {
  let firstScale;
  Util.each(scales, scale => {
    if (scale) {
      firstScale = scale;
      return false;
    }
  });
  return firstScale;
}

class Base {
  getDefaultCfg() {
    return {
      zIndex: 1,
      xScales: null,
      yScales: null,
      el: null
    };
  }

  constructor(cfg) {
    const defaultCfg = this.getDefaultCfg();
    cfg = Util.deepMix({}, defaultCfg, cfg);
    Util.mix(this, cfg);
  }

  /**
   * 将原始数值归一化
   * @param  {string | number} val   原始值
   * @param  {Scale} scale 度量对象
   * @return {Number}       返回归一化后的数值
   */
  _getNormalizedValue(val, scale) {
    let result;
    if (Util.indexOf(KEYWORDS, val) !== -1) { // 分类则对应索引值
      let scaleValue;
      if (val === 'median') {
        scaleValue = scale.isCategory ? (scale.values.length - 1) / 2 : (scale.min + scale.max) / 2;
        result = scale.scale(scaleValue);
      } else {
        if (scale.isCategory) {
          scaleValue = (val === 'min') ? 0 : (scale.values.length - 1);
        } else {
          scaleValue = scale[val];
        }
        result = scale.scale(scaleValue);
      }
    } else {
      result = scale.scale(val);
    }

    return result;
  }

  /**
   * 将原始数值转换成坐标系上的点
   * @protected
   * @param  {Coord} coord  坐标系
   * @param  {Object | Array | Function} position 位置点
   * @return {Object} 转换成坐标系上的点
   */
  parsePoint(coord, position) {
    const self = this;
    const xScales = self.xScales;
    const yScales = self.yScales;
    if (Util.isFunction(position)) {
      position = position(xScales, yScales); // position 必须是对象
    }

    let x;
    let y;

    // 如果数据格式是 ['50%', '50%'] 的格式
    if (Util.isArray(position) && Util.isString(position[0]) && position[0].indexOf('%') !== -1) {
      return this.parsePercentPoint(coord, position);
    }

    if (Util.isArray(position)) { // 数组  [2, 1]
      x = self._getNormalizedValue(position[0], getFirstScale(xScales));
      y = self._getNormalizedValue(position[1], getFirstScale(yScales));
    } else {
      for (const field in position) {
        const value = position[field];
        if (xScales[field]) {
          x = self._getNormalizedValue(value, xScales[field]);
        }

        if (yScales[field]) {
          y = self._getNormalizedValue(value, yScales[field]);
        }
      }
    }

    if (!Util.isNil(x) && !Util.isNil(y)) {
      return coord.convert({
        x,
        y
      });
    }
  }
  // 如果传入的值是百分比的格式，根据坐标系的起始点和宽高计算
  parsePercentPoint(coord, position) {
    const xPercent = parseFloat(position[0]) / 100;
    const yPercent = parseFloat(position[1]) / 100;
    const start = coord.start;
    const end = coord.end;
    const topLeft = {
      x: Math.min(start.x, end.x),
      y: Math.min(start.y, end.y)
    };
    const x = coord.width * xPercent + topLeft.x;
    const y = coord.height * yPercent + topLeft.y;
    return {
      x,
      y
    };
  }

  /**
   * 设置显示、隐藏
   * @param {Boolean} visible 是否可见
   */
  setVisible(visible) {
    const el = this.el;
    if (el) {
      if (el.set) {
        el.set('visible', visible);
      } else {
        el.style.display = visible ? '' : 'none';
      }
    }
  }

  /**
   * 渲染辅助元素
   * @override
   */
  render() {}

  /**
   * 清理图形、元素
   */
  remove() {
    const self = this;
    const el = self.el;
    if (el) {
      el.remove();
    }
  }
}

module.exports = Base;
