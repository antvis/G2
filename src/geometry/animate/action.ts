import { transform } from '@antv/matrix-util';
import { ShapeDrawCFG } from 'interface';
import { Coordinate, IGroup, IShape } from '../../dependents';
import { getAngle, getCoordinateClipCfg, getSectorPath } from './util';

/**
 * 垂直方向的缩放动画
 * @param shape
 * @param animateCfg
 * @param shapeModel
 */
export function scaleInY(shape: IShape | IGroup, animateCfg, coordinate: Coordinate, shapeModel: ShapeDrawCFG) {
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
export function scaleInX(shape: IShape | IGroup, animateCfg, coordinate: Coordinate, shapeModel: ShapeDrawCFG) {
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
export function fadeOut(shape: IShape | IGroup, animateCfg, coordinate: Coordinate, shapeModel: ShapeDrawCFG) {
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

// TODO: 待 G 4.0 修复，关联 issue https://github.com/antvis/g/issues/218
export function clipIn(shape: IShape | IGroup, animateCfg, coordinate: Coordinate, shapeModel: ShapeDrawCFG) {
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
    },
    delay
  );
}

// TODO: 待 G 4.0 修复，关联 issue https://github.com/antvis/g/issues/218
export function pieChartEnter(shape: IShape | IGroup, animateCfg, coordinate: Coordinate, shapeModel: ShapeDrawCFG) {
  const { endAngle } = getAngle(shapeModel, coordinate);
  const coordinateStartAngle = coordinate.startAngle;
  const center = coordinate.getCenter();
  // @ts-ignore FIXME: coordinate 支持下
  const radius = coordinate.getRadius();

  const startPath = getSectorPath(center.x, center.y, radius, coordinateStartAngle, coordinateStartAngle);
  const clipShape = shape.setClip({
    type: 'path',
    attrs: {
      path: startPath,
    },
  });
  const { easing, duration, delay } = animateCfg;
  clipShape.animate(
    (ratio) => {
      const diff = (endAngle - coordinateStartAngle) * ratio + coordinateStartAngle;
      const path = getSectorPath(center.x, center.y, radius, coordinateStartAngle, diff);
      return {
        path,
      };
    },
    duration,
    easing,
    () => {
      if (shape && !shape.get('destroyed')) {
        shape.set('clipShape', null);
      }
    },
    delay
  );
}

export function pieChartUpdate(
  shape: IShape | IGroup,
  animateCfg,
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
