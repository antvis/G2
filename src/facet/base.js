/**
 * @fileOverview facets of chart
 * @author dxq613@gmail.com
 */

const Global = require('../global');
const Util = require('../util');

const assign = Util.assign;
const isNil = Util.isNil;
const isArray = Util.isArray;
const cloneDeep = Util.cloneDeep;

// 绑定事件
const wrapBehavior = Util.wrapBehavior;

// 获取绑定的事件
const getWrapBehavior = Util.getWrapBehavior;

class Base {

  getDefaultCfg() {
    return {
      chart: null,
      group: null,

      /**
       * 是否默认显示每个分面的title
       * @type {Boolean}
       */
      showTitle: true,

      /**
       * 是否自动修改坐标轴的信息
       * @type {Boolean}
       */
      autoSetAxis: true,

      /**
       * View 的内边框
       * @type {Number|Array}
       */
      padding: 10,

      /**
       * 遍历每个view 的回调函数
       * @type {Function}
       */
      eachView: null,

      /**
       * 分面的字段名列表
       * @type {Array}
       */
      fields: [],

      /**
       * 列值的的标题
       * @type {Object}
       */
      colTitle: {
        offsetY: -15,
        style: {
          fontSize: 14,
          textAlign: 'center',
          fill: '#666',
          fontFamily: Global.fontFamily
        }
      },
      rowTitle: {
        offsetX: 15,
        style: {
          fontSize: 14,
          textAlign: 'center',
          rotate: 90,
          fill: '#666',
          fontFamily: Global.fontFamily
        }
      }
    };
  }

  constructor(cfg) {
    const defaultCfg = this.getDefaultCfg();
    assign(this, defaultCfg, cfg);
    this.init();
  }

  init() {
    if (!this.chart) {
      throw new Error('Facets Error: please specify the chart!');
    }
    this._bindEvent();
    this.initContainer();
    if (this.chart.get('data')) {
      this.initViews();
    }
  }

  initContainer() {
    const chart = this.chart;
    const frontPlot = chart.get('frontPlot');
    const group = frontPlot.addGroup();
    this.group = group;
  }

  initViews() {
    const chart = this.chart;
    const data = chart.get('data');
    const eachView = this.eachView;
    const facets = this.generateFacets(data);
    for (let i = 0; i < facets.length; i++) {
      const facet = facets[i];
      const region = facet.region;
      const view = chart.view({
        start: region.start,
        end: region.end,
        padding: this.padding
      });
      view.source(facet.data);
      this.beforeProcessView(view, facet);
      if (eachView) {
        eachView(view, facet);
      }
      this.afterProcessView(view, facet);
      facet.view = view;
    }
    this.facets = facets;
  }

  /**
   * 处理 view 前
   * @protected
   */
  beforeProcessView(/* view, facet */) {

  }

  /**
   * 处理view
   * @param {Object} view 视图
   * @param {Object} facet 分面信息
   * @protected
   */
  afterProcessView(view, facet) {
    if (this.autoSetAxis) {
      this.processAxis(view, facet);
    }
  }

  processAxis(view, facet) {
    const viewOptions = view.get('options');
    const geoms = view.get('geoms');
    if ((!viewOptions.coord.type || viewOptions.coord.type === 'rect') && geoms.length) {
      const field = geoms[0].get('attrOptions').position.field;
      const fields = isArray(field) ? field : field.split('*').map(function(str) {
        return str.trim();
      });
      const xField = fields[0];
      const yField = fields[1];
      if (isNil(viewOptions.axes)) {
        viewOptions.axes = {};
      }
      const axes = viewOptions.axes;
      if (axes !== false) {
        if (xField && axes[xField] !== false) {
          axes[xField] = axes[xField] || {};
          this.setXAxis(xField, axes, facet);
        }
        if (yField && axes[yField] !== false) {
          axes[yField] = axes[yField] || {};
          this.setYAxis(yField, axes, facet);
        }
      }
    }
  }

  setXAxis(/* xField, axes, facet */) {

  }

  setYAxis(/* yField, axes, facet */) {

  }

  // 默认显示各列的标题
  renderTitle(view, facet) {
    this.drawColTitle(view, facet);
  }

