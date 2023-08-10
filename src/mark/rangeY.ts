import { MarkComponent as MC } from '../runtime';
import { RangeYMark } from '../spec';
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

export type RangeYOptions = Omit<RangeYMark, 'type'>;

export const RangeY: MC<RangeYOptions> = () => {
  return AbstractRange({ extendX: true });
};

RangeY.props = {
  defaultShape: 'range',
  defaultLabelShape: 'label',
  composite: false,
  shape,
  channels: [
    ...baseAnnotationChannels({ shapes: Object.keys(shape) }),
    { name: 'y', required: true },
  ],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
};
