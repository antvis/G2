import { IShape } from '../../dependents';
import { GAnimateCfg } from '../../interface';
import { AnimateExtraCfg } from '../interface';

/**
 * @ignore
 * 坐标移动动画
 * @param shape 图形
 * @param animateCfg
 * @param cfg
 */
export function positionUpdate(shape: IShape, animateCfg: GAnimateCfg, cfg: AnimateExtraCfg) {
  const { toAttrs } = cfg;
  // @ts-ignore
  const x = toAttrs.x;
  // @ts-ignore
  const y = toAttrs.y;

  // @ts-ignore
  delete toAttrs.x;
  // @ts-ignore
  delete toAttrs.y;

  shape.attr(toAttrs);

  shape.animate(
    {
      x,
      y,
    },
    animateCfg
  );
}
