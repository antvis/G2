import { Point, BBoxObject } from '../types';
/**
 * BBox 标记的是一个矩形区域。在 G2 和 2D 中非常常见。BBox class 包含了：
 * - 常用属性
 * - 操作计算方法
 * @yuzhanglong 可以从 G2 master 分支抽离出来（代码和单测，可以参考一下社区其他的命名）
 */
export class BBox {
  
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * 中心位置
   */
  public get center(): Point {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    }
  }

  /**
   * 转为 BBoxObject 结构
   */
  public toObject(): BBoxObject {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }
}
