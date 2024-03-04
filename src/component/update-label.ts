import { Coordinate } from '@antv/coord';
import { IGroup, IShape } from '@antv/g-base';
import { each, get, isArray } from '@antv/util';
import { doAnimate } from '../animate';
import { getReplaceAttrs } from '../util/graphics';

/** label 的必要配置 */
type Cfg = {
  data: any;
  origin: any;
  animateCfg: any;
  coordinate: Coordinate;
};

/**
 * @desc 更新 label (目前没有根据 id 索引，还是会存在一点小问题的，只能根据 idx 索引)
 * @done shape 属性更新
 * @done shape delete
 * @done shape append
 *
 * @param fromShape old labelShape
 * @param toShape new labelShape
 * @param cfg
 */
export function updateLabel(fromShape: IGroup, toShape: IGroup, cfg: Cfg): void {
  const { data, origin, animateCfg, coordinate } = cfg;
  const updateAnimateCfg = get(animateCfg, 'update');

  fromShape.set('data', data);
  fromShape.set('origin', origin);
  fromShape.set('animateCfg', animateCfg);
  fromShape.set('coordinate', coordinate);
  fromShape.set('visible', toShape.get('visible'));

  (fromShape.getChildren() || []).forEach((fromChild, idx) => {
    const toChild = toShape.getChildByIndex(idx) as IShape;
    if (!toChild) {
      fromShape.removeChild(fromChild);
      fromChild.remove(true);
    } else {
      fromChild.set('data', data);
      fromChild.set('origin', origin);
      fromChild.set('animateCfg', animateCfg);
      fromChild.set('coordinate', coordinate);

      const newAttrs = getReplaceAttrs(fromChild as IShape, toChild);
      if (updateAnimateCfg) {
        doAnimate(fromChild as IShape, updateAnimateCfg, {
          toAttrs: newAttrs,
          coordinate,
        });
      } else {
        fromChild.attr(newAttrs);
      }
      if (toChild.isGroup()) {
        updateLabel(fromChild as any, toChild as any, cfg);
      }
    }
  });

  // append
  each(toShape.getChildren(), (child, idx) => {
    if (isArray(fromShape.getChildren()) && idx >= fromShape.getCount()) {
      if (!child.destroyed) {
        fromShape.add(child);
      }
    }
  });
}
