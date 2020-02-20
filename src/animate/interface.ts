import { Coordinate } from '../dependents';

/**
 * @ignore
 */
export interface AnimateExtraCfg {
  /** 当前坐标系 */
  coordinate: Coordinate;
  /** 图形最终样式 */
  toAttrs: object;
  /** 其他信息 */
  [key: string]: any;
}
