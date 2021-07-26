import type { View } from '../chart/view';
import { FacetOptions } from '../types/facet';

/**
 * 分面（Facet）的基类
 */
export class Facet<O extends FacetOptions> {
  /**
   * facet 实例所在的 view
   */
  public view: View;

  /**
   * facet 的配置项
   */
  public options: O;

  constructor(view: View, options: O) {
    this.view = view;
    this.options = options;
  }

  /**
   * 渲染分面。如果存在复用并更新，否则全部创建
   */
  public render() {}

  /**
   * 销毁分面
   */
  public destroy() {}
}
