import { each } from '@antv/util';
import { isArray } from '@antv/util';
import { isObject } from '@antv/util';
import { isNil } from '@antv/util';
import Element from '../../geometry/element/';
import Action from './base';
import { getCurrentElement, getDelegationObject, isList } from './util';
class ElementActive extends Action {
  private element: Element;

  private setElementActive(enable) {
    const element = getCurrentElement(this.context);
    if (element) {
      element.setState('active', enable);
    } else {
      const delegationObject = getDelegationObject(this.context);
      // 如果触发源时列表，图例、坐标轴
      if (isList(delegationObject)) {
        const { item, component } = delegationObject;
        if (item && component) {
          const view = this.context.view;
          const field = component.get('field');
          const scale = view.getScaleByField(field);
          const geometries = view.geometries;
          // 遍历所有 geometry, 筛选出 active 的 elements
          each(geometries, (geom) => {
            each(geom.elements, (el: Element) => {
              const data = el.getModel().data;
              let value;
              if (isObject(data)) {
                value = data[field];
              } else if (isArray(data)) {
                value = data[0][field];
              }
              if (!isNil(value) && item.name === scale.getText(value)) {
                element.setState('active', enable);
              }
            });
          });
        }
      }
    }
  }
  public active() {
    this.setElementActive(true);
  }

  public reset() {
    this.setElementActive(false);
  }

  public destroy() {
    super.destroy();
  }
}

export default ElementActive;
