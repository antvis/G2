import { ViewComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import {
  ValueAttribute,
  ObjectAttribute,
  ArrayAttribute,
  Concrete,
} from '../types';
import { mark, Mark } from '../mark';
import { Base } from './base';

type ViewSpec = Concrete<ViewComposition>;

export interface View extends Mark {
  data: ValueAttribute<ViewSpec['data'], View>;
  coordinate: ArrayAttribute<ViewSpec['coordinates'], View>;
  interaction: ArrayAttribute<ViewSpec['interactions'], View>;
  theme: ObjectAttribute<ViewSpec['theme'], View>;
  style: ObjectAttribute<ViewSpec['style'], View>;
  scale: ObjectAttribute<ViewSpec['scale'], View>;
  axis: ObjectAttribute<ViewSpec['axis'], View>;
  legend: ObjectAttribute<ViewSpec['legend'], View>;
}

@defineProps([
  { type: 'value', name: 'data' },
  { type: 'array', name: 'coordinate', key: 'coordinates' },
  { type: 'array', name: 'interaction', key: 'interactions' },
  { type: 'object', name: 'theme' },
  { type: 'object', name: 'style' },
  { type: 'object', name: 'scale' },
  { type: 'object', name: 'axis' },
  { type: 'object', name: 'legend' },
  ...nodeProps(mark),
])
export class View<
  ViewProps extends ViewComposition = ViewComposition,
> extends Base<ViewProps> {
  constructor(options = {}, type = 'view') {
    super(options, type);
  }
}
