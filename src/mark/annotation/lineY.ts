import { Vector } from '@antv/coord';
import { MarkComponent as MC, Vector2 } from '../../runtime';
import { baseChannels, baseInference } from '../common/utils';
import { AnnotationLineY } from '../../spec';

export type LineYOptions = Omit<AnnotationLineY, 'type'>;
export const LineY: MC<LineYOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X } = value;

    if (X === undefined) {
      throw new Error('Missing encode for x channel.');
    }

    const P = Array.from(index, (i) => {
      const p1 = [X[i], 1] as Vector;
      const p2 = [X[i], 0] as Vector;
      return [p1, p2].map((d) => coordinate.map(d)) as Vector2[];
    });

    return [index, P];
  };
};

LineY.props = {
  defaultShape: 'annotation.line',
  channels: [...baseChannels(), { name: 'x', required: true }],
  infer: [...baseInference()],
  shapes: ['annotation.line'],
};
