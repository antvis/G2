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
  Schema,
  AnnotationText,
  AnnotationBadge,
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
  schema(): Schema;
  annotationText(): AnnotationText;
  annotationBadge(): AnnotationBadge;
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
  schema: Schema,
  annotationText: AnnotationText,
  annotationBadge: AnnotationBadge,
  annotationLineX: AnnotationLineX,
  annotationLineY: AnnotationLineY,
  annotationRange: AnnotationRange,
  annotationRangeX: AnnotationRangeX,
  annotationRangeY: AnnotationRangeY,
  annotationConnector: AnnotationConnector,
};
