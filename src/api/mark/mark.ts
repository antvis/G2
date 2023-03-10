import {
  IntervalMark,
  RectMark,
  AreaMark,
  PointMark,
  CellMark,
  VectorMark,
  LinkMark,
  PolygonMark,
  ImageMark,
  TextMark,
  BoxMark,
  LineMark,
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
  HOMMarkMark,
  GaugeMark,
} from '../../spec';
import { NodePropertyDescriptor, defineProps } from '../props';
import { Concrete } from '../types';
import { MarkNode } from './base';
import { API } from './types';

export interface Interval extends API<Concrete<IntervalMark>, Interval> {
  type: 'interval';
}

export interface Rect extends API<Concrete<RectMark>, Rect> {
  type: 'rect';
}

export interface Point extends API<Concrete<PointMark>, Point> {
  type: 'point';
}

export interface Area extends API<Concrete<AreaMark>, Area> {
  type: 'area';
}

export interface Line extends API<Concrete<LinkMark>, Line> {
  type: 'line';
}

export interface Cell extends API<Concrete<CellMark>, Cell> {
  type: 'cell';
}

export interface Vector extends API<Concrete<VectorMark>, Vector> {
  type: 'cell';
}

export interface Link extends API<Concrete<LinkMark>, Link> {
  type: 'link';
}

export interface Polygon extends API<Concrete<PolygonMark>, Polygon> {
  type: 'polygon';
}

export interface Image extends API<Concrete<ImageMark>, Image> {
  type: 'image';
}

export interface Text extends API<Concrete<TextMark>, Text> {
  type: 'text';
}

export interface Box extends API<Concrete<BoxMark>, Box> {
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

export interface Gauge extends API<Concrete<GaugeMark>, Gauge> {
  type: 'gauge';
}

export interface HOMMark extends API<Concrete<HOMMarkMark>, HOMMark> {
  type: 'interval';
}

export const props: NodePropertyDescriptor[] = [
  { name: 'encode', type: 'object' },
  { name: 'scale', type: 'object' },
  { name: 'data', type: 'value' },
  { name: 'transform', type: 'array' },
  { name: 'style', type: 'object' },
  { name: 'animate', type: 'object' },
  { name: 'coordinate', type: 'object' },
  { name: 'interaction', type: 'object' },
  { name: 'label', type: 'array', key: 'labels' },
  { name: 'axis', type: 'object' },
  { name: 'legend', type: 'object' },
  { name: 'slider', type: 'object' },
  { name: 'scrollbar', type: 'object' },
  { name: 'state', type: 'object' },
  { name: 'tooltip', type: 'mix' },
];

@defineProps(props)
export class HOMMark extends MarkNode<HOMMark> {
  constructor() {
    super({});
  }
}

@defineProps(props)
export class Interval extends MarkNode<IntervalMark> {
  constructor() {
    super({}, 'interval');
  }
}

@defineProps(props)
export class Rect extends MarkNode<RectMark> {
  constructor() {
    super({}, 'rect');
  }
}

@defineProps(props)
export class Point extends MarkNode<PointMark> {
  constructor() {
    super({}, 'point');
  }
}

@defineProps(props)
export class Area extends MarkNode<AreaMark> {
  constructor() {
    super({}, 'area');
  }
}

@defineProps(props)
export class Line extends MarkNode<LineMark> {
  constructor() {
    super({}, 'line');
  }
}

@defineProps(props)
export class Cell extends MarkNode<CellMark> {
  constructor() {
    super({}, 'cell');
  }
}

@defineProps(props)
export class Vector extends MarkNode<VectorMark> {
  constructor() {
    super({}, 'vector');
  }
}

@defineProps(props)
export class Link extends MarkNode<LinkMark> {
  constructor() {
    super({}, 'link');
  }
}

@defineProps(props)
export class Polygon extends MarkNode<PolygonMark> {
  constructor() {
    super({}, 'polygon');
  }
}

@defineProps(props)
export class Image extends MarkNode<ImageMark> {
  constructor() {
    super({}, 'image');
  }
}

@defineProps(props)
export class Text extends MarkNode<TextMark> {
  constructor() {
    super({}, 'text');
  }
}

@defineProps(props)
export class Box extends MarkNode<BoxMark> {
  constructor() {
    super({}, 'box');
  }
}

@defineProps(props)
export class LineX extends MarkNode<LineXMark> {
  constructor() {
    super({}, 'lineX');
  }
}

@defineProps(props)
export class LineY extends MarkNode<LineYMark> {
  constructor() {
    super({}, 'lineY');
  }
}

@defineProps(props)
export class Range extends MarkNode<RangeMark> {
  constructor() {
    super({}, 'range');
  }
}

@defineProps(props)
export class RangeX extends MarkNode<RangeXMark> {
  constructor() {
    super({}, 'rangeX');
  }
}

@defineProps(props)
export class RangeY extends MarkNode<RangeYMark> {
  constructor() {
    super({}, 'rangeY');
  }
}

@defineProps(props)
export class Connector extends MarkNode<ConnectorMark> {
  constructor() {
    super({}, 'connector');
  }
}

@defineProps(props)
export class Shape extends MarkNode<ShapeMark> {
  constructor() {
    super({}, 'shape');
  }
}

@defineProps([...props, { name: 'layout', type: 'value' }])
export class Sankey extends MarkNode<SankeyMark> {
  constructor() {
    super({}, 'sankey');
  }
}

@defineProps([...props, { name: 'layout', type: 'value' }])
export class Treemap extends MarkNode<TreemapMark> {
  constructor() {
    super({}, 'treemap');
  }
}

@defineProps(props)
export class Boxplot extends MarkNode<BoxPlotMark> {
  constructor() {
    super({}, 'boxplot');
  }
}

@defineProps([...props, { name: 'layout', type: 'value' }])
export class Pack extends MarkNode<PackMark> {
  constructor() {
    super({}, 'pack');
  }
}

@defineProps([...props, { name: 'layout', type: 'value' }])
export class ForceGraph extends MarkNode<ForceGraphMark> {
  constructor() {
    super({}, 'forceGraph');
  }
}

@defineProps([...props, { name: 'layout', type: 'value' }])
export class Tree extends MarkNode<TreeMark> {
  constructor() {
    super({}, 'tree');
  }
}

@defineProps([...props, { name: 'layout', type: 'object' }])
export class WordCloud extends MarkNode<WordCloudMark> {
  constructor() {
    super({}, 'wordCloud');
  }
}

@defineProps(props)
export class Gauge extends MarkNode<GaugeMark> {
  constructor() {
    super({}, 'gauge');
  }
}
