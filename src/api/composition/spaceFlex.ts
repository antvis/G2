import { SpaceFlexComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import { ValueAttribute, Concrete } from '../types';
import { Node } from '../node';
import { mark, Mark } from '../mark';
import { Composition } from './index';

type SpaceFlexSpec = Concrete<SpaceFlexComposition>;

export interface SpaceFlex extends Composition, Mark {
  data: ValueAttribute<SpaceFlexSpec['data'], SpaceFlex>;
}

@defineProps([{ type: 'value', name: 'data' }, ...nodeProps(mark)])
export class SpaceFlex extends Node<SpaceFlexSpec> {
  constructor() {
    super({}, 'spaceFlex');
  }
}
