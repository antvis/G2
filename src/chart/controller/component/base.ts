import type { PlainObject } from '../../../types';
import type { View } from '../../view';

/**
 * 所有 component & extention 的基类
 * - 规范生命周期
 */
export abstract class CC<O> {
  /**
   * 依赖的 view
   */
  public view: View;

  /**
   * CC 对应的 component & extention 的配置
   */
  public option: O;

  /**
   * 是否可见
   */
  public visibale: boolean;

  /**
   * 初始化
   */
  public abstract init();

  /**
   * 更新
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

  /**
   * 组件主题配置
   */
  protected abstract getTheme(): PlainObject;
}
