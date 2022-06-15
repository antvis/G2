import { IGroup, IShape } from '../../dependents';
import { GAnimateCfg } from '../../interface';
import { getCoordinateClipCfg } from '../../util/coordinate';
import { AnimateExtraCfg } from '../interface';

/**
 * @ignore
 * 整体动画
 * 划入入场动画效果
 * @todo 放两张直角坐标系和极坐标系的图
 * @param element 参与动画的图形元素
 * @param animateCfg 动画配置
 * @param cfg 额外信息
 */
export function waveIn(element: IShape | IGroup, animateCfg: GAnimateCfg, cfg: AnimateExtraCfg) {
  const { type, startState, endState } = getCoordinateClipCfg(cfg.coordinate, 20); // 根据坐标系类型获取整体的剪切区域配置信息
  const clipShape = element.setClip({
    type,
    attrs: startState,
  }) as IShape; // 为 shape 设置剪切区域

  // 对剪切图形做动画
  clipShape.animate(endState, {
    ...animateCfg,
    callback: () => {
      if (element && !element.get('destroyed')) {
        element.set('clipShape', null);
      }
      clipShape.remove(true); // 动画结束需要将剪切图形销毁
    },
  });
}
