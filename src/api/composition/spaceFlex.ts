import { SpaceFlexComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import { ValueAttribute, Concrete } from '../types';
import { mark, Mark } from '../mark';
import { Composition, Base } from './index';

type SpaceFlexSpec = Concrete<SpaceFlexComposition>;

export interface SpaceFlex extends Composition, Mark {
  data: ValueAttribute<SpaceFlexSpec['data'], SpaceFlex>;
}

@defineProps([{ type: 'value', name: 'data' }, ...nodeProps(mark)])
export class SpaceFlex extends Base<SpaceFlexSpec> {
  constructor() {
    super({}, 'spaceFlex');
  }
}
