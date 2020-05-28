import { ext } from '@antv/matrix-util';
import { IGroup, IShape } from '../../dependents';
import { GAnimateCfg, Point } from '../../interface';
import { AnimateExtraCfg } from '../interface';

/**
 * @ignore
 * 沿着 x 方向放大的动画
 * @param shape
 * @param animateCfg
 * @param shapeModel
 */
export function scaleInX(shape: IShape | IGroup, animateCfg: GAnimateCfg, cfg: AnimateExtraCfg) {
  const box = shape.getBBox();
  const { mappingData } = shape.get('origin');
  const points = mappingData.points as Point[];
  // x 数值如果为负值，那么应该从右往左生长
  const x = points[0].y - points[1].y > 0 ? box.maxX : box.minX;
  const y = (box.minY + box.maxY) / 2;

  shape.applyToMatrix([x, y, 1]);

  const matrix = ext.transform(shape.getMatrix(), [
    ['t', -x, -y],
    ['s', 0.01, 1],
    ['t', x, y],
  ]);
  shape.setMatrix(matrix);

  shape.animate(
    {
      matrix: ext.transform(shape.getMatrix(), [
        ['t', -x, -y],
        ['s', 100, 1],
        ['t', x, y],
      ]),
    },
    animateCfg
  );
}

/**
 * @ignore
 * 沿着 y 方向放大的动画
 * @param shape
 * @param animateCfg
 * @param shapeModel
 */
export function scaleInY(shape: IShape | IGroup, animateCfg: GAnimateCfg, cfg: AnimateExtraCfg) {
  const box = shape.getBBox();
  const { mappingData } = shape.get('origin');
  const x = (box.minX + box.maxX) / 2;
  const points = mappingData.points as Point[];
  // 数值如果为负值，那么应该从上往下生长，通过 shape 的关键点进行判断
  const y = points[0].y - points[1].y <= 0 ? box.maxY : box.minY;

  shape.applyToMatrix([x, y, 1]);
  const matrix = ext.transform(shape.getMatrix(), [
    ['t', -x, -y],
    ['s', 1, 0.01],
    ['t', x, y],
  ]);
  shape.setMatrix(matrix);

  shape.animate(
    {
      matrix: ext.transform(shape.getMatrix(), [
        ['t', -x, -y],
        ['s', 1, 100],
        ['t', x, y],
      ]),
    },
    animateCfg
  );
}
