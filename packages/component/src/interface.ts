import { Coordinate } from '@antv/coord';
import { Group } from '@antv/g';

export interface CommonCfg {
  [ k: string ]: any;
}

export interface GuideCfg {
  id?: string | null;

  // 容器
  readonly canvas?: any; // TODO G.Canvas
  readonly container?: Group | string | HTMLDivElement | null; // html，可选
  readonly group?: any; // TODO G.Group

  // 交互属性
  readonly capture?: boolean;

  // props
  // readonly coordinate: any; // TODO Coordinate
  readonly panelRange?: any; // BBox
  // readonly offset: [ number, number ];
  readonly offsetX?: number;
  readonly offsetY?: number;
  readonly position?: [ number, number ];
  readonly visible?: boolean;
  readonly zIndex?: number;
  [key: string]: any;
}

export interface Attrs {
  visible?: boolean;

  [key: string]: any; // todo，需要等 Attrs 模块重构完毕才确定结构
}

export interface LabelType { // TODO G.Shape / DOM
  readonly tagName?: string;
  readonly innerHTML?: string;
  readonly id?: string;
  readonly attr: Function;
  readonly resetMatrix?: Function;
  readonly textStyle?: {
    [key:string]: any;
  };
  readonly getBBox: Function;
  readonly remove: Function;
}

export interface ShapeType {
  readonly getBBox: Function;
}

export interface TextType {
  readonly x: number;
  readonly y: number;
  readonly text: string;
  readonly fontSize?: number;
  readonly fontFamily?: string;
  readonly fontStyle?: string;
  readonly fontWeight?: string|number;
  readonly fontVariant?: string;
  readonly textAlign?: string;
  readonly textBaseline?: string;
  readonly lineHeight?: number;
  readonly textArr?: string;
}

export interface PointType {
  x: number;
  y: number;
}
export interface GroupType {
  readonly getBBox: Function;
  readonly move: Function;
  readonly setSilent:Function;
  readonly findBy: Function;
  readonly get: Function;
  readonly set: Function;
}
export interface LegendItem {
  value:string;
  checked:boolean;
  marker:any;
}
export interface EventType {
  x: number;
  y: number;
  clientX;
  clientY;
  cfg: {
    [key: string]: any;
  };
  type: string;
  target: any;
  currentTarget: any;
  bubbles: boolean;
  cancelable: boolean;
  timeStamp: number; // 时间戳
  defaultPrevented: boolean;
  propagationStopped: boolean; // 阻止冒泡
  event: any;
  [key:string]:any;
}

// 图例通用配置项
export interface LegendCfg extends GuideCfg {
  readonly type: string; // 图例的类型
  readonly title?: string; // 图例标题
  readonly items?: CommonCfg[]; // 图例项配置, TODO: 确定了分类和连续 item 的配置后再修改
  readonly formatter?: Function; // 文本格式化函数
}

// 分类图例通用配置
export interface CategoryLegendCfg extends LegendCfg {
  layout?: 'horizontal' | 'vertical';
  reversed?: boolean;

  clickable?: boolean;
  hoverable?: boolean;
  selectedMode?: 'single' | 'multiple';
  allowAllCanceled?: boolean;

  titleStyle?: CommonCfg;
  unSelectedColor?: string;
  backgroudStyle?: CommonCfg;

  offsetX?: number;
  offsetY?: number;
}

// Canvas 分类图例配置
export interface CanvasCategoryLegendCfg extends CategoryLegendCfg {
  readonly textStyle: CommonCfg;  // 图例项目文本样式
  readonly titleDistance: number; // 标题和图例项的间距
  readonly itemDistance?: number; // 图例项之间水平方向的间距
  readonly autoWrap: boolean; // 图例项是否自动换行
  readonly itemWidth: number; // 图例项目宽度
  readonly wordSpacing: number; // 图例项文本同 marker 之间的间距
  readonly itemMarginBottom: number; // 图例项之间的底部间距
  readonly backgroundPadding: number | number[]; // 背景内边距
  readonly maxLength: number; // 图例的最大高度或者宽度
  maxWidth?: number;
  maxHeight?: number;
}

// HTML 分类图例配置项
export interface HTMLCategoryLegendCfg extends CategoryLegendCfg {
  readonly container?: HTMLDivElement | string;
  readonly maxWidth: number; // 图例最大宽度
  readonly maxHeight: number; // 图例最大高度
  readonly containerTpl?: string; // HTML 容器的模板
  readonly itemTpl?: string | Function; // 图例项模板，支持回调函数自定义
  readonly pagination: CommonCfg | false; // 分页器样式
  readonly prefixClassName?: string; // 样式类名前缀
  readonly itemStyle?: CommonCfg; // 图例项 dom css 样式
  readonly markerStyle?: CommonCfg; // 图例项 marker dom css 样式
  readonly listStyle?: CommonCfg; // 图例项容器 dom css 样式
  readonly highlight?: boolean; // 是否开启 hover 效果
}

