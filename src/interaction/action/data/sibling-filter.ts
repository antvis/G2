import { each } from '@antv/util';
import { View } from '../../../chart';
import { FilterCondition } from '../../../interface';
import RangeFilter from './range-filter';

import { getSilbings } from '../util';
class SiblingFilter extends RangeFilter {
  // 对 view 进行过滤
  protected filterView(view: View, field: string, filter: FilterCondition) {
    const siblings = getSilbings(view);
    each(siblings, sibling => {
      sibling.filter(field, filter);
    });
  }

  // 重新渲染
  protected reRender(view: View) {
    const siblings = getSilbings(view);
    each(siblings, sibling => {
      sibling.render(true);
    });
  }
}

export default SiblingFilter;
