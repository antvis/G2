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
  data: ValueAttribute<ViewSpec['data'], View>;
  key: ValueAttribute<ViewSpec['key'], View>;
  coordinate: ArrayAttribute<ViewSpec['coordinate'], View>;
  interaction: ArrayAttribute<ViewSpec['interaction'], View>;
  theme: ObjectAttribute<ViewSpec['theme'], View>;
}

@defineProps([
  { type: 'value', name: 'paddingLeft' },
  { type: 'value', name: 'paddingRight' },
  { type: 'value', name: 'paddingBottom' },
  { type: 'value', name: 'paddingTop' },
  { type: 'value', name: 'data' },
  { type: 'value', name: 'key' },
  { type: 'array', name: 'coordinate' },
  { type: 'array', name: 'interaction' },
  { type: 'object', name: 'theme' },
  ...nodeProps(mark),
])
export class View extends Node<ViewComposition> {
  constructor() {
    super({}, 'view');
  }
}
