import { get, deepMix } from '@antv/util';

import { MappingDatum, Point } from '../../interface';
import GeometryLabel from './base';
import { LabelCfg, LabelPointCfg } from './interface';

/**
 * 柱状图 label
 */
export default class IntervalLabel extends GeometryLabel {
  /**
   * 获取 interval label 的方向，取决于 value 的值是正还是负
   * @param labelCfg
   */
  private getLabelValueDir(mappingData: MappingDatum) {
    // points 中的 x/y 和 transpose 无关
    const dim = 'y';
    const { points } = mappingData;

    return points[0][dim] < points[2][dim] ? 1 : -1;
  }

  /**
   * 重载：根据 interval 值的正负来调整 label 偏移量
   * @param labelCfg
   * @param index
   * @param total
   */
  protected getLabelOffset(labelCfg: LabelCfg, index: number, total: number) {
    const point = super.getLabelOffset(labelCfg, index, total);
    const transposed = this.getCoordinate().isTransposed;
    const dim = transposed ? 'x' : 'y';
    const dir = this.getLabelValueDir(labelCfg.mappingData);

    point[dim] *= dir;

    return point;
  }

  /**
   * 重载：定制 interval label 的默认主题配置
   * @param labelCfg
   */
  protected getThemedLabelCfg(labelCfg: LabelCfg) {
    const geometry = this.geometry;
    const defaultLabelCfg = this.getDefaultLabelCfg();
    const { theme } = geometry;

    // 如果 interval label position 设置为 middle，则将主题中的 offset 覆盖为 0
    return deepMix({}, defaultLabelCfg, theme.labels, labelCfg.position === 'middle' ? { offset: 0 } : {}, labelCfg);
  }

  protected setLabelPosition(labelPointCfg: LabelPointCfg, mappingData: MappingDatum, index: number, position: string) {
    const coordinate = this.getCoordinate();
    const transposed = coordinate.isTransposed;
    const shapePoints = mappingData.points as Point[];
    const point0 = coordinate.convert(shapePoints[0]);
    const point1 = coordinate.convert(shapePoints[2]);
    const flag = transposed ? -1 : 1;
    const width = ((point0.x - point1.x) / 2) * flag;
    const height = ((point0.y - point1.y) / 2) * flag;
    const dir = this.getLabelValueDir(mappingData);

    switch (position) {
      case 'right':
        if (!transposed) {
          labelPointCfg.x -= width;
          labelPointCfg.y += height;
        }
        labelPointCfg.textAlign = get(labelPointCfg, 'textAlign', dir > 0 ? 'left' : 'right');
        break;
      case 'left':
        if (transposed) {
          labelPointCfg.x -= width * 2;
        } else {
          labelPointCfg.x += width;
          labelPointCfg.y += height;
        }
        labelPointCfg.textAlign = get(labelPointCfg, 'textAlign', dir > 0 ? 'left' : 'right');
        break;
      case 'bottom':
        if (transposed) {
          labelPointCfg.x -= width;
          labelPointCfg.y -= height;
        } else {
          labelPointCfg.y += height * 2;
        }
        labelPointCfg.textAlign = get(labelPointCfg, 'textAlign', 'center');
        labelPointCfg.textBaseline = get(labelPointCfg, 'textBaseline', dir > 0 ? 'bottom' : 'top');
        break;
      case 'middle':
        if (transposed) {
          labelPointCfg.x -= width;
        } else {
          labelPointCfg.y += height;
        }
        labelPointCfg.textAlign = get(labelPointCfg, 'textAlign', 'center');
        labelPointCfg.textBaseline = get(labelPointCfg, 'textBaseline', 'middle');
        break;
      case 'top':
        if (transposed) {
          labelPointCfg.x -= width;
          labelPointCfg.y += height;
        }
        labelPointCfg.textAlign = get(labelPointCfg, 'textAlign', 'center');
        labelPointCfg.textBaseline = get(labelPointCfg, 'textBaseline', dir > 0 ? 'bottom' : 'top');
        break;
      default:
        break;
    }
  }
}
