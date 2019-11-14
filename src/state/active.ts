import Element from '../geometry/element/index';
import { registerStateAction } from './index';

registerStateAction('active-feedback', {
  init(stateManager, view) {
    stateManager.on('active', this.onChange);
  },
  onChange(ev) {
    const activedElements: Element[] = ev.preValue;
    // 如果存在之前激活的元素
    if (activedElements) {
      activedElements.forEach((ele: Element) => {
        ele.setState('active', false);
      });
    }
    const elements = ev.value;
    if (elements) {
      elements.forEach((ele: Element) => {
        ele.setState('active', true);
      });
    }
  },
  destroy(stateManager, view) {
    stateManager.off('activeElements', this.onChange);
  },
});
