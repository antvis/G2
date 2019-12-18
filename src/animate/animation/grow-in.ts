import { IGroup, IShape } from '../../dependents';
import { AnimateCfg, AnimateExtraCfg } from '../interface';
import { doClipScaleAnimate } from './util';

/**
 * 整体动画
 * 在整个坐标系范围内执行 x 轴方向上的入场动画
 * @param element 执行动画的元素
 * @param animateCfg 动画配置
 * @param cfg 额外信息
 */
export function growInX(element: IShape | IGroup, animateCfg: AnimateCfg, cfg: AnimateExtraCfg) {
  const { coordinate, minYPoint } = cfg;
  doClipScaleAnimate(element, animateCfg, coordinate, minYPoint, 'x');
}

/**
 * 整体动画
 * 在整个坐标系范围内执行 y 轴方向上的入场动画
 * @param element 执行动画的元素
 * @param animateCfg 动画配置
 * @param cfg 额外信息
 */
export function growInY(element: IShape | IGroup, animateCfg: AnimateCfg, cfg: AnimateExtraCfg) {
  const { coordinate, minYPoint } = cfg;
  doClipScaleAnimate(element, animateCfg, coordinate, minYPoint, 'y');
}

/**
 * 整体动画
 * 在整个坐标系范围内执行从坐标系中心点向外放大的动画
 * @param element 执行动画的元素
 * @param animateCfg 动画配置
 * @param cfg 额外信息
 */
export function growInXY(element: IShape | IGroup, animateCfg: AnimateCfg, cfg: AnimateExtraCfg) {
  const { coordinate, minYPoint } = cfg;
  doClipScaleAnimate(element, animateCfg, coordinate, minYPoint, 'xy');
}
