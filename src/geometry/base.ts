import { Adjust, getAdjust as getAdjustClass } from '@antv/adjust';
import { Attribute, getAttribute as getAttributeClass } from '@antv/attr';
import {
  clone,
  deepMix,
  each,
  flatten,
  get,
  isArray,
  isEmpty,
  isEqual,
  isFunction,
  isNil,
  isNumber,
  isObject,
  isPlainObject,
  isString,
  set,
} from '@antv/util';
import { doGroupAppearAnimate, getDefaultAnimateCfg } from '../animate';
import Base from '../base';
import { FIELD_ORIGIN, GEOMETRY_LIFE_CIRCLE, GROUP_ATTRS } from '../constant';
import { BBox, Coordinate, IGroup, IShape, Scale } from '../dependents';
import {
  AdjustOption,
  AdjustType,
  AnimateOption,
  AttributeOption,
  ColorAttrCallback,
  Data,
  Datum,
  GeometryLabelCfg,
  GeometryTooltipOption,
  LabelCallback,
  LabelOption,
  LooseObject,
  MappingDatum,
  ScaleOption,
  ShapeAttrCallback,
  ShapeFactory,
  ShapeInfo,
  ShapeMarkerCfg,
  ShapeMarkerAttrs,
  ShapePoint,
  SizeAttrCallback,
  StateOption,
  StyleCallback,
  StyleOption,
  TooltipCallback,
  CustomOption,
} from '../interface';
import { uniq } from '../util/helper';
import Element from './element';
import { getGeometryLabel } from './label';
import GeometryLabel from './label/base';
import { getShapeFactory } from './shape/base';
import { group } from './util/group-data';
import { isModelChange } from './util/is-model-change';
import { parseFields } from './util/parse-fields';
import { diff } from './util/diff';
import { inferScaleType } from '../util/scale';
import { getXDimensionLength } from '../util/coordinate';

/** @ignore */
interface AttributeInstanceCfg {
  fields?: string[];
  callback?: (...args) => any;
  values?: string[] | number[];
  scales?: Scale[];
}
interface DimValuesMapType {
  [dim: string]: number[];
}
/** @ignore */
interface AdjustInstanceCfg {
  type: AdjustType;
  adjustNames?: string[];
  xField?: string;
  yField?: string;

  dodgeBy?: string;
  marginRatio?: number;
  dodgeRatio?: number;

  size?: number;
  height?: number;
  reverseOrder?: boolean;

  /** 像素级柱间宽度，调整offset */
  intervalPadding?: number;
  dodgePadding?: number;
  /** x维度长度，计算归一化padding使用 */
  xDimensionLength?: number;
  /** 分组数，计算offset */
  groupNum?: number;
  /** 用户配置宽度 size */
  defaultSize?: number;
  /** 最大最小宽度约束 */
  maxColumnWidth?: number;
  minColumnWidth?: number;
  /** 柱宽比例 */
  columnWidthRatio?: number;
  /** 用户自定义的dimValuesMap */
  dimValuesMap?: DimValuesMapType;
}

/** geometry.init() 传入参数 */
export interface InitCfg {
  /** 坐标系 */
  coordinate?: Coordinate;
  /** 数据 */
  data?: Data;
  /** 主题对象 */
  theme?: LooseObject;
  /** 列定义 */
  scaleDefs?: Record<string, ScaleOption>;
  /** 因为数据使用的引用，所以需要有一个标识位标识数据是否发生了更新 */
  isDataChanged?: boolean;
  isCoordinateChanged?: boolean;
}

/** Geometry 构造函数参数 */
export interface GeometryCfg {
  /** Geometry shape 的容器。 */
  container: IGroup;
  /** 绘制的坐标系对象。 */
  coordinate?: Coordinate;
  /** 绘制数据。 */
  data?: Data;
  /** 需要的 scales。 */
  scales?: Record<string, Scale>;
  /** 列定义 */
  scaleDefs?: Record<string, ScaleOption>;
  /** Geometry labels 的容器 */
  labelsContainer?: IGroup;
  /** 是否对数据进行排序 */
  sortable?: boolean;
  /** elements 的 zIndex 默认按顺序提升，通过 zIndexReversed 可以反序，从而数据越前，层级越高 */
  zIndexReversed?: boolean;
  /** 是否需要对 zIndex 进行 sort。因为耗时长，由具体场景自行决定 */
  sortZIndex?: boolean;
  /** 延迟渲染 Geometry 数据标签. 设置为 true 时，会在浏览器空闲时期被调用, 也可以指定具体 timeout 时间 */
  useDeferredLabel?: boolean | number;
  /** 是否可见 */
  visible?: boolean;
  /** 主题配置 */
  theme?: LooseObject;

  /** 组间距 */
  intervalPadding?: number;
  /** 组内间距 */
  dodgePadding?: number;
  /** 柱状图最大宽度 */
  maxColumnWidth?: number;
  /** 柱状图最小宽度 */
  minColumnWidth?: number;
  /** 默认宽度占比，interval类型和schema类型通用 */
  columnWidthRatio?: number;
  /** 玫瑰图占比 */
  roseWidthRatio?: number;
  /** 多层饼图/环图占比 */
  multiplePieWidthRatio?: number;
}

/**
 * Geometry 几何标记基类，主要负责数据到图形属性的映射以及绘制逻辑。
 */
export default class Geometry<S extends ShapePoint = ShapePoint> extends Base {
  /** Geometry 几何标记类型。 */
  public readonly type: string = 'base';
  /** ShapeFactory 对应的类型。 */
  public readonly shapeType: string;

  // 在创建 Geometry 实例时可以传入的属性
  /** Coordinate 坐标系实例。 */
  public coordinate: Coordinate;
  /** 用户绘制数据。 */
  public data: Data;
  /** 图形绘制容器。 */
  public readonly container: IGroup;
  /** label 绘制容器。 */
  public readonly labelsContainer: IGroup;
  /** 是否对数据进行排序，默认为 false。  */
  public sortable: boolean;
  /** 当前 Geometry 实例主题。  */
  public theme: LooseObject;
  /** 存储 geometry 需要的 scales，需要外部传入。 */
  public scales: Record<string, Scale>;
  /** scale 定义，需要外部传入。 */
  public scaleDefs: Record<string, ScaleOption>;
  /** 画布区域，用于 label 布局。 */
  public canvasRegion: BBox;

  // 内部产生的属性
  /** Attribute map  */
  public attributes: Record<string, Attribute> = {};
  /** Element map */
  public elements: Element[] = [];
  /**
   * 存储处理后的数据，
   * + init() 及 updateData() 逻辑后, 结构为 Data[]；
   * + paint() 逻辑后，结构为 MappingDatum[][]。
   */
  public dataArray: MappingDatum[][];
  /** 存储 tooltip 配置信息。 */
  public tooltipOption: GeometryTooltipOption | boolean;
  /** 存储 label 配置信息。 */
  public labelOption: LabelOption | false;
  /** 状态量相关的配置项 */
  public stateOption: StateOption;
  /** 使用 key-value 结构存储 Element，key 为每个 Element 实例对应的唯一 ID */
  public elementsMap: Record<string, Element> = {};
  /** animate 配置项 */
  public animateOption: AnimateOption | boolean = true;
  /** 图形属性映射配置 */
  protected attributeOption: Record<string, AttributeOption> = {};
  /** adjust 配置项 */
  protected adjustOption: AdjustOption[];
  /** style 配置项 */
  protected styleOption: StyleOption;
  /** custom 自定义的配置项 */
  protected customOption: CustomOption;
  /** 每个 Geometry 对应的 Shape 工厂实例，用于创建各个 Shape */
  protected shapeFactory: ShapeFactory;
  /** 存储上一次渲染时的 element 映射表，用于更新逻辑 */
  protected lastElementsMap: Record<string, Element> = {};
  /** 是否生成多个点来绘制图形。 */
  protected generatePoints: boolean = false;
  /** 存储发生图形属性映射前的数据 */
  protected beforeMappingData: Data[] = null;
  /** 存储每个 shape 的默认 size，用于 Interval、Schema 几何标记 */
  protected defaultSize: number;

