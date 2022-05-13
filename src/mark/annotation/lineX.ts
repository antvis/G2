import { Vector } from '@antv/coord';
import { MarkComponent as MC, Vector2 } from '../../runtime';
import { baseChannels, baseInference } from '../common/utils';
import { AnnotationLineX } from '../../spec';

export type LineXOptions = Omit<AnnotationLineX, 'type'>;
export const LineX: MC<LineXOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { y: Y } = value;

    if (Y === undefined) {
      throw new Error('Missing encode for y channel.');
    }

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
  channels: [...baseChannels(), { name: 'y', required: true }],
  infer: [...baseInference()],
  shapes: ['annotation.line'],
};
