import type { Geometry } from '../geometry/geometry';
import { Group } from './g';

export type ElementOptions = {
  /**
   * 绘制的容器
   */
  container: Group;
  /**
   * 所属的 geometry
   */
  geometry: Geometry;
  /**
   * 动画配置（或者直接用 geometry 获取？）
   */
  animate: any;
  /**
   * 是否可见
   */
  visible?: boolean;
};
