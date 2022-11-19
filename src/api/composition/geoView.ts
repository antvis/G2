import { GeoViewComposition } from '../../spec';
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

type GeoViewSpec = Concrete<GeoViewComposition>;

export interface GeoView extends Mark, Composition {
  paddingLeft: ValueAttribute<GeoViewSpec['paddingLeft'], GeoView>;
  paddingRight: ValueAttribute<GeoViewSpec['paddingRight'], GeoView>;
  paddingBottom: ValueAttribute<GeoViewSpec['paddingBottom'], GeoView>;
  paddingTop: ValueAttribute<GeoViewSpec['paddingTop'], GeoView>;
  marginLeft: ValueAttribute<GeoViewSpec['marginLeft'], GeoView>;
  marginRight: ValueAttribute<GeoViewSpec['marginRight'], GeoView>;
  marginBottom: ValueAttribute<GeoViewSpec['marginBottom'], GeoView>;
  marginTop: ValueAttribute<GeoViewSpec['marginTop'], GeoView>;
  projection: ValueAttribute<GeoViewSpec['projection'], GeoView>;
  data: ValueAttribute<GeoViewSpec['data'], GeoView>;
  key: ValueAttribute<GeoViewSpec['key'], GeoView>;
  coordinate: ArrayAttribute<GeoViewSpec['coordinates'], GeoView>;
  interaction: ArrayAttribute<GeoViewSpec['interactions'], GeoView>;
  style: ObjectAttribute<GeoViewSpec['style'], GeoView>;
  theme: ObjectAttribute<GeoViewSpec['theme'], GeoView>;
  scale: ObjectAttribute<GeoViewSpec['scale'], GeoView>;
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
  ...nodeProps(mark),
])
export class GeoView extends Node<GeoViewComposition> {
  constructor() {
    super({}, 'geoView');
  }
}
