import View from '../view';

// 布局函数的定义
// 布局函数的职责：针对 view 中的 Component 和 geometry，调整组件和 x、y、width、height，以及图形的 coordinate 范围
export type Layout = (view: View) => void;

/**
 * G2 默认提供的 layout 函数
 * @param view
 */
export default function defaultLayout(view: View) {
  // todo
}
