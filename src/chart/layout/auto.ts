import { each } from '@antv/util';
import { COMPONENT_TYPE } from '../../constant';
import { ComponentOption, Padding } from '../../interface';
import { BBox } from '../../util/bbox';
import { isAutoPadding, parsePadding } from '../../util/padding';
import View from '../view';
import { PaddingCal } from './padding-cal';

/**
 * @ignore
 * 根据 view 中的组件，计算实际的 padding 数值
 * @param view
 */
export function calculatePadding(view: View): Padding {
  const padding = view.padding;

  // 如果不是 auto padding，那么直接解析之后返回
  if (!isAutoPadding(padding)) {
    return parsePadding(padding);
  }

  // 是 auto padding，根据组件的情况，来计算 padding
  const { viewBBox, autoPadding } = view;

  const paddingCal = new PaddingCal();

  each(view.getComponents(), (co: ComponentOption) => {
    const { component, type } = co;

    // grid, tooltip 不参入 padding 布局
    if (type === COMPONENT_TYPE.GRID || type === COMPONENT_TYPE.TOOLTIP) {
      return;
    }

    const bboxObject = component.getLayoutBBox();
    const componentBBox = new BBox(bboxObject.x, bboxObject.y, bboxObject.width, bboxObject.height);

    if (type === COMPONENT_TYPE.AXIS) {
      const exceed = componentBBox.exceed(viewBBox);
      paddingCal.shrink(exceed);
    } else {
      // 按照方向计算 padding
      const direction = co.direction;

      // const direction =
      //   type === COMPONENT_TYPE.AXIS ? getTranslateDirection(co.direction, view.getCoordinate()) : co.direction;
      paddingCal.inc(componentBBox, direction);
    }
  });

  const calculatedPadding = paddingCal.getPadding();

  if (autoPadding) {
    const appendPadding = parsePadding(view.appendPadding);
    // 取上一次以及当前计算结果的最大区间
    return [
      Math.max(autoPadding[0] - appendPadding[0], calculatedPadding[0]),
      Math.max(autoPadding[1] - appendPadding[1], calculatedPadding[1]),
      Math.max(autoPadding[2] - appendPadding[2], calculatedPadding[2]),
      Math.max(autoPadding[3] - appendPadding[3], calculatedPadding[3]),
    ];
  }

  return calculatedPadding;
}
