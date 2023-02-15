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
  state: ObjectAttribute<Props['state'], Mark>;
  axis: ObjectAttribute<Props['axis'], Mark>;
  coordinate: ValueAttribute<Props['coordinate'], Mark>;
  interaction: ObjectAttribute<Props['interaction'], Mark>;
  slider: ObjectAttribute<Props['slider'], Mark>;
  scrollbar: ObjectAttribute<Props['scrollbar'], Mark>;
  legend: ObjectAttribute<Props['legend'], Mark>;
  layout: ValueAttribute<Props['layout'], Mark>;
};
