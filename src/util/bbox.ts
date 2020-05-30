import { each } from '@antv/util';
import { DIRECTION } from '../constant';
import { Padding, Point, Region } from '../interface';
import { parsePadding } from './padding';

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

  public get top(): Point {
    return {
      x: this.x + this.width / 2,
      y: this.minY,
    };
  }

  public get right(): Point {
    return {
      x: this.maxX,
      y: this.y + this.height / 2,
    };
  }
  public get bottom(): Point {
    return {
      x: this.x + this.width / 2,
      y: this.maxY,
    };
  }
  public get left(): Point {
    return {
      x: this.minX,
      y: this.y + this.height / 2,
    };
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
   * 克隆包围盒
   * @returns 包围盒
   */
  public clone(): BBox {
    return new BBox(this.x, this.y, this.width, this.height);
  }

  /**
   * 取并集
   * @param subBBox
   */
  public add(...subBBox: BBox[]): BBox {
    const bbox = this.clone();
    each(subBBox, (b: BBox) => {
      bbox.x = Math.min(b.x, bbox.x);
      bbox.y = Math.min(b.y, bbox.y);
      bbox.width = Math.max(b.maxX, bbox.maxX) - bbox.x;
      bbox.height = Math.max(b.maxY, bbox.maxY) - bbox.y;
    });

    return bbox;
  }

  /**
   * 取交集
   * @param subBBox
   */
  public merge(...subBBox: BBox[]): BBox {
    const bbox = this.clone();
    each(subBBox, (b: BBox) => {
      bbox.x = Math.max(b.x, bbox.x);
      bbox.y = Math.max(b.y, bbox.y);
      bbox.width = Math.min(b.maxX, bbox.maxX) - bbox.x;
      bbox.height = Math.min(b.maxY, bbox.maxY) - bbox.y;
    });

    return bbox;
  }

  /**
   * bbox 剪裁
   * @param subBBox
   * @param direction
   */
  public cut(subBBox: BBox, direction: DIRECTION): BBox {
    const width = subBBox.width;
    const height = subBBox.height;

    switch (direction) {
      case DIRECTION.TOP:
      case DIRECTION.TOP_LEFT:
      case DIRECTION.TOP_RIGHT:
        return BBox.fromRange(this.minX, this.minY + height, this.maxX, this.maxY);

      case DIRECTION.RIGHT:
      case DIRECTION.RIGHT_TOP:
      case DIRECTION.RIGHT_BOTTOM:
        return BBox.fromRange(this.minX, this.minY, this.maxX - width, this.maxY);

      case DIRECTION.BOTTOM:
      case DIRECTION.BOTTOM_LEFT:
      case DIRECTION.BOTTOM_RIGHT:
        return BBox.fromRange(this.minX, this.minY, this.maxX, this.maxY - height);

      case DIRECTION.LEFT:
      case DIRECTION.LEFT_TOP:
      case DIRECTION.LEFT_BOTTOM:
        return BBox.fromRange(this.minX + width, this.minY, this.maxX, this.maxY);
      default:
        // 其他情况不裁剪，原样返回
        return this;
    }
  }

  /**
   * 收缩形成新的
   * @param gap
   */
  public shrink(gap: Padding): BBox {
    const [top, right, bottom, left] = gap;

    return new BBox(this.x + left, this.y + top, this.width - left - right, this.height - top - bottom);
  }

  /**
   * get the gap of two bbox, if not exceed, then 0
   * @param bbox
   * @returns [top, right, bottom, left]
   */
  public exceed(bbox: BBox): Padding {
    return [
      Math.max(-this.minY + bbox.minY, 0),
      Math.max(this.maxX - bbox.maxX, 0),
      Math.max(this.maxY - bbox.maxY, 0),
      Math.max(-this.minX + bbox.minX, 0),
    ];
  }

  /**
   * 获取包围盒大小
   * @returns 包围盒大小
   */
  public size(): number {
    return this.width * this.height;
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
    bbox.height * Math.abs(end.y - start.y)
  );
};

/**
 * 将 bbox 转换成 points
 * @param bbox
 */
export function toPoints(bbox: Partial<BBox>): any[] {
  return [
    [bbox.minX, bbox.minY],
    [bbox.maxX, bbox.minY],
    [bbox.maxX, bbox.maxY],
    [bbox.minX, bbox.maxY],
  ];
}
