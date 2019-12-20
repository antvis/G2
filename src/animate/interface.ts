import { Coordinate } from '../dependents';
import { ShapeInfo } from '../interface';

// 传递给 G 的动画配置，duration 必须提供
export interface AnimateCfg {
  /** 动画执行时间 */
  readonly duration: number;
  /** 动画缓动函数 */
  readonly easing?: string;
  /** 动画执行函数 */
  readonly animation?: string;
  /** 动画延迟时间 */
  readonly delay?: number;
  /** 动画执行结束后的回调函数 */
  readonly callback?: () => any;
}

export interface AnimateExtraCfg {
  /** 当前坐标系 */
  coordinate: Coordinate;
  /** 图形最终样式 */
  toAttrs: object;
  /** 其他信息 */
  [key: string]: any;
}
