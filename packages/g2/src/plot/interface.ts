import { DataPointType } from '../interface';

export interface States {
  [key: string]: any;
}

// view.legend() 图例相关的配置项类型定义
type Position = 'top' | 'right' | 'bottom' | 'left' |
  'left-top' | 'left-center' | 'left-bottom' |
  'right-top' | 'right-center' | 'right-bottom' |
  'top-left' | 'top-center' | 'top-right' |
  'bottom-left' | 'bottom-center' | 'bottom-right';

type Marker = 'circle' | 'square' | 'diamond' | 'triangle' | 'triangleDown' |
  'hexagon' | 'bowtie' | 'cross' | 'tick' | 'plus' | 'hyphen' | 'line' |
  'hollowCircle' | 'hollowSquare' | 'hollowDiamond' | 'hollowTriangle' | 'hollowTriangleDown' |
  'hollowHexagon' | 'hollowBowtie';
type MarkerCallback = (x: number, y: number, r: number) => any[][];
interface MarkerCfg {
  symbol: Marker | MarkerCallback; // marker 的形状
  fill?: string; // marker 的填充色，如果 marker 需要填充的话
  stroke?: string; // marker 的描边色，如果 marker 需要描边的话
  radius?: number; // marker 的大小
}
interface CustomLegendItem {
  value: any; // 图例项显示内容
  checked?: boolean; // 图例项选中状态
  color?: string; // marker 的颜色
  marker: Marker | MarkerCfg;
}

type HtmlItemTpl = (value: string, color: string, checked: boolean, index: number) => string;
export interface LegendOption {
  layout?: 'horizontal' | 'vertical'; // 图例的布局
  showTitle?: boolean; // 是否展示标题
  titleStyle?: DataPointType; // showTitle 为 true 时生效，用于设置标题的文本样式
  titleDistance?: number; // showTitle 为 true 时生效，用于设置标题同图例项之间的距离
  formatter?: (val: any) => any; // 格式化图例项文本的回调函数
  offsetX?: number; // 图例 x 方向的偏移量
  offsetY?: number; // 图例 y 方向的偏移量
  reversed?: boolean; // 图例项的顺序是否要逆序，默认为 false
  backgroundStyle?: DataPointType; // 图例的背景样式
  position?: Position; // 设置图例的显示位置
  marker?: Marker | MarkerCallback; // 定义图例项的 marker
  useHtml?: boolean; // 是否使用 html 渲染分类图例
  flipPage?: boolean;

  // 自定义图例
  custom?: boolean; // true 表示不使用默认图例，自定义图例
  items?: CustomLegendItem[]; // 自定义图例项时，定义 items 图例项内容
  onClick?: Function; // 自定义鼠标点击到图例项时的交互行为
  onMouseover?: Function; // 自定义鼠标 hover 到图例项时的交互行为
  onMouseleave?: Function; // 自定义鼠标离开图例项时的交互行为

  // 分类图例特有的配置项
  unSelectedColor?: string; // 取消选中的图例项的颜色配置
  clickable?: boolean; // 图例项是否允许点击，默认为 true
  hoverable?: boolean; // 图例项是否允许 hover，默认为 true
  selectedMode?: 'single' | 'multiple'; // 图例的选中模式，`clickable` 为 true 时生效，默认值为 `multiple`
  allowAllCanceled?: boolean; // 表示是否允许所有图例项被取消选中，默认为 false，即必须保留一个被选中的图例项
  highlight?: boolean; // 图例项被 hover 时，是否开启 highlight 效果，默认为 false

  // Canvas 分类图例特有的配置项
  itemDistance?: number; // layout 为 horizontal 时，图例项水平方向之间的间距
  itemMarginBottom?: number; // 图例项垂直方向之间的间距
  itemWidth?: number; // 图例项的宽度
  textStyle?: DataPointType; // 设置图例项文本的样式
  wordSpacing?: number; // maker 同 text 之间的距离
  autoWrap?: boolean; // 是否自动换行，默认为 true
  backgroundPadding?: number | number[]; // 图例背景的内边距

  // HTML 分类图例特有的配置项
  width?: number; // 图例的宽度
  height?: number; // 图例的高度
  container?: string | HTMLElement; // 传入 html legend 挂载的 dom 节点，如果不传入，则默认挂载到 chart 的 dom 下
  containerTpl?: string; // HTML 图例的结构模板
  itemTpl?: string | HtmlItemTpl; // 图例项的结构模板
  listStyle?: DataPointType; // 图例项容器列表 dom 的 css 样式
  itemStyle?: DataPointType; // 图例项 dom 的 css 样式
  markerStyle?: DataPointType; // 图例项 marker dom 的 css 样式
  prefixClassName?: string; // dom 的 css 样式前缀，默认值为 g2-legend
  pagination?: object | false; // 当图例过多超出高度时，自动分页，如果将该属性设置为 false，那么关闭分页功能，默认展示滚动条

