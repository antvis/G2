import { GeoViewComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import {
  ValueAttribute,
  ObjectAttribute,
  ArrayAttribute,
  Concrete,
} from '../types';
import { mark, Mark } from '../mark';
import { Composition, Base } from './index';

type GeoViewSpec = Concrete<GeoViewComposition>;

export interface GeoView extends Mark, Composition {
  projection: ValueAttribute<GeoViewSpec['projection'], GeoView>;
  data: ValueAttribute<GeoViewSpec['data'], GeoView>;
  key: ValueAttribute<GeoViewSpec['key'], GeoView>;
  coordinate: ArrayAttribute<GeoViewSpec['coordinate'], GeoView>;
  interaction: ObjectAttribute<GeoViewSpec['interaction'], GeoView>;
  style: ObjectAttribute<GeoViewSpec['style'], GeoView>;
  theme: ObjectAttribute<GeoViewSpec['theme'], GeoView>;
  scale: ObjectAttribute<GeoViewSpec['scale'], GeoView>;
  legend: ObjectAttribute<GeoViewSpec['legend'], GeoView>;
}

@defineProps([
  { type: 'value', name: 'data' },
  { type: 'value', name: 'projection' },
  { type: 'value', name: 'coordinate' },
  { type: 'object', name: 'interaction' },
  { type: 'object', name: 'theme' },
  { type: 'object', name: 'style' },
  { type: 'object', name: 'scale' },
  { type: 'object', name: 'legend' },
  ...nodeProps(mark),
])
export class GeoView extends Base<GeoViewComposition> {
  constructor() {
    super({}, 'geoView');
  }
}
