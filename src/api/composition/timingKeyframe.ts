import { TimingKeyframeComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import { Concrete } from '../types';
import { mark, Mark } from '../mark';
import { Composition, Base } from './index';

type TimingKeyframeSpec = Concrete<TimingKeyframeComposition>;

export interface TimingKeyframe extends Composition, Mark {}

@defineProps([...nodeProps(mark)])
export class TimingKeyframe extends Base<TimingKeyframeSpec> {
  constructor() {
    super({}, 'timingKeyframe');
  }
}
