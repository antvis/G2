/**
 * @fileOverview 所有 Geometry 的基类
 * @author dxq613@gmail.com
 */

const Base = require('../base');

class GeomBase extends Base {

  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    return {
      /**
       * 类型
       * @type {String}
       */
      type: null,

      /**
       * 坐标系
       * @type {Object}
       */
      coord: null,

      /**
       * 属性映射集
       * @protected
       * @type {Array}
       */
      attrs: [],

      scales: {},
      /**
       * 绘图容器
       * @type {Object}
       */
      container: null

    };
  }

  position() {

  }

  color() {

  }

  size() {

  }

  shape() {

  }

  opacity() {

  }

  paint() {

  }
}

module.exports = GeomBase;
