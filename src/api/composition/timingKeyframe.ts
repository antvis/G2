import { TimingKeyframeComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import { Concrete } from '../types';
import { Node } from '../node';
import { mark, Mark } from '../mark';
import { Composition } from './index';

type TimingKeyframeSpec = Concrete<TimingKeyframeComposition>;

export interface TimingKeyframe extends Composition, Mark {}

@defineProps([...nodeProps(mark)])
export class TimingKeyframe extends Node<TimingKeyframeSpec> {
  constructor() {
    super({}, 'timingKeyframe');
  }
}