  // 连续图例特有配置项
  handleIcon?: 'circle' | 'rect'; // 定义滑块的图标，只对大小图例生效
  handleSize?: [ number, number ]; // 定义滑块的大小，依次为宽、高
  handleStyle?: DataPointType; // 定义滑块的图形样式
  fillStyle?: DataPointType; // 定义滑块当前范围区间的样式
  operational?: boolean; // 是否可滑动
  isSegment?: boolean; // 针对连续的颜色图例，设置图例样式是否为分块颜色模式
}

export interface LegendsOption extends LegendOption {
  fields: { [field: string]: LegendOption | boolean };
}

export interface ThemeOption {
  defaultColor?: string;
  fontFamily?: string;
  defaultLegendPosition: string;
  legend?: {
    [key: string]: any,
  };
  [key: string]: any;
}

export interface SubRegion {
  maxWidth: number;
  totalWidth: number;
  maxHeight: number;
  totalHeight: number;
}

export interface Region {
  totalWidth: number;
  totalHeight: number;
  subs: SubRegion[];
}

export type CoordinateType = 'polar' | 'theta' | 'rect' | 'cartesian' | 'helix' | 'geo';
export interface CoordinateCfg {
  // 极坐标系配置
  startAngle?: number; // 起始弧度
  endAngle?: number; // 结束弧度
  radius?: number; // 极坐标半径，0 - 1 范围的数值
  innerRadius?: number; // 极坐标内半径，0 -1 范围的数值

  // 地理坐标系配置
  zoom?: number; // 缩放等级，0 - 20 的数值范围
  center?: [number, number]; // 中心经纬度设置，比如 [ 120, 20 ]
}

export interface CoordinateOption {
  type?: CoordinateType; // 坐标系类型
  cfg?: CoordinateCfg; // 坐标系配置项
  actions?: any[][]; // 坐标系变换操作
}

// view.axis() 坐标轴相关的配置项类型定义
// label 属性支持的配置项定义
interface AxisLabelOption {
  offset?: number; // 坐标轴文本距离坐标轴线的距离
  offsetX?: number; // 在 offset 的基础上，设置坐标轴文本在 x 方向上的偏移量
  offsetY?: number; // 在 offset 的基础上，设置坐标轴文本在 y 方向上的偏移量
  rotate?: number; // label 文本旋转的角度，使用角度制
  textStyle?: DataPointType; // 文本的样式定义
  text?: string; // label 的文本显示内容
  useHtml?: boolean; // 是否开启使用 HTML 渲染坐标轴文本
  htmlTemplate?: string; // 返回 label 的 html 字符串
}
type labelCallback = (text: string, index: number, total: number) => AxisLabelOption | null;
type gridCallback = (text: string, index: number, total: number) => DataPointType | null;
// title 属性支持的配置项定义
interface AxisTitleOption {
  offset?: number; // 设置坐标轴标题距离坐标轴线的距离
  textStyle?: DataPointType; // 坐标轴标题文本的样式
  position?: 'start' | 'center' | 'end'; // 标题的显示位置（相对于坐标轴线），可取值为 start center end
  rotate?: number; // 标题文本旋转的角度
}

// 坐标轴刻度线 tickLine 属性支持的配置项定义
interface AxisTickLineOption {
  length?: number; // 坐标轴刻度线的长度，可以为负值（表示进行反向渲染）
  [ key: string ]: any; // 其他图形属性
}

// view.axis(fieldName, cfg) 接口中 cfg 的配置项属性
export interface AxisOption {
  positon?: 'top' | 'bottom' | 'left' | 'right'; // 坐标轴的显示位置
  line?: DataPointType | null; // 坐标轴线的配置，为 null 表示不展示
  autoRotateLabel?: boolean; // 当 label 过长发生遮挡时是否自动旋转坐标轴文本
  autoHideLabel?: boolean; // 当 label 存在遮挡时，是否自动隐藏被遮挡的坐标轴文本
  autoRotateTitle?: true; // 渲染标题时，默认会按需旋转标题
  label?: AxisLabelOption | labelCallback | null; // 坐标轴文本的配置，为 null 表示不展示
  gridType?: 'line' | 'arc'; // 坐标轴网格线的样式
  gridAlign?: 'center'; // 声明网格顶点从两个刻度中间开始，默认从刻度点开始
  gridAlternateColor?: string | [string, string]; // 为网格设置交替的颜色，指定一个值则先渲染奇数层，两个值则交替渲染
  grid?: DataPointType | gridCallback | null; // 坐标轴网格线的配置，为 null 表示不展示
  showTitle?: boolean; // 是否展示坐标轴标题
  title?: AxisTitleOption; // 坐标轴标题的配置，在 showTitle 为 true 时方才生效
  tickLine?: AxisTickLineOption; // 配置坐标轴主刻度线
  subTickCount?: number; // 设置每两个刻度之间次刻度线的个数，默认为 0，即不展示次刻度线
  subTickLine?: AxisTickLineOption; // 设置坐标轴子刻度线的样式
}

export interface AxisOptions {
  [ key: string ]: AxisOption;
}

export interface AxesOption {
  fields: { [field: string]: AxisOption | boolean };
}

