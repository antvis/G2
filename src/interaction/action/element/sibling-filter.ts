import Action from "../base";
import { isMask, getSilbings , getElements, getSiblingMaskElements} from "../util";
import {each} from '@antv/util';
class SiblingFilter extends Action {
  /**
   * 过滤隐藏图形
   */
  filter() {
    // 仅考虑 mask 导致的过滤
    if (isMask(this.context)) {
      const view = this.context.view;
      const siblings = getSilbings(view);
      each(siblings, sibling => {
        const maskElements = getSiblingMaskElements(this.context, sibling, 10);
        const elements = getElements(sibling);
        if (maskElements) { // mask 过小时返回为 null，不能是空数组，否则同未框选到混淆
          each(elements, (el) => {
            if (maskElements.includes(el)) {
              el.show();
            } else {
              el.hide();
            }
          });
        }
      });
    }
  }

  /**
   * 清理所有隐藏的图形
   */
  reset() {
    const siblings = getSilbings(this.context.view);
    each(siblings, sibling => {
      const elements = getElements(sibling);
      each(elements, el => {
        el.show();
      });
    });
  }
}

export default SiblingFilter;
