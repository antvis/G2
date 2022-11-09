import { FacetRectComposition } from '../../spec';
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

type FacetRectSpec = Concrete<FacetRectComposition>;

export interface FacetRect extends Composition, Mark {
  key: ValueAttribute<FacetRectSpec['key'], FacetRect>;
  data: ValueAttribute<FacetRectSpec['data'], FacetRect>;
  transform: ArrayAttribute<FacetRectSpec['transform'], FacetRect>;
  encode: ObjectAttribute<FacetRectSpec['encode'], FacetRect>;
  scale: ObjectAttribute<FacetRectSpec['scale'], FacetRect>;
  paddingLeft: ValueAttribute<FacetRectSpec['paddingLeft'], FacetRect>;
  paddingRight: ValueAttribute<FacetRectSpec['paddingRight'], FacetRect>;
  paddingBottom: ValueAttribute<FacetRectSpec['paddingBottom'], FacetRect>;
  paddingTop: ValueAttribute<FacetRectSpec['paddingTop'], FacetRect>;
  shareData: ValueAttribute<FacetRectSpec['shareData'], FacetRect>;
  shareSize: ValueAttribute<FacetRectSpec['shareSize'], FacetRect>;
  legend: ObjectAttribute<FacetRectSpec['legend'], FacetRect>;
  axis: ObjectAttribute<FacetRectSpec['axis'], FacetRect>;
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
  { type: 'value', name: 'shareData' },
  { type: 'value', name: 'shareSize' },
  { type: 'object', name: 'legend' },
  { type: 'object', name: 'axis' },
  ...nodeProps(mark),
])
export class FacetRect extends Node<FacetRectComposition> {
  constructor() {
    super({}, 'facetRect');
  }
}