interface CommonConfig {
  type: string;
  [propName: string]: any; // 任意属性
}
type ParserCallback = (states: States) => CommonConfig;
type TransformCallback = (states: States) => CommonConfig | CommonConfig[];

export interface DataCfg {
  source: any; // 原始数据
  parser?: CommonConfig | ParserCallback; // parser 解析方式
  transform?: CommonConfig | CommonConfig[] | TransformCallback; // 数据转换操作
}

interface CrosshairsCfg {
  type: 'cross' | 'x' | 'y'; // 辅助线的类型
  style?: DataPointType; // 辅助线的样式
}
type HtmlContentCallback = (title: string, items: DataPointType[]) => string | HTMLElement;
export interface TooltipOption {
  showTitle?: boolean; // 是否展示 tooltip 标题
  triggerOn?: 'mousemove' | 'click' | 'none'; // tooltip 的触发方式
  inPanel?: boolean; // 设置是否将 tooltip 限制在绘图区域内，默认为 true
  position?: 'inside' | 'top' | 'bottom' | 'left' | 'right'; // 设置 tooltip 的固定展示位置，相对于数据点
  shared?: boolean; // 是否只展示单条数据
  follow?: boolean; // 设置 tooltip 是否跟随鼠标移动
  crosshairs?: CrosshairsCfg | null; // tooltip 辅助线配置
  title?: string; // 在 showTitle 为 true 时，设置 tooltip 标题对应的数据字段
  useHtml?: boolean; // 是否使用 html 渲染 tooltip，默认为 true
  showTooltipMarkers?: boolean; // 是否自动渲染 tooltipMarkers，目前 line、area、path 会默认渲染

  // HTML 类型的 tooltip 特有的属性
  htmlContent?: HtmlContentCallback; // 自定义 tooltip 的显示
  containerTpl?: string; // 用于指定图例容器的模板，自定义模板时必须包含各个 dom 节点的 class
  itemTpl?: string; // 每项记录的默认模板，自定义模板时必须包含各个 dom 节点的 class
  enterable?: boolean; // 是否允许鼠标进入 tooltip 内容框
  'g2-tooltip'?: DataPointType; // 设置 tooltip 容器的 css 样式
  'g2-tooltip-title'?: DataPointType; // 设置 tooltip 标题的 css 样式
  'g2-tooltip-list'?: DataPointType; // 设置 tooltip 列表容器的 css 样式
  'g2-tooltip-list-item'?: DataPointType; // 设置 tooltip 每一个记录项的 css 样式
  'g2-tooltip-marker'?: DataPointType; // 设置tooltip 列表容器中每一项 marker 的 CSS 样式
  'g2-tooltip-value'?: DataPointType; // 设置tooltip 列表容器中每一项 value 的 CSS 样式

  // Canvas 类型的 tooltip 特有的属性
  backgroundStyle?: DataPointType; // tooltip 内容框背景样式设置
  titleStyle?: DataPointType; // tooltip 标题样式设置
  nameStyle?: DataPointType; // tooltip 记录项 name 对应的文本显示样式设置
  valueStyle?: DataPointType; // tooltip 记录项 value 对应的文本显示样式设置
  markerStyle?: DataPointType; // tooltip 记录项 marker 对应的显示样式设置
  itemGap?: number; // tooltip 每一个记录项之间的间距设置
}

export type FilterCallback = (fieldValue: any) => boolean;

// view.scale() 配置项定义
// Scale 通用配置项
interface ScaleCommonOption {
  alias?: string; // 数据字段的显示别名
  values?: any[]; // 数据值
  range?: [ number, number ]; // 输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据
  formatter?: (value: any, index?: number) => string; // 用于格式化坐标轴刻度点的文本显示
  ticks?: any[]; // 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示
  tickCount?: number; // 设置坐标轴上的刻度点个数
}
// 分类度量定义
interface CategoryScaleOption extends ScaleCommonOption {
  type: 'cat';
  tickInterval?: number; // 不建议使用，优先级高于tickCount，可以强制设置tick分隔间隔
}
// 常量度量定义
interface IdentityScaleOption extends ScaleCommonOption {
  type: 'identity';
}
// 线性度量定义
interface LinearScaleOption extends ScaleCommonOption {
  type: 'linear';
  min?: number; // 输入的最小值
  max?: number; // 输入的最大值
  nice?: true; // 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布
}
// 指数类型度量定义
interface PowScaleOption extends ScaleCommonOption {
  type: 'pow';
  exponent?: number; // 指数，默认值为 1
}
// 对数度量定义
interface LogScaleOption extends ScaleCommonOption {
  type: 'log';
  base?: number; // 对数底数，默认值为 10
}
// 时间类型度量定义
interface TimeScaleOption extends ScaleCommonOption {
  type: 'time';
  showLast?: boolean; // 强制显示最后的日期tick
  tickInterval?: number; // 时间戳，强制设置tick分隔间隔
}

export type ScaleOption = CategoryScaleOption | IdentityScaleOption | LinearScaleOption
  | PowScaleOption | LogScaleOption | TimeScaleOption;
export interface ScalesOption {
  [ key: string ]: ScaleOption;
}
