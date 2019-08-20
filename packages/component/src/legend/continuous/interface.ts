import { Group, Shape } from '@antv/g';

export interface Point {
  x: number;
  y: number;
}

export interface SliderChangeEvent {
  range: number[];
  value: number[];
}

export interface CreateBgType {
  group: Group;
  background: Shape;
  frontend: Shape;
}