  // 用户通过 geometry 构造函数设置的主题
  private userTheme: LooseObject;
  private adjusts: Record<string, Adjust> = {};
  private lastAttributeOption;
  private idFields: string[] = [];
  private geometryLabel: GeometryLabel;

  // 柱状图间距相关配置
  /** 组间距 */
  protected intervalPadding: number;
  /** 组内间距 */
  protected dodgePadding: number;
  /** 柱状图最大宽度 */
  protected maxColumnWidth: number;
  /** 柱状图最小宽度 */
  protected minColumnWidth: number;
  /** 一般柱状图宽度占比 */
  protected columnWidthRatio: number;
  /** 玫瑰图占比 */
  protected roseWidthRatio: number;
  /** 多层饼图/环图占比 */
  protected multiplePieWidthRatio: number;
  /** elements 的 zIndex 默认按顺序提升，通过 zIndexReversed 可以反序，从而数据越前，层级越高 */
  public zIndexReversed?: boolean;
  /** 是否需要对 zIndex 进行 sort。因为耗时长，由具体场景自行决定 */
  public sortZIndex?: boolean;
  protected useDeferredLabel?: null | number;

  /** 虚拟 Group，用于图形更新 */
  private offscreenGroup: IGroup;
  private groupScales: Scale[];
  private hasSorted: boolean = false;
  protected isCoordinateChanged: boolean = false;

  /**
   * 创建 Geometry 实例。
   * @param cfg
   */
  constructor(cfg: GeometryCfg) {
    super(cfg);

    const {
      container,
      labelsContainer,
      coordinate,
      data,
      sortable = false,
      visible = true,
      theme,
      scales = {},
      scaleDefs = {},
      // 柱状图间隔与宽度相关配置
      intervalPadding,
      dodgePadding,
      maxColumnWidth,
      minColumnWidth,
      columnWidthRatio,
      roseWidthRatio,
      multiplePieWidthRatio,
      zIndexReversed,
      sortZIndex,
      useDeferredLabel,
    } = cfg;

    this.container = container;
    this.labelsContainer = labelsContainer;
    this.coordinate = coordinate;
    this.data = data;
    this.sortable = sortable;
    this.visible = visible;
    this.userTheme = theme;
    this.scales = scales;
    this.scaleDefs = scaleDefs;
    // 柱状图间隔与宽度相关配置
    this.intervalPadding = intervalPadding;
    this.dodgePadding = dodgePadding;
    this.maxColumnWidth = maxColumnWidth;
    this.minColumnWidth = minColumnWidth;
    this.columnWidthRatio = columnWidthRatio;
    this.roseWidthRatio = roseWidthRatio;
    this.multiplePieWidthRatio = multiplePieWidthRatio;
    this.zIndexReversed = zIndexReversed;
    this.sortZIndex = sortZIndex;
    this.useDeferredLabel = useDeferredLabel ? (typeof useDeferredLabel === 'number' ? useDeferredLabel : Infinity) : null;
  }

  /**
   * 配置 position 通道映射规则。
   *
   * @example
   * ```typescript
   * // 数据结构: [{ x: 'A', y: 10, color: 'red' }]
   * geometry.position('x*y');
   * geometry.position([ 'x', 'y' ]);
   * geometry.position({
   *   fields: [ 'x', 'y' ],
   * });
   * ```
   *
   * @param cfg 映射规则
   * @returns
   */
  public position(cfg: string | string[] | AttributeOption): Geometry {
    let positionCfg = cfg;
    if (!isPlainObject(cfg)) {
      // 字符串字段或者数组字段
      positionCfg = {
        fields: parseFields(cfg),
      };
    }

    const fields = get(positionCfg, 'fields');
    if (fields.length === 1) {
      // 默认填充一维 1*xx
      fields.unshift('1');
      set(positionCfg, 'fields', fields);
    }
    set(this.attributeOption, 'position', positionCfg);

    return this;
  }

  /**
   * 配置 color 通道映射规则。
   *
   * @example
   * ```typescript
   * // data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]
   * geometry.color({
   *   fields: [ 'x' ],
   *   values: [ '#1890ff', '#5AD8A6' ],
   * });
   * ```
   *
   * @param field 映射规则
   * @returns
   */
  public color(field: AttributeOption): Geometry;
  /**
   * @example
   * ```typescript
   * // data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]
   *
   * // 使用 '#1890ff' 颜色渲染图形
   * geometry.color('#1890ff');
   *
   * // 根据 x 字段的数据值进行颜色的映射，这时候 G2 会在内部调用默认的回调函数，读取默认提供的颜色进行数据值到颜色值的映射。
   * geometry.color('x');
   *
   * // 将 'x' 字段的数据值映射至指定的颜色值 colors（可以是字符串也可以是数组），此时用于通常映射分类数据
   * geometry.color('x', [ '#1890ff', '#5AD8A6' ]);
   *
   * // 使用回调函数进行颜色值的自定义；可以使用多个字段使用、*号连接
   * geometry.color('x', (xVal) => {
   *   if (xVal === 'a') {
   *     return 'red';
   *   }
   *   return 'blue';
   * });
   *
   * // 指定颜色的渐变路径，用于映射连续的数据
   * geometry.color('x', '#BAE7FF-#1890FF-#0050B3');
   * ```
   *
   * @param field 参与颜色映射的数据字段，多个字段使用 '*' 连接符进行连接。
   * @param cfg Optional, color 映射规则。
   * @returns
   */
  public color(field: string, cfg?: string | string[] | ColorAttrCallback): Geometry;
  public color(field: AttributeOption | string, cfg?: string | string[] | ColorAttrCallback): Geometry {
    this.createAttrOption('color', field, cfg);

    return this;
  }

  /**
   * 配置 shape 通道映射规则。
   *
   * @example
   *
   * ```typescript
   * // data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]
   * geometry.shape({
   *   fields: [ 'x' ],
   * });
   * ```
   *
   * @param field 映射规则配置。
   * @returns
   */
  public shape(field: AttributeOption): Geometry;
  /**
   *
   * @example
   * ```typescript
   * // data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]
   *
   * // 指定常量，将所有数据值映射到固定的 shape
   * geometry.shape('circle');
   *
   * // 将指定的字段映射到内置的 shapes 数组中
   * geometry.shape('x');
   *
   * // 将指定的字段映射到指定的 shapes 数组中
   * geometry.shape('x', [ 'circle', 'diamond', 'square' ]);
   *
   * // 使用回调函数获取 shape，用于个性化的 shape 定制，可以根据单个或者多个字段确定
   * geometry.shape('x', (xVal) => {
   *   if (xVal === 'a') {
   *     return 'circle';
   *   }
   *   return 'diamond';
   * });
   * ```
   *
   * @param field 参与 shape 映射的数据字段，多个字段使用 '*' 连接符进行连接。
   * @param cfg Optional, shape 映射规则。
   * @returns
   */
  public shape(field: string, cfg?: string[] | ShapeAttrCallback): Geometry;
  public shape(field: AttributeOption | string, cfg?: string[] | ShapeAttrCallback): Geometry {
    this.createAttrOption('shape', field, cfg);

    return this;
  }

  /**
   * 配置 size 通道映射规则。
   *
   * @example
   * ```typescript
   * // data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]
   * geometry.size({
   *   values: [ 10 ],
   * })
   * ```
   *
   * @param field 映射规则。
   * @returns
   */
  public size(field: AttributeOption): Geometry;
  /**
   *
   * @example
   * ```typescript
   * // data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]
   *
   * // 直接指定像素大小
   * geometry.size(10);
   *
   * // 指定映射到 size 的字段，使用内置的默认大小范围为 [1, 10]
   * geometry.size('x');
   *
   * // 指定映射到 size 字段外，还提供了 size 的最大值和最小值范围
   * geometry.size('x', [ 5, 30 ]);
   *
   * // 使用回调函数映射 size，用于个性化的 size 定制，可以使用多个字段进行映射
   * geometry.size('x', (xVal) => {
   *   if (xVal === 'a') {
   *     return 10;
   *   }
   *   return 5;
   * });
   * ```
   *
   * @param field 参与 size 映射的数据字段，多个字段使用 '*' 连接符进行连接。
   * @param cfg Optional, size 映射规则
   * @returns
   */
  public size(field: number | string, cfg?: [number, number] | SizeAttrCallback): Geometry;
  public size(field: AttributeOption | number | string, cfg?: [number, number] | SizeAttrCallback): Geometry {
    this.createAttrOption('size', field, cfg);

    return this;
  }

