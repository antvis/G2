import {
  Interval,
  Rect,
  Point,
  Area,
  Line,
  Grid,
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
} from './mark';

export interface Mark {
  interval(): Interval;
  rect(): Rect;
  point(): Point;
  area(): Area;
  line(): Line;
  grid(): Grid;
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
}

export const mark = {
  interval: Interval,
  rect: Rect,
  point: Point,
  area: Area,
  line: Line,
  grid: Grid,
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
};
