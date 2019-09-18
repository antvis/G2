import { Canvas, Group } from '@antv/g';
import Component from '../component';
import Interaction from '../interaction';
import { Padding, Region } from '../interface';
import { ComponentType, DIRECTION, LAYER } from './constant';
import View from './view';

export type Renderer = 'svg' | 'canvas';

// chart 构造方法的入参
export interface ChartCfg {
  readonly container: string | HTMLElement;
  readonly width: number;
  readonly height: number;
  readonly autoFit?: boolean;
  readonly renderer?: Renderer;
  readonly pixelRatio?: number;
  readonly padding?: number | number[];
}

// view 构造参数
export interface ViewCfg {
  readonly parent: View;
  readonly canvas: Canvas;
  /** 前景层 */
  readonly foregroundGroup: Group;
  /** 中间层 */
  readonly middleGroup: Group;
  /** 背景层 */
  readonly backgroundGroup: Group;
  /** 位置大小范围 */
  readonly region?: Region;
  readonly padding?: Padding;
}

// 组件及布局的信息
export interface ComponentOption {
  readonly component: Component;
  readonly layer: LAYER;
  readonly direction: DIRECTION;
  readonly type: ComponentType;
}

/** 数据的定义 */
export type Datum = Record<string, string | number>;
export type Data = Datum[];

/* 筛选器函数类型定义 */
export type FilterCondition = (value: any, datum: Datum) => boolean;

export type AxisCfg =
  | {
      readonly type: string;
    }
  | boolean;

export type LegendCfg =
  | {
      readonly type: string;
    }
  | boolean;

export interface ScaleCfg {
  readonly type: string;
}

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
  readonly filters: Record<string, FilterCondition>;
  readonly axes: Record<string, AxisCfg>;
  readonly legends: Record<string, LegendCfg>;
  readonly scales: Record<string, ScaleCfg>;
  readonly tooltip: boolean; // tooltip visible or not
  readonly coordinate: CoordinateOption;
  readonly interactions: Record<string, Interaction>;
}