  /**
   * 设置数据调整方式。G2 目前内置了四种类型：
   * 1. dodge
   * 2. stack
   * 3. symmetric
   * 4. jitter
   *
   *
   * **Tip**
   * + 对于 'dodge' 类型，可以额外进行如下属性的配置:
   * ```typescript
   * geometry.adjust('dodge', {
   *   marginRatio: 0, // 取 0 到 1 范围的值（相对于每个柱子宽度），用于控制一个分组中柱子之间的间距
   *   dodgeBy: 'x', // 该属性只对 'dodge' 类型生效，声明以哪个数据字段为分组依据
   * });
   * ```
   *
   * + 对于 'stack' 类型，可以额外进行如下属性的配置:
   * ```typescript
   * geometry.adjust('stack', {
   *   reverseOrder: false, // 用于控制是否对数据进行反序操作
   * });
   * ```
   *
   * @example
   * ```typescript
   * geometry.adjust('stack');
   *
   * geometry.adjust({
   *   type: 'stack',
   *   reverseOrder: false,
   * });
   *
   * // 组合使用 adjust
   * geometry.adjust([ 'stack', 'dodge' ]);
   *
   * geometry.adjust([
   *   { type: 'stack' },
   *   { type: 'dodge', dodgeBy: 'x' },
   * ]);
   * ```
   *
   * @param adjustCfg 数据调整配置
   * @returns
   */
  public adjust(adjustCfg: string | string[] | AdjustOption | AdjustOption[]): Geometry {
    let adjusts: any = adjustCfg;
    if (isString(adjustCfg) || isPlainObject(adjustCfg)) {
      adjusts = [adjustCfg];
    }
    each(adjusts, (adjust, index) => {
      if (!isObject(adjust)) {
        adjusts[index] = { type: adjust };
      }
    });

    this.adjustOption = adjusts;
    return this;
  }

  /**
   * 图形样式配置。
   *
   * @example
   * ```typescript
   * // 配置图形样式
   * style({
   *   lineWidth: 2,
   *   stroke: '#1890ff',
   * });
   *
   * // 根据具体的数据进行详细配置
   * style({
   *   fields: [ 'x', 'y' ], // 数据字段
   *   callback: (xVal, yVal) => {
   *     const style = { lineWidth: 2, stroke: '#1890ff' };
   *     if (xVal === 'a') {
   *       style.lineDash = [ 2, 2 ];
   *     }
   *     return style;
   *   },
   * });
   * ```
   *
   * @param field 配置样式属性或者样式规则。
   * @returns
   */
  public style(field: StyleOption | LooseObject): Geometry;
  /**
   * @example
   * ```typescript
   * style('x*y', (xVal, yVal) => {
   *   const style = { lineWidth: 2, stroke: '#1890ff' };
   *   if (xVal === 'a') {
   *     style.lineDash = [ 2, 2 ];
   *   }
   *   return style;
   * });
   * ```
   *
   * @param field 数据字段或者样式配置规则。
   * @param styleFunc Optional, 样式配置回调函数。
   * @returns
   */
  public style(field: string, styleFunc: StyleCallback): Geometry;
  public style(field: StyleOption | LooseObject | string, styleFunc?: StyleCallback): Geometry {
    if (isString(field)) {
      const fields = parseFields(field);
      this.styleOption = {
        fields,
        callback: styleFunc,
      };
    } else {
      const { fields, callback, cfg } = field as StyleOption;
      if (fields || callback || cfg) {
        this.styleOption = field;
      } else {
        this.styleOption = {
          cfg: field,
        };
      }
    }

    return this;
  }

  /**
   * 配置 Geometry 显示的 tooltip 内容。
   *
   * `tooltip(false)` 代表关闭 tooltip。
   * `tooltip(true)` 代表开启 tooltip。
   *
   * Geometry 默认允许 tooltip 展示，我们可以使用以下方法对 tooltip 的展示内容进行配置：
   *
   * @example
   * ```typescript
   * // data: [{x: 'a', y: 10}]
   * tooltip({
   *   fields: [ 'x' ],
   * });
   * ```
   * ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*268uQ50if60AAAAAAAAAAABkARQnAQ)
   *
   * ```typescript
   * tooltip({
   *   fields: [ 'x', 'y' ],
   * });
   * ```
   * ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*A_ujSa8QhtcAAAAAAAAAAABkARQnAQ)
   *
   * tooltip() 方法同样支持数据映射及回调用法：
   *
   * @example
   * ```typescript
   * chart.tooltip({
   *   itemTpl: '<li>{x}: {y}</li>',
   * });
   *
   * chart.line()
   *   .position('x*y')
   *   .tooltip({
   *     fields: [ 'x', 'y' ],
   *     callback: (x, y) => {
   *       return {
   *         x,
   *         y,
   *       };
   *     },
   *   });
   * ```
   *
   * 其返回的值必须为对象，该值中的属性同 chart.tooltip() 的 itemTpl 模板相对应，返回的变量可用于 itemTpl 的字符串模板。
   *
   * @param field tooltip 配置信息。
   * @returns
   */
  public tooltip(field: GeometryTooltipOption | boolean): Geometry;
  /**
   * @example
   * ```typescript
   * // data: [{x: 'a', y: 10}]
   *
   * // 等同于 tooltip({ fields: [ 'x' ] })
   * tooltip('x');
   *
   * // 等同于 tooltip({ fields: [ 'x', 'y' ] })
   * tooltip('x*y');
   *
   * // 等同于 tooltip({ fields: [ 'x', 'y' ], callback: (x, y) => { x, y } })
   * tooltip('x*y', (x, y) => {
   *   return {
   *     x,
   *     y,
   *   };
   * });
   * ```
   *
   * @param field 参与映射的字段。
   * @param cfg Optional, 回调函数
   * @returns
   */
  public tooltip(field: string, cfg?: TooltipCallback): Geometry;
  public tooltip(field: GeometryTooltipOption | boolean | string, cfg?: TooltipCallback): Geometry {
    if (isString(field)) {
      const fields = parseFields(field);
      this.tooltipOption = {
        fields,
        callback: cfg,
      };
    } else {
      this.tooltipOption = field;
    }

    return this;
  }

  /**
   * Geometry 动画配置。
   *
   * + `animate(false)` 关闭动画
   * + `animate(true)` 开启动画，默认开启。
   *
   * 我们将动画分为四个场景：
   * 1. appear: 图表第一次加载时的入场动画；
   * 2. enter: 图表绘制完成，发生更新后，产生的新图形的进场动画；
   * 3. update: 图表绘制完成，数据发生变更后，有状态变更的图形的更新动画；
   * 4. leave: 图表绘制完成，数据发生变更后，被销毁图形的销毁动画。
   *
   * @example
   * ```typescript
   * animate({
   *   enter: {
   *     duration: 1000, // enter 动画执行时间
   *   },
   *   leave: false, // 关闭 leave 销毁动画
   * });
   * ```
   *
   * @param cfg 动画配置
   * @returns
   */
  public animate(cfg: AnimateOption | boolean): Geometry {
    this.animateOption = cfg;
    return this;
  }

  /**
   * Geometry label 配置。
   *
   * @example
   * ```ts
   * // data: [ {x: 1, y: 2, z: 'a'}, {x: 2, y: 2, z: 'b'} ]
   * // 在每个图形上显示 z 字段对应的数值
   * label({
   *   fields: [ 'z' ]
   * });
   *
   * label(false); // 不展示 label
   *
   * // 在每个图形上显示 x 字段对应的数值，同时配置文本颜色为红色
   * label('x', {
   *   style: {
   *     fill: 'red',
   *   },
   * })
   *
   * // 以 type 类型的 label 渲染每个图形上显示 x 字段对应的数值，同时格式化文本内容
   * label('x', (xValue) => {
   *   return {
   *     content: xValue + '%',
   *   };
   * }, {
   *   type: 'base' // 声明 label 类型
   * })
   * ```
   *
   * @param field
   * @returns label
   */
  public label(field: LabelOption | false | string): Geometry;
  public label(field: string, secondParam: GeometryLabelCfg | LabelCallback): Geometry;
  public label(field: string, secondParam: LabelCallback, thirdParam: GeometryLabelCfg): Geometry;
  public label(
    field: string | LabelOption | false,
    secondParam?: GeometryLabelCfg | LabelCallback,
    thirdParam?: GeometryLabelCfg
  ): Geometry {
    if (isString(field)) {
      const labelOption: LabelOption = {};
      const fields = parseFields(field);
      labelOption.fields = fields;
      if (isFunction(secondParam)) {
        labelOption.callback = secondParam;
      } else if (isPlainObject(secondParam)) {
        labelOption.cfg = secondParam;
      }

      if (thirdParam) {
        labelOption.cfg = thirdParam;
      }
      this.labelOption = labelOption;
    } else {
      this.labelOption = field;
    }

    return this;
  }

