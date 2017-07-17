/**
 * @fileOverview 所有 Geometry 的基类
 * @author dxq613@gmail.com
 */

const Base = require('../base');
const GROUP_ATTRS = [ 'size', 'shape', 'color' ];
const FIELD_ORIGIN = '_origin';
const Attr = require('../attr/index');
const Shape = require('./shape/index');
const Util = require('../util');
const Adjust = require('./adjust/index');
const Global = require('../global');

function parseFields(field) {
  if (Util.isArray(field)) {
    return field;
  }
  if (Util.isString(field)) {
    return field.split('*');
  }
  return [ field ];
}

// 转换成对象的数组 [{type: 'adjust'}]
function parseAdjusts(adjusts) {
  if (Util.isString(adjusts)) {
    adjusts = [ adjusts ];
  }
  Util.each(adjusts, function(adjust, index) {
    if (!Util.isObject(adjust)) {
      adjusts[index] = { type: adjust };
    }
  });
  return adjusts;
}

/**
 * 几何标记
 * @class Geom
 */
class GeomBase extends Base {

  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    return {
      /**
       * 标记 Id 用于区分执行动画
       * @type {String}
       */
      id: '',
      /**
       * 类型
       * @type {String}
       */
      type: 'base',

      /**
       * 坐标系
       * @type {Object}
       */
      coord: null,

      /**
       * 属性映射集
       * @protected
       * @type {Object}
       */
      attrs: {},

      /**
       * 所属的View
       * @type {View}
       */
      view: null,

      /**
       * 几何标记显示的数据
       * @type {Array}
       */
      data: [],

      /**
       * 相关的度量
       * @type {Object}
       */
      scales: {},

      /**
       * 绘图容器
       * @type {Object}
       */
      container: null,

      /**
       * 几何标记的一些配置项，用于延迟生成图表
       * @type {Object}
       */
      attrOptions: {

      },
      styleOptions: null,
      selectedOptions: null,
      adjusts: null,
      /**
       * 使用形状的类型
       * @protected
       * @type {String}
       */
      shapeType: null,
      /**
       * 是否生成多个点来绘制图形
       * @protected
       * @type {Boolean}
       */
      generatePoints: false,

      /**
       * 数据是否进行排序
       * @type {Boolean}
       */
      sortable: false
    };
  }

  _createScale(field) {
    const scales = this.get('scales');
    let scale = scales[field];
    if (!scale) {
      scale = this.get('view').createScale(field);
      scales[field] = scale;
    }
    return scale;
  }

  _setAttrOptions(attrName, attrCfg) {
    const options = this.get('attrOptions');
    options[attrName] = attrCfg;
  }
  _createAttrOption(attrName, field, cfg, defaultValues) {
    const attrCfg = {};
    attrCfg.field = field;
    if (cfg) {
      if (Util.isFunction(cfg)) {
        attrCfg.callback = cfg;
      } else {
        attrCfg.values = cfg;
      }
    } else {
      attrCfg.values = defaultValues;
    }
    this._setAttrOptions(attrName, attrCfg);
  }

  /**
   * 位置属性映射
   * @chainable
   * @param  {String} field 字段名
   * @param  {String|Array|Object} cfg 配置项
   * @return {Geom} geom 当前几何标记
   */
  position(field, cfg) {
    if (Util.isString(cfg) || Util.isArray(cfg)) {
      this.set('adjusts', parseAdjusts(cfg));
    }
    if (Util.isObject(cfg) && cfg.adjusts) {
      this.set('adjusts', parseAdjusts(cfg.adjusts));
    }
    this._setAttrOptions('position', {
      field
    });
    return this;
  }

  /**
   * 颜色属性映射
   * @chainable
   * @param  {String} field 字段名
   * @param  {Array|Function} values 颜色的数组或者回调函数
   * @return {Geom} geom 当前几何标记
   */
  color(field, values) {
    this._createAttrOption('color', field, values, Global.colors);
    return this;
  }

  /**
   * 大小属性映射
   * @chainable
   * @param  {String} field 字段名
   * @param  {Array|Function} values 大小的数组或者回调函数
   * @return {Geom} geom 当前几何标记
   */
  size(field, values) {
    this._createAttrOption('size', field, values, Global.sizes);
    return this;
  }

  /**
   * 形状属性映射
   * @chainable
   * @param  {String} field 字段名
   * @param  {Array|Function} values 大小的数组或者回调函数
   * @return {Geom} geom 当前几何标记
   */
  shape(field, values) {
    const type = this.get('type');
    const shapes = Global.shapes[type] || [];
    this._createAttrOption('shape', field, values, shapes);
    return this;
  }

  /**
   * 透明度属性映射
   * @chainable
   * @param  {String} field 字段名
   * @param  {Array|Function} values 透明度的数组或者回调函数
   * @return {Geom} geom 当前几何标记
   */
  opacity(field, values) {
    this._createAttrOption('opacity', field, values, Global.opacities);
    return this;
  }


  style(field, cfg) {
    let styleOptions = this.get('styleOptions');
    if (!styleOptions) {
      styleOptions = {};
      this.set('styleOptions', styleOptions);
    }
    if (Util.isObject(field)) {
      cfg = field;
      field = null;
    }
    let fields;
    if (field) {
      fields = parseFields(field);
    }
    styleOptions.fields = fields;
    styleOptions.style = cfg;
  }

  label(/* field, cfg */) {

  }

  hasAdjust(adjustType) {
    const self = this;
    const adjusts = self.get('adjusts');
    if (!adjustType) {
      return !!adjusts;
    }
    let rst = false;
    Util.each(adjusts, function(adjust) {
      if (adjust.type === adjustType) {
        rst = true;
        return false;
      }
    });
    return rst;
  }

  isInCircle() {
    const coord = this.get('coord');
    return coord && coord.isPolar;
  }

  init() {
    this._initAttrs();
    const dataArray = this._processData();
    if (this.get('adjusts')) {
      this._adjust(dataArray);
    }
    this.set('dataArray', dataArray);
  }
  // step 1: init attrs
  _initAttrs() {
    const self = this;
    const attrs = this.get('attrs');
    const attrOptions = this.get('attrOptions');
    Util.each(attrOptions, function(option, type) {
      const className = Util.upperFirst(type);
      const fields = parseFields(option.field);
      const scales = [];
      Util.each(fields, function(field) {
        const scale = self._createScale(field);
        scales.push(scale);
      });
      option.scales = scales;
      if (type === 'position') {
        option.coord = self.get('coord');
      }
      const attr = new Attr[className](option);
      attrs[type] = attr;
    });
  }
  // step 2: 处理数据
  _processData() {
    const self = this;
    const data = this.get('data');
    const dataArray = [];
    const groupedArray = this._groupData(data);
    Util.each(groupedArray, function(subData) {
      const tempData = self._saveOrigin(subData);
      self._numberic(tempData);
      dataArray.push(tempData);
    });

    return dataArray;
  }

  // step 2.1 数据分组
  _groupData(data) {
    const groupScales = this._getGroupScales();
    const fields = groupScales.map(function(scale) {
      return scale.field;
    });

    return Util.Array.group(data, fields);
  }

  // step 2.2 数据调整前保存原始数据
  _saveOrigin(data) {
    const rst = [];
    for (let i = 0; i < data.length; i++) {
      const origin = data[i];
      const obj = Util.mix({}, origin);
      obj[FIELD_ORIGIN] = origin;
      rst.push(obj);
    }
    return rst;
  }

  // step 2.3 将分类数据翻译成数据, 仅对位置相关的度量进行数字化处理
  _numberic(data) {
    const positionAttr = this.getAttr('position');
    const scales = positionAttr.scales;
    Util.each(data, function(obj) {
      for (let i = 0; i < 2; i++) {
        const scale = scales[i];
        if (scale.isCategory) {
          const field = scale.field;
          obj[field] = scale.translate(obj[field]);
        }
      }
    });
  }

  _getGroupScales() {
    const self = this;
    let scales = self.get('groupScales');
    if (!scales) {
      scales = [];
      const attrs = self.get('attrs');
      Util.each(attrs, function(attr) {
        if (GROUP_ATTRS.indexOf(attr.type) !== -1) {
          const attrScales = attr.scales;
          Util.each(attrScales, function(scale) {
            if (scale.isCategory && Util.indexOf(scales, scale) === -1) {
              scales.push(scale);
            }
          });
        }
      });
      self.set('groupScales', scales);
    }
    return scales;
  }

  _updateStackRange(field, scale, dataArray) {
    const mergeArray = Util.Array.merge(dataArray);
    let min = scale.min;
    let max = scale.max;
    for (let i = 0; i < mergeArray.length; i++) {
      const obj = mergeArray[i];
      const tmpMin = Math.min.apply(obj[field]);
      const tmpMax = Math.max.apply(obj[field]);
      if (tmpMin < min) {
        min = tmpMin;
      }
      if (tmpMax > max) {
        max = tmpMax;
      }
    }
    if (min < scale.min || max > scale.max) {
      scale.change({
        min,
        max
      });
    }
  }

  // step 2.2 调整数据
  _adjust(dataArray) {
    const self = this;
    const adjusts = self.get('adjusts');

    const yScale = self.getYScale();
    const xScale = self.getXScale();
    const xField = xScale.field;
    const yField = yScale ? yScale.field : null;
    Util.each(adjusts, function(adjust) {
      const adjustCfg = Util.mix({
        xField,
        yField
      }, adjust);
      const adjustType = Util.upperFirst(adjust.type);
      if (adjustType === 'Dodge') {
        const adjustNames = [];
        if (xScale.isCategory) {
          adjustNames.push('x');
        } else if (!yScale) {
          adjustNames.push('y');
        } else {
          throw new Error('dodge is not support linear attribute, please use category attribute!');
        }
        adjustCfg.adjustNames = adjustNames;
        /* if (self.isInCircle()) {
          adjustCfg.dodgeRatio = 1;
          adjustCfg.marginRatio = 0;
        }*/
      } else if (adjustType === 'Stack') {
        const coord = self.get('coord');
        if (!yScale) {
          // 一维的情况下获取高度和默认size
          adjustCfg.height = coord.getHeight();
          const size = self.getDefaultValue('size') || 3;
          adjustCfg.size = size;
        }
        if (!coord.isTransposed) {
          adjustCfg.reverseOrder = true;
        }
      }
      const adjustElement = new Adjust[adjustType](adjustCfg);
      adjustElement.processAdjust(dataArray);
      if (adjustType === 'Stack' && yScale) {
        self._updateStackRange(yField, yScale, dataArray);
      }
    });
  }

  /**
   * @internal 设置coord，通常外部容器变化时，coord 会发生变化
   * @param {Object} coord 坐标系
   */
  setCoord(coord) {
    this.set('coord', coord);
    const position = this.getAttr('position');
    if (position) {
      position.coord = coord;
    }
  }

  // step 3 绘制
  paint() {
    const self = this;
    const dataArray = self.get('dataArray');
    const mappedArray = [];
    Util.each(dataArray, function(data) {
      self._beforeMapping(data);
      data = self._mapping(data);
      mappedArray.push(data);
      self.draw(data);
    });
    self.set('dataArray', mappedArray);
  }

  // step 3.1 before mapping
  _beforeMapping(data) {
    if (this.get('sortable')) {
      const xScale = this.getXScale();
      const field = xScale.field;
      data.sort(function(v1, v2) {
        return v1[field] - v2[field];
      });
    }

    if (this.get('generatePoints')) {
      this._generatePoints(data);
    }
  }

  /**
   * @protected
   * 获取图形的工厂类
   * @return {Object} 工厂类对象
   */
  getShapeFactory() {
    let shapeFactory = this.get('shapeFactory');
    if (!shapeFactory) {
      const shapeType = this.get('shapeType');
      shapeFactory = Shape.getShapeFactory(shapeType);
      this.set('shapeFactory', shapeFactory);
    }
    return shapeFactory;
  }

  // step 3.2 generate points
  _generatePoints(data) {
    const self = this;
    const shapeFactory = self.getShapeFactory();
    const shapeAttr = self.getAttr('shape');
    Util.each(data, function(obj) {
      const cfg = self.createShapePointsCfg(obj);
      const shape = shapeAttr ? self._getAttrValues(shapeAttr, obj) : null;
      const points = shapeFactory.getShapePoints(shape, cfg);
      obj.points = points;
    });
  }

  /**
   * 获取图形对应点的配置项
   * @protected
   * @param  {Object} obj 数据对象
   * @return {Object} cfg 获取图形对应点的配置项
   */
  createShapePointsCfg(obj) {
    const xScale = this.getXScale();
    const yScale = this.getYScale();
    const x = this._normalizeValues(obj[xScale.field], xScale);
    let y; // 存在没有 y 的情况

    if (yScale) {
      y = this._normalizeValues(obj[yScale.field], yScale);
    } else {
      y = obj.y ? obj.y : 0.1;
    }

    return {
      x,
      y,
      y0: yScale ? yScale.scale(this.getYMinValue()) : undefined
    };
  }

  /**
   * @protected
   * 如果y轴的最小值小于0则返回0，否则返回最小值
   * @return {Number} y轴上的最小值
   */
  getYMinValue() {
    const yScale = this.getYScale();
    const min = yScale.min;
    let value;
    if (min >= 0) {
      value = min;
    } else {
      value = 0;
    }
    return value;
  }

  // 将数据归一化
  _normalizeValues(values, scale) {
    let rst = [];
    if (Util.isArray(values)) {
      Util.each(values, function(v) {
        rst.push(scale.scale(v));
      });
    } else {
      rst = scale.scale(values);
    }
    return rst;
  }

  // step 3.2 mapping
  _mapping(data) {
    const self = this;
    const attrs = self.get('attrs');
    const mappedData = [];

    Util.each(data, function(record) {
      const newRecord = {};
      newRecord[FIELD_ORIGIN] = record[FIELD_ORIGIN];
      newRecord.points = record.points;
      Util.each(attrs, function(attr) {
        const names = attr.names;
        const values = self._getAttrValues(attr, record);
        Util.each(values, function(val, index) {
          const name = names[index];
          newRecord[name] = (Util.isArray(val) && val.length === 1) ? val[0] : val; // 只有一个值时返回第一个属性值
        });
      });
      mappedData.push(newRecord);
    });

    return mappedData;
  }

  // 获取属性映射的值
  _getAttrValues(attr, record) {
    const scales = attr.scales;
    const params = [];
    Util.each(scales, function(scale) {
      const field = scale.field;
      if (scale.type === 'identity') {
        params.push(scale.value);
      } else {
        params.push(record[field]);
      }
    });
    const values = attr.mapping(...params);
    return values;
  }

  getAttrValue(attrName, record) {
    const attr = this.getAttr(attrName);
    let rst = null;
    if (attr) {
      const values = this._getAttrValues(attr, record);
      rst = values[0];
    }
    return rst;
  }

  /**
   * step 3.3 draw
   * @protected
   * @param  {Array} data 绘制图形
   */
  draw(data) {
    const self = this;
    const shapeFactory = self.getShapeFactory();
    shapeFactory.setCoord(self.get('coord'));
    const container = self.get('container');
    Util.each(data, function(obj) {
      self.drawPoint(obj, container, shapeFactory);
    });
  }

  getCallbackCfg(fields, cfg, origin) {
    if (!fields) {
      return cfg;
    }
    const tmpCfg = {};
    const params = fields.map(function(field) {
      return origin[field];
    });
    Util.each(cfg, function(v, k) {
      if (Util.isFunction(v)) {
        tmpCfg[k] = v.apply(null, params);
      } else {
        tmpCfg[k] = v;
      }
    });
    return tmpCfg;
  }

  getDrawCfg(obj) {
    const self = this;
    const cfg = {
      origin: obj,
      x: obj.x,
      y: obj.y,
      color: obj.color,
      size: obj.size,
      shape: obj.shape,
      isInCircle: self.isInCircle(),
      opacity: obj.opacity
    };
    const styleOptions = self.get('styleOptions');
    if (styleOptions && styleOptions.style) {
      cfg.style = self.getCallbackCfg(styleOptions.fields, styleOptions.style, obj[FIELD_ORIGIN]);
    }
    if (this.get('generatePoints')) {
      cfg.points = obj.points;
    }
    return cfg;
  }

  drawPoint(obj, container, shapeFactory) {
    const shape = obj.shape;
    const cfg = this.getDrawCfg(obj);
    shapeFactory.drawShape(shape, cfg, container);
  }

  /**
   * 获取属性
   * @protected
   * @param {String} name 属性名
   * @return {Scale} 度量
   */
  getAttr(name) {
    return this.get('attrs')[name];
  }

  /**
   * 获取 x 对应的度量
   * @return {Scale} x 对应的度量
   */
  getXScale() {
    return this.getAttr('position').scales[0];
  }

  /**
   * 获取 y 对应的度量
   * @return {Scale} y 对应的度量
   */
  getYScale() {
    return this.getAttr('position').scales[1];
  }

  getAttrsForLegend() {
    const attrs = this.get('attrs');
    const rst = [];

    Util.each(attrs, attr => {
      if (GROUP_ATTRS.indexOf(attr.type) !== -1) {
        rst.push(attr);
      }
    });

    return rst;
  }

  reset() {
    this.set('attrOptions', {});
    this._clearInner();
  }

  _clearInner() {
    const container = this.get('container');
    container && container.clear();
    this.set('attrs', {});
    this.set('groupScales', null);
    this.set('adjusts', null);
    this.set('styleOptions', null);
  }

  clear() {
    this._clearInner();
    this.set('scales', {});
  }

  destroy() {
    this.clear();
    super.destroy();
  }
}

module.exports = GeomBase;
