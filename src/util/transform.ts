import { mat3 } from '@antv/matrix-util';
import { IGroup, IShape } from '../dependents';

/**
 * 对元素进行平移操作
 * @param element 进行变换的元素
 * @param x x 方向位移
 * @param y y 方向位移
 */
export function translate(element: IGroup | IShape, x: number, y: number) {
  // FIXME
  const matrix = element.getMatrix() || [1, 0, 0, 0, 1, 0, 0, 0, 1];
  mat3.translate(matrix, matrix, [x, y]);
  element.setMatrix(matrix);
}
