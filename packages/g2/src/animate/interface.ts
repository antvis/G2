
import { AttributeCfg } from '../element/base';

export interface AnimateCFG {
  duration: number;
  easing: string;
  [k: string]: any;
}

export interface Cache {
  id: string;
  type: string;
  attrs: AttributeCfg;
  name: string;
  index: string;
  animateCfg: AnimateCFG;
  coord: {
    [k: string]: any,
    matrix: Function,
  };
}

export interface CacheType {
  [ k: string ]: Cache;
}

export enum GeomType {
  line = 'line',
  path = 'path',
  area = 'area',
  polygon = 'polygon',
  edge = 'edge',
  interval = 'interval',
  point = 'point',
  kline = 'kline',
  box = 'bbox',
  text = 'text',
  heatmap = 'heatmap',
  label = 'label',
  'axis-label' = 'axis-label',
  'axis-ticks' = 'axis-ticks',
  'axis-grid' = 'axis-grid',
  'axis-grid-rect' = 'axis-grid-rect',
}

export enum AnimationType {
  appear = 'appear',
  update = 'update',
  enter = 'enter',
  leave = 'leave',
}