  /**
   * 设置状态对应的样式。
   *
   * @example
   * ```ts
   * chart.interval().state({
   *   selected: {
   *     animate: { duration: 100, easing: 'easeLinear' },
   *     style: {
   *       lineWidth: 2,
   *       stroke: '#000',
   *     },
   *   },
   * });
   * ```
   *
   * 如果图形 shape 是由多个 shape 组成，即为一个 G.Group 对象，那么针对 group 中的每个 shape，我们需要使用下列方式进行状态样式设置：
   * 如果我们为 group 中的每个 shape 设置了 'name' 属性(shape.set('name', 'xx'))，则以 'name' 作为 key，否则默认以索引值（即 shape 的 添加顺序）为 key。
   *
   * ```ts
   * chart.interval().shape('groupShape').state({
   *   selected: {
   *     style: {
   *       0: { lineWidth: 2 },
   *       1: { fillOpacity: 1 },
   *     }
   *   }
   * });
   * ```
   *
   * @param cfg 状态样式
   */
  public state(cfg: StateOption) {
    this.stateOption = cfg;
    return this;
  }

  /**
   * 用于向 shape 中传入自定义的数据。目前可能仅仅可能用于在自定义 shape 的时候，像自定义 shape 中传入自定义的数据，方便实现自定义 shape 的配置能力。
   *
   * @example
   * ```ts
   * chart.interval().customInfo({ yourData: 'hello, g2!' });
   * ```
   *
   * 然后在自定义 shape 的时候，可以拿到这个信息。
   *
   * ```ts
   * registerShape('interval', 'your-shape', {
   *   draw(shapeInfo, container) {
   *     const { customInfo } = shapeInfo;
   *     console.log(customInfo); // will log { yourData: 'hello, g2!' }.
   *   }
   * });
   * ```
   *
   * @param cfg
   */
  public customInfo(cfg: any) {
    this.customOption = cfg;
    return this;
  }

  /**
   * 初始化 Geomtry 实例：
   * 创建 [[Attribute]] and [[Scale]] 实例，进行数据处理，包括分组、数值化以及数据调整。
   */
  public init(cfg: InitCfg = {}) {
    this.setCfg(cfg);
    this.initAttributes(); // 创建图形属性

    // 数据加工：分组 -> 数字化 -> adjust
    this.processData(this.data);

    // 调整 scale
    this.adjustScale();
  }

  /**
   * Geometry 更新。
   * @param [cfg] 更新的配置
   */
  public update(cfg: InitCfg = {}) {
    const { data, isDataChanged, isCoordinateChanged } = cfg;
    const { attributeOption, lastAttributeOption } = this;

    if (!isEqual(attributeOption, lastAttributeOption)) {
      // 映射发生改变，则重新创建图形属性
      this.init(cfg);
    } else if (data && (isDataChanged || !isEqual(data, this.data))) {
      // 数据发生变化
      this.setCfg(cfg);
      this.initAttributes(); // 创建图形属性
      this.processData(data); // 数据加工：分组 -> 数字化 -> adjust
    } else {
      // 有可能 coordinate 变化
      this.setCfg(cfg);
    }

    // 调整 scale
    this.adjustScale();
    this.isCoordinateChanged = isCoordinateChanged;
  }

  /**
   * 将原始数据映射至图形空间，同时创建图形对象。
   */
  public paint(isUpdate: boolean = false) {
    if (this.animateOption) {
      this.animateOption = deepMix({}, getDefaultAnimateCfg(this.type, this.coordinate), this.animateOption);
    }

    this.defaultSize = undefined;
    this.elementsMap = {};
    this.elements = [];
    const offscreenGroup = this.getOffscreenGroup();
    offscreenGroup.clear();

    const beforeMappingData = this.beforeMappingData;
    const dataArray = this.beforeMapping(beforeMappingData);

    this.dataArray = new Array(dataArray.length);
    for (let i = 0; i < dataArray.length; i++) {
      const data = dataArray[i];
      this.dataArray[i] = this.mapping(data);
    }
    this.updateElements(this.dataArray, isUpdate);
    this.lastElementsMap = this.elementsMap;

    if (this.canDoGroupAnimation(isUpdate)) {
      // 如果用户没有配置 appear.animation，就默认走整体动画
      const container = this.container;
      const type = this.type;
      const coordinate = this.coordinate;
      const animateCfg = get(this.animateOption, 'appear');
      const yScale = this.getYScale();
      const yMinPoint = coordinate.convert({
        x: 0,
        y: yScale.scale(this.getYMinValue()),
      });
      doGroupAppearAnimate(container, animateCfg, type, coordinate, yMinPoint);
    }

    // 添加 label
    if (this.labelOption) {
      const deferred = this.useDeferredLabel;
      const callback = (() => this.renderLabels(flatten(this.dataArray) as unknown as MappingDatum[], isUpdate)).bind(this);
      if (typeof deferred === 'number') {
        // Use `requestIdleCallback` to render labels in idle time (like react fiber)
        const timeout = (typeof deferred === 'number' && deferred !== Infinity) ? deferred : 0;
        if (!window.requestIdleCallback) {
          setTimeout(callback, timeout);
        } else {
          const options = timeout && timeout !== Infinity ? { timeout } : undefined;
          window.requestIdleCallback(callback, options);
        }
      } else {
        callback();
      }
    }

    // 缓存，用于更新
    this.lastAttributeOption = {
      ...this.attributeOption,
    };

    if (this.visible === false) {
      // 用户在初始化的时候声明 visible: false
      this.changeVisible(false);
    }
  }

  /**
   * 清空当前 Geometry，配置项仍保留，但是内部创建的对象全部清空。
   * @override
   */
  public clear() {
    const { container, geometryLabel, offscreenGroup } = this;
    if (container) {
      container.clear();
    }

    if (geometryLabel) {
      geometryLabel.clear();
    }

    if (offscreenGroup) {
      offscreenGroup.clear();
    }

    // 属性恢复至出厂状态
    this.scaleDefs = undefined;
    this.attributes = {};
    this.scales = {};
    this.elementsMap = {};
    this.lastElementsMap = {};
    this.elements = [];
    this.adjusts = {};
    this.dataArray = null;
    this.beforeMappingData = null;
    this.lastAttributeOption = undefined;
    this.defaultSize = undefined;
    this.idFields = [];
    this.groupScales = undefined;
    this.hasSorted = false;
    this.isCoordinateChanged = false;
  }

  /**
   * 销毁 Geometry 实例。
   */
  public destroy() {
    this.clear();
    const container = this.container;
    container.remove(true);

    if (this.offscreenGroup) {
      this.offscreenGroup.remove(true);
      this.offscreenGroup = null;
    }

    if (this.geometryLabel) {
      this.geometryLabel.destroy();
      this.geometryLabel = null;
    }
    this.theme = undefined;
    this.shapeFactory = undefined;

    super.destroy();
  }

  /**
   * 获取决定分组的图形属性对应的 scale 实例。
   * @returns
   */
  public getGroupScales(): Scale[] {
    return this.groupScales;
  }

  /**
   * 根据名字获取图形属性实例。
   */
  public getAttribute(name: string): Attribute {
    return this.attributes[name];
  }

  /** 获取 x 轴对应的 scale 实例。 */
  public getXScale(): Scale {
    return this.getAttribute('position').scales[0];
  }

