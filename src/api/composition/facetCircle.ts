import { FacetCircleComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import {
  ValueAttribute,
  Concrete,
  ArrayAttribute,
  ObjectAttribute,
} from '../types';
import { mark, Mark } from '../mark';
import { Composition, CompositionNode } from './index';

type FacetCircleSpec = Concrete<FacetCircleComposition>;

export interface FacetCircle extends Composition, Mark {
  data: ValueAttribute<FacetCircleSpec['data'], FacetCircle>;
  transform: ArrayAttribute<FacetCircleSpec['transform'], FacetCircle>;
  encode: ObjectAttribute<FacetCircleSpec['encode'], FacetCircle>;
  scale: ObjectAttribute<FacetCircleSpec['scale'], FacetCircle>;
  legend: ObjectAttribute<FacetCircleSpec['legend'], FacetCircle>;
  axis: ObjectAttribute<FacetCircleSpec['axis'], FacetCircle>;
}

@defineProps([
  { type: 'value', name: 'data' },
  { type: 'array', name: 'transform' },
  { type: 'object', name: 'scale' },
  { type: 'object', name: 'encode' },
  { type: 'object', name: 'legend' },
  { type: 'object', name: 'axis' },
  ...nodeProps(mark),
])
export class FacetCircle extends CompositionNode<FacetCircleComposition> {
  constructor() {
    super({}, 'facetCircle');
  }
}
