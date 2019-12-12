import { each } from '@antv/util';
import { View } from '../../../chart';
import Element from '../../../geometry/element/';
import { getElements } from '../util';

const STATUS_UNACTIVE = 'inactive';
const STATUS_ACTIVE = 'active';

export function clearHighlight(view: View) {
  const elements = getElements(view);
  each(elements, (el) => {
    if (el.hasState(STATUS_ACTIVE)) {
      el.setState(STATUS_ACTIVE, false);
    }
    if (el.hasState(STATUS_UNACTIVE)) {
      el.setState(STATUS_UNACTIVE, false);
    }
  });
}

type MatchCallback = (el: Element) => boolean;

export function setHighlightBy(elements: Element[], callback: MatchCallback, enable: boolean) {
  each(elements, (el) => {
    // 需要处理 active 和 unactive 的互斥
    if (callback(el)) {
      el.setState(STATUS_ACTIVE, enable);
    } else {
      el.setState(STATUS_UNACTIVE, enable);
    }
  });
}
