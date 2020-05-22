import { each } from '@antv/util';
import { View } from '../../../chart';
import { FilterCondition } from '../../../interface';
import RangeFilter from './range-filter';

import { getSilbings } from '../util';

/**
 * 数据范围过滤，但不在当前的 view 上生效，而在当前的 view 同一层级的其他 views 上生效，用于实现联动过滤。
 * @ignore
 */
class SiblingFilter extends RangeFilter {
  /**
   * 对 view 进行过滤
   * @param view
   * @param field
   * @param filter
   */
  protected filterView(view: View, field: string, filter: FilterCondition) {
    const siblings = getSilbings(view);
    each(siblings, (sibling) => {
      sibling.filter(field, filter);
    });
  }

  /**
   * 重新渲染
   * @param view
   */
  protected reRender(view: View) {
    const siblings = getSilbings(view);
    each(siblings, (sibling) => {
      sibling.render(true);
    });
  }
}

export default SiblingFilter;
