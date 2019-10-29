import * as _ from '@antv/util';
import { Data, Datum } from '../interface';
import Path from './path';
import './shape/area';

export default class Area extends Path {
  public readonly type: string = 'area';
  public readonly shapeType: string = 'area';
  public sortable: boolean = true;
  public generatePoints: boolean = true;

  /**
   * get points for ShapeInfo
   * @override
   * @param mappedArray
   * @returns
   */
  protected getPoints(mappedArray: Data) {
    return mappedArray.map((obj: Datum) => {
      return obj.points;
    });
  }
}
