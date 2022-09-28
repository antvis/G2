import { SquareComposition } from '../../spec';
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

type SquareSpec = Concrete<SquareComposition>;

export interface Square extends Composition, Mark {
  key: ValueAttribute<SquareSpec['key'], Square>;
  data: ValueAttribute<SquareSpec['data'], Square>;
  transform: ArrayAttribute<SquareSpec['transform'], Square>;
  encode: ObjectAttribute<SquareSpec['encode'], Square>;
  scale: ObjectAttribute<SquareSpec['scale'], Square>;
  paddingLeft: ValueAttribute<SquareSpec['paddingLeft'], Square>;
  paddingRight: ValueAttribute<SquareSpec['paddingRight'], Square>;
  paddingBottom: ValueAttribute<SquareSpec['paddingBottom'], Square>;
  paddingTop: ValueAttribute<SquareSpec['paddingTop'], Square>;
  shareData: ValueAttribute<SquareSpec['shareData'], Square>;
  shareSize: ValueAttribute<SquareSpec['shareSize'], Square>;
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
  ...nodeProps(mark),
])
export class Square extends Node<SquareComposition> {
  constructor() {
    super({}, 'square');
  }
}
