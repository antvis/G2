import { ViewComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import {
  ValueAttribute,
  ObjectAttribute,
  ArrayAttribute,
  Concrete,
} from '../types';
import { Node } from '../node';
import { mark, Mark } from '../mark';

type ViewSpec = Concrete<ViewComposition>;

export interface View extends Mark {
  paddingLeft: ValueAttribute<ViewSpec['paddingLeft'], View>;
  paddingRight: ValueAttribute<ViewSpec['paddingRight'], View>;
  paddingBottom: ValueAttribute<ViewSpec['paddingBottom'], View>;
  paddingTop: ValueAttribute<ViewSpec['paddingTop'], View>;
  marginLeft: ValueAttribute<ViewSpec['marginLeft'], View>;
  marginRight: ValueAttribute<ViewSpec['marginRight'], View>;
  marginBottom: ValueAttribute<ViewSpec['marginBottom'], View>;
  marginTop: ValueAttribute<ViewSpec['marginTop'], View>;
  data: ValueAttribute<ViewSpec['data'], View>;
  key: ValueAttribute<ViewSpec['key'], View>;
  coordinate: ArrayAttribute<ViewSpec['coordinate'], View>;
  interaction: ArrayAttribute<ViewSpec['interaction'], View>;
  theme: ObjectAttribute<ViewSpec['theme'], View>;
  style: ObjectAttribute<ViewSpec['style'], View>;
  scale: ObjectAttribute<ViewSpec['scale'], View>;
  axis: ObjectAttribute<ViewSpec['axis'], View>;
}

@defineProps([
  { type: 'value', name: 'paddingLeft' },
  { type: 'value', name: 'paddingRight' },
  { type: 'value', name: 'paddingBottom' },
  { type: 'value', name: 'paddingTop' },
  { type: 'value', name: 'marginLeft' },
  { type: 'value', name: 'marginRight' },
  { type: 'value', name: 'marginBottom' },
  { type: 'value', name: 'marginTop' },
  { type: 'value', name: 'data' },
  { type: 'value', name: 'key' },
  { type: 'array', name: 'coordinate' },
  { type: 'array', name: 'interaction' },
  { type: 'object', name: 'theme' },
  { type: 'object', name: 'style' },
  { type: 'object', name: 'scale' },
  { type: 'object', name: 'axis' },
  { name: 'frame', type: 'value' },
  ...nodeProps(mark),
])
export class View extends Node<ViewComposition> {
  constructor() {
    super({}, 'view');
  }
}
