import { IntervalGeometry } from '../spec';
import { Node } from './node';
import { defineProps, NodePropertyDescriptor } from './props';
import {
  ValueAttribute,
  ObjectAttribute,
  ArrayAttribute,
  Concrete,
} from './types';

type IntervalProps = Concrete<IntervalGeometry>;

export interface Interval {
  data: ValueAttribute<IntervalProps['data'], Interval>;
  encode: ObjectAttribute<IntervalProps['encode'], Interval>;
  scale: ObjectAttribute<IntervalProps['scale'], Interval>;
  transform: ArrayAttribute<IntervalProps['transform'], Interval>;
  animate: ObjectAttribute<IntervalProps['animate'], Interval>;
  theme: ObjectAttribute<IntervalProps['theme'], Interval>;
  key: ValueAttribute<IntervalProps['key'], Interval>;
  class: ValueAttribute<IntervalProps['class'], Interval>;
  style: ObjectAttribute<IntervalProps['style'], Interval>;
}

export const props: NodePropertyDescriptor[] = [
  { name: 'encode', type: 'object' },
  { name: 'scale', type: 'object' },
  { name: 'data', type: 'value' },
  { name: 'key', type: 'value' },
  { name: 'class', type: 'value' },
  { name: 'transform', type: 'array' },
  { name: 'style', type: 'object' },
  { name: 'animate', type: 'object' },
  { name: 'theme', type: 'object' },
];

@defineProps(props)
export class Interval extends Node<IntervalGeometry> {
  constructor(options?: IntervalGeometry) {
    super(options, 'interval');
  }
}
