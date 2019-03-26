/**
 * @fileOverview 所有 Geometry 的基类
 * @author dxq613@gmail.com
 */
const Attr = require('@antv/attr/lib');
const Adjust = require('@antv/adjust/lib');
const Base = require('../base');
const Util = require('../util');
const Global = require('../global');
const Labels = require('./label/index');
const Shape = require('./shape/shape');
const TooltipMixin = require('./mixin/tooltip');
const ActiveMixin = require('./mixin/active');
const SelectMixin = require('./mixin/select');
const parseFields = require('./util/parse-fields');

const GROUP_ATTRS = [ 'color', 'shape', 'size' ];
const FIELD_ORIGIN = '_origin';

// 转换成对象的数组 [{type: 'adjust'}]
function parseAdjusts(adjusts) {
  // 如果是字符串或者对象转换成数组
  if (Util.isString(adjusts) || Util.isPlainObject(adjusts)) {
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
       * 标记 _id 用于区分执行动画
       * @type {String}
       */
      _id: null,
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
       * 文本容器
       * @type {Object}
       */
      labelContainer: null,

      /**
       * 图形容器
       * @type {Object}
       */
      shapeContainer: null,

      /**
       * 几何标记的一些配置项，用于延迟生成图表
       * @type {Object}
       */
      attrOptions: {

      },
      // 样式配置项
      styleOptions: null,
      // 选中时的配置项
      selectedOptions: null,
      // active 时的配置项
      activedOptions: null,
      /**
       * 某些类存在默认的adjust，不能更改 adjust
       * @type {Boolean}
       */
      hasDefaultAdjust: false,
      // 数据调整类型
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
      sortable: false,

      labelCfg: null,
      /**
       * 是否共享 tooltip
       * @type {Boolean}
       */
      shareTooltip: true,
      tooltipCfg: null,
      /**
       * 是否执行动画，默认执行
       * @type {Boolean}
       */
      animate: true,
      /**
       * 动画配置
       * @type {[type]}
       */
      animateCfg: null,
      visible: true
    };
  }

  constructor(cfg) {
    super(cfg);
    this.viewTheme = this.get('viewTheme');
    Util.assign(this, TooltipMixin, ActiveMixin, SelectMixin);
    if (this.get('container')) {
      this._initContainer();
    }
    this._initOptions();
  }

  // 初始化时对配置项的格式化
  _initOptions() {
    let adjusts = this.get('adjusts');
    if (adjusts) {
      adjusts = parseAdjusts(adjusts);
      this.set('adjusts', adjusts);
    }
  }

  _createScale(field, data) {
    const scales = this.get('scales');
    let scale = scales[field];
    if (!scale) {
      scale = this.get('view').createScale(field, data);
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
    } else if (attrName !== 'color') {
      attrCfg.values = defaultValues;
    }
    this._setAttrOptions(attrName, attrCfg);
  }

  /**
   * 位置属性映射
   * @chainable
   * @param  {String} field 字段名
   * @return {Geom} geom 当前几何标记
   */
  position(field) {
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
    const viewTheme = this.viewTheme || Global;
    this._createAttrOption('color', field, values, viewTheme.colors);
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
    const viewTheme = this.viewTheme || Global;
    this._createAttrOption('size', field, values, viewTheme.sizes);
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
    const viewTheme = this.viewTheme || Global;
    const type = this.get('type');
    const shapes = viewTheme.shapes[type] || [];
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
    const viewTheme = this.viewTheme || Global;
    this._createAttrOption('opacity', field, values, viewTheme.opacities);
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
    return this;
  }

  label(field, callback, cfg) {
    const self = this;
    let labelCfg = self.get('labelCfg');
    // const scales = Util.map(self.get('labelCfg').fields, field => self._createScale(field));
    if (!labelCfg) {
      labelCfg = {};
      self.set('labelCfg', labelCfg);
    }
    let fields;
    if (field) {
      fields = parseFields(field);
    }
    labelCfg.fields = fields;
    // 如果存在回调函数
    if (Util.isFunction(callback)) {
      if (!cfg) {
        cfg = {};
      }
      labelCfg.callback = callback;
    } else if (Util.isObject(callback)) { // 如果没有设置回调函数
      cfg = callback;
    }
    labelCfg.globalCfg = cfg;
    return this;
  }

  tooltip(field, cfg) {
    let tooltipCfg = this.get('tooltipCfg');
    if (!tooltipCfg) {
      tooltipCfg = {};
    }
    if (field === false) { // geom 关闭 tooltip
      this.set('tooltipCfg', false);
    } else {
      let tooltipFields;
      if (field) {
        tooltipFields = parseFields(field);
      }
      tooltipCfg.fields = tooltipFields;
      tooltipCfg.cfg = cfg;
    }

    this.set('tooltipCfg', tooltipCfg);
    return this;
  }

  animate(cfg) {
    this.set('animateCfg', cfg);
    return this;
  }

  /**
   * 是否允许使用默认的图形激活交互
   * @param  {Boolean} enable 是否允许激活开关
   * @param {Object} cfg 激活的配置项
   * @return {Geom}    返回 geom 自身
   */
  active(enable, cfg) {
    if (enable === false) {
      this.set('allowActive', false);
    } else if (Util.isObject(enable)) {
      this.set('allowActive', true);
      this.set('activedOptions', enable);
    } else {
      this.set('allowActive', true);
      this.set('activedOptions', cfg);
    }
    return this;
  }

  /**
   * 对 geometry 进行数据调整
   * @chainable
   * @param  {String|Array|null} adjusts 数据调整的类型
   * @return {Object} geometry 对象
   */
  adjust(adjusts) {
    if (!this.get('hasDefaultAdjust')) {
      if (adjusts) {
        adjusts = parseAdjusts(adjusts);
      }
      this.set('adjusts', adjusts);
    }
    return this;
  }

  /**
   * 设置图形的选中模式
   * @param  {Boolean|Object} enable 布尔类型用于模式开关，对象类型用于配置
   * @param  {Object} cfg    选中配置项
   * @return {Geom}          返回 geom 自身
   */
  select(enable, cfg) {
    if (enable === false) {
      this.set('allowSelect', false);
    } else if (Util.isObject(enable)) {
      this.set('allowSelect', true);
      this.set('selectedOptions', enable);
    } else {
      this.set('allowSelect', true);
      this.set('selectedOptions', cfg);
    }

    return this;
  }

  hasAdjust(adjustType) {
    const self = this;
    const adjusts = self.get('adjusts');
    if (!adjustType) {
      return false;
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

  hasStack() {
    let isStacked = this.get('isStacked');
    if (Util.isNil(isStacked)) {
      isStacked = this.hasAdjust('stack');
      this.set('isStacked', isStacked);
    }
    return isStacked;
  }

  isInCircle() {
    const coord = this.get('coord');
    return coord && coord.isPolar;
  }

  _initContainer() {
    const self = this;
    let shapeContainer = self.get('shapeContainer');
    if (!shapeContainer) {
      const container = self.get('container');
      const view = self.get('view');
      const viewId = view && view.get('_id');
      shapeContainer = container.addGroup({
        viewId,
        visible: self.get('visible')
      });
      self.set('shapeContainer', shapeContainer);
    }
  }

  init() {
    const self = this;
    self._initContainer();
    self._initAttrs();
    if (self.get('tooltipCfg') && self.get('tooltipCfg').fields) {
      const tooltipFields = self.get('tooltipCfg').fields;
      Util.each(tooltipFields, field => {
        self._createScale(field);
      });
    }
    const dataArray = self._processData();
    if (self.get('adjusts')) {
      self._adjust(dataArray);
    }
    self.set('dataArray', dataArray);
  }

  // step 1: init attrs
  _initAttrs() {
    const self = this;
    const attrs = self.get('attrs');
    const attrOptions = self.get('attrOptions');
    const coord = self.get('coord');
    const viewTheme = self.viewTheme || Global;
    let isPie = false;

    for (const type in attrOptions) {
      if (attrOptions.hasOwnProperty(type)) {
        const option = attrOptions[type];
        const className = Util.upperFirst(type);
        const fields = parseFields(option.field);
        if (type === 'position') {
          option.coord = coord;
          // 饼图坐标系下，填充一维
          if (fields.length === 1 && coord.type === 'theta') {
            fields.unshift('1');
            isPie = true;
          }
        }
        const scales = [];
        for (let i = 0; i < fields.length; i++) {
          const field = fields[i];
          const scale = self._createScale(field);
          if (type === 'color' && Util.isNil(option.values)) { // 设置 color 的默认色值
            if (scale.values.length <= 8) {
              option.values = isPie ? viewTheme.colors_pie : viewTheme.colors;
            } else if (scale.values.length <= 16) {
              option.values = isPie ? viewTheme.colors_pie_16 : viewTheme.colors_16;
            } else {
              option.values = viewTheme.colors_24;
            }

            if (Util.isNil(option.values)) {
              option.values = viewTheme.colors; // 防止主题没有声明诸如 colors_pie 的属性
            }
          }
          scales.push(scale);
        }
        // 饼图需要填充满整个空间
        if (coord.type === 'theta' && type === 'position' && scales.length > 1) {
          const yScale = scales[1];
          const min = 0;
          let max = Math.max.apply(null, yScale.values);
          if (!isFinite(max)) {
            max = 1;
          }
          yScale.change({
            nice: false,
            min,
            max
          });
        }
        option.scales = scales;
        const attr = new Attr[className](option);
        attrs[type] = attr;
      }
    }
  }
  // step 2: 处理数据
  _processData() {
    const self = this;
    const data = this.get('data');
    const dataArray = [];
    const groupedArray = this._groupData(data);
    for (let i = 0; i < groupedArray.length; i++) {
      const subData = groupedArray[i];
      const tempData = self._saveOrigin(subData);
      self._numberic(tempData);
      dataArray.push(tempData);
    }
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
      const obj = {};
      for (const k in origin) {
        obj[k] = origin[k];
      }
      // const obj = Util.mix({}, origin);
      obj[FIELD_ORIGIN] = origin;
      rst.push(obj);
    }
    return rst;
  }

  // step 2.3 将分类数据翻译成数据, 仅对位置相关的度量进行数字化处理
  _numberic(data) {
    const positionAttr = this.getAttr('position');
    const scales = positionAttr.scales;
    for (let j = 0; j < data.length; j++) {
      const obj = data[j];
      for (let i = 0; i < Math.min(2, scales.length); i++) {
        const scale = scales[i];
        if (scale.isCategory) {
          const field = scale.field;
          obj[field] = scale.translate(obj[field]);
        }
      }
    }
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
      const tmpMin = Math.min.apply(null, obj[field]);
      const tmpMax = Math.max.apply(null, obj[field]);
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
    const viewTheme = this.viewTheme || Global;

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
        if (xScale.isCategory || xScale.isIdentity) {
          adjustNames.push('x');
        } else if (!yScale) {
          adjustNames.push('y');
        } else {
          throw new Error('dodge is not support linear attribute, please use category attribute!');
        }
        adjustCfg.adjustNames = adjustNames;
        adjustCfg.dodgeRatio = viewTheme.widthRatio.column;
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
        // 不进行 transpose 时，用户又没有设置这个参数时，默认从上向下
        if (!coord.isTransposed && Util.isNil(adjustCfg.reverseOrder)) {
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
    const shapeContainer = this.get('shapeContainer');
    shapeContainer.setMatrix(coord.matrix);
    if (position) {
      position.coord = coord;
    }
  }

  // step 3 绘制
  paint() {
    const self = this;
    const dataArray = self.get('dataArray');
    const mappedArray = [];
    const shapeFactory = self.getShapeFactory();
    shapeFactory.setCoord(self.get('coord'));
    self.set('shapeFactory', shapeFactory);
    const shapeContainer = self.get('shapeContainer');
    self._beforeMapping(dataArray);
    for (let i = 0; i < dataArray.length; i++) {
      let data = dataArray[i];
      const index = i;
      data = self._mapping(data);
      mappedArray.push(data);
      self.draw(data, shapeContainer, shapeFactory, index);
    }
    if (self.get('labelCfg')) {
      self._addLabels(Util.union.apply(null, mappedArray), shapeContainer.get('children'));
    }

    if (!self.get('sortable')) {
      self._sort(mappedArray); // 便于数据的查找，需要对数据进行排序，用于 geom.findPoint()
    } else {
      self.set('dataArray', mappedArray);
    }
  }

  _sort(mappedArray) {
    const self = this;
    const xScale = self.getXScale();
    const xField = xScale.field;
    Util.each(mappedArray, itemArr => {
      itemArr.sort((obj1, obj2) => {
        return xScale.translate(obj1[FIELD_ORIGIN][xField]) - xScale.translate(obj2[FIELD_ORIGIN][xField]);
      });
    });

    self.set('dataArray', mappedArray);
  }

  // step 3.1 before mapping
  _beforeMapping(dataArray) {
    const self = this;
    if (self.get('sortable')) {
      const xScale = self.getXScale();
      const field = xScale.field;
      Util.each(dataArray, function(data) {
        data.sort(function(v1, v2) {
          return xScale.translate(v1[field]) - xScale.translate(v2[field]);
        });
      });
    }
    if (self.get('generatePoints')) {
      Util.each(dataArray, function(data) {
        self._generatePoints(data);
      });
      Util.each(dataArray, function(data, index) {
        const nextData = dataArray[index + 1];
        if (nextData) {
          data[0].nextPoints = nextData[0].points;
        }
      });
    }
  }

  // step 3.2 add labels
  _addLabels(points, shapes) {
    const self = this;
    const type = self.get('type');
    const viewTheme = self.get('viewTheme') || Global;
    const coord = self.get('coord');
    const C = Labels.getLabelsClass(coord.type, type);
    const container = self.get('container');
    const scales = Util.map(self.get('labelCfg').fields, field => self._createScale(field));
    const labelContainer = container.addGroup(C, {
      _id: this.get('_id'),
      labelCfg: Util.mix({
        scales
      }, self.get('labelCfg')),
      coord,
      geom: self,
      geomType: type,
      viewTheme,
      visible: self.get('visible')
    });

    labelContainer.showLabels(points, shapes);
    self.set('labelContainer', labelContainer);
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
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      const cfg = self.createShapePointsCfg(obj);
      const shape = shapeAttr ? self._getAttrValues(shapeAttr, obj) : null;
      const points = shapeFactory.getShapePoints(shape, cfg);
      obj.points = points;
    }
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
    const { min, max } = yScale;
    let value;

    if (min >= 0) {
      value = min;
    } else if (max <= 0) { // 当值全位于负区间时，需要保证 ymin 在区域内，不可为 0
      value = max;
    } else {
      value = 0;
    }
    return value;
  }

  // 将数据归一化
  _normalizeValues(values, scale) {
    let rst = [];
    if (Util.isArray(values)) {
      for (let i = 0; i < values.length; i++) {
        const v = values[i];
        rst.push(scale.scale(v));
      }
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
    for (let i = 0; i < data.length; i++) {
      const record = data[i];
      const newRecord = {};
      newRecord[FIELD_ORIGIN] = record[FIELD_ORIGIN];
      newRecord.points = record.points;
      newRecord.nextPoints = record.nextPoints;
      for (const k in attrs) {
        if (attrs.hasOwnProperty(k)) {
          const attr = attrs[k];
          const names = attr.names;
          const values = self._getAttrValues(attr, record);
          if (names.length > 1) { // position 之类的生成多个字段的属性
            for (let j = 0; j < values.length; j++) {
              const val = values[j];
              const name = names[j];
              newRecord[name] = (Util.isArray(val) && val.length === 1) ? val[0] : val; // 只有一个值时返回第一个属性值
            }
          } else {
            newRecord[names[0]] = values.length === 1 ? values[0] : values;
          }
        }
      }
      mappedData.push(newRecord);
    }

    return mappedData;
  }

  // 获取属性映射的值
  _getAttrValues(attr, record) {
    const scales = attr.scales;
    const params = [];
    for (let i = 0; i < scales.length; i++) {
      const scale = scales[i];
      const field = scale.field;
      if (scale.type === 'identity') {
        params.push(scale.value);
      } else {
        params.push(record[field]);
      }
    }
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

  getDefaultValue(attrName) {
    let value = this.get(attrName);
    const attr = this.getAttr(attrName);
    if (attr) {
      const scale = attr.getScale(attrName);
      if (scale.type === 'identity') {
        value = scale.value;
      }
    }
    return value;
  }

  /**
   * step 3.3 draw
   * @protected
   * @param  {Array} data 绘制图形
   * @param {Object} container 绘图容器
   * @param {Object} shapeFactory 绘制图形的工厂类
   * @param {Number} index 每个 shape 的索引值
   */
  draw(data, container, shapeFactory, index) {
    const self = this;
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      self.drawPoint(obj, container, shapeFactory, index + i);
    }
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

  _getShapeId(dataObj) {
    let id = this.get('_id');
    const keyFields = this.get('keyFields');
    if (keyFields && keyFields.length > 0) {
      Util.each(keyFields, key => {
        id += '-' + dataObj[key];
      });
    } else {
      const type = this.get('type');
      const xScale = this.getXScale();
      const yScale = this.getYScale();
      const xField = xScale.field || 'x';
      const yField = yScale.field || 'y';
      const yVal = dataObj[yField];
      let xVal;
      if (xScale.isIdentity) {
        xVal = xScale.value;
      } else {
        xVal = dataObj[xField];
      }

      if (type === 'interval' || type === 'schema') {
        id += '-' + xVal;
      } else if (type === 'line' || type === 'area' || type === 'path') {
        id += '-' + type;
      } else {
        id += '-' + xVal + '-' + yVal;
      }

      const groupScales = this._getGroupScales();
      if (!Util.isEmpty(groupScales)) {
        Util.each(groupScales, groupScale => {
          const field = groupScale.field;
          if (groupScale.type !== 'identity') {
            id += '-' + dataObj[field];
          }
        });
      }
    }

    return id;
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
    if (self.get('generatePoints')) {
      cfg.points = obj.points;
      cfg.nextPoints = obj.nextPoints;
    }
    if (self.get('animate')) { // _id 字段仅用于动画
      cfg._id = self._getShapeId(obj[FIELD_ORIGIN]);
    }
    return cfg;
  }

  appendShapeInfo(shape, index) {
    if (shape) {
      shape.setSilent('index', index);
      shape.setSilent('coord', this.get('coord'));

      if (this.get('animate') && this.get('animateCfg')) {
        shape.setSilent('animateCfg', this.get('animateCfg'));
      }
    }
  }

  _applyViewThemeShapeStyle(cfg, shape, shapeFactory) {
    // applying view theme
    const self = this;
    const viewTheme = self.viewTheme || Global;
    let shapeName = shapeFactory.name;
    if (shape) {
      if (shape && (shape.indexOf('hollow') > -1 || shape.indexOf('liquid') > -1)) {
        shapeName = `hollow${Util.upperFirst(shapeName)}`;
      }
    } else if (shapeFactory.defaultShapeType.indexOf('hollow') > -1) {
      shapeName = `hollow${Util.upperFirst(shapeName)}`;
    }
    const defaultStyle = viewTheme.shape[shapeName] || {};
    cfg.style = Util.mix({}, defaultStyle, cfg.style);
  }

  drawPoint(obj, container, shapeFactory, index) {
    const self = this;
    const shape = obj.shape;
    const cfg = self.getDrawCfg(obj);

    self._applyViewThemeShapeStyle(cfg, shape, shapeFactory);

    const geomShape = shapeFactory.drawShape(shape, cfg, container);
    self.appendShapeInfo(geomShape, index);
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

  getShapes() {
    const result = [];
    const shapeContainer = this.get('shapeContainer');
    const children = shapeContainer.get('children');
    Util.each(children, child => {
      if (child.get('origin')) { // 过滤 label
        result.push(child);
      }
    });
    return result;
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

  getFieldsForLegend() {
    let fields = [];
    const attrOptions = this.get('attrOptions');
    Util.each(GROUP_ATTRS, attrName => {
      const attrCfg = attrOptions[attrName];
      if (attrCfg && attrCfg.field && Util.isString(attrCfg.field)) {
        fields = fields.concat(attrCfg.field.split('*'));
      }
    });
    return Util.uniq(fields);
  }

  changeVisible(visible, stopDraw) {
    const me = this;
    me.set('visible', visible);
    const shapeContainer = this.get('shapeContainer');
    if (shapeContainer) {
      shapeContainer.set('visible', visible);
    }
    const labelContainer = this.get('labelContainer');
    if (labelContainer) {
      labelContainer.set('visible', visible);
    }
    if (!stopDraw && shapeContainer) {
      const canvas = shapeContainer.get('canvas');
      canvas.draw();
    }
  }

  reset() {
    this.set('attrOptions', {});
    this.clearInner();
  }

  clearInner() {
    this.clearActivedShapes();
    this.clearSelected();
    const shapeContainer = this.get('shapeContainer');
    shapeContainer && shapeContainer.clear();

    // 由于 Labels 对应的模块需要生成group，所以这个地方需要删除
    const labelContainer = this.get('labelContainer');
    labelContainer && labelContainer.remove();
    this.set('attrs', {});
    this.set('groupScales', null);
    // if (!this.get('hasDefaultAdjust')) {
    //   this.set('adjusts', null);
    // }
    this.set('labelContainer', null);
    this.set('xDistance', null);
    this.set('isStacked', null);
  }

  clear() {
    this.clearInner();
    this.set('scales', {});
  }

  destroy() {
    this.clear();
    const shapeContainer = this.get('shapeContainer');
    shapeContainer && shapeContainer.remove();
    this.offEvents();
    super.destroy();
  }

  bindEvents() {
    if (this.get('view')) {
      this._bindActiveAction();
      this._bindSelectedAction();
    }
  }

  offEvents() {
    if (this.get('view')) {
      this._offActiveAction();
      this._offSelectedAction();
    }
  }
}

module.exports = GeomBase;
