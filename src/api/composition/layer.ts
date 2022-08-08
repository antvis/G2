import { LayerComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import { ValueAttribute, Concrete } from '../types';
import { Node } from '../node';
import { mark, Mark } from '../mark';
import { Composition } from './index';

type LayerSpec = Concrete<LayerComposition>;

export interface Layer extends Composition, Mark {
  key: ValueAttribute<LayerSpec['key'], Layer>;
  data: ValueAttribute<LayerSpec['data'], Layer>;
}

@defineProps([
  { type: 'value', name: 'data' },
  { type: 'value', name: 'key' },
  ...nodeProps(mark),
])
export class Layer extends Node<LayerComposition> {
  constructor() {
    super({}, 'layer');
  }
}
