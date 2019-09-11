import { Canvas, Group } from '@antv/g';
import Component from '../component';
import Interaction from '../interaction';
import { Padding, Region } from '../interface';
import { DIRECTION, LAYER } from './constant';
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
}

/** 数据的定义 */
export type Datum = Record<string, string | number>;
export type Data = Datum[];

/* 筛选器函数类型定义 */
export type FilterCondition = (datum: Datum) => boolean;

export interface AxisCfg {
  readonly type: string;
}

export interface LegendCfg {
  readonly type: string;
}

export interface ScaleCfg {
  readonly type: string;
}

export interface CoordinateCfg {
  readonly type: string;
}

export interface CoordinateOpt {
  readonly type: string;
  readonly cfg: CoordinateCfg;
}

export interface Options {
  readonly data: Data;
  readonly filters: Record<string, FilterCondition>;
  readonly axes: Record<string, AxisCfg>;
  readonly legends: Record<string, LegendCfg>;
  readonly scales: Record<string, ScaleCfg>;
  readonly tooltip: boolean; // tooltip visible or not
  readonly coordinate: CoordinateOpt;
  readonly interactions: Record<string, Interaction>;
}