  getScaleText(field, value, view) {
    let rst;
    if (field) {
      const scales = view.get('scales');
      let scale = scales[field];
      if (!scale) {
        scale = view.createScale(field);
      }
      rst = scale.getText(value);
    } else {
      rst = value;
    }
    return rst;

  }
  drawColTitle(view, facet) {
    const text = this.getScaleText(facet.colField, facet.colValue, view);
    const colTextCfg = assign({
      position: [ '50%', '0%' ],
      content: text
    }, this.colTitle);
    view.guide().text(colTextCfg);
  }

  drawRowTitle(view, facet) {
    const text = this.getScaleText(facet.rowField, facet.rowValue, view);
    const rowTextCfg = assign({
      position: [ '100%', '50%' ],
      content: text
    }, cloneDeep(this.rowTitle));

    view.guide().text(rowTextCfg);
  }

  /**
   * 数据过滤器
   * @protected
   * @param {Array} conditions 过滤条件
   * @return {Function} 过滤函数
   */
  getFilter(conditions) {
    const filter = function(obj) {
      let filtered = true;
      conditions.forEach(function(cond) {
        const field = cond.field;
        const value = cond.value;
        // const values = cond.values;
        let tmp = true;
        if (!isNil(value) && field) {
          tmp = obj[field] === value;
        }
        filtered = filtered && tmp;
      });
      return filtered;
    };
    return filter;
  }

  /**
   * 获取字段对应的值
   * @protected
   * @param  {String} field 字段名
   * @param  {Array} data 数据
   * @return {Array} 字段对应的值
   */
  getFieldValues(field, data) {
    const rst = [];
    const tmpMap = {};
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      const value = obj[field];
      if (!isNil(value) && !tmpMap[value]) {
        rst.push(value);
        tmpMap[value] = true;
      }
    }
    return rst;
  }

  getRegion(rows, cols, xIndex, yIndex) {
    const xWidth = 1 / cols; // x轴方向的每个分面的偏移
    const yWidth = 1 / rows; // y轴方向的每个分面的偏移

    const start = {
      x: xWidth * xIndex,
      y: yWidth * yIndex
    };

    const end = {
      x: start.x + xWidth,
      y: start.y + yWidth
    };

    return {
      start,
      end
    };
  }

  /**
   * 生成分面
   * @protected
   * @return {Array} 多个分面集合
   */
  generateFacets(/* data */) {
    return [];
  }

  _bindEvent() {
    const chart = this.chart;
    chart.on('afterchangedata', wrapBehavior(this, 'onDataChange'));
    chart.on('beforeclear', wrapBehavior(this, 'onClear'));
    chart.on('beforedestroy', wrapBehavior(this, 'destroy'));
    chart.on('beforepaint', wrapBehavior(this, 'onPaint'));
    chart.on('setdata', wrapBehavior(this, 'onDataChange'));
  }

  _clearEvent() {
    const chart = this.chart;
    if (chart) {
      chart.off('afterchangedata', getWrapBehavior(this, 'onDataChange'));
      chart.off('beforeclear', getWrapBehavior(this, 'onClear'));
      chart.off('beforedestroy', getWrapBehavior(this, 'destroy'));
      chart.off('beforepaint', getWrapBehavior(this, 'onPaint'));
      chart.off('setdata', getWrapBehavior(this, 'onDataChange'));
    }
  }

  _clearFacets() {
    const facets = this.facets;
    const chart = this.chart;
    if (facets) {
      for (let i = 0; i < facets.length; i++) {
        const facet = facets[i];
        chart.removeView(facet.view);
      }
    }
    this.facets = null;
  }

  onClear() {
    this.onRemove();
  }

  onPaint() {
    if (this.showTitle) {
      const facets = this.facets;
      for (let i = 0; i < facets.length; i++) {
        const facet = facets[i];
        const view = facet.view;
        this.renderTitle(view, facet);
      }
    }
  }

  onDataChange() {
    this._clearFacets();
    this.initViews();
  }

  onRemove() {
    this._clearFacets();
    this._clearEvent();
    this.group && this.group.remove();
    this.chart = null;
    this.facets = null;
    this.group = null;
  }

  destroy() {
    this.onRemove();
    this.destroyed = true;
  }
}

module.exports = Base;
