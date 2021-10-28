import { get, deepMix, isArray } from '@antv/util';
import { Writeable } from '../../util/types';
import { MappingDatum, Point } from '../../interface';
import GeometryLabel from './base';
import { LabelCfg, LabelItem, LabelPointCfg, TextAlign } from './interface';

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

    return points[0][dim] <= points[2][dim] ? 1 : -1;
  }

  /**
   * 重载：根据 interval 值的正负来调整 label 偏移量
   * @param labelCfg
   * @param index
   * @param total
   */
  protected getLabelOffsetPoint(labelCfg: LabelCfg, index: number, total: number, position?: string) {
    let point = super.getLabelOffsetPoint(labelCfg, index, total);
    const coordinate = this.getCoordinate();
    const transposed = coordinate.isTransposed;
    const dim = transposed ? 'x' : 'y';
    const dir = this.getLabelValueDir(labelCfg.mappingData);
    point = { ...point, [dim]: point[dim] * dir };

    if (coordinate.isReflect('x')) {
      point = {
        ...point,
        x: point.x * -1,
      };
    }
    if (coordinate.isReflect('y')) {
      point = {
        ...point,
        y: point.y * -1,
      };
    }

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

  protected setLabelPosition(
    labelPointCfg: Writeable<LabelPointCfg>,
    mappingData: MappingDatum,
    index: number,
    position: string
  ) {
    const coordinate = this.getCoordinate();
    const transposed = coordinate.isTransposed;
    const shapePoints = mappingData.points as Point[];
    const point0 = coordinate.convert(shapePoints[0]);
    const point2 = coordinate.convert(shapePoints[2]);
    const dir = this.getLabelValueDir(mappingData);

    let top;
    let right;
    let bottom;
    let left;

    const shape = isArray(mappingData.shape) ? mappingData.shape[0] : mappingData.shape;
    if (shape === 'funnel' || shape === 'pyramid') {
      // 处理漏斗图
      const nextPoints = get(mappingData, 'nextPoints');
      const points = get(mappingData, 'points');
      if (nextPoints) {
        // 非漏斗图底部
        const p0 = coordinate.convert(points[0] as Point);
        const p1 = coordinate.convert(points[1] as Point);
        const nextP0 = coordinate.convert(nextPoints[0] as Point);
        const nextP1 = coordinate.convert(nextPoints[1] as Point);

        // TODO: 使用包围盒的计算方法
        if (transposed) {
          top = Math.min(nextP0.y, p0.y);
          bottom = Math.max(nextP0.y, p0.y);
          right = (p1.x + nextP1.x) / 2;
          left = (p0.x + nextP0.x) / 2;
        } else {
          top = Math.min((p1.y + nextP1.y) / 2, (p0.y + nextP0.y) / 2);
          bottom = Math.max((p1.y + nextP1.y) / 2, (p0.y + nextP0.y) / 2);
          right = nextP1.x;
          left = p0.x;
        }
      } else {
        top = Math.min(point2.y, point0.y);
        bottom = Math.max(point2.y, point0.y);
        right = point2.x;
        left = point0.x;
      }
    } else {
      top = Math.min(point2.y, point0.y);
      bottom = Math.max(point2.y, point0.y);
      right = point2.x;
      left = point0.x;
    }

    switch (position) {
      case 'right':
        labelPointCfg.x = right;
        labelPointCfg.y = (top + bottom) / 2;
        labelPointCfg.textAlign = get(labelPointCfg, 'textAlign', dir > 0 ? 'left' : 'right');
        break;
      case 'left':
        labelPointCfg.x = left;
        labelPointCfg.y = (top + bottom) / 2;
        labelPointCfg.textAlign = get(labelPointCfg, 'textAlign', dir > 0 ? 'left' : 'right');
        break;
      case 'bottom':
        if (transposed) {
          labelPointCfg.x = (right + left) / 2;
        }
        labelPointCfg.y = bottom;
        labelPointCfg.textAlign = get(labelPointCfg, 'textAlign', 'center');
        labelPointCfg.textBaseline = get(labelPointCfg, 'textBaseline', dir > 0 ? 'bottom' : 'top');
        break;
      case 'middle':
        if (transposed) {
          labelPointCfg.x = (right + left) / 2;
        }
        labelPointCfg.y = (top + bottom) / 2;
        labelPointCfg.textAlign = get(labelPointCfg, 'textAlign', 'center');
        labelPointCfg.textBaseline = get(labelPointCfg, 'textBaseline', 'middle');
        break;
      case 'top':
        if (transposed) {
          labelPointCfg.x = (right + left) / 2;
        }
        labelPointCfg.y = top;
        labelPointCfg.textAlign = get(labelPointCfg, 'textAlign', 'center');
        labelPointCfg.textBaseline = get(labelPointCfg, 'textBaseline', dir > 0 ? 'bottom' : 'top');
        break;
      default:
        break;
    }
  }
}
