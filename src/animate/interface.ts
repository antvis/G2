import { Coordinate } from '../dependents';

/**
 * @ignore
 */
export interface AnimateExtraCfg {
  /**
   * @title 当前坐标系
   */
  coordinate: Coordinate;
  /**
   * @title 图形最终样式
   */
  toAttrs: object;
  /**
   * @title 其他信息
   */
  [key: string]: any;
}