  /** 获取 y 轴对应的 scale 实例。 */
  public getYScale(): Scale {
    return this.getAttribute('position').scales[1];
  }

  /**
   * 获取决定分组的图形属性实例。
   */
  public getGroupAttributes(): Attribute[] {
    const rst = [];
    each(this.attributes, (attr: Attribute) => {
      if (GROUP_ATTRS.includes(attr.type)) {
        rst.push(attr);
      }
    });
    return rst;
  }

  /** 获取图形属性默认的映射值。 */
  public getDefaultValue(attrName: string) {
    let value: any;
    const attr = this.getAttribute(attrName);
    if (attr && isEmpty(attr.scales)) {
      // 获取映射至常量的值
      value = attr.values[0];
    }
    return value;
  }

  /**
   * 获取该数据发生图形映射后对应的 Attribute 图形空间数据。
   * @param attr Attribute 图形属性实例。
   * @param obj 需要进行映射的原始数据。
   * @returns
   */
  public getAttributeValues(attr: Attribute, obj: Datum) {
    const params = [];
    const scales = attr.scales;
    for (let index = 0, length = scales.length; index < length; index++) {
      const scale = scales[index];
      const field = scale.field;
      if (scale.isIdentity) {
        params.push(scale.values);
      } else {
        params.push(obj[field]);
      }
    }

    return attr.mapping(...params);
  }

  /**
   * 获取对应的 adjust 实例
   * @param adjustType
   * @returns
   */
  public getAdjust(adjustType: string) {
    return this.adjusts[adjustType];
  }

  /**
   * 获得 coordinate 实例
   * @returns
   */
  public getCoordinate() {
    return this.coordinate;
  }

  public getData() {
    return this.data;
  }

  /**
   * 获取 shape 对应的 marker 样式。
   * @param shapeName shape 具体名字
   * @param cfg marker 信息
   * @returns
   */
  public getShapeMarker(shapeName: string, cfg: ShapeMarkerCfg): ShapeMarkerAttrs {
    const shapeFactory = this.getShapeFactory();
    return shapeFactory.getMarker(shapeName, cfg);
  }

  /**
   * 根据一定的规则查找 Geometry 的 Elements。
   *
   * ```typescript
   * getElementsBy((element) => {
   *   const data = element.getData();
   *
   *   return data.a === 'a';
   * });
   * ```
   *
   * @param condition 定义查找规则的回调函数。
   * @returns
   */
  public getElementsBy(condition: (element: Element) => boolean): Element[] {
    return this.elements.filter((element) => condition(element));
  }

  /**
   * 获取 Geometry 的所有 Elements。
   *
   * ```typescript
   * getElements();
   * ```
   */
  public getElements() {
    return this.elements;
  }

  /**
   * 获取数据对应的唯一 id。
   * @param data Element 对应的绘制数据
   * @returns
   */
  public getElementId(data: MappingDatum | MappingDatum[]) {
    data = isArray(data) ? data[0] : data;
    const originData = data[FIELD_ORIGIN];

    // 如果用户声明了使用哪些字段作为 id 值
    if (this.idFields.length) {
      let elementId = originData[this.idFields[0]];
      for (let index = 1; index < this.idFields.length; index++) {
        elementId += '-' + originData[this.idFields[index]];
      }

      return elementId;
    }

    const type = this.type;
    const xScale = this.getXScale();
    const yScale = this.getYScale();
    const xField = xScale.field || 'x';
    const yField = yScale.field || 'y';
    const yVal = originData[yField];
    let xVal;
    if (xScale.type === 'identity') {
      xVal = xScale.values[0];
    } else {
      xVal = originData[xField];
    }

    let id: string;
    if (type === 'interval' || type === 'schema') {
      id = `${xVal}`;
    } else if (type === 'line' || type === 'area' || type === 'path') {
      id = type;
    } else {
      id = `${xVal}-${yVal}`;
    }

    const groupScales = this.groupScales;

    for (let index = 0, length = groupScales.length; index < length; index++) {
      const groupScale = groupScales[index];
      const field = groupScale.field;
      id = `${id}-${originData[field]}`;
    }

    // 用户在进行 dodge 类型的 adjust 调整的时候设置了 dodgeBy 属性
    const dodgeAdjust = this.getAdjust('dodge');
    if (dodgeAdjust) {
      const dodgeBy = dodgeAdjust.dodgeBy;
      if (dodgeBy) {
        id = `${id}-${originData[dodgeBy]}`;
      }
    }

    if (this.getAdjust('jitter')) {
      id = `${id}-${data.x}-${data.y}`;
    }

    return id;
  }

  /**
   * 获取所有需要创建 scale 的字段名称。
   */
  public getScaleFields(): string[] {
    const fields = [];
    const tmpMap = new Map();
    const { attributeOption, labelOption, tooltipOption } = this;
    // 获取图形属性上的 fields
    for (const attributeType in attributeOption) {
      if (attributeOption.hasOwnProperty(attributeType)) {
        const eachOpt = attributeOption[attributeType];
        if (eachOpt.fields) {
          uniq(eachOpt.fields, fields, tmpMap);
        } else if (eachOpt.values) {
          // 考虑 size(10), shape('circle') 等场景
          uniq(eachOpt.values, fields, tmpMap);
        }
      }
    }
    // 获取 label 上的字段
    if (labelOption && labelOption.fields) {
      uniq(labelOption.fields, fields, tmpMap);
    }

    // 获取 tooltip 上的字段
    if (isObject(tooltipOption) && tooltipOption.fields) {
      uniq(tooltipOption.fields, fields, tmpMap);
    }

    return fields;
  }

  /**
   * 显示或者隐藏 geometry。
   * @param visible
   */
  public changeVisible(visible: boolean) {
    super.changeVisible(visible);
    const elements = this.elements;
    for (let index = 0, length = elements.length; index < length; index++) {
      const element = elements[index];
      element.changeVisible(visible);
    }
    if (visible) {
      if (this.container) {
        this.container.show();
      }
      if (this.labelsContainer) {
        this.labelsContainer.show();
      }
    } else {
      if (this.container) {
        this.container.hide();
      }
      if (this.labelsContainer) {
        this.labelsContainer.hide();
      }
    }
  }

  /**
   * 获得所有的字段
   */
  public getFields() {
    const uniqMap = new Map<string, boolean>();
    const fields = [];

    Object.values(this.attributeOption).forEach((cfg) => {
      const fs = cfg?.fields || [];
      fs.forEach((f) => {
        if (!uniqMap.has(f)) {
          fields.push(f);
        }
        uniqMap.set(f, true);
      });
    }, []);

    return fields;
  }

  /**
   * 获取当前配置中的所有分组 & 分类的字段。
   * @return fields string[]
   */
  public getGroupFields(): string[] {
    const groupFields = [];
    const tmpMap = new Map(); // 用于去重过滤
    for (let index = 0, length = GROUP_ATTRS.length; index < length; index++) {
      const attributeName = GROUP_ATTRS[index];
      const cfg = this.attributeOption[attributeName];
      if (cfg && cfg.fields) {
        uniq(cfg.fields, groupFields, tmpMap);
      }
    }

    return groupFields;
  }

  /**
   * 获得图形的 x y 字段。
   */
  public getXYFields() {
    const [x, y] = this.attributeOption.position.fields;
    return [x, y];
  }

  /**
   * x 字段
   * @returns
   */
  public getXField(): string {
    return get(this.getXYFields(), [0]);
  }

  /**
   * y 字段
   * @returns
   */
  public getYField(): string {
    return get(this.getXYFields(), [1]);
  }

  /**
   * 获取该 Geometry 下所有生成的 shapes。
   * @returns shapes
   */
  public getShapes(): (IShape | IGroup)[] {
    return this.elements.map((element: Element) => element.shape);
  }

  /**
   * 获取虚拟 Group。
   * @returns
   */
  public getOffscreenGroup() {
    if (!this.offscreenGroup) {
      const GroupCtor = this.container.getGroupBase(); // 获取分组的构造函数
      this.offscreenGroup = new GroupCtor({});
    }
    return this.offscreenGroup;
  }

