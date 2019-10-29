import { transform } from '@antv/matrix-util';
import { Coordinate, IGroup, IShape } from '../../dependents';
import { AnimateCfg, Point, ShapeDrawCFG } from '../../interface';
import { getAngle, getCoordinateClipCfg, getSectorPath } from './util';

/**
 * 垂直方向的缩放动画
 * @param shape
 * @param animateCfg
 * @param shapeModel
 */
export function scaleInY(
  shape: IShape | IGroup,
  animateCfg: AnimateCfg,
  coordinate: Coordinate,
  shapeModel: ShapeDrawCFG
) {
  const box = shape.getBBox();
  const x = (box.minX + box.maxX) / 2;
  const points = shapeModel.points as Point[];
  // 数值如果为负值，那么应该从上往下生长，通过 shape 的关键点进行判断
  const y = points[0].y - points[1].y <= 0 ? box.maxY : box.minY;

  shape.applyToMatrix([x, y, 1]);
  const matrix = transform(shape.getMatrix(), [['t', -x, -y], ['s', 1, 0.01], ['t', x, y]]);
  shape.setMatrix(matrix);

  shape.animate(
    {
      matrix: transform(shape.getMatrix(), [['t', -x, -y], ['s', 1, 100], ['t', x, y]]),
    },
    animateCfg
  );
}

/**
 * x 方向的缩放动画
 * @param shape
 * @param animateCfg
 * @param shapeModel
 */
export function scaleInX(
  shape: IShape | IGroup,
  animateCfg: AnimateCfg,
  coordinate: Coordinate,
  shapeModel: ShapeDrawCFG
) {
  const box = shape.getBBox();
  const points = shapeModel.points as Point[];
  // x 数值如果为负值，那么应该从右往左生长
  const x = points[0].y - points[1].y > 0 ? box.maxX : box.minX;
  const y = (box.minY + box.maxY) / 2;

  shape.applyToMatrix([x, y, 1]);

  const matrix = transform(shape.getMatrix(), [['t', -x, -y], ['s', 0.01, 1], ['t', x, y]]);
  shape.setMatrix(matrix);

  shape.animate(
    {
      matrix: transform(shape.getMatrix(), [['t', -x, -y], ['s', 100, 1], ['t', x, y]]),
    },
    animateCfg
  );
}

/**
 * 以坐标系区域为剪切区域的进入动画
 * @param shape
 * @param animateCfg
 * @param coordinate
 * @param shapeModel
 */
export function clipIn(
  shape: IShape | IGroup,
  animateCfg: AnimateCfg,
  coordinate: Coordinate,
  shapeModel: ShapeDrawCFG
) {
  const clipCfg = getCoordinateClipCfg(coordinate); // 根据坐标系类型获取整体的剪切区域配置信息
  const endState = clipCfg.endState;
  // 为 shape 设置剪切区域
  const clipShape = shape.setClip(clipCfg);

  // 对剪切图形做动画
  const { easing, duration, delay } = animateCfg;
  clipShape.animate(
    endState,
    duration,
    easing,
    () => {
      if (shape && !shape.get('destroyed')) {
        shape.set('clipShape', null);
      }
      clipShape.remove(); // 动画结束需要将剪切图形销毁
    },
    delay
  );
}

/**
 * 从坐标系中心点开始逐渐放大进入
 * @param shape
 * @param animateCfg
 * @param coordinate
 * @param shapeModel
 */
export function zoomIn(
  shape: IShape | IGroup,
  animateCfg: AnimateCfg,
  coordinate: Coordinate,
  shapeModel: ShapeDrawCFG
) {
  const { x, y } = coordinate.getCenter();
  shape.applyToMatrix([x, y, 1]);
  const matrix = transform(shape.getMatrix(), [['t', -x, -y], ['s', 0.01, 0.01], ['t', x, y]]);
  shape.setMatrix(matrix);

  shape.animate(
    {
      matrix: transform(shape.getMatrix(), [['t', -x, -y], ['s', 100, 100], ['t', x, y]]),
    },
    animateCfg
  );
}

/**
 * shape 以自身中心点逐渐放大的进入动画
 * @param shape
 * @param animateCfg
 * @param coordinate
 * @param shapeModel
 */
export function grow(shape: IShape | IGroup, animateCfg: AnimateCfg, coordinate: Coordinate, shapeModel: ShapeDrawCFG) {
  const bbox = shape.getBBox();
  const x = (bbox.minX + bbox.maxX) / 2;
  const y = (bbox.minY + bbox.maxY) / 2;
  shape.applyToMatrix([x, y, 1]);
  const matrix = transform(shape.getMatrix(), [['t', -x, -y], ['s', 0.01, 0.01], ['t', x, y]]);
  shape.setMatrix(matrix);

  shape.animate(
    {
      matrix: transform(shape.getMatrix(), [['t', -x, -y], ['s', 100, 100], ['t', x, y]]),
    },
    animateCfg
  );
}

/**
 * 消失动画，shape 以自身为中心点的逐渐缩小
 * @param shape
 * @param animateCfg
 * @param coordinate
 * @param shapeModel
 */
export function shrink(
  shape: IShape | IGroup,
  animateCfg: AnimateCfg,
  coordinate: Coordinate,
  shapeModel: ShapeDrawCFG
) {
  const bbox = shape.getBBox();
  const x = (bbox.minX + bbox.maxX) / 2;
  const y = (bbox.minY + bbox.maxY) / 2;
  shape.applyToMatrix([x, y, 1]);

  const { easing, duration, delay } = animateCfg;
  shape.animate(
    {
      matrix: transform(shape.getMatrix(), [['t', -x, -y], ['s', 0.01, 0.01], ['t', x, y]]),
    },
    duration,
    easing,
    () => {
      shape.remove(true);
    },
    delay
  );
}

/**
 * 渐隐动画
 * @param shape
 * @param animateCfg
 * @param shapeModel
 */
export function fadeOut(
  shape: IShape | IGroup,
  animateCfg: AnimateCfg,
  coordinate: Coordinate,
  shapeModel: ShapeDrawCFG
) {
  const endState = {
    fillOpacity: 0,
    strokeOpacity: 0,
  };
  const { easing, duration, delay } = animateCfg;
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

/**
 * 饼图更新动画
 * @param shape
 * @param animateCfg
 * @param coordinate
 * @param shapeModel
 * @param toAttrs
 */
export function pieChartUpdate(
  shape: IShape | IGroup,
  animateCfg: AnimateCfg,
  coordinate: Coordinate,
  shapeModel: ShapeDrawCFG,
  toAttrs
) {
  const { startAngle: currentStartAngle, endAngle: currentEndAngle } = getAngle(shapeModel, coordinate);
  const { startAngle: preStartAngle, endAngle: preEndAngle } = getAngle(shape.get('origin'), coordinate);
  const center = coordinate.getCenter();
  // @ts-ignore FIXME: coordinate 支持下
  const radius = coordinate.getRadius();
  const diffStartAngle = currentStartAngle - preStartAngle;
  const diffEndAngle = currentEndAngle - preEndAngle;
  shape.animate((ratio) => {
    const onFrameStartAngle = preStartAngle + ratio * diffStartAngle;
    const onFrameEndAngle = preEndAngle + ratio * diffEndAngle;
    return {
      ...toAttrs,
      path: getSectorPath(center.x, center.y, radius, onFrameStartAngle, onFrameEndAngle),
    };
  }, animateCfg);
}
