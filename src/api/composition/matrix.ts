import { MatrixComposition } from '../../spec';
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

type MatrixSpec = Concrete<MatrixComposition>;

export interface Matrix extends Composition, Mark {
  key: ValueAttribute<MatrixSpec['key'], Matrix>;
  data: ValueAttribute<MatrixSpec['data'], Matrix>;
  transform: ArrayAttribute<MatrixSpec['transform'], Matrix>;
  encode: ObjectAttribute<MatrixSpec['encode'], Matrix>;
  scale: ObjectAttribute<MatrixSpec['scale'], Matrix>;
  paddingLeft: ValueAttribute<MatrixSpec['paddingLeft'], Matrix>;
  paddingRight: ValueAttribute<MatrixSpec['paddingRight'], Matrix>;
  paddingBottom: ValueAttribute<MatrixSpec['paddingBottom'], Matrix>;
  paddingTop: ValueAttribute<MatrixSpec['paddingTop'], Matrix>;
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
export class Matrix extends Node<MatrixComposition> {
  constructor() {
    super({}, 'matrix');
  }
}
