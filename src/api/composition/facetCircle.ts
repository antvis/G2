import { FacetCircleComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import {
  ValueAttribute,
  Concrete,
  ArrayAttribute,
  ObjectAttribute,
} from '../types';
import { Node } from '../node';
import { mark, Mark } from '../mark';
import { Composition } from './index';

type FacetCircleSpec = Concrete<FacetCircleComposition>;

export interface FacetCircle extends Composition, Mark {
  key: ValueAttribute<FacetCircleSpec['key'], FacetCircle>;
  data: ValueAttribute<FacetCircleSpec['data'], FacetCircle>;
  transform: ArrayAttribute<FacetCircleSpec['transform'], FacetCircle>;
  encode: ObjectAttribute<FacetCircleSpec['encode'], FacetCircle>;
  scale: ObjectAttribute<FacetCircleSpec['scale'], FacetCircle>;
  paddingLeft: ValueAttribute<FacetCircleSpec['paddingLeft'], FacetCircle>;
  paddingRight: ValueAttribute<FacetCircleSpec['paddingRight'], FacetCircle>;
  paddingBottom: ValueAttribute<FacetCircleSpec['paddingBottom'], FacetCircle>;
  paddingTop: ValueAttribute<FacetCircleSpec['paddingTop'], FacetCircle>;
}

@defineProps([
  { type: 'value', name: 'data' },
  { type: 'value', name: 'key' },
  { type: 'array', name: 'transform' },
  { type: 'object', name: 'scale' },
  { type: 'object', name: 'encode' },
  { type: 'value', name: 'paddingLeft' },
  { type: 'value', name: 'paddingRight' },
  { type: 'value', name: 'paddingBottom' },
  { type: 'value', name: 'paddingTop' },
  ...nodeProps(mark),
])
export class FacetCircle extends Node<FacetCircleComposition> {
  constructor() {
    super({}, 'facetCircle');
  }
}
