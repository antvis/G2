import { MappingDatum, ShapeInfo } from '../interface';
import Geometry from './base';
/** 引入 Point 对应的 ShapeFactory */
import './shape/point';

/**
 * Point 几何标记。
 * 常用于绘制点图。
 */
export default class Point extends Geometry {
  public readonly type: string = 'point';
  public readonly shapeType: string = 'point';
  protected generatePoints: boolean = true;

  /**
   * 获取一个点的绘制信息。
   * @param mappingDatum
   * @returns draw cfg
   */
  protected getDrawCfg(mappingDatum: MappingDatum): ShapeInfo {
    const shapeCfg = super.getDrawCfg(mappingDatum);

    return {
      ...shapeCfg,
      isStack: !!this.getAdjust('stack'), // 层叠点图
    };
  }
}
