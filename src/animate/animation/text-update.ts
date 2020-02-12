import { IShape } from '../../dependents';
import { GAnimateCfg } from '../../interface';
import { AnimateExtraCfg } from '../interface';

/**
 * 文本的更新动画，只会更新位移
 * @param shape 文本图形
 * @param animateCfg
 * @param cfg
 */
export function textUpdate(shape: IShape, animateCfg: GAnimateCfg, cfg: AnimateExtraCfg) {
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
