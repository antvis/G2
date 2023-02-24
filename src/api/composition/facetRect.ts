import { FacetRectComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import {
  ValueAttribute,
  Concrete,
  ArrayAttribute,
  ObjectAttribute,
} from '../types';
import { mark, Mark } from '../mark';
import { Composition, CompositionNode } from './index';

type FacetRectSpec = Concrete<FacetRectComposition>;

export interface FacetRect extends Composition, Mark {
  data: ValueAttribute<FacetRectSpec['data'], FacetRect>;
  transform: ArrayAttribute<FacetRectSpec['transform'], FacetRect>;
  encode: ObjectAttribute<FacetRectSpec['encode'], FacetRect>;
  scale: ObjectAttribute<FacetRectSpec['scale'], FacetRect>;
  legend: ObjectAttribute<FacetRectSpec['legend'], FacetRect>;
  axis: ObjectAttribute<FacetRectSpec['axis'], FacetRect>;
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
export class FacetRect extends CompositionNode<FacetRectComposition> {
  constructor() {
    super({}, 'facetRect');
  }
}