  // 对数据进行排序
  public sort(mappingArray: Data[]) {
    if (!this.hasSorted) {
      // 未发生过排序
      const xScale = this.getXScale();
      const xField = xScale.field;
      for (let index = 0; index < mappingArray.length; index++) {
        const itemArr = mappingArray[index];
        itemArr.sort((obj1: Datum, obj2: Datum) => {
          return xScale.translate(obj1[FIELD_ORIGIN][xField]) - xScale.translate(obj2[FIELD_ORIGIN][xField]);
        });
      }
    }

    this.hasSorted = true;
  }

  /**
   * 调整度量范围。主要针对发生层叠以及一些特殊需求的 Geometry，比如 Interval 下的柱状图 Y 轴默认从 0 开始。
   */
  protected adjustScale() {
    const yScale = this.getYScale();
    // 如果数据发生过 stack adjust，需要调整下 yScale 的数据范围
    if (yScale && this.getAdjust('stack')) {
      this.updateStackRange(yScale, this.beforeMappingData);
    }
  }

  /**
   * 获取当前 Geometry 对应的 Shape 工厂实例。
   */
  protected getShapeFactory() {
    const shapeType = this.shapeType;
    if (!getShapeFactory(shapeType)) {
      return;
    }
    if (!this.shapeFactory) {
      this.shapeFactory = clone(getShapeFactory(shapeType)); // 防止多个 view 共享一个 shapeFactory 实例，导致 coordinate 被篡改
    }
    // 因为这里缓存了 shapeFactory，但是外部可能会变更 coordinate，导致无法重新设置到 shapeFactory 中
    this.shapeFactory.coordinate = this.coordinate;
    // theme 原因同上
    this.shapeFactory.theme = this.theme.geometries[shapeType] || {};

    return this.shapeFactory;
  }

  /**
   * 获取每个 Shape 对应的关键点数据。
   * @param obj 经过分组 -> 数字化 -> adjust 调整后的数据记录
   * @returns
   */
  protected createShapePointsCfg(obj: Datum): S {
    const xScale = this.getXScale();
    const yScale = this.getYScale();
    const x = this.normalizeValues(obj[xScale.field], xScale);
    let y; // 存在没有 y 的情况

    if (yScale) {
      y = this.normalizeValues(obj[yScale.field], yScale);
    } else {
      y = obj.y ? obj.y : 0.1;
    }

    return {
      x,
      y,
      y0: yScale ? yScale.scale(this.getYMinValue()) : undefined,
    } as S;
  }

  /**
   * 创建 Element 实例。
   * @param mappingDatum Element 对应的绘制数据
   * @param [isUpdate] 是否处于更新阶段
   * @returns element 返回创建的 Element 实例
   */
  protected createElement(mappingDatum: MappingDatum, index: number, isUpdate: boolean = false): Element {
    const { container } = this;

    const shapeCfg = this.getDrawCfg(mappingDatum); // 获取绘制图形的配置信息
    const shapeFactory = this.getShapeFactory();

    const element = new Element({
      shapeFactory,
      container,
      offscreenGroup: this.getOffscreenGroup(),
      elementIndex: index,
    });
    element.animate = this.animateOption;
    element.geometry = this;
    element.draw(shapeCfg, isUpdate); // 绘制

    return element;
  }

  /**
   * 获取每条数据对应的图形绘制数据。
   * @param mappingDatum 映射后的数据
   * @returns draw cfg
   */
  protected getDrawCfg(mappingDatum: MappingDatum): ShapeInfo {
    const originData = mappingDatum[FIELD_ORIGIN]; // 原始数据
    const cfg: ShapeInfo = {
      mappingData: mappingDatum, // 映射后的数据
      data: originData, // 原始数据
      x: mappingDatum.x,
      y: mappingDatum.y,
      color: mappingDatum.color,
      size: mappingDatum.size,
      isInCircle: this.coordinate.isPolar,
      customInfo: this.customOption,
    };

    let shapeName = mappingDatum.shape;
    if (!shapeName && this.getShapeFactory()) {
      shapeName = this.getShapeFactory().defaultShapeType;
    }
    cfg.shape = shapeName;
    // 获取默认样式
    const theme = this.theme.geometries[this.shapeType];
    cfg.defaultStyle = get(theme, [shapeName, 'default'], {}).style;
    if (!cfg.defaultStyle && this.getShapeFactory()) {
      cfg.defaultStyle = this.getShapeFactory().getDefaultStyle(theme);
    }

    const styleOption = this.styleOption;
    if (styleOption) {
      cfg.style = this.getStyleCfg(styleOption, originData);
    }
    if (this.generatePoints) {
      cfg.points = mappingDatum.points;
      cfg.nextPoints = mappingDatum.nextPoints;
    }

    return cfg;
  }

  protected updateElements(mappingDataArray: MappingDatum[][], isUpdate: boolean = false): void {
    const keyDatum = new Map<string, MappingDatum>();
    const keys: string[] = [];

    // 用来保持 diff 元素之后 added, updated 的相对顺序
    const keyIndex = new Map<string, number>();
    let index = 0;

    // 获得更新数据所有的 keys
    // 将更新的数据用 key 索引
    for (let i = 0; i < mappingDataArray.length; i++) {
      const mappingData = mappingDataArray[i];
      for (let j = 0; j < mappingData.length; j++) {
        const mappingDatum = mappingData[j];
        const key = this.getElementId(mappingDatum);
        const finalKey = keyDatum.has(key) ? `${key}-${i}-${j}` : key;
        keys.push(finalKey);
        keyDatum.set(finalKey, mappingDatum);
        keyIndex.set(finalKey, index);
        index++;
      }
    }

    this.elements = new Array(index);

    const { added, updated, removed } = diff(this.lastElementsMap, keys);

    // 新建 element
    for (const key of added) {
      const mappingDatum = keyDatum.get(key);
      const i = keyIndex.get(key);
      const element = this.createElement(mappingDatum, i, isUpdate);
      this.elements[i] = element;
      this.elementsMap[key] = element;
      if (element.shape) {
        element.shape.set('zIndex', this.zIndexReversed ? this.elements.length - i : i);
      }
    }

    // 更新 element
    for (const key of updated) {
      const element = this.lastElementsMap[key];
      const mappingDatum = keyDatum.get(key);
      const currentShapeCfg = this.getDrawCfg(mappingDatum);
      const preShapeCfg = element.getModel();
      const i = keyIndex.get(key);
      if (this.isCoordinateChanged || isModelChange(currentShapeCfg, preShapeCfg)) {
        element.animate = this.animateOption;
        // 通过绘制数据的变更来判断是否需要更新，因为用户有可能会修改图形属性映射
        element.update(currentShapeCfg); // 更新对应的 element
      }
      this.elements[i] = element;
      this.elementsMap[key] = element;
      if (element.shape) {
        element.shape.set('zIndex', this.zIndexReversed ? this.elements.length - i : i);
      }
    }

    // 全部 setZIndex 之后，再执行 sort
    if (this.container) {
      this.container.sort();
    }

    // 销毁被删除的 elements
    for (const key of removed) {
      const element = this.lastElementsMap[key];
      // 更新动画配置，用户有可能在更新之前有对动画进行配置操作
      element.animate = this.animateOption;
      element.destroy();
    }
  }

  /**
   * 获取渲染的 label 类型。
   */
  protected getLabelType(): string {
    const { labelOption, coordinate, type } = this;
    const { type: coordinateType, isTransposed } = coordinate;
    let labelType = get(labelOption, ['cfg', 'type']);
    if (!labelType) {
      // 用户未定义，则进行默认的逻辑
      if (coordinateType === 'polar') {
        // 极坐标下使用通用的极坐标文本，转置则使用饼图
        labelType = isTransposed ? 'pie' : 'polar';
      } else if (coordinateType === 'theta') {
        // theta 坐标系下使用饼图文本
        labelType = 'pie';
      } else if (type === 'interval' || type === 'polygon') {
        labelType = 'interval';
      } else {
        labelType = 'base';
      }
    }

    return labelType;
  }

  /**
   * 获取 Y 轴上的最小值。
   */
  protected getYMinValue(): number {
    const yScale = this.getYScale();
    const { min, max } = yScale;
    let value: number;

    if (min >= 0) {
      value = min;
    } else if (max <= 0) {
      // 当值全位于负区间时，需要保证 ymin 在区域内，不可为 0
      value = max;
    } else {
      value = 0;
    }
    return value;
  }