export interface ContinuousLegendCfg extends LegendCfg {
  readonly items: any[]; // 图例项内容
  readonly textStyle: object; // 设置图例项文本的样式

  // 连续图例的宽高由上层给
  readonly width: number; // 图例的宽度
  readonly height: number; // 图例的高度

  // 滑块的样式配置
  readonly handleIcon: any; // 定义滑块的图标
  readonly handleSize: [number, number]; // 定义滑块的大小
  readonly handleStyle: object; // 定义滑块的图形样式
  readonly backgroundStyle: object; // 定义滑块的背景样式
  readonly fillStyle: object; // 定义滑块当前范围区间的样式

  readonly operational: boolean; // 是否可交互
}

export interface ContinuousItem {
  readonly value: string | number;
  readonly color?: string;
}

export interface SizeContinuousLegendCfg extends ContinuousLegendCfg {
  readonly items: ContinuousItem[]; // 尺寸图例项内容
}

export interface ColorItemType extends ContinuousItem {
  percentage?: number;
}

export interface ColorContinuousLegendCfg extends ContinuousLegendCfg {
  readonly items: ColorItemType[]; // 尺寸图例项内容
  readonly isSegment: boolean;
}

// 坐标轴相关的配置项定义
interface Tick {
  text: string; // 展示名
  value: number; // 转换值
  tickValue: string | number; // 原始值
}
interface TickLine {
  length?: number; // 刻度线的长度
  [ key: string ]: any;
}
type gridCallback = (text: string, index: number, total: number) => CommonCfg | null;
interface AxisLabelOption {
  offset?: number; // 坐标轴文本距离坐标轴线的距离
  offsetX?: number; // 在 offset 的基础上，设置坐标轴文本在 x 方向上的偏移量
  offsetY?: number; // 在 offset 的基础上，设置坐标轴文本在 y 方向上的偏移量
  rotate?: number; // label 文本旋转的角度，使用角度制
  textStyle?: CommonCfg; // 文本的样式定义
  text?: string; // label 的文本显示内容
  useHtml?: boolean; // 是否开启使用 HTML 渲染坐标轴文本
  htmlTemplate?: string; // 返回 label 的 html 字符串
}
type labelCallback = (text: string, index: number, total: number) => AxisLabelOption | null;
interface AxisTitleOption {
  offset?: number; // 设置坐标轴标题距离坐标轴线的距离
  textStyle?: CommonCfg; // 坐标轴标题文本的样式
  position?: 'start' | 'center' | 'end'; // 标题的显示位置（相对于坐标轴线），可取值为 start center end
}
export interface GridPoint {
  x: number;
  y: number;
  flag?: number;
  radius?: number;
}
export interface GridPoints {
  id: string;
  points: GridPoint[];
}

export interface AxisCfg extends GuideCfg {
  type: string; // 坐标轴的类型
  ticks: Tick[]; // 坐标轴的刻度信息
  line?: CommonCfg; // 坐标轴线的样式配置
  tickLine?: TickLine; // 坐标轴刻度线的样式配置
  subTickCount?: number; // 坐标轴次刻度线个数
  subTickLine?: TickLine; // 坐标轴次刻度线的样式配置
  grid?: CommonCfg | gridCallback | null; // 坐标轴网格线配置
  label?: AxisLabelOption | labelCallback | null;
  title?: AxisTitleOption; // 坐标轴标题配置
  autoRotateLabel?: boolean;
  autoHideLabel?: boolean;
  autoRotateTitle?: boolean;
  gridType?: 'line' | 'arc'; // 坐标轴网格线的样式
  gridAlign?: 'center'; // 声明网格顶点从两个刻度中间开始，默认从刻度点开始
  gridAlternateColor?: string | [string, string]; // 为网格设置交替的颜色，指定一个值则先渲染奇数层，两个值则交替渲染
  theme?: CommonCfg; // 坐标轴样式主题配置
  appendInfo?: any;
  coord?: Coord;
  gridPoints?: GridPoints;
}

export interface CircleAxisCfg extends AxisCfg {
  startAngle?: number;
  endAngle?: number;
  center: PointType;
  radius: number;
  inner: number;
}

export interface HelixAxisCfg extends AxisCfg {
  startAngle?: number;
  endAngle?: number;
  center: PointType;
  inner: number;
  a: number;
  axisStart: PointType;
  crp: PointType[];
}

export interface LineAxisCfg extends AxisCfg {
  isVertical: boolean;
  start: PointType;
  end: PointType;
  factor: 1 | -1;
}
