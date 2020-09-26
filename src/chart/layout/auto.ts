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
export function calculatePadding(view: View): PaddingCal {
  const padding = view.padding;

  // 如果不是 auto padding，那么直接解析之后返回
  if (!isAutoPadding(padding)) {
    return new PaddingCal(...parsePadding(padding));
  }

  // 是 auto padding，根据组件的情况，来计算 padding
  const { viewBBox } = view;

  const paddingCal = new PaddingCal();

  const axisComponents = [];
  const paddingComponents = [];
  const otherComponents = [];

  each(view.getComponents(), (co: ComponentOption) => {
    const { type } = co;
    if (type === COMPONENT_TYPE.AXIS) {
      axisComponents.push(co);
    } else if ([COMPONENT_TYPE.LEGEND, COMPONENT_TYPE.SLIDER, COMPONENT_TYPE.SCROLLBAR].includes(type)) {
      paddingComponents.push(co);
    } else if (type !== COMPONENT_TYPE.GRID && type !== COMPONENT_TYPE.TOOLTIP) {
      otherComponents.push(co);
    }
  });

  // 进行坐标轴布局，应该是取 padding 的并集，而不是进行相加
  each(axisComponents, (co: ComponentOption) => {
    const { component } = co;
    const bboxObject = component.getLayoutBBox();
    const componentBBox = new BBox(bboxObject.x, bboxObject.y, bboxObject.width, bboxObject.height);

    const exceed = componentBBox.exceed(viewBBox);

    // 在对组件分组之后，先对 axis 进行处理，然后取最大的超出即可。
    paddingCal.max(exceed);
  });

  // 有 padding 的组件布局
  each(paddingComponents, (co: ComponentOption) => {
    const { component, direction } = co;
    const bboxObject = component.getLayoutBBox();
    const componentPadding: Padding = component.get('padding');
    const componentBBox = new BBox(bboxObject.x, bboxObject.y, bboxObject.width, bboxObject.height).expand(
      componentPadding
    );
    // 按照方向计算 padding
    paddingCal.inc(componentBBox, direction);
  });

  // 其他组件布局
  each(otherComponents, (co: ComponentOption) => {
    const { component, direction } = co;
    const bboxObject = component.getLayoutBBox();
    const componentBBox = new BBox(bboxObject.x, bboxObject.y, bboxObject.width, bboxObject.height);
    // 按照方向计算 padding
    paddingCal.inc(componentBBox, direction);
  });

  return paddingCal;
}
