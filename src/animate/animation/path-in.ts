import { IShape } from '../../dependents';
import { GAnimateCfg } from '../../interface';
import { AnimateExtraCfg } from '../interface';

/**
 * @ignore
 * 入场动画
 * path 的入场动画
 * @param element 执行动画的元素
 * @param animateCfg 动画配置
 * @param cfg 额外信息
 */
export function pathIn(element: IShape, animateCfg: GAnimateCfg, cfg: AnimateExtraCfg) {
  // @ts-ignore
  const length = element.getTotalLength();
  // 设置虚线样式
  element.attr('lineDash', [length]);
  element.animate((ratio: number) => {
    return {
      // 对虚线偏移量做动画
      lineDashOffset: (1 - ratio) * length,
    };
  }, animateCfg);
}
