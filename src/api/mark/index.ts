import { HOMMarkType } from '../../spec';
import {
  Interval,
  Rect,
  Point,
  Area,
  Line,
  Cell,
  Vector,
  Link,
  Polygon,
  Image,
  Text,
  Box,
  LineX,
  LineY,
  Range,
  RangeX,
  RangeY,
  Connector,
  Sankey,
  Treemap,
  Boxplot,
  Shape,
  Pack,
  ForceGraph,
  Tree,
  WordCloud,
  HOMMark,
  Gauge,
} from './mark';

export interface Mark {
  mark(HOMMark: HOMMarkType): HOMMark;
  interval(): Interval;
  rect(): Rect;
  point(): Point;
  area(): Area;
  line(): Line;
  cell(): Cell;
  vector(): Vector;
  link(): Link;
  polygon(): Polygon;
  image(): Image;
  text(): Text;
  box(): Box;
  lineX(): LineX;
  lineY(): LineY;
  range(): Range;
  rangeX(): RangeX;
  rangeY(): RangeY;
  connector(): Connector;
  sankey(): Sankey;
  treemap(): Treemap;
  boxplot(): Boxplot;
  shape(): Shape;
  pack(): Pack;
  forceGraph(): ForceGraph;
  tree(): Tree;
  wordCloud(): WordCloud;
  gauge(): Gauge;
}

export { MarkNode } from './base';

export const mark = {
  mark: HOMMark,
  interval: Interval,
  rect: Rect,
  point: Point,
  area: Area,
  line: Line,
  cell: Cell,
  vector: Vector,
  link: Link,
  polygon: Polygon,
  image: Image,
  text: Text,
  box: Box,
  lineX: LineX,
  lineY: LineY,
  range: Range,
  rangeX: RangeX,
  rangeY: RangeY,
  connector: Connector,
  sankey: Sankey,
  treemap: Treemap,
  boxplot: Boxplot,
  shape: Shape,
  pack: Pack,
  forceGraph: ForceGraph,
  tree: Tree,
  wordCloud: WordCloud,
  gauge: Gauge,
};
