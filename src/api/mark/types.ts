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
  slider: ObjectAttribute<Props['slider'], Mark>;
  legend: ObjectAttribute<Props['legend'], Mark>;
  layout: ValueAttribute<Props['layout'], Mark>;
};
