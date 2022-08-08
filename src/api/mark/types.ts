import { ValueAttribute, ObjectAttribute, ArrayAttribute } from '../types';
import { Geometry } from '../../spec';

export type API<Props extends Geometry, Mark> = {
  data: ValueAttribute<Props['data'], Mark>;
  encode: ObjectAttribute<Props['encode'], Mark>;
  scale: ObjectAttribute<Props['scale'], Mark>;
  transform: ArrayAttribute<Props['transform'], Mark>;
  animate: ObjectAttribute<Props['animate'], Mark>;
  key: ValueAttribute<Props['key'], Mark>;
  class: ValueAttribute<Props['class'], Mark>;
  style: ObjectAttribute<Props['style'], Mark>;
  facet: ValueAttribute<Props['facet'], Mark>;
  frame: ValueAttribute<Props['frame'], Mark>;
  adjust: ObjectAttribute<Props['adjust'], Mark>;
};
