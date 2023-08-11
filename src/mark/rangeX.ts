import { MarkComponent as MC } from '../runtime';
import { RangeXMark } from '../spec';
import { RangeShape } from '../shape';
import {
  baseAnnotationChannels,
  basePostInference,
  basePreInference,
} from './utils';
import { AbstractRange } from './range';

const shape = {
  range: RangeShape,
};

export type RangeXOptions = Omit<RangeXMark, 'type'>;

export const RangeX: MC<RangeXOptions> = () => {
  return AbstractRange({ extendY: true });
};

RangeX.props = {
  defaultShape: 'range',
  defaultLabelShape: 'label',
  composite: false,
  shape,
  channels: [
    ...baseAnnotationChannels({ shapes: Object.keys(shape) }),
    { name: 'x', required: true },
  ],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
};
