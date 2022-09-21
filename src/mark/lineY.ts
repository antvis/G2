import { Vector } from '@antv/coord';
import { MarkComponent as MC, Vector2 } from '../runtime';
import { LineYMark } from '../spec';
import {
  baseAnnotationChannels,
  basePreInference,
  basePostInference,
} from './utils';

export type LineYOptions = Omit<LineYMark, 'type'>;

export const LineY: MC<LineYOptions> = () => {
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

LineY.props = {
  defaultShape: 'linkLine',
  defaultLabelShape: 'label',
  channels: [...baseAnnotationChannels(), { name: 'y', required: true }],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
  shapes: ['linkLine'],
};
