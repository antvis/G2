import { deepMix } from '@antv/util';
import { MarkComponent as MC, Vector2 } from '../runtime';
import { LineYMark } from '../spec';
import { LineXY } from '../shape';
import { MaybeTupleY } from '../transform';
import {
  baseAnnotationChannels,
  basePreInference,
  basePostInference,
  createBandOffset,
} from './utils';

const shape = {
  line: LineXY,
};

export type LineYOptions = Omit<LineYMark, 'type'>;

export const LineY: MC<LineYOptions> = (options) => {
  return (index, scale, value, coordinate) => {
    const { y: Y } = value;
    const offset = createBandOffset(
      scale,
      value,
      deepMix({ style: { bandOffset: 0 } }, options),
    );
    const P = Array.from(index, (i) => {
      const p1 = [0, Y[i]] as Vector2;
      const p2 = [1, Y[i]] as Vector2;
      return [p1, p2].map((d) => coordinate.map(offset(d, i))) as Vector2[];
    });
    return [index, P];
  };
};

LineY.props = {
  defaultShape: 'line',
  defaultLabelShape: 'label',
  composite: false,
  shape,
  channels: [
    ...baseAnnotationChannels({ shapes: Object.keys(shape) }),
    { name: 'y', required: true },
  ],
  preInference: [...basePreInference(), { type: MaybeTupleY }],
  postInference: [...basePostInference()],
};
