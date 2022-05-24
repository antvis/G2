import { Vector } from '@antv/coord';
import { MarkComponent as MC, Vector2 } from '../../runtime';
import { AnnotationLineX } from '../../spec';
import {
  baseAnnotationChannels,
  basePreInference,
  basePostInference,
} from '../utils';

export type LineXOptions = Omit<AnnotationLineX, 'type'>;

export const LineX: MC<LineXOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { y: Y } = value;
    const P = Array.from(index, (i) => {
      const p1 = [0, Y[i]] as Vector;
      const p2 = [1, Y[i]] as Vector;
      return [p1, p2].map((d) => coordinate.map(d)) as Vector2[];
    });
    return [index, P];
  };
};

LineX.props = {
  defaultShape: 'annotation.line',
  channels: [...baseAnnotationChannels(), { name: 'y', required: true }],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
  shapes: ['annotation.line'],
};
