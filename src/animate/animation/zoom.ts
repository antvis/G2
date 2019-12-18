import { transform } from '@antv/matrix-util';
import { IGroup, IShape } from '../../dependents';
import { AnimateCfg, AnimateExtraCfg } from '../interface';

/**
 * 单个 shape 动画
 * shape 以自身中心点逐渐放大的进入动画
 * @param shape 参与动画的图形元素
 * @param animateCfg 动画配置
 * @param cfg 额外信息
 */
export function zoomIn(shape: IShape | IGroup, animateCfg: AnimateCfg, cfg: AnimateExtraCfg) {
  const bbox = shape.getBBox();
  const x = (bbox.minX + bbox.maxX) / 2;
  const y = (bbox.minY + bbox.maxY) / 2;
  shape.applyToMatrix([x, y, 1]);
  const matrix = transform(shape.getMatrix(), [
    ['t', -x, -y],
    ['s', 0.01, 0.01],
    ['t', x, y],
  ]);
  shape.setMatrix(matrix);

  shape.animate(
    {
      matrix: transform(shape.getMatrix(), [
        ['t', -x, -y],
        ['s', 100, 100],
        ['t', x, y],
      ]),
    },
    animateCfg
  );
}

/**
 * 单个 shape 动画
 * 消失动画，shape 以自身为中心点的逐渐缩小
 * @param shape 参与动画的图形元素
 * @param animateCfg 动画配置
 * @param cfg 额外信息
 */
export function zoomOut(shape: IShape | IGroup, animateCfg: AnimateCfg, cfg: AnimateExtraCfg) {
  const bbox = shape.getBBox();
  const x = (bbox.minX + bbox.maxX) / 2;
  const y = (bbox.minY + bbox.maxY) / 2;
  shape.applyToMatrix([x, y, 1]);

  const { easing, duration, delay } = animateCfg;
  shape.animate(
    {
      matrix: transform(shape.getMatrix(), [
        ['t', -x, -y],
        ['s', 0.01, 0.01],
        ['t', x, y],
      ]),
    },
    duration,
    easing,
    () => {
      shape.remove(true);
    },
    delay
  );
}
