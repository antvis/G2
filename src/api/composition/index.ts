import { defineProps, nodeProps } from '../props';
import { View } from './view';
import { Layer } from './layer';
import { Flex } from './flex';
import { Rect } from './rect';
import { Circle } from './circle';
import { Matrix } from './matrix';
import { Keyframe } from './keyframe';

export const composition = {
  view: View,
  layer: Layer,
  flex: Flex,
  rect: Rect,
  circle: Circle,
  matrix: Matrix,
  keyframe: Keyframe,
};

export interface Composition {
  layer(): Layer;
  view(): View;
  flex(): Flex;
  rect(): Rect;
  circle(): Circle;
  matrix(): Matrix;
  keyframe(): Keyframe;
}

export { View, Layer, Flex, Rect, Circle, Matrix, Keyframe };

/**
 * Define composition node api for composition node dynamically,
 * which can avoid circular dependency.
 * @todo Remove view as composition.
 */
for (const Ctor of Object.values(composition)) {
  defineProps(nodeProps(composition))(Ctor);
}
