import TooltipAction from './tooltip';
import { View } from '../../../chart';
import { Point } from '../../../interface';
import {getSiblingPoint, getSilbings} from '../util'
import { each } from '@antv/util';
/**
 * 存在多个 view 时，控制其他 view 上的 tooltip 显示
 */
class SiblingTooltip extends TooltipAction {
  // 所有同一层级的 tooltip 显示
  protected showTooltip(view: View, point: Point) {
    const siblings = getSilbings(view);
    each(siblings, sibling => {
      const siblingPoint = getSiblingPoint(view, sibling, point);
      sibling.showTooltip(siblingPoint);
    });
  }
  // 隐藏同一层级的 tooltip
  protected hideTooltip(view) {
    const siblings = getSilbings(view);
    each(siblings, sibling => {
      sibling.hideTooltip();
    });
  }
}

export default SiblingTooltip;