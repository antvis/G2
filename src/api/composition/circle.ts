import { CircleComposition } from '../../spec';
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

type CircleSpec = Concrete<CircleComposition>;

export interface Circle extends Composition, Mark {
  key: ValueAttribute<CircleSpec['key'], Circle>;
  data: ValueAttribute<CircleSpec['data'], Circle>;
  transform: ArrayAttribute<CircleSpec['transform'], Circle>;
  encode: ObjectAttribute<CircleSpec['encode'], Circle>;
  scale: ObjectAttribute<CircleSpec['scale'], Circle>;
  paddingLeft: ValueAttribute<CircleSpec['paddingLeft'], Circle>;
  paddingRight: ValueAttribute<CircleSpec['paddingRight'], Circle>;
  paddingBottom: ValueAttribute<CircleSpec['paddingBottom'], Circle>;
  paddingTop: ValueAttribute<CircleSpec['paddingTop'], Circle>;
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
export class Circle extends Node<CircleComposition> {
  constructor() {
    super({}, 'circle');
  }
}
