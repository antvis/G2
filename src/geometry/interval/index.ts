import { Geometry } from '../geometry';
import './shapes';

export class Interval extends Geometry {
  /**
   * geometry type
   */
  public type = 'interval';
  /**
   * shape type
   */
  public defaultShapeType = 'interval';
}
