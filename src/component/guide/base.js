const Util = require('../../util');
const KEYWORDS = [ 'min', 'max', 'median' ];

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
    Util.defaultsDeep(cfg, defaultCfg);
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
    if (Util.indexOf(KEYWORDS, val) !== -1) {
      if (val === 'median') {
        result = scale.scale((scale.min + scale.max) / 2);
      } else {
        result = scale.scale(scale[val]);
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
   * @param  {Object} position 点的数组 {xField: 'a', yField: 'b'}
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
    for (const field in position) {
      const value = position[field];
      if (Util.has(xScales, field)) {
        x = self._getNormalizedValue(value, xScales[field]);
      }

      if (Util.has(yScales, field)) {
        y = self._getNormalizedValue(value, yScales[field]);
      }
    }

    if (!Util.isNil(x) && !Util.isNil(y)) {
      return coord.convert({
        x,
        y
      });
    }
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
