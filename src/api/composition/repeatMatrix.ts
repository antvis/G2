import { RepeatMatrixComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import {
  ValueAttribute,
  Concrete,
  ArrayAttribute,
  ObjectAttribute,
} from '../types';
import { mark, Mark } from '../mark';
import { Composition, CompositionNode } from './index';

type RepeatMatrixSpec = Concrete<RepeatMatrixComposition>;

export interface RepeatMatrix extends Composition, Mark {
  data: ValueAttribute<RepeatMatrixSpec['data'], RepeatMatrix>;
  transform: ArrayAttribute<RepeatMatrixSpec['transform'], RepeatMatrix>;
  encode: ObjectAttribute<RepeatMatrixSpec['encode'], RepeatMatrix>;
  scale: ObjectAttribute<RepeatMatrixSpec['scale'], RepeatMatrix>;
  legend: ObjectAttribute<RepeatMatrixSpec['legend'], RepeatMatrix>;
  axis: ObjectAttribute<RepeatMatrixSpec['axis'], RepeatMatrix>;
}

@defineProps([
  { type: 'value', name: 'data' },
  { type: 'array', name: 'transform' },
  { type: 'object', name: 'scale' },
  { type: 'object', name: 'encode' },
  { type: 'object', name: 'encode' },
  { type: 'object', name: 'legend' },
  ...nodeProps(mark),
])
export class RepeatMatrix extends CompositionNode<RepeatMatrixComposition> {
  constructor() {
    super({}, 'repeatMatrix');
  }
}
