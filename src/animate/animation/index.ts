import { IGroup, IShape } from '../../dependents';
import { GAnimateCfg } from '../../interface';
import { AnimateExtraCfg } from '../interface';

/** @ignore */
interface AnimationMap {
  [key: string]: Animation;
}

type Animation = (element: IGroup | IShape, animateCfg: GAnimateCfg, cfg: AnimateExtraCfg) => void;

const ANIMATIONS_MAP: AnimationMap = {};

/**
 * 根据名称获取对应的动画执行函数
 * @param type 动画函数名称
 */
export function getAnimation(type: string) {
  return ANIMATIONS_MAP[type.toLowerCase()];
}

/**
 * 注册动画执行函数
 * @param type 动画执行函数名称
 * @param animation 动画执行函数
 */
export function registerAnimation(type: string, animation: Animation) {
  ANIMATIONS_MAP[type.toLowerCase()] = animation;
}
