import { Vector } from '@antv/coord';
import { MarkComponent as MC, Vector2 } from '../runtime';
import { LineXMark } from '../spec';
import {
  basePostInference,
  baseAnnotationChannels,
  basePreInference,
} from './utils';

export type LineXOptions = Omit<LineXMark, 'type'>;

export const LineX: MC<LineXOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X } = value;
    const P = Array.from(index, (i) => {
      const p1 = [X[i], 1] as Vector;
      const p2 = [X[i], 0] as Vector;
      return [p1, p2].map((d) => coordinate.map(d)) as Vector2[];
    });
    return [index, P];
  };
};

const shapes = ['line'];

LineX.props = {
  defaultShape: 'line',
  defaultLabelShape: 'label',
  composite: false,
  channels: [
    ...baseAnnotationChannels({ shapes }),
    { name: 'x', required: true },
  ],
  preInference: [...basePreInference(), { type: 'maybeTupleX' }],
  postInference: [...basePostInference()],
};
