import { ValueAttribute, ObjectAttribute, ArrayAttribute } from '../types';
import { Geometry } from '../../spec';

export type API<Props extends Geometry, Mark> = {
  data: ValueAttribute<Props['data'], Mark>;
  encode: ObjectAttribute<Props['encode'], Mark>;
  scale: ObjectAttribute<Props['scale'], Mark>;
  transform: ArrayAttribute<Props['transform'], Mark>;
  animate: ObjectAttribute<Props['animate'], Mark>;
  key: ValueAttribute<Props['key'], Mark>;
  label: ArrayAttribute<Props['labels'], Mark>;
  class: ValueAttribute<Props['class'], Mark>;
  style: ObjectAttribute<Props['style'], Mark>;
  facet: ValueAttribute<Props['facet'], Mark>;
  axis: ObjectAttribute<Props['axis'], Mark>;
  legend: ObjectAttribute<Props['legend'], Mark>;
  adjust: ValueAttribute<Props['adjust'], Mark>;
  coordinate: ArrayAttribute<Props['coordinate'], Mark>;
  interaction: ArrayAttribute<Props['interaction'], Mark>;
  paddingLeft: ValueAttribute<Props['paddingLeft'], Mark>;
  paddingRight: ValueAttribute<Props['paddingRight'], Mark>;
  paddingBottom: ValueAttribute<Props['paddingBottom'], Mark>;
  paddingTop: ValueAttribute<Props['paddingTop'], Mark>;
};
