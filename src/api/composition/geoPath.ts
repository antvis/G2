import { GeoPathComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import {
  ValueAttribute,
  ObjectAttribute,
  ArrayAttribute,
  Concrete,
} from '../types';
import { mark, Mark } from '../mark';
import { Composition, Base } from './index';

type GeoPathSpec = Concrete<GeoPathComposition>;

export interface GeoPath extends Mark, Composition {
  projection: ValueAttribute<GeoPathSpec['projection'], GeoPath>;
  data: ValueAttribute<GeoPathSpec['data'], GeoPath>;
  coordinate: ValueAttribute<GeoPathSpec['coordinate'], GeoPath>;
  interaction: ObjectAttribute<GeoPathSpec['interaction'], GeoPath>;
  style: ObjectAttribute<GeoPathSpec['style'], GeoPath>;
  theme: ObjectAttribute<GeoPathSpec['theme'], GeoPath>;
  scale: ObjectAttribute<GeoPathSpec['scale'], GeoPath>;
  encode: ObjectAttribute<GeoPathSpec['encode'], GeoPath>;
  legend: ObjectAttribute<GeoPathSpec['legend'], GeoPath>;
}

@defineProps([
  { type: 'value', name: 'data' },
  { type: 'value', name: 'projection' },
  { type: 'value', name: 'coordinate' },
  { type: 'object', name: 'interaction' },
  { type: 'object', name: 'theme' },
  { type: 'object', name: 'style' },
  { type: 'object', name: 'scale' },
  { type: 'object', name: 'encode' },
  { type: 'object', name: 'legend' },
  ...nodeProps(mark),
])
export class GeoPath extends Base<GeoPathComposition> {
  constructor() {
    super({}, 'geoPath');
  }
}