  // 创建图形属性相关的配置项
  protected createAttrOption(attrName: string, field: AttributeOption | string | number, cfg?) {
    if (isNil(field) || isObject(field)) {
      if (isObject(field) && isEqual(Object.keys(field), ['values'])) {
        // shape({ values: [ 'funnel' ] })
        set(this.attributeOption, attrName, {
          fields: field.values,
        });
      } else {
        set(this.attributeOption, attrName, field);
      }
    } else {
      const attrCfg: AttributeOption = {};
      if (isNumber(field)) {
        // size(3)
        attrCfg.values = [field];
      } else {
        attrCfg.fields = parseFields(field);
      }

      if (cfg) {
        if (isFunction(cfg)) {
          attrCfg.callback = cfg;
        } else {
          attrCfg.values = cfg;
        }
      }

      set(this.attributeOption, attrName, attrCfg);
    }
  }

  protected initAttributes() {
    const { attributes, attributeOption, theme, shapeType } = this;
    this.groupScales = [];
    const tmpMap = {};

    // 遍历每一个 attrOption，各自创建 Attribute 实例
    for (const attrType in attributeOption) {
      if (attributeOption.hasOwnProperty(attrType)) {
        const option: AttributeOption = attributeOption[attrType];
        if (!option) {
          return;
        }
        const attrCfg: AttributeInstanceCfg = {
          ...option,
        };
        const { callback, values, fields = [] } = attrCfg;

        // 获取每一个字段对应的 scale
        const scales = fields.map((field) => {
          const scale = this.scales[field];
          if (!tmpMap[field] && GROUP_ATTRS.includes(attrType)) {
            const inferedScaleType = inferScaleType(scale, get(this.scaleDefs, field), attrType, this.type);
            if (inferedScaleType === 'cat') {
              this.groupScales.push(scale);
              tmpMap[field] = true;
            }
          }
          return scale;
        });

        attrCfg.scales = scales;

        if (attrType !== 'position' && scales.length === 1 && scales[0].type === 'identity') {
          // 用户在图形通道上声明了常量字段 color('red'), size(5)
          attrCfg.values = scales[0].values;
        } else if (!callback && !values) {
          // 用户没有指定任何规则，则使用默认的映射规则
          if (attrType === 'size') {
            attrCfg.values = theme.sizes;
          } else if (attrType === 'shape') {
            attrCfg.values = theme.shapes[shapeType] || [];
          } else if (attrType === 'color') {
            if (scales.length) {
              // 根据数值个数使用对应的色板
              attrCfg.values = scales[0].values.length <= 10 ? theme.colors10 : theme.colors20;
            } else {
              attrCfg.values = theme.colors10;
            }
          }
        }
        const AttributeCtor = getAttributeClass(attrType);
        attributes[attrType] = new AttributeCtor(attrCfg);
      }
    }
  }

  // 处理数据：分组 -> 数字化 -> adjust 调整
  private processData(data: Data) {
    this.hasSorted = false;
    const { scales } = this.getAttribute('position');
    const categoryScales = scales.filter((scale: Scale) => scale.isCategory);

    const groupedArray = this.groupData(data); // 数据分组
    const beforeAdjust = [];
    for (let i = 0, len = groupedArray.length; i < len; i++) {
      const subData = groupedArray[i];
      const arr = [];
      for (let j = 0, subLen = subData.length; j < subLen; j++) {
        const originData = subData[j];
        const item = {};
        // tslint:disable-next-line: forin
        for (const k in originData) {
          item[k] = originData[k];
        }
        item[FIELD_ORIGIN] = originData;

        // 将分类数据翻译成数据, 仅对位置相关的度量进行数字化处理
        for (const scale of categoryScales) {
          const field = scale.field;
          item[field] = scale.translate(item[field]);
        }
        arr.push(item);
      }
      beforeAdjust.push(arr);
    }

    const dataArray = this.adjustData(beforeAdjust); // 进行 adjust 数据调整
    this.beforeMappingData = dataArray;

    return dataArray;
  }

  // 调整数据
  private adjustData(dataArray: Data[]): Data[] {
    const adjustOption = this.adjustOption;
    const { intervalPadding, dodgePadding, theme } = this;
    // 兼容theme配置
    const maxColumnWidth = this.maxColumnWidth || theme.maxColumnWidth;
    const minColumnWidth = this.minColumnWidth || theme.minColumnWidth;
    const columnWidthRatio = this.columnWidthRatio || theme.columnWidthRatio;
    let result = dataArray;

    if (adjustOption) {
      const xScale = this.getXScale();
      const yScale = this.getYScale();
      const xField = xScale.field;
      const yField = yScale ? yScale.field : null;
      const xDimensionLength = getXDimensionLength(this.coordinate);
      const groupNum = xScale.values.length;
      // 传入size计算相关参数，默认宽度、最大最小宽度约束
      const sizeAttr = this.getAttribute('size');
      let defaultSize;
      if (sizeAttr) {
        defaultSize = sizeAttr.values[0];
      }
      for (let i = 0, len = adjustOption.length; i < len; i++) {
        const adjust = adjustOption[i];
        const adjustCfg: AdjustInstanceCfg = {
          xField,
          yField,
          intervalPadding,
          dodgePadding,
          xDimensionLength,
          groupNum,
          defaultSize,
          maxColumnWidth,
          minColumnWidth,
          columnWidthRatio,
          ...adjust,
        };
        const type = adjust.type;
        if (type === 'dodge') {
          const adjustNames = [];
          if (xScale.isCategory || xScale.type === 'identity') {
            adjustNames.push('x');
          } else if (!yScale) {
            adjustNames.push('y');
          } else {
            throw new Error('dodge is not support linear attribute, please use category attribute!');
          }
          adjustCfg.adjustNames = adjustNames;
          // 每个分组内每条柱子的宽度占比，用户不可指定，用户需要通过 columnWidthRatio 指定
          // 兼容theme配置
          adjustCfg.dodgeRatio = columnWidthRatio;
        } else if (type === 'stack') {
          const coordinate = this.coordinate;
          if (!yScale) {
            // 一维的情况下获取高度和默认size
            adjustCfg.height = coordinate.getHeight();
            const size = this.getDefaultValue('size') || 3;
            adjustCfg.size = size;
          }
          // 不进行 transpose 时，用户又没有设置这个参数时，默认从上向下
          if (!coordinate.isTransposed && isNil(adjustCfg.reverseOrder)) {
            adjustCfg.reverseOrder = true;
          }
        }
        const adjustCtor = getAdjustClass(type);
        adjustCfg.dimValuesMap = {};
        //生成dimValuesMap
        if (xScale && xScale.values) {
          adjustCfg.dimValuesMap[xScale.field] = xScale.values.map((v) => xScale.translate(v));
        }
        const adjustInstance = new adjustCtor(adjustCfg);

        result = adjustInstance.process(result);

        this.adjusts[type] = adjustInstance;
      }
    }

    return result;
  }

  // 对数据进行分组
  private groupData(data: Data): Data[] {
    const groupScales = this.getGroupScales();
    const scaleDefs = this.scaleDefs;
    const appendConditions = {};
    const groupFields = [];
    for (let index = 0; index < groupScales.length; index++) {
      const scale = groupScales[index];
      const field = scale.field;
      groupFields.push(field);
      if (get(scaleDefs, [field, 'values'])) {
        // 用户通过 view.scale() 接口指定了 values 属性
        appendConditions[field] = scaleDefs[field].values;
      }
    }

    return group(data, groupFields, appendConditions);
  }

  // 更新发生层叠后的数据对应的度量范围
  private updateStackRange(scale: Scale, dataArray: Data[]) {
    const mergeArray = flatten(dataArray);
    const field = scale.field;
    let min = scale.min;
    let max = scale.max;
    for (let index = 0; index < mergeArray.length; index++) {
      const obj = mergeArray[index];
      const tmpMin = Math.min.apply(null, obj[field]);
      const tmpMax = Math.max.apply(null, obj[field]);
      if (tmpMin < min) {
        min = tmpMin;
      }
      if (tmpMax > max) {
        max = tmpMax;
      }
    }
    const scaleDefs = this.scaleDefs;
    const cfg: LooseObject = {};
    if (min < scale.min && !get(scaleDefs, [field, 'min'])) {
      // 用户如果在列定义中定义了 min，则以用户定义的为准
      cfg.min = min;
    }
    if (max > scale.max && !get(scaleDefs, [field, 'max'])) {
      // 用户如果在列定义中定义了 max
      cfg.max = max;
    }

    scale.change(cfg);
  }

