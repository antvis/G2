import { get } from '@antv/util';

import { MappingDatum, Point } from '../../interface';
import GeometryLabel from './base';
import { LabelPointCfg } from './interface';

/**
 * 柱状图 label
 */
export default class IntervalLabel extends GeometryLabel {
  protected setLabelPosition(labelPointCfg: LabelPointCfg, mappingData: MappingDatum, index: number, position: string) {
    const coordinate = this.getCoordinate();
    const transposed = coordinate.isTransposed;
    const shapePoints = mappingData.points as Point[];
    const point0 = coordinate.convert(shapePoints[0]);
    const point1 = coordinate.convert(shapePoints[2]);
    const flag = transposed ? -1 : 1;
    const width = ((point0.x - point1.x) / 2) * flag;
    const height = ((point0.y - point1.y) / 2) * flag;

    switch (position) {
      case 'right':
        if (!transposed) {
          labelPointCfg.x -= width;
          labelPointCfg.y += height;
        }
        labelPointCfg.textAlign = get(labelPointCfg, 'textAlign', 'left');
        break;
      case 'left':
        if (transposed) {
          labelPointCfg.x -= width * 2;
        } else {
          labelPointCfg.x += width;
          labelPointCfg.y += height;
        }
        labelPointCfg.textAlign = get(labelPointCfg, 'textAlign', 'right');
        break;
      case 'bottom':
        if (transposed) {
          labelPointCfg.x -= width;
          labelPointCfg.y -= height;
        } else {
          labelPointCfg.y += height * 2;
        }
        labelPointCfg.textAlign = get(labelPointCfg, 'textAlign', 'center');
        labelPointCfg.textBaseline = get(labelPointCfg, 'textBaseline', 'top');
        break;
      case 'middle':
        if (transposed) {
          labelPointCfg.x -= width;
        } else {
          labelPointCfg.y += height;
        }
        labelPointCfg.textAlign = get(labelPointCfg, 'textAlign', 'center');
        break;
      case 'top':
        if (transposed) {
          labelPointCfg.x -= width;
          labelPointCfg.y += height;
        }
        labelPointCfg.textAlign = get(labelPointCfg, 'textAlign', 'center');
        labelPointCfg.textBaseline = get(labelPointCfg, 'textBaseline', 'bottom');
        break;
      default:
        break;
    }
  }
}
