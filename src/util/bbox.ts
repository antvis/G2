import { Point, Region } from '../types';

/**
 * 用于包围盒计算。
 */
export class BBox {
  /** x 轴坐标系 */
  public x: number;

  /** y 轴坐标系 */
  public y: number;

  /** 包围盒高度 */
  public height: number;

  /** 包围盒宽度 */
  public width: number;

  public static fromRange(minX: number, minY: number, maxX: number, maxY: number) {
    return new BBox(minX, minY, maxX - minX, maxY - minY);
  }

  constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  public get minX(): number {
    return this.x;
  }

  public get maxX(): number {
    return this.x + this.width;
  }

  public get minY(): number {
    return this.y;
  }

  public get maxY(): number {
    return this.y + this.height;
  }

  public get tl(): Point {
    return { x: this.x, y: this.y };
  }

  public get tr(): Point {
    return { x: this.maxX, y: this.y };
  }

  public get bl(): Point {
    return { x: this.x, y: this.maxY };
  }

  public get br(): Point {
    return { x: this.maxX, y: this.maxY };
  }
  // end 计算属性

  /**
   * 包围盒是否相等
   * @param {BBox} bbox 包围盒
   * @returns      包围盒是否相等
   */
  public isEqual(bbox: BBox): boolean {
    return this.x === bbox.x && this.y === bbox.y && this.width === bbox.width && this.height === bbox.height;
  }

  /**
   * 是否包含了另一个包围盒
   * @param child
   */
  public contains(child: BBox): boolean {
    return child.minX >= this.minX && child.maxX <= this.maxX && child.minY >= this.minY && child.maxY <= this.maxY;
  }

  /**
   * 克隆包围盒
   * @returns 包围盒
   */
  public clone(): BBox {
    return new BBox(this.x, this.y, this.width, this.height);
  }

  /**
   * 是否碰撞
   * @param bbox
   */
  public collide(bbox: BBox): boolean {
    return this.minX < bbox.maxX && this.maxX > bbox.minX
      && this.minY < bbox.maxY && this.maxY > bbox.minY;
  }

  /**
   * 点是否在 bbox 中
   * @param p
   */
  public isPointIn(p: Point) {
    return p.x >= this.minX && p.x <= this.maxX && p.y >= this.minY && p.y <= this.maxY;
  }
}

/**
 * 从一个 bbox 的 region 获取 bbox
 * @param bbox
 * @param region
 */
export const getRegionBBox = (bbox: BBox, region: Region): BBox => {
  const { start, end } = region;

  return new BBox(
    bbox.x + bbox.width * start.x,
    bbox.y + bbox.height * start.y,
    bbox.width * Math.abs(end.x - start.x),
    bbox.height * Math.abs(end.y - start.y),
  );
};
