import {
  Interval,
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
  AnnotationText,
  AnnotationLineX,
  AnnotationLineY,
  AnnotationRange,
  AnnotationRangeX,
  AnnotationRangeY,
  AnnotationConnector,
} from './mark';

export interface Mark {
  interval(): Interval;
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
  annotationText(): AnnotationText;
  annotationLineX(): AnnotationLineX;
  annotationLineY(): AnnotationLineY;
  annotationRange(): AnnotationRange;
  annotationRangeX(): AnnotationRangeX;
  annotationRangeY(): AnnotationRangeY;
  annotationConnector(): AnnotationConnector;
}

export const mark = {
  interval: Interval,
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
  annotationText: AnnotationText,
  annotationLineX: AnnotationLineX,
  annotationLineY: AnnotationLineY,
  annotationRange: AnnotationRange,
  annotationRangeX: AnnotationRangeX,
  annotationRangeY: AnnotationRangeY,
  annotationConnector: AnnotationConnector,
};
