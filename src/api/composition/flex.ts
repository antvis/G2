import { FlexComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import { ValueAttribute, Concrete } from '../types';
import { Node } from '../node';
import { mark, Mark } from '../mark';
import { Composition } from './index';

type FlexSpec = Concrete<FlexComposition>;

export interface Flex extends Composition, Mark {
  key: ValueAttribute<FlexSpec['key'], Flex>;
  data: ValueAttribute<FlexSpec['data'], Flex>;
  direction: ValueAttribute<FlexSpec['direction'], Flex>;
  ratio: ValueAttribute<FlexSpec['ratio'], Flex>;
  padding: ValueAttribute<FlexSpec['padding'], Flex>;
}

@defineProps([
  { type: 'value', name: 'data' },
  { type: 'value', name: 'key' },
  { type: 'value', name: 'padding' },
  { type: 'value', name: 'ratio' },
  { type: 'value', name: 'direction' },
  ...nodeProps(mark),
])
export class Flex extends Node<FlexSpec> {
  constructor() {
    super({}, 'flex');
  }
}
