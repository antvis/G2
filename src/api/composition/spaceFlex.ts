import { SpaceFlexComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import { ValueAttribute, Concrete } from '../types';
import { Node } from '../node';
import { mark, Mark } from '../mark';
import { Composition } from './index';

type SpaceFlexSpec = Concrete<SpaceFlexComposition>;

export interface SpaceFlex extends Composition, Mark {
  key: ValueAttribute<SpaceFlexSpec['key'], SpaceFlex>;
  data: ValueAttribute<SpaceFlexSpec['data'], SpaceFlex>;
  direction: ValueAttribute<SpaceFlexSpec['direction'], SpaceFlex>;
  ratio: ValueAttribute<SpaceFlexSpec['ratio'], SpaceFlex>;
  padding: ValueAttribute<SpaceFlexSpec['padding'], SpaceFlex>;
}

@defineProps([
  { type: 'value', name: 'data' },
  { type: 'value', name: 'key' },
  { type: 'value', name: 'padding' },
  { type: 'value', name: 'ratio' },
  { type: 'value', name: 'direction' },
  ...nodeProps(mark),
])
export class SpaceFlex extends Node<SpaceFlexSpec> {
  constructor() {
    super({}, 'spaceFlex');
  }
}
