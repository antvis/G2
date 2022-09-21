import {
  IntervalGeometry,
  AreaGeometry,
  PointGeometry,
  GridGeometry,
  VectorGeometry,
  LinkGeometry,
  PolygonGeometry,
  ImageGeometry,
  TextGeometry,
  BoxGeometry,
  LineGeometry,
  LineXMark,
  LineYMark,
  RangeMark,
  RangeXMark,
  RangeYMark,
  ConnectorMark,
} from '../../spec';
import { NodePropertyDescriptor, defineProps } from '../props';
import { Node } from '../node';
import { Concrete } from '../types';
import { API } from './types';

export interface Interval extends API<Concrete<IntervalGeometry>, Interval> {
  type: 'interval';
}

export interface Point extends API<Concrete<PointGeometry>, Point> {
  type: 'point';
}

export interface Area extends API<Concrete<AreaGeometry>, Area> {
  type: 'area';
}

export interface Line extends API<Concrete<LinkGeometry>, Line> {
  type: 'line';
}

export interface Grid extends API<Concrete<GridGeometry>, Grid> {
  type: 'grid';
}

export interface Vector extends API<Concrete<VectorGeometry>, Vector> {
  type: 'grid';
}

export interface Link extends API<Concrete<LinkGeometry>, Link> {
  type: 'link';
}

export interface Polygon extends API<Concrete<PolygonGeometry>, Polygon> {
  type: 'polygon';
}

export interface Image extends API<Concrete<ImageGeometry>, Image> {
  type: 'image';
}

export interface Text extends API<Concrete<TextGeometry>, Text> {
  type: 'text';
}

export interface Box extends API<Concrete<BoxGeometry>, Box> {
  type: 'box';
}

export interface LineX extends API<Concrete<LineXMark>, LineX> {
  type: 'annotation.lineX';
}

export interface LineY extends API<Concrete<LineYMark>, LineY> {
  type: 'annotation.lineY';
}

export interface Range extends API<Concrete<RangeMark>, Range> {
  type: 'annotation.range';
}

export interface RangeX extends API<Concrete<RangeXMark>, RangeX> {
  type: 'annotation.rangeX';
}

export interface RangeY extends API<Concrete<RangeYMark>, RangeY> {
  type: 'annotation.rangeY';
}

export interface Connector extends API<Concrete<ConnectorMark>, Connector> {
  type: 'connector';
}

export const props: NodePropertyDescriptor[] = [
  { name: 'encode', type: 'object' },
  { name: 'scale', type: 'object' },
  { name: 'data', type: 'value' },
  { name: 'key', type: 'value' },
  { name: 'class', type: 'value' },
  { name: 'transform', type: 'array' },
  { name: 'style', type: 'object' },
  { name: 'animate', type: 'object' },
  { name: 'frame', type: 'value' },
  { name: 'facet', type: 'value' },
  { name: 'adjust', type: 'value' },
  { name: 'coordinate', type: 'array' },
  { name: 'interaction', type: 'array' },
  { name: 'paddingLeft', type: 'value' },
  { name: 'paddingRight', type: 'value' },
  { name: 'paddingBottom', type: 'value' },
  { name: 'paddingTop', type: 'value' },
  { name: 'label', type: 'array', key: 'labels' },
];

@defineProps(props)
export class Interval extends Node<IntervalGeometry> {
  constructor() {
    super({}, 'interval');
  }
}

@defineProps(props)
export class Point extends Node<PointGeometry> {
  constructor() {
    super({}, 'point');
  }
}

@defineProps(props)
export class Area extends Node<AreaGeometry> {
  constructor() {
    super({}, 'area');
  }
}

@defineProps(props)
export class Line extends Node<LineGeometry> {
  constructor() {
    super({}, 'line');
  }
}

@defineProps(props)
export class Grid extends Node<GridGeometry> {
  constructor() {
    super({}, 'grid');
  }
}

@defineProps(props)
export class Vector extends Node<VectorGeometry> {
  constructor() {
    super({}, 'vector');
  }
}

@defineProps(props)
export class Link extends Node<LinkGeometry> {
  constructor() {
    super({}, 'link');
  }
}

@defineProps(props)
export class Polygon extends Node<PolygonGeometry> {
  constructor() {
    super({}, 'polygon');
  }
}

@defineProps(props)
export class Image extends Node<ImageGeometry> {
  constructor() {
    super({}, 'image');
  }
}

@defineProps(props)
export class Text extends Node<TextGeometry> {
  constructor() {
    super({}, 'text');
  }
}

@defineProps(props)
export class Box extends Node<BoxGeometry> {
  constructor() {
    super({}, 'box');
  }
}

@defineProps(props)
export class LineX extends Node<LineXMark> {
  constructor() {
    super({}, 'lineX');
  }
}

@defineProps(props)
export class LineY extends Node<LineYMark> {
  constructor() {
    super({}, 'lineY');
  }
}

@defineProps(props)
export class Range extends Node<RangeMark> {
  constructor() {
    super({}, 'range');
  }
}

@defineProps(props)
export class RangeX extends Node<RangeXMark> {
  constructor() {
    super({}, 'rangeX');
  }
}

@defineProps(props)
export class RangeY extends Node<RangeYMark> {
  constructor() {
    super({}, 'rangeY');
  }
}

@defineProps(props)
export class Connector extends Node<ConnectorMark> {
  constructor() {
    super({}, 'connector');
  }
}
