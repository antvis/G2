import { GeoPathComposition } from '../../spec';
import { defineProps, nodeProps } from '../props';
import {
  ValueAttribute,
  ObjectAttribute,
  ArrayAttribute,
  Concrete,
} from '../types';
import { Node } from '../node';
import { mark, Mark } from '../mark';
import { Composition } from './index';

type GeoPathSpec = Concrete<GeoPathComposition>;

export interface GeoPath extends Mark, Composition {
  paddingLeft: ValueAttribute<GeoPathSpec['paddingLeft'], GeoPath>;
  paddingRight: ValueAttribute<GeoPathSpec['paddingRight'], GeoPath>;
  paddingBottom: ValueAttribute<GeoPathSpec['paddingBottom'], GeoPath>;
  paddingTop: ValueAttribute<GeoPathSpec['paddingTop'], GeoPath>;
  marginLeft: ValueAttribute<GeoPathSpec['marginLeft'], GeoPath>;
  marginRight: ValueAttribute<GeoPathSpec['marginRight'], GeoPath>;
  marginBottom: ValueAttribute<GeoPathSpec['marginBottom'], GeoPath>;
  marginTop: ValueAttribute<GeoPathSpec['marginTop'], GeoPath>;
  projection: ValueAttribute<GeoPathSpec['projection'], GeoPath>;
  data: ValueAttribute<GeoPathSpec['data'], GeoPath>;
  key: ValueAttribute<GeoPathSpec['key'], GeoPath>;
  coordinate: ArrayAttribute<GeoPathSpec['coordinates'], GeoPath>;
  interaction: ArrayAttribute<GeoPathSpec['interactions'], GeoPath>;
  style: ObjectAttribute<GeoPathSpec['style'], GeoPath>;
  theme: ObjectAttribute<GeoPathSpec['theme'], GeoPath>;
  scale: ObjectAttribute<GeoPathSpec['scale'], GeoPath>;
  encode: ObjectAttribute<GeoPathSpec['encode'], GeoPath>;
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
  { type: 'value', name: 'projection' },
  { type: 'array', name: 'coordinate', key: 'coordinates' },
  { type: 'array', name: 'interaction', key: 'interactions' },
  { type: 'object', name: 'theme' },
  { type: 'object', name: 'style' },
  { type: 'object', name: 'scale' },
  { type: 'object', name: 'encode' },
  ...nodeProps(mark),
])
export class GeoPath extends Node<GeoPathComposition> {
  constructor() {
    super({}, 'geoPath');
  }
}
