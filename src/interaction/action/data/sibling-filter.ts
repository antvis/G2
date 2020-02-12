import RangeFilter from './range-filter';
import { View } from '../../../chart';
import { FilterCondition } from '../../../chart/interface';
import { each } from '@antv/util';

class SiblingFilter extends RangeFilter {
  // 获取同一级的 views
  private getSilbings(view: View) {
    const parent = view.parent;
    let siblings = null;
    if (parent) {
      siblings = parent.views.filter(sub => sub !== view);
    }
    return siblings;
  }
  // 对 view 进行过滤
  protected filterView(view: View, field: string, filter: FilterCondition) {
    const siblings = this.getSilbings(view);
    each(siblings, sibling => {
      sibling.filter(field, filter);
    });
  }
  
  // 重新渲染
  protected reRender(view: View) {
    const siblings = this.getSilbings(view);
    each(siblings, sibling => {
      sibling.render(true);
    });
  }
}

export default SiblingFilter;
