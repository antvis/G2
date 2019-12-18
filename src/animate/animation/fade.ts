import { isNil } from '@antv/util';
import { IGroup, IShape } from '../../dependents';
import { AnimateCfg, AnimateExtraCfg } from '../interface';

/**
 * 单个 shape 动画
 * 渐现动画
 * @param shape 执行动画的图形元素
 * @param animateCfg 动画配置
 * @param cfg 额外信息
 */
export function fadeIn(shape: IShape | IGroup, animateCfg: AnimateCfg, cfg: AnimateExtraCfg) {
  const endState = {
    fillOpacity: isNil(shape.attr('fillOpacity')) ? 1 : shape.attr('fillOpacity'),
    strokeOpacity: isNil(shape.attr('strokeOpacity')) ? 1 : shape.attr('strokeOpacity'),
    opacity: isNil(shape.attr('opacity')) ? 1 : shape.attr('opacity'),
  };
  shape.attr({
    fillOpacity: 0,
    strokeOpacity: 0,
    opacity: 0,
  });
  shape.animate(endState, animateCfg);
}

/**
 * 单个 shape 动画
 * 渐隐动画
 * @param shape 执行动画的图形元素
 * @param animateCfg 动画配置
 * @param cfg 额外信息
 */
export function fadeOut(shape: IShape | IGroup, animateCfg: AnimateCfg, cfg: AnimateExtraCfg) {
  const endState = {
    fillOpacity: 0,
    strokeOpacity: 0,
    opacity: 0,
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
