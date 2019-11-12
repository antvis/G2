import { COMPONENT_TYPE, DIRECTION, LAYER } from '../constant';
import { Component } from '../dependents';
import { CategoryLegendCfg, CircleAxisCfg, ICanvas, IGroup, LineAxisCfg } from '../dependents';
import Interaction from '../interaction/base';
import { Data, Datum, LooseObject, Padding, Region, Renderer, ScaleOption } from '../interface';
import View from './view';

// chart 构造方法的入参
export interface ChartCfg {
  readonly container: string | HTMLElement;
  readonly width?: number;
  readonly height?: number;
  readonly autoFit?: boolean;
  readonly renderer?: Renderer;
  readonly pixelRatio?: number;
  readonly padding?: number | number[];
}

// view 构造参数
export interface ViewCfg {
  readonly parent: View;
  readonly canvas: ICanvas;
  /** 前景层 */
  readonly foregroundGroup: IGroup;
  /** 中间层 */
  readonly middleGroup: IGroup;
  /** 背景层 */
  readonly backgroundGroup: IGroup;
  /** 位置大小范围 */
  readonly region?: Region;
  readonly padding?: Padding;
  readonly theme?: object | string;
  readonly options?: Options;
}

// 组件及布局的信息
export interface ComponentOption {
  readonly component: Component;
  readonly layer: LAYER;
  readonly direction: DIRECTION;
  readonly type: COMPONENT_TYPE;
}

/* 筛选器函数类型定义 */
export type FilterCondition = (value: any, datum: Datum) => boolean;

export type AxisOption = Partial<LineAxisCfg> | Partial<CircleAxisCfg> | boolean;

export interface LegendCfg extends Partial<CategoryLegendCfg> {
  readonly position?: string;
}

export type LegendOption = LegendCfg | boolean;

interface TooltipDomStyles {
  'g2-tooltip'?: LooseObject;
  'g2-tooltip-title'?: LooseObject;
  'g2-tooltip-list'?: LooseObject;
  'g2-tooltip-list-item'?: LooseObject;
  'g2-tooltip-marker'?: LooseObject;
  'g2-tooltip-value'?: LooseObject;
  'g2-tooltip-name'?: LooseObject;
  'g2-tooltip-crosshair-x'?: LooseObject;
  'g2-tooltip-crosshair-y'?: LooseObject;
}

export interface TooltipCfg {
  /** 是否展示 tooltip 标题 */
  showTitle?: boolean;
  /**
   * tooltip 触发方式
   * 'none' 表示不在 'mousemove' 或 'click' 时触发，用户可以通过 chart.showTooltip() 和 chart.hideTooltip() 来手动触发和隐藏
   */
  triggerOn?: 'mousemove' | 'click' | 'none';
  /** 设置 tooltip 的固定展示位置，相对于数据点 */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** true 表示展示一组数据，false 表示展示单条数据 */
  shared?: boolean; // 是否只展示单条数据
  /** 是否展示 crosshairs */
  showCrosshairs?: boolean;
  /**
   * 设置 tooltip 辅助线的类型
   * 'x' 水平辅助线
   * 'y' 垂直辅助线
   * 'xy' 十字辅助线
   *
   */
  crosshairs?: 'x' | 'y' | 'xy';
  // title?: string;
  /** 是否自动渲染 tooltipMarkers，目前 line、area、path 会默认渲染 */
  showTooltipMarkers?: boolean;
  /** tooltipMarker 的样式 */
  tooltipMarker?: object;
  /** 自定义 tooltip 的容器 */
  container?: string | HTMLElement;
  /** 用于指定图例容器的模板，自定义模板时必须包含各个 dom 节点的 class */
  containerTpl?: string;
  /** 每项记录的默认模板，自定义模板时必须包含各个 dom 节点的 class */
  itemTpl?: string;
  /** 根据 x 定位的 crosshair 的模板 */
  xCrosshairTpl?: string;
  /** 根据 y 定位的 crosshair 的模板 */
  yCrosshairTpl?: string;
  /** 是否允许鼠标进入 tooltip 内容框 */
  enterable?: boolean;
  /** 传入各个 dom 的样式 */
  domStyles?: TooltipDomStyles;
  /** tooltip 偏移量 */
  offset?: number;
}

export type TooltipOption = TooltipCfg | boolean;

export interface CoordinateOption {
  type?: 'polar' | 'theta' | 'rect' | 'cartesian' | 'helix' | 'geo'; // 坐标系类型
  cfg?: CoordinateCfg; // 坐标系配置项
  actions?: any[][]; // 坐标系变换操作
}

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

export interface Options {
  readonly data: Data;
  readonly filters?: Record<string, FilterCondition>;
  readonly axes?: Record<string, AxisOption> | boolean;
  readonly legends?: Record<string, LegendOption> | boolean;
  readonly scales?: Record<string, ScaleOption>;
  readonly tooltip?: TooltipOption;
  readonly coordinate?: CoordinateOption;
  readonly interactions?: Record<string, Interaction>;
  /** 所有的组件配置 */
  readonly components: ComponentOption[];
  readonly animate?: boolean;
}
