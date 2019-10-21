import * as _ from '@antv/util';
import { DIRECTION } from '../constant';
import { BBox } from '../dependents';
import { Point, Region } from '../interface';

export class BBoxProcessor {
  private bbox: BBox;

  constructor(bbox: BBox) {
    this.bbox = bbox;
  }

  /**
   * clone 新的对象
   */
  public clone(): BBoxProcessor {
    const bbox = this.bbox;
    this.bbox = new BBox(bbox.x, bbox.y, bbox.width, bbox.height);
    return this;
  }

  /**
   * 取并集
   * @param subBBox
   */
  public add(...subBBox: BBox[]): BBoxProcessor {
    _.each(subBBox, (b: BBox) => {
      this.bbox = BBox.fromRange(
        Math.min(this.bbox.minX, b.minX),
        Math.min(this.bbox.minY, b.minY),
        Math.max(this.bbox.maxX, b.maxX),
        Math.max(this.bbox.maxY, b.maxY)
      );
    });

    return this;
  }

  /**
   * 取交集
   * @param subBBox
   */
  public merge(...subBBox: BBox[]): BBoxProcessor {
    _.each(subBBox, (b: BBox) => {
      this.bbox = BBox.fromRange(
        Math.max(this.bbox.minX, b.minX),
        Math.max(this.bbox.minY, b.minY),
        Math.min(this.bbox.maxX, b.maxX),
        Math.min(this.bbox.maxY, b.maxY)
      );
    });

    return this;
  }

  /**
   * bbox 剪裁
   * @param subBBox
   * @param direction
   */
  public cut(subBBox: BBox, direction: DIRECTION): BBoxProcessor {
    const bbox = this.bbox;

    const width = subBBox.width;
    const height = subBBox.height;

    switch (direction) {
      case DIRECTION.TOP:
        this.bbox = BBox.fromRange(bbox.minX, bbox.minY + height, bbox.maxX, bbox.maxY);
        break;
      case DIRECTION.RIGHT:
        this.bbox = BBox.fromRange(bbox.minX, bbox.minY, bbox.maxX - width, bbox.maxY);
        break;
      case DIRECTION.BOTTOM:
        this.bbox = BBox.fromRange(bbox.minX, bbox.minY, bbox.maxX, bbox.maxY - height);
        break;
      case DIRECTION.LEFT:
        this.bbox = BBox.fromRange(bbox.minX + width, bbox.minY, bbox.maxX, bbox.maxY);
        break;
    }

    return this;
  }

  /**
   * 收缩形成新的
   * @param gap
   */
  public shrink(gap: number[]) {
    const [top, right, bottom, left] = gap;
    this.bbox = new BBox(
      this.bbox.x + left,
      this.bbox.y + top,
      this.bbox.width - left - right,
      this.bbox.height - top - bottom
    );

    return this;
  }

  /**
   * 获取最终的 bbox
   */
  public value(): BBox {
    return this.bbox;
  }

  public get top(): Point {
    return {
      x: this.bbox.x + this.bbox.width / 2,
      y: this.bbox.minY,
    };
  }

  public get right(): Point {
    return {
      x: this.bbox.maxX,
      y: this.bbox.y + this.bbox.height / 2,
    };
  }
  public get bottom(): Point {
    return {
      x: this.bbox.x + this.bbox.width / 2,
      y: this.bbox.maxY,
    };
  }
  public get left(): Point {
    return {
      x: this.bbox.minX,
      y: this.bbox.y + this.bbox.height / 2,
    };
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
