import { IGroup, IShape } from '../../dependents';
import { AnimateCfg, AnimateExtraCfg } from '../interface';
import { doScaleAnimate } from './util';

/**
 * 入场动画
 * x 方向的生长
 * @param element 执行动画的元素
 * @param animateCfg 动画配置
 * @param cfg 额外信息
 */
export function growInX(element: IShape | IGroup, animateCfg: AnimateCfg, cfg: AnimateExtraCfg) {
  const { coordinate, minYPoint } = cfg;
  doScaleAnimate(element, animateCfg, coordinate, minYPoint, 'x');
}

/**
 * 入场动画
 * y 轴方向上的生长
 * @param element 执行动画的元素
 * @param animateCfg 动画配置
 * @param cfg 额外信息
 */
export function growInY(element: IShape | IGroup, animateCfg: AnimateCfg, cfg: AnimateExtraCfg) {
  const { coordinate, minYPoint } = cfg;
  doScaleAnimate(element, animateCfg, coordinate, minYPoint, 'y');
}

/**
 * 入场
 * 中心点的向四周的生长动画
 * @param element 执行动画的元素
 * @param animateCfg 动画配置
 * @param cfg 额外信息
 */
export function growInXY(element: IShape | IGroup, animateCfg: AnimateCfg, cfg: AnimateExtraCfg) {
  const { coordinate, minYPoint } = cfg;
  doScaleAnimate(element, animateCfg, coordinate, minYPoint, 'xy');
}
