import { clamp, get, isObject, size, valuesOfKey } from "@antv/util";
import { COMPONENT_TYPE } from "../../../constant";
import { Action } from '..';
import { LooseObject, ScrollbarOption } from "../../../interface";


function isWheelDown(event: LooseObject) {
  const wheelEvent = event.gEvent.originalEvent as WheelEvent;
  return wheelEvent.deltaY > 0;
}

const DEFAULT_WHEELSPEED = 1;
const DEFAULT_CFG = {
  wheelSpeed: DEFAULT_WHEELSPEED
};

class MousewheelScroll extends Action {
  protected wheelSpeed = DEFAULT_WHEELSPEED;

  init() {
    const mouseWheelCfg = this.getMousewheelCfg();
    if (mouseWheelCfg) {
      this.wheelSpeed = mouseWheelCfg.wheelSpeed || DEFAULT_WHEELSPEED;
    }
  }

  private getMousewheelCfg()  {
    const { view } = this.context;
    const scrollbarCfg: ScrollbarOption =  view.getOptions().scrollbar;
    return (isObject(scrollbarCfg) && isObject(scrollbarCfg.enableMouseWheel)) ?
      scrollbarCfg.enableMouseWheel : DEFAULT_CFG;
  }

  public scroll() {
    const { view, event } = this.context;
    const scrollbarController = view.getController('scrollbar');
    const scrollbarComponent = scrollbarController?.getComponents().find((co) => co.type === COMPONENT_TYPE.SCROLLBAR).component;
    if (scrollbarComponent) {
      const xScale = view.getXScale();
      const data = view.getOptions().data;
      const dataSize = size(valuesOfKey(data, xScale.field));
      const step = size(xScale.values);
      const { thumbOffset, thumbLen, trackLen } = scrollbarComponent.cfg;

      const currentRatio = clamp(thumbOffset / (trackLen - thumbLen), 0, 1);
      const currentStart = Math.floor((dataSize - step) * currentRatio);

      const nextStart = currentStart + (isWheelDown(event) ? this.wheelSpeed : -this.wheelSpeed);
      const correction = this.wheelSpeed / (dataSize - step) / 10000;
      const nextRatio = clamp(nextStart / (dataSize - step) + correction, 0, 1);

      scrollbarComponent.emit('scrollchange', {
        ratio: nextRatio,
      });
    }
  }
}

export default MousewheelScroll;