  // 将数据映射至图形空间前的操作：排序以及关键点的生成
  private beforeMapping(beforeMappingData: Data[]) {
    // 当初加 clone 是因为 points 的引用关系，导致更新失败，可是现在貌似复现不出来了，所以暂时不进行 clone
    // const source = clone(beforeMappingData);
    const source = beforeMappingData;
    if (this.sortable) {
      this.sort(source);
    }
    if (this.generatePoints) {
      // 需要生成关键点
      for (let index = 0, length = source.length; index < length; index++) {
        const currentData = source[index];
        this.generateShapePoints(currentData);
        const nextData = source[index + 1];
        if (nextData) {
          this.generateShapePoints(nextData);
          currentData[0].nextPoints = nextData[0].points;
        }
      }
    }

    return source;
  }

  // 生成 shape 的关键点
  private generateShapePoints(data: Data) {
    const shapeFactory = this.getShapeFactory();
    const shapeAttr = this.getAttribute('shape');
    for (let index = 0; index < data.length; index++) {
      const obj = data[index];
      const cfg = this.createShapePointsCfg(obj);
      const shape = shapeAttr ? this.getAttributeValues(shapeAttr, obj) : null;
      const points = shapeFactory.getShapePoints(shape, cfg);
      obj.points = points;
    }
  }

  // 将数据归一化
  private normalizeValues(values, scale) {
    let rst = [];
    if (isArray(values)) {
      for (let index = 0; index < values.length; index++) {
        const value = values[index];
        rst.push(scale.scale(value));
      }
    } else {
      rst = scale.scale(values);
    }
    return rst;
  }

  // 将数据映射至图形空间
  private mapping(data: Data): MappingDatum[] {
    const attributes = this.attributes;
    const mappingData = [];
    for (let index = 0; index < data.length; index++) {
      const record = data[index];
      const newRecord: MappingDatum = {
        _origin: record[FIELD_ORIGIN],
        points: record.points,
        nextPoints: record.nextPoints,
      };
      for (const k in attributes) {
        if (attributes.hasOwnProperty(k)) {
          const attr = attributes[k];
          const names = attr.names;
          const values = this.getAttributeValues(attr, record);
          if (names.length > 1) {
            // position 之类的生成多个字段的属性
            for (let j = 0; j < values.length; j += 1) {
              const val = values[j];
              const name = names[j];
              newRecord[name] = isArray(val) && val.length === 1 ? val[0] : val; // 只有一个值时返回第一个属性值
            }
          } else {
            // values.length === 1 的判断是以下情况，获取用户设置的图形属性值
            // shape('a', ['dot', 'dash']), color('a', ['red', 'yellow'])
            newRecord[names[0]] = values.length === 1 ? values[0] : values;
          }
        }
      }

      this.convertPoint(newRecord); // 将 x、y 转换成画布坐标
      mappingData.push(newRecord);
    }

    return mappingData;
  }

  // 将归一化的坐标值转换成画布坐标
  private convertPoint(mappingRecord: MappingDatum) {
    const { x, y } = mappingRecord;

    let rstX;
    let rstY;
    let obj;
    const coordinate = this.coordinate;
    if (isArray(x) && isArray(y)) {
      rstX = [];
      rstY = [];
      for (let i = 0, j = 0, xLen = x.length, yLen = y.length; i < xLen && j < yLen; i += 1, j += 1) {
        obj = coordinate.convert({
          x: x[i],
          y: y[j],
        });
        rstX.push(obj.x);
        rstY.push(obj.y);
      }
    } else if (isArray(y)) {
      rstY = [];
      for (let index = 0; index < y.length; index++) {
        const yVal = y[index];
        obj = coordinate.convert({
          x: x as number,
          y: yVal,
        });
        if (rstX && rstX !== obj.x) {
          if (!isArray(rstX)) {
            rstX = [rstX];
          }
          rstX.push(obj.x);
        } else {
          rstX = obj.x;
        }
        rstY.push(obj.y);
      }
    } else if (isArray(x)) {
      rstX = [];
      for (let index = 0; index < x.length; index++) {
        const xVal = x[index];
        obj = coordinate.convert({
          x: xVal,
          y,
        });
        if (rstY && rstY !== obj.y) {
          if (!isArray(rstY)) {
            rstY = [rstY];
          }
          rstY.push(obj.y);
        } else {
          rstY = obj.y;
        }
        rstX.push(obj.x);
      }
    } else {
      const point = coordinate.convert({
        x,
        y,
      });
      rstX = point.x;
      rstY = point.y;
    }
    mappingRecord.x = rstX;
    mappingRecord.y = rstY;
  }

  // 获取 style 配置
  private getStyleCfg(styleOption: StyleOption, originData: Datum) {
    const { fields = [], callback, cfg } = styleOption;
    if (cfg) {
      // 用户直接配置样式属性
      return cfg;
    }

    const params = fields.map((field) => {
      return originData[field];
    });

    return callback(...params);
  }

  private setCfg(cfg: InitCfg) {
    const { coordinate, data, theme, scaleDefs } = cfg;
    if (coordinate) {
      this.coordinate = coordinate;
    }
    if (data) {
      this.data = data;
    }
    if (scaleDefs) {
      this.scaleDefs = scaleDefs;
      this.idFields = [];
      each(scaleDefs, (scaleDef, field) => {
        if (scaleDef && scaleDef.key) {
          this.idFields.push(field);
        }
      });
    }
    if (theme) {
      this.theme = this.userTheme ? deepMix({}, theme, this.userTheme) : theme; // 支持 geometry 层级的主题设置
    }
  }

  private async renderLabels(mappingArray: MappingDatum[], isUpdate: boolean = false) {
    let geometryLabel = this.geometryLabel;

    this.emit(GEOMETRY_LIFE_CIRCLE.BEFORE_RENDER_LABEL);

    if (!geometryLabel) {
      // 初次创建
      const labelType = this.getLabelType();
      const GeometryLabelsCtor = getGeometryLabel(labelType);
      geometryLabel = new GeometryLabelsCtor(this);
      this.geometryLabel = geometryLabel;
    }
    await geometryLabel.render(mappingArray, isUpdate);

    // 将 label 同 element 进行关联
    const labelsMap = geometryLabel.labelsRenderer.shapesMap;
    // Store labels for every element.
    const elementLabels = new Map<Element, Set<IGroup>>();
    each(labelsMap, (labelGroup: IGroup, labelGroupId: string) => {
      const labelChildren = labelGroup.getChildren() || [];
      for (let j = 0; j < labelChildren.length; j++) {
        const labelShape = labelChildren[j];
        const element = this.elementsMap[labelShape.get('elementId') || labelGroupId.split(' ')[0]];
        if (element) {
          labelShape.cfg.name = ['element', 'label'];
          labelShape.cfg.element = element;
          const labels = elementLabels.get(element) || new Set();
          labels.add(labelGroup);
          elementLabels.set(element, labels);
        }
      }
    });
    for (const [element, labels] of elementLabels.entries()) {
      element.labelShape = [...labels];
    }

    this.emit(GEOMETRY_LIFE_CIRCLE.AFTER_RENDER_LABEL);
  }
  /**
   * 是否需要进行群组入场动画
   * 规则：
   * 1. 如果发生更新，则不进行
   * 2. 如果用户关闭 geometry 动画，则不进行
   * 3. 如果用户关闭了 appear 动画，则不进行
   * 4. 如果用户配置了 appear.animation，则不进行
   */
  private canDoGroupAnimation(isUpdate: boolean) {
    return (
      !isUpdate &&
      this.animateOption &&
      (get(this.animateOption, 'appear') === undefined ||
        (get(this.animateOption, 'appear') && get(this.animateOption, ['appear', 'animation']) === undefined))
    );
  }
}
