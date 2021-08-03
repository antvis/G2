/**
 * 布局中的元素元信息
 */
export type UnitMeta = {
  /** 元素的分类 */
  type: string;
  /**
   * 元素对应的配置
   */
  cfg: any;
  /**
   * 额外的信息存储
   */
  extra: any;
  /**
   * 具体的组件、图形
   */
  unit: any;
}

/**
 * 元素布局信息
 * // TODO 需要依赖约束布局的模块定义
 */
export type UnitVariable = {
  x: number;
  y: number;
  width: number;
  height: number;
}
