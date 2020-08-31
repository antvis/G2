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

  const axisComponents = [];
  const legendComponents = [];
  const sliderComponents = [];
  const otherComponments = [];
  each(view.getComponents(), (co: ComponentOption) => {
    const { type } = co;
    if (type === COMPONENT_TYPE.AXIS) {
      axisComponents.push(co);
    } else if (type === COMPONENT_TYPE.LEGEND) {
      legendComponents.push(co);
    } else if (type === COMPONENT_TYPE.SLIDER) {
      sliderComponents.push(co);
    } else if (type !== COMPONENT_TYPE.GRID && type !== COMPONENT_TYPE.TOOLTIP) {
      otherComponments.push(co);
    }
  });

  // 进行坐标轴布局，应该是取 padding 的并集，而不是进行相加
  each(axisComponents, (co: ComponentOption) => {
    const { component } = co;
    const bboxObject = component.getLayoutBBox();
    const componentBBox = new BBox(bboxObject.x, bboxObject.y, bboxObject.width, bboxObject.height);

    const exceed = componentBBox.exceed(viewBBox);
    paddingCal.max(exceed);
  });

  // 图例组件布局
  each(legendComponents, (co: ComponentOption, index) => {
    const { component, direction } = co;
    const bboxObject = component.getLayoutBBox();

    const componentBBox = new BBox(bboxObject.x, bboxObject.y, bboxObject.width, bboxObject.height);

    if (index === 0) {
      // 只需要第一个图例加边距
      const spacing = component.get('spacing');
      // 图例组件沿着绘图区域四边往外进行布局，在计算 padding 时需要考虑 spacing 参数
      if (direction.startsWith('top') || direction.startsWith('bottom')) {
        // 位于顶部或者，高度需要加上 spacing
        componentBBox.height += spacing;
      }

      if (direction.startsWith('right') || direction.startsWith('left')) {
        componentBBox.width += spacing;
      }
    }

    // 按照方向计算 padding
    paddingCal.inc(componentBBox, direction);
  });

  each(sliderComponents, (co: ComponentOption) => {
    const { component, direction } = co;
    const bboxObject = component.getLayoutBBox();
    const componentPadding: Padding = component.get('padding');
    const componentBBox = new BBox(bboxObject.x, bboxObject.y, bboxObject.width, bboxObject.height).expand(componentPadding);
    // 按照方向计算 padding
    paddingCal.inc(componentBBox, direction);
  });

  // 其他组件布局
  each(otherComponments, (co: ComponentOption) => {
    const { component, direction } = co;
    const bboxObject = component.getLayoutBBox();
    const componentBBox = new BBox(bboxObject.x, bboxObject.y, bboxObject.width, bboxObject.height);
    // 按照方向计算 padding
    paddingCal.inc(componentBBox, direction);
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
