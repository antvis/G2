import { each } from '@antv/util';
import { ComponentOption } from '../interface';
import View from '../view';

/** Component class type define */
export type ComponentCtor<O = any> = new (view: View) => Component<O>;

/**
 * Component plugin 规范需要定义的基类
 * 1. 规范的 option 输入
 * 2. 统一的信息获取 API
 * 3. 明确定义的组件事件（名称、数据）
 */
export abstract class Component<O = unknown> {
  public visible: boolean = true;
  protected view: View;
  /** option 配置，不同组件有自己不同的配置结构 */
  protected option: O;
  /** 所有的 component */
  protected components: ComponentOption[] = [];

  constructor(view: View) {
    this.view = view;
  }

  public abstract get name(): string;

  /**
   * init the component
   */
  public abstract init();

  /**
   * render the components
   */
  public abstract render();

  /**
   * update the components
   */
  // public abstract update();

  /**
   * do layout
   */
  public abstract layout();

  /**
   * clear
   */
  public clear() {
    // destroy all components
    each(this.components, (co: ComponentOption) => {
      co.component.destroy();
    });

    // clear all component instance
    this.components = [];
  }

  /**
   * destroy the component
   */
  public destroy() {
    this.clear();
  }

  /**
   * get all components
   * @returns components array
   */
  public getComponents(): ComponentOption[] {
    return this.components;
  }

  public changeVisible(visible: boolean) {
    if (this.visible === visible) {
      return;
    }
    this.components.forEach((co: ComponentOption) => {
      if (visible) {
        co.component.show();
      } else {
        co.component.hide();
      }
    });
    this.visible = visible;
  }
}
