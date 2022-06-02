import { MarkComponent as MC } from '../../runtime';
import { AnnotationRangeY } from '../../spec';
import {
  baseAnnotationChannels,
  basePostInference,
  basePreInference,
} from '../utils';
import { Range } from './range';

export type RangeYOptions = Omit<AnnotationRangeY, 'type'>;

export const RangeY: MC<RangeYOptions> = () => {
  return Range();
};

RangeY.props = {
  defaultShape: 'annotation.range',
  channels: [...baseAnnotationChannels(), { name: 'y', required: true }],
  preInference: [...basePreInference()],
  postInference: [...basePostInference()],
  shapes: ['annotation.range'],
};
