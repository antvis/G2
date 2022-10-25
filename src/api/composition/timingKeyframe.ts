import { TimingKeyframeComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import { ValueAttribute, Concrete } from '../types';
import { Node } from '../node';
import { mark, Mark } from '../mark';
import { Composition } from './index';

type TimingKeyframeSpec = Concrete<TimingKeyframeComposition>;

export interface TimingKeyframe extends Composition, Mark {
  key: ValueAttribute<TimingKeyframeSpec['key'], TimingKeyframe>;
  direction: ValueAttribute<TimingKeyframeSpec['direction'], TimingKeyframe>;
  duration: ValueAttribute<TimingKeyframeSpec['duration'], TimingKeyframe>;
  easing: ValueAttribute<TimingKeyframeSpec['easing'], TimingKeyframe>;
  iterationCount: ValueAttribute<
    TimingKeyframeSpec['iterationCount'],
    TimingKeyframe
  >;
}

@defineProps([
  { type: 'value', name: 'key' },
  { type: 'value', name: 'direction' },
  { type: 'value', name: 'easing' },
  { type: 'value', name: 'iterationCount' },
  { type: 'value', name: 'duration' },
  ...nodeProps(mark),
])
export class TimingKeyframe extends Node<TimingKeyframeSpec> {
  constructor() {
    super({}, 'timingKeyframe');
  }
}
