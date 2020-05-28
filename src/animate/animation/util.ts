import { ext } from '@antv/matrix-util';
import { Coordinate, IGroup, IShape } from '../../dependents';
import { GAnimateCfg, Point } from '../../interface';

/**
 * @ignore
 * 对图形元素进行矩阵变换，同时返回变换前的图形矩阵
 * @param shape 进行矩阵变换的图形
 * @param vector 矩阵变换的中心点
 * @param direct 矩阵变换的类型
 */
export function transformShape(shape: IShape | IGroup, vector: [number, number], direct: string): number[] {
  let scaledMatrix;

  const [x, y] = vector;
  shape.applyToMatrix([x, y, 1]);
  if (direct === 'x') {
    shape.setMatrix(
      ext.transform(shape.getMatrix(), [
        ['t', -x, -y],
        ['s', 0.01, 1],
        ['t', x, y],
      ])
    );
    scaledMatrix = ext.transform(shape.getMatrix(), [
      ['t', -x, -y],
      ['s', 100, 1],
      ['t', x, y],
    ]);
  } else if (direct === 'y') {
    shape.setMatrix(
      ext.transform(shape.getMatrix(), [
        ['t', -x, -y],
        ['s', 1, 0.01],
        ['t', x, y],
      ])
    );
    scaledMatrix = ext.transform(shape.getMatrix(), [
      ['t', -x, -y],
      ['s', 1, 100],
      ['t', x, y],
    ]);
  } else if (direct === 'xy') {
    shape.setMatrix(
      ext.transform(shape.getMatrix(), [
        ['t', -x, -y],
        ['s', 0.01, 0.01],
        ['t', x, y],
      ])
    );
    scaledMatrix = ext.transform(shape.getMatrix(), [
      ['t', -x, -y],
      ['s', 100, 100],
      ['t', x, y],
    ]);
  }
  return scaledMatrix;
}

/**
 * 对图形元素进行剪切动画
 * @param element 进行动画的图形元素
 * @param animateCfg 动画配置
 * @param coordinate 当前坐标系
 * @param yMinPoint y 轴的最小值对应的图形坐标点
 * @param type 剪切动画的类型
 */
export function doScaleAnimate(
  element: IGroup | IShape,
  animateCfg: GAnimateCfg,
  coordinate: Coordinate,
  yMinPoint: Point,
  type: string
) {
  const { start, end } = coordinate;
  const width = coordinate.getWidth();
  const height = coordinate.getHeight();
  let x: number;
  let y: number;

  if (type === 'y') {
    x = start.x + width / 2;
    y = yMinPoint.y < start.y ? yMinPoint.y : start.y;
  } else if (type === 'x') {
    x = yMinPoint.x > start.x ? yMinPoint.x : start.x;
    y = start.y + height / 2;
  } else if (type === 'xy') {
    if (coordinate.isPolar) {
      x = coordinate.getCenter().x;
      y = coordinate.getCenter().y;
    } else {
      x = (start.x + end.x) / 2;
      y = (start.y + end.y) / 2;
    }
  }

  const endMatrix = transformShape(element, [x, y], type);
  element.animate(
    {
      matrix: endMatrix,
    },
    animateCfg
  );
}
