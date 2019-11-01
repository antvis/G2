import * as _ from '@antv/util';
import Element from '../geometry/element/index';
import { registerStateAction } from './index';

// 测试用
registerStateAction('activeElements', {
  init(stateManager, view) {
    stateManager.on('activeElementschange', _.wrapBehavior(this, 'onChange'));
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
    stateManager.off('activeElements', _.getWrapBehavior(this, 'onChange'));
  },
});
