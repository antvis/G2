import { Data, Datum } from '../interface';
import Path from './path';
import './shape/area';

export default class Area extends Path {
  public readonly type: string = 'area';
  public readonly shapeType: string = 'area';
  /** Area 默认会对数据按照 x 轴字段进行正向排序 */
  public readonly sortable: boolean = true;
  /** 生成图形关键点 */
  public readonly generatePoints: boolean = true;

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
