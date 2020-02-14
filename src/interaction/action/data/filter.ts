import Action from '../base';
import { getDelegationObject, isList, isSlider } from '../util';
import { View } from 'src/chart';
import { each } from '@antv/util';

class DataFilter extends Action {
  private filterView(view: View, field, filter) {
    view.filter(field, filter);
    if (view.views && view.views.length) {
      each(view.views, subView => {
        this.filterView(subView, field, filter);
      });
    }
  }
  /**
   * 过滤数据
   */
  public filter() {
    const delegateObject = getDelegationObject(this.context);
    if (delegateObject) {
      const view = this.context.view;
      const { component } = delegateObject;
      const field = component.get('field');
      // 列表类的组件能够触发
      if (isList(delegateObject)) {
        if (field) {
          const unCheckedItems = component.getItemsByState('unchecked');
          const scale = view.getScaleByField(field);
          const names: string[] = unCheckedItems.map((item) => item.name);
          if (names.length) {
            this.filterView(view, field, (value) => {
              const text = scale.getText(value);
              return !names.includes(text);
            });
          } else {
            this.filterView(view,field, null);
          }
          view.render(true);
        }
      } else if (isSlider(delegateObject)) {
        const range = component.getValue();
        const [min, max] = range;
        this.filterView(view, field, (value) => {
          return value >= min && value <= max;
        });
        view.render(true);
      }
    }
  }
}

export default DataFilter;
