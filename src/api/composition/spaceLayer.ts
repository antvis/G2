import { SpaceLayerComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import { ValueAttribute, Concrete } from '../types';
import { mark, Mark } from '../mark';
import { Composition, CompositionNode } from './index';

type SpaceLayerSpec = Concrete<SpaceLayerComposition>;

export interface SpaceLayer extends Composition, Mark {
  data: ValueAttribute<SpaceLayerSpec['data'], SpaceLayer>;
}

@defineProps([{ type: 'value', name: 'data' }, ...nodeProps(mark)])
export class SpaceLayer extends CompositionNode<SpaceLayerComposition> {
  constructor() {
    super({}, 'spaceLayer');
  }
}
