import { clamp, size, valuesOfKey } from '@antv/util';
import { COMPONENT_TYPE } from '../../../constant';
import { Action } from '..';
import { LooseObject } from '../../../interface';

function isWheelDown(event: LooseObject) {
  const wheelEvent = event.gEvent.originalEvent as WheelEvent;
  return wheelEvent.deltaY > 0;
}

const DEFAULT_WHEELDELTA = 1;
class MousewheelScroll extends Action {
  public scroll(arg?) {
    const { view, event } = this.context;

    if (!view.getOptions().scrollbar) {
      return;
    }

    const wheelDelta = arg?.wheelDelta || DEFAULT_WHEELDELTA;
    const scrollbarController = view.getController('scrollbar');

    const xScale = view.getXScale();
    const data = view.getOptions().data;
    const dataSize = size(valuesOfKey(data, xScale.field));
    const step = size(xScale.values);

    const currentRatio = scrollbarController.getValue();
    const currentStart = Math.floor((dataSize - step) * currentRatio);

    const nextStart = currentStart + (isWheelDown(event) ? wheelDelta : -wheelDelta);
    const correction = wheelDelta / (dataSize - step) / 10000;
    const nextRatio = clamp(nextStart / (dataSize - step) + correction, 0, 1);
    scrollbarController.setValue(nextRatio);
  }
}

export default MousewheelScroll;
