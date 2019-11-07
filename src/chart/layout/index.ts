import * as _ from '@antv/util';
import { COMPONENT_TYPE } from '../../constant';
import { getAxisRegion, getCircleAxisCenterRadius } from '../../util/axis';
import { BBox } from '../../util/bbox';
import { directionToPosition } from '../../util/direction';
import { ComponentOption } from '../interface';
import View from '../view';

// 布局函数的定义
// 布局函数的职责：针对 view 中的 Component 和 geometry，调整组件和 x、y、width、height，以及图形的 coordinate 范围
export type Layout = (view: View) => void;

/**
 * 计算出 legend 的 direction 位置 x, y
 * @param legends
 * @param viewBBox
 */
function layoutLegend(legends: ComponentOption[], viewBBox: BBox) {
  _.each(legends, (legend: ComponentOption) => {
    const { component, direction } = legend;
    const bboxObject = component.getBBox();
    const bbox = new BBox(bboxObject.x, bboxObject.y, bboxObject.width, bboxObject.height);

    const [x, y] = directionToPosition(viewBBox, bbox, direction);

    // @ts-ignore
    component.update({
      x,
      y,
    });
  });
}

/**
 * 布局 axis
 * @param axes
 * @param viewBBox
 * @param view
 */
function layoutAxis(axes: ComponentOption[], viewBBox: BBox, view: View) {
  const coordinate = view.getCoordinate();

  _.each(axes, (axis: ComponentOption) => {
    const { component, direction } = axis;

    let updated;
    if (coordinate.isPolar) {
      updated = getCircleAxisCenterRadius(coordinate);
    } else {
      updated = getAxisRegion(coordinate, direction);
    }

    // @ts-ignore
    component.update(updated);
  });
}

/**
 * G2 默认提供的 layout 函数
 * 内置布局函数处理的逻辑：
 *
 * 1. 根据 view 的大小位置，以及 legend 的 direction，计算出 legend 的位置 x，y；
 * 2. 根据 axis 内容不遮挡原则，计算出 yaxis 的 width，xaxis 的 height；
 * 3. 剩余的位置给 Geometry，确定 Geometry 的 位置大小，然后可以反向计算出 yaxis 的 height、xaxis 的 width；以及他们的位置 x，y 信息；
 * 4. 递归计算子 views 的布局；
 *
 * 可以常使用约束布局的方式去求解位置信息。
 * @param view
 */
export default function defaultLayout(view: View): void {
  const { geometries, viewBBox } = view;
  const coordinate = view.getCoordinate();

  const componentOptions = this.getOptions().components;

  // 1. 计算出 legend 的 direction 位置 x, y
  const legends = _.filter(componentOptions, (co: ComponentOption) => co.type === COMPONENT_TYPE.LEGEND);
  layoutLegend(legends, viewBBox);

  // 2. 根据 axis 内容不遮挡原则，计算出 y axis 的 width，x axis 的 height；
  const axes = _.filter(componentOptions, (co: ComponentOption) => co.type === COMPONENT_TYPE.AXIS);
  layoutAxis(axes, viewBBox, view);

  let bbox = viewBBox;

  // 剪裁掉组件的 bbox，剩余的给 绘图区域
  _.each(componentOptions, (co: ComponentOption) => {
    const { component, type } = co;

    if (coordinate.isPolar && type === COMPONENT_TYPE.AXIS) {
      // TODO update the coordinate radius
    } else {
      const bboxObject = component.getBBox();
      const componentBBox = new BBox(bboxObject.x, bboxObject.y, bboxObject.width, bboxObject.height);

      bbox = bbox.cut(componentBBox, co.direction);
    }
  });

  // 3. 获取最终的 Geometry 的 bbox 位置，坐标系位置
  view.coordinateBBox = bbox;
  // 根据 bbox 创建实例
  view.adjustCoordinate();

  // 4. 给 axis 组件更新 coordinate: 调整 axis 的宽高：y axis height, x axis width = coordinateBBox width height
  layoutAxis(axes, viewBBox, view);
}
