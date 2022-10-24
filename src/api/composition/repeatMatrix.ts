import { RepeatMatrixComposition } from '../../spec';
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

type RepeatMatrixSpec = Concrete<RepeatMatrixComposition>;

export interface RepeatMatrix extends Composition, Mark {
  key: ValueAttribute<RepeatMatrixSpec['key'], RepeatMatrix>;
  data: ValueAttribute<RepeatMatrixSpec['data'], RepeatMatrix>;
  transform: ArrayAttribute<RepeatMatrixSpec['transform'], RepeatMatrix>;
  encode: ObjectAttribute<RepeatMatrixSpec['encode'], RepeatMatrix>;
  scale: ObjectAttribute<RepeatMatrixSpec['scale'], RepeatMatrix>;
  paddingLeft: ValueAttribute<RepeatMatrixSpec['paddingLeft'], RepeatMatrix>;
  paddingRight: ValueAttribute<RepeatMatrixSpec['paddingRight'], RepeatMatrix>;
  paddingBottom: ValueAttribute<
    RepeatMatrixSpec['paddingBottom'],
    RepeatMatrix
  >;
  paddingTop: ValueAttribute<RepeatMatrixSpec['paddingTop'], RepeatMatrix>;
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
export class RepeatMatrix extends Node<RepeatMatrixComposition> {
  constructor() {
    super({}, 'repeatMatrix');
  }
}
