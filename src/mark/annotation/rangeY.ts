import { MarkComponent as MC, Vector2 } from '../../runtime';
import { AnnotationRangeY } from '../../spec';
import {
  baseAnnotationChannels,
  basePostInference,
  basePreInference,
} from '../utils';

export type RangeYOptions = Omit<AnnotationRangeY, 'type'>;

/**
 * Convert value for each channel to rect shapes.
 */
export const RangeY: MC<RangeYOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { y: Y, y1: Y1 } = value;

    const x = scale.x;
    const P = Array.from(index, (i) => {
      const y1 = +Y[i];
      const y2 = +Y1[i];

      const x1 = 0;
      const x2 = 1;
      const p1 = [x1, y1];
      const p2 = [x2, y1];
      const p3 = [x2, y2];
      const p4 = [x1, y2];
      return [p1, p2, p3, p4].map((d) => coordinate.map(d)) as Vector2[];
    });
    return [index, P];
  };
};

RangeY.props = {
  defaultShape: 'annotation.range',
  channels: [...baseAnnotationChannels(), { name: 'y', required: true }],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
  shapes: ['annotation.range'],
};
