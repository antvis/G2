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
  SchemaGeometry,
  LineGeometry,
  AnnotationText as AnnotationTextSpec,
  AnnotationBadge as AnnotationBadgeSpec,
  AnnotationLineX as AnnotationLineXSpec,
  AnnotationLineY as AnnotationLineYSpec,
  AnnotationRange as AnnotationRangeSpec,
  AnnotationRangeX as AnnotationRangeXSpec,
  AnnotationRangeY as AnnotationRangeYSpec,
  AnnotationConnector as AnnotationConnectorSpec,
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

export interface Schema extends API<Concrete<SchemaGeometry>, Schema> {
  type: 'schema';
}

export interface AnnotationText
  extends API<Concrete<AnnotationTextSpec>, AnnotationText> {
  type: 'annotation.text';
}

export interface AnnotationBadge
  extends API<Concrete<AnnotationBadgeSpec>, AnnotationBadge> {
  type: 'annotation.badge';
}

export interface AnnotationLineX
  extends API<Concrete<AnnotationLineXSpec>, AnnotationLineX> {
  type: 'annotation.lineX';
}

export interface AnnotationLineY
  extends API<Concrete<AnnotationLineYSpec>, AnnotationLineY> {
  type: 'annotation.lineY';
}

export interface AnnotationRange
  extends API<Concrete<AnnotationRangeSpec>, AnnotationRange> {
  type: 'annotation.range';
}

export interface AnnotationRangeX
  extends API<Concrete<AnnotationRangeXSpec>, AnnotationRangeX> {
  type: 'annotation.rangeX';
}

export interface AnnotationRangeY
  extends API<Concrete<AnnotationRangeYSpec>, AnnotationRangeY> {
  type: 'annotation.rangeY';
}

export interface AnnotationConnector
  extends API<Concrete<AnnotationConnectorSpec>, AnnotationConnector> {
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
  { name: 'adjust', type: 'object' },
  { name: 'frame', type: 'value' },
  { name: 'facet', type: 'value' },
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
export class Schema extends Node<SchemaGeometry> {
  constructor() {
    super({}, 'schema');
  }
}

@defineProps(props)
export class AnnotationText extends Node<AnnotationTextSpec> {
  constructor() {
    super({}, 'annotation.text');
  }
}

@defineProps(props)
export class AnnotationBadge extends Node<AnnotationBadgeSpec> {
  constructor() {
    super({}, 'annotation.badge');
  }
}

@defineProps(props)
export class AnnotationLineX extends Node<AnnotationLineXSpec> {
  constructor() {
    super({}, 'annotation.lineX');
  }
}

@defineProps(props)
export class AnnotationLineY extends Node<AnnotationLineYSpec> {
  constructor() {
    super({}, 'annotation.lineY');
  }
}

@defineProps(props)
export class AnnotationRange extends Node<AnnotationRangeSpec> {
  constructor() {
    super({}, 'annotation.range');
  }
}

@defineProps(props)
export class AnnotationRangeX extends Node<AnnotationRangeXSpec> {
  constructor() {
    super({}, 'annotation.rangeX');
  }
}

@defineProps(props)
export class AnnotationRangeY extends Node<AnnotationRangeYSpec> {
  constructor() {
    super({}, 'annotation.rangeY');
  }
}

@defineProps(props)
export class AnnotationConnector extends Node<AnnotationConnectorSpec> {
  constructor() {
    super({}, 'annotation.connector');
  }
}
