import { BBox } from '@antv/g';
import * as _ from '@antv/util';
import { DIRECTION } from '../chart';

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
   * 获取最终的 bbox
   */
  public value(): BBox {
    return this.bbox;
  }
}
