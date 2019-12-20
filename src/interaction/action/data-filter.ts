import Action from './base';
import { getDelegationObject, isList, isSlider } from './util';

class DataFilter extends Action {
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
          const names = unCheckedItems.map((item) => item.name);
          // if (names.length) { chart.filter 目前不支持 null，支持后这个地方改成更高效的形式

          // } else {
          //   view.filter(field, null);
          // }
          view.filter(field, (value) => {
            const text = scale.getText(value);
            return names.indexOf(text) === -1;
          });
          view.render(true);
        }
      } else if (isSlider(delegateObject)) {
        const range = component.getValue();
        const [min, max] = range;
        view.filter(field, (value) => {
          return value >= min && value <= max;
        });
        view.render(true);
      }
    }
  }
}

export default DataFilter;
