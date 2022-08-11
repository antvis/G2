import { RectComposition } from '../../spec';
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

type RectSpec = Concrete<RectComposition>;

export interface Rect extends Composition, Mark {
  key: ValueAttribute<RectSpec['key'], Rect>;
  data: ValueAttribute<RectSpec['data'], Rect>;
  transform: ArrayAttribute<RectSpec['transform'], Rect>;
  encode: ObjectAttribute<RectSpec['encode'], Rect>;
  scale: ObjectAttribute<RectSpec['scale'], Rect>;
  paddingLeft: ValueAttribute<RectSpec['paddingLeft'], Rect>;
  paddingRight: ValueAttribute<RectSpec['paddingRight'], Rect>;
  paddingBottom: ValueAttribute<RectSpec['paddingBottom'], Rect>;
  paddingTop: ValueAttribute<RectSpec['paddingTop'], Rect>;
  shareData: ValueAttribute<RectSpec['shareData'], Rect>;
  shareSize: ValueAttribute<RectSpec['shareSize'], Rect>;
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
export class Rect extends Node<RectComposition> {
  constructor() {
    super({}, 'rect');
  }
}
