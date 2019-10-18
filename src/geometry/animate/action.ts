import { transform } from '@antv/matrix-util';
import { ShapeDrawCFG } from 'interface';
import { IGroup, IShape } from '../../dependents';
/**
 * 垂直方向的缩放动画
 * @param shape
 * @param animateCfg
 * @param shapeModel
 */
export function scaleInY(shape: IShape | IGroup, animateCfg, shapeModel: ShapeDrawCFG) {
  const box = shape.getBBox();
  const x = (box.minX + box.maxX) / 2;
  const { points } = shapeModel;
  // 数值如果为负值，那么应该从上往下生长，通过 shape 的关键点进行判断
  const y = points[0].y - points[1].y <= 0 ? box.maxY : box.minY;

  const v = [x, y, 1];
  shape.applyToMatrix(v);

  const matrix = transform(shape.getMatrix(), [['t', -x, -y], ['s', 1, 0.01], ['t', x, y]]);
  shape.setMatrix(matrix);

  const endState = {
    matrix: transform(shape.getMatrix(), [['t', -x, -y], ['s', 1, 100], ['t', x, y]]),
  };

  shape.animate(endState, animateCfg);
}

/**
 * x 方向的缩放动画
 * @param shape
 * @param animateCfg
 * @param shapeModel
 */
export function scaleInX(shape: IShape | IGroup, animateCfg, shapeModel: ShapeDrawCFG) {
  const box = shape.getBBox();
  const { points } = shapeModel;
  // x 数值如果为负值，那么应该从右往左生长
  const x = points[0].y - points[1].y > 0 ? box.maxX : box.minX;
  const y = (box.minY + box.maxY) / 2;

  const v = [x, y, 1];
  shape.applyToMatrix(v);

  const matrix = transform(shape.getMatrix(), [['t', -x, -y], ['s', 0.01, 1], ['t', x, y]]);
  shape.setMatrix(matrix);

  const endState = {
    matrix: transform(shape.getMatrix(), [['t', -x, -y], ['s', 100, 1], ['t', x, y]]),
  };

  shape.animate(endState, animateCfg);
}

/**
 * 渐隐动画
 * @param shape
 * @param animateCfg
 * @param shapeModel
 */
export function fadeOut(shape: IShape | IGroup, animateCfg, shapeModel: ShapeDrawCFG) {
  const endState = {
    fillOpacity: 0,
    strokeOpacity: 0,
  };
  const { easing, duration, delay, callback } = animateCfg;
  shape.animate(
    endState,
    duration,
    easing,
    () => {
      shape.remove(true);
    },
    delay
  );
}
