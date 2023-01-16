import {
  IntervalGeometry,
  RectGeometry,
  AreaGeometry,
  PointGeometry,
  CellGeometry,
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
  SankeyMark,
  BoxPlotMark,
  ShapeMark,
  TreemapMark,
  ForceGraphMark,
  PackMark,
  TreeMark,
  WordCloudMark,
} from '../../spec';
import { NodePropertyDescriptor, defineProps } from '../props';
import { Node } from '../node';
import { Concrete } from '../types';
import { API } from './types';

export interface Interval extends API<Concrete<IntervalGeometry>, Interval> {
  type: 'interval';
}

export interface Rect extends API<Concrete<RectGeometry>, Rect> {
  type: 'rect';
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

export interface Cell extends API<Concrete<CellGeometry>, Cell> {
  type: 'cell';
}

export interface Vector extends API<Concrete<VectorGeometry>, Vector> {
  type: 'cell';
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

export interface Sankey extends API<Concrete<SankeyMark>, Sankey> {
  type: 'sankey';
}

export interface Boxplot extends API<Concrete<BoxPlotMark>, Boxplot> {
  type: 'boxplot';
}

export interface Shape extends API<Concrete<ShapeMark>, Shape> {
  type: 'shape';
}

export interface Treemap extends API<Concrete<TreemapMark>, Treemap> {
  type: 'treemap';
}
export interface Pack extends API<Concrete<PackMark>, Pack> {
  type: 'pack';
}

export interface ForceGraph extends API<Concrete<ForceGraphMark>, ForceGraph> {
  type: 'forceGraph';
}

export interface Tree extends API<Concrete<TreeMark>, Tree> {
  type: 'tree';
}

export interface WordCloud extends API<Concrete<WordCloudMark>, WordCloud> {
  type: 'wordCloud';
}

export const props: NodePropertyDescriptor[] = [
  { name: 'encode', type: 'object' },
  { name: 'scale', type: 'object' },
  { name: 'data', type: 'value' },
  { name: 'transform', type: 'array' },
  { name: 'style', type: 'object' },
  { name: 'animate', type: 'object' },
  { name: 'label', type: 'array', key: 'labels' },
  { name: 'axis', type: 'object' },
  { name: 'legend', type: 'object' },
  { name: 'slider', type: 'object' },
  { name: 'scrollbar', type: 'object' },
];

export class MarkBase<
  Value extends Record<string, any> = Record<string, any>,
  ParentValue extends Record<string, any> = Record<string, any>,
  ChildValue extends Record<string, any> = Record<string, any>,
> extends Node<Value, ParentValue, ChildValue> {
  changeData(data) {
    const chart = this.root();
    if (!chart) return;
    this.attr('data', data);
    chart?.render();
  }

  getMark() {}

  getScale() {}

  getGroup() {}
}

@defineProps(props)
export class Interval extends MarkBase<IntervalGeometry> {
  constructor() {
    super({}, 'interval');
  }
}

@defineProps(props)
export class Rect extends MarkBase<RectGeometry> {
  constructor() {
    super({}, 'rect');
  }
}

@defineProps(props)
export class Point extends MarkBase<PointGeometry> {
  constructor() {
    super({}, 'point');
  }
}

@defineProps(props)
export class Area extends MarkBase<AreaGeometry> {
  constructor() {
    super({}, 'area');
  }
}

@defineProps(props)
export class Line extends MarkBase<LineGeometry> {
  constructor() {
    super({}, 'line');
  }
}

@defineProps(props)
export class Cell extends MarkBase<CellGeometry> {
  constructor() {
    super({}, 'cell');
  }
}

@defineProps(props)
export class Vector extends MarkBase<VectorGeometry> {
  constructor() {
    super({}, 'vector');
  }
}

@defineProps(props)
export class Link extends MarkBase<LinkGeometry> {
  constructor() {
    super({}, 'link');
  }
}

@defineProps(props)
export class Polygon extends MarkBase<PolygonGeometry> {
  constructor() {
    super({}, 'polygon');
  }
}

@defineProps(props)
export class Image extends MarkBase<ImageGeometry> {
  constructor() {
    super({}, 'image');
  }
}

@defineProps(props)
export class Text extends MarkBase<TextGeometry> {
  constructor() {
    super({}, 'text');
  }
}

@defineProps(props)
export class Box extends MarkBase<BoxGeometry> {
  constructor() {
    super({}, 'box');
  }
}

@defineProps(props)
export class LineX extends MarkBase<LineXMark> {
  constructor() {
    super({}, 'lineX');
  }
}

@defineProps(props)
export class LineY extends MarkBase<LineYMark> {
  constructor() {
    super({}, 'lineY');
  }
}

@defineProps(props)
export class Range extends MarkBase<RangeMark> {
  constructor() {
    super({}, 'range');
  }
}

@defineProps(props)
export class RangeX extends MarkBase<RangeXMark> {
  constructor() {
    super({}, 'rangeX');
  }
}

@defineProps(props)
export class RangeY extends MarkBase<RangeYMark> {
  constructor() {
    super({}, 'rangeY');
  }
}

@defineProps(props)
export class Connector extends MarkBase<ConnectorMark> {
  constructor() {
    super({}, 'connector');
  }
}

@defineProps(props)
export class Shape extends MarkBase<ShapeMark> {
  constructor() {
    super({}, 'shape');
  }
}

@defineProps([...props, { name: 'layout', type: 'value' }])
export class Sankey extends MarkBase<SankeyMark> {
  constructor() {
    super({}, 'sankey');
  }
}

@defineProps([...props, { name: 'layout', type: 'value' }])
export class Treemap extends MarkBase<ConnectorMark> {
  constructor() {
    super({}, 'treemap');
  }
}

@defineProps(props)
export class Boxplot extends MarkBase<Boxplot> {
  constructor() {
    super({}, 'boxplot');
  }
}

@defineProps([...props, { name: 'layout', type: 'value' }])
export class Pack extends MarkBase<Pack> {
  constructor() {
    super({}, 'pack');
  }
}

@defineProps([...props, { name: 'layout', type: 'value' }])
export class ForceGraph extends MarkBase<ForceGraph> {
  constructor() {
    super({}, 'forceGraph');
  }
}

@defineProps([...props, { name: 'layout', type: 'value' }])
export class Tree extends MarkBase<Tree> {
  constructor() {
    super({}, 'tree');
  }
}

@defineProps([...props, { name: 'layout', type: 'object' }])
export class WordCloud extends MarkBase<WordCloud> {
  constructor() {
    super({}, 'wordCloud');
  }
}
