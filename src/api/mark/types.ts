import { ValueAttribute, ObjectAttribute, ArrayAttribute } from '../types';
import { Geometry } from '../../spec';

export type API<Props extends Geometry, Mark> = {
  data: ValueAttribute<Props['data'], Mark>;
  encode: ObjectAttribute<Props['encode'], Mark>;
  scale: ObjectAttribute<Props['scale'], Mark>;
  transform: ArrayAttribute<Props['transform'], Mark>;
  animate: ObjectAttribute<Props['animate'], Mark>;
  label: ArrayAttribute<Props['labels'], Mark>;
  style: ObjectAttribute<Props['style'], Mark>;
  axis: ObjectAttribute<Props['axis'], Mark>;
  legend: ObjectAttribute<Props['legend'], Mark>;
  coordinate: ArrayAttribute<Props['coordinates'], Mark>;
  interaction: ArrayAttribute<Props['interactions'], Mark>;
  layout: ValueAttribute<Props['layout'], Mark>;
};
