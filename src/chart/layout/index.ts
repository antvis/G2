import { Controller } from '../controller/base';
import View from '../view';
import { parsePadding } from '../../util/padding';
import { calculatePadding } from './auto';

// 布局函数的定义
// 布局函数的职责：根据 view 中组件信息，计算出最终的图形 padding 数值，以及最终各个组件的布局和位置
export type Layout = (view: View) => void;

/**
 * @ignore
 * G2 默认提供的 layout 函数
 * 内置布局函数处理的逻辑：
 *
 * 1. 如果 padding = 'auto'，那么自动根据组件的 direction 来计算 padding 数组
 * 2. 根据 padding 和 direction 去分配对应方向的 padding 数值
 * 3. 移动组件位置
 *
 * 对于组件响应式布局，可以尝试使用约束布局的方式去求解位置信息。
 * @param view
 */
export default function defaultLayout(view: View): void {
  const axis = view.getController('axis');
  const legend = view.getController('legend');
  const annotation = view.getController('annotation');
  const slider = view.getController('slider');

  // 1. 自动加 auto padding -> absolute padding
  const padding = calculatePadding(view);

  // 2. 计算出新的 coordinateBBox
  view.coordinateBBox = view.viewBBox.shrink(padding).shrink(parsePadding(view.appendPadding));

  view.adjustCoordinate();

  // 3. 根据最新的 coordinate 重新布局组件
  [axis, slider, legend, annotation].forEach((controller: Controller) => {
    if (controller) {
      controller.layout();
    }
  });
}
