import type { View } from '../../view';

/**
 * 所有 component & extention 的基类
 * - 规范生命周期
 */
export abstract class Controller<O> {
  /**
   * 依赖的 view
   */
  public view: View;

  /**
   * Controller 对应的 component & extention 的配置
   */
  public option: O;

  /**
   * 是否可见
   */
  public visibale: boolean;

  constructor(view: View) {
    this.view = view;
  }

  /**
   * 更新，内部做好 diff，实现组件的新增、更新、销毁。主要逻辑：
   * 1. 根据 view 上对应组件的 options 配置，生成组件配置
   * 2. 根据前后组件的 diff，决定是 add update delete
   * 3. 缓存组件
   */
  public abstract update();

  /**
   * 渲染
   */
  public abstract render();

  /**
   * 布局
   */
  public abstract layout();

  /**
   * 清空
   */
  public abstract clear();

  /**
   * 组件显示或者隐藏
   * @param visible
   */
  public changeVisible(visible: boolean) {
    this.visibale = visible;
  }
}
