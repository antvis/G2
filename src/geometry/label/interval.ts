import { MappingDatum, Point } from '../../interface';
import GeometryLabel from './base';
import { LabelPointCfg } from './interface';

/**
 * 柱状图 label
 */
export default class IntervalLabel extends GeometryLabel {
  protected setLabelPosition(labelPointCfg: LabelPointCfg, mappingData: MappingDatum, index: number, position: string) {
    const coordinate = this.coordinate;
    const transposed = coordinate.isTransposed;
    const shapePoints = mappingData.points as Point[];
    const point0 = coordinate.convert(shapePoints[0]);
    const point1 = coordinate.convert(shapePoints[2]);
    const width = ((point0.x - point1.x) / 2) * (transposed ? -1 : 1);
    const height = ((point0.y - point1.y) / 2) * (transposed ? -1 : 1);

    switch (position) {
      case 'right':
        if (transposed) {
          labelPointCfg.x -= width;
          labelPointCfg.y += height;
          labelPointCfg.textAlign = labelPointCfg.textAlign || 'center';
        } else {
          labelPointCfg.x -= width;
          labelPointCfg.y += height;
          labelPointCfg.textAlign = labelPointCfg.textAlign || 'left';
        }
        break;
      case 'left':
        if (transposed) {
          labelPointCfg.x -= width;
          labelPointCfg.y -= height;
          labelPointCfg.textAlign = labelPointCfg.textAlign || 'center';
        } else {
          labelPointCfg.x += width;
          labelPointCfg.y += height;
          labelPointCfg.textAlign = labelPointCfg.textAlign || 'right';
        }
        break;
      case 'bottom':
        if (transposed) {
          labelPointCfg.x -= width * 2;
          labelPointCfg.textAlign = labelPointCfg.textAlign || 'left';
        } else {
          labelPointCfg.y += height * 2;
          labelPointCfg.textAlign = labelPointCfg.textAlign || 'center';
        }

        break;
      case 'middle':
        if (transposed) {
          labelPointCfg.x -= width;
        } else {
          labelPointCfg.y += height;
        }
        labelPointCfg.textAlign = labelPointCfg.textAlign || 'center';
        break;
      case 'top':
        if (transposed) {
          labelPointCfg.textAlign = labelPointCfg.textAlign || 'left';
        } else {
          labelPointCfg.textAlign = labelPointCfg.textAlign || 'center';
        }
        break;
      default:
        break;
    }
  }
}
