import { ViewComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import {
  ValueAttribute,
  ObjectAttribute,
  ArrayAttribute,
  Concrete,
} from '../types';
import { mark, Mark } from '../mark';
import { CompositionNode } from './base';

type ViewSpec = Concrete<ViewComposition>;

export interface View extends Mark {
  data: ValueAttribute<ViewSpec['data'], View>;
  coordinate: ArrayAttribute<ViewSpec['coordinate'], View>;
  interaction: ObjectAttribute<ViewSpec['interaction'], View>;
  theme: ObjectAttribute<ViewSpec['theme'], View>;
  style: ObjectAttribute<ViewSpec['style'], View>;
  scale: ObjectAttribute<ViewSpec['scale'], View>;
  axis: ObjectAttribute<ViewSpec['axis'], View>;
  legend: ObjectAttribute<ViewSpec['legend'], View>;
}

@defineProps([
  { type: 'value', name: 'data' },
  { type: 'value', name: 'coordinate' },
  { type: 'object', name: 'interaction' },
  { type: 'object', name: 'theme' },
  { type: 'object', name: 'style' },
  { type: 'object', name: 'scale' },
  { type: 'object', name: 'axis' },
  { type: 'object', name: 'legend' },
  ...nodeProps(mark),
])
export class View<
  ViewProps extends ViewComposition = ViewComposition,
> extends CompositionNode<ViewProps> {
  constructor(options = {}, type = 'view') {
    super(options, type);
  }
}
