import { KeyframeComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import { ValueAttribute, Concrete } from '../types';
import { Node } from '../node';
import { mark, Mark } from '../mark';
import { Composition } from './index';

type KeyframeSpec = Concrete<KeyframeComposition>;

export interface Keyframe extends Composition, Mark {
  key: ValueAttribute<KeyframeSpec['key'], Keyframe>;
  direction: ValueAttribute<KeyframeSpec['direction'], Keyframe>;
  duration: ValueAttribute<KeyframeSpec['duration'], Keyframe>;
  easing: ValueAttribute<KeyframeSpec['easing'], Keyframe>;
  iterationCount: ValueAttribute<KeyframeSpec['iterationCount'], Keyframe>;
}

@defineProps([
  { type: 'value', name: 'key' },
  { type: 'value', name: 'direction' },
  { type: 'value', name: 'easing' },
  { type: 'value', name: 'iterationCount' },
  { type: 'value', name: 'duration' },
  ...nodeProps(mark),
])
export class Keyframe extends Node<KeyframeSpec> {
  constructor() {
    super({}, 'keyframe');
  }
}
