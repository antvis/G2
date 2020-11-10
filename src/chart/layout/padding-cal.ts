import { DIRECTION } from '../../constant';
import { BBox } from '../../dependents';
import { Padding } from '../../interface';

export type PaddingCalCtor = {
  readonly instance: (top?: number, right?: number, bottom?: number, left?: number) => PaddingCal;
};

/** @ignore */
export class PaddingCal {
  private top: number;
  private right: number;
  private bottom: number;
  private left: number;

  /**
   * 使用静态方法创建一个
   * @param top
   * @param right
   * @param bottom
   * @param left
   */
  public static instance(top: number = 0, right: number = 0, bottom: number = 0, left: number = 0) {
    return new PaddingCal(top, right, bottom, left);
  }

  /**
   * 初始的 padding 数据
   * @param top
   * @param right
   * @param bottom
   * @param left
   */
  constructor(top: number = 0, right: number = 0, bottom: number = 0, left: number = 0) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
  }

  /**
   * 取最大区间
   * @param padding
   */
  public max(padding: Padding): PaddingCal {
    const [top, right, bottom, left] = padding;

    this.top = Math.max(this.top, top);
    this.right = Math.max(this.right, right);
    this.bottom = Math.max(this.bottom, bottom);
    this.left = Math.max(this.left, left);

    return this;
  }

  /**
   * 四周增加 padding
   * @param padding
   */
  public shrink(padding: Padding): PaddingCal {
    const [top, right, bottom, left] = padding;

    this.top += top;
    this.right += right;
    this.bottom += bottom;
    this.left += left;

    return this;
  }

  /**
   * 在某一个方向增加 padding
   * @param bbox
   * @param direction
   */
  public inc(bbox: BBox, direction: DIRECTION): PaddingCal {
    const { width, height } = bbox;

    switch (direction) {
      case DIRECTION.TOP:
      case DIRECTION.TOP_LEFT:
      case DIRECTION.TOP_RIGHT:
        this.top += height;
        break;

      case DIRECTION.RIGHT:
      case DIRECTION.RIGHT_TOP:
      case DIRECTION.RIGHT_BOTTOM:
        this.right += width;
        break;

      case DIRECTION.BOTTOM:
      case DIRECTION.BOTTOM_LEFT:
      case DIRECTION.BOTTOM_RIGHT:
        this.bottom += height;
        break;

      case DIRECTION.LEFT:
      case DIRECTION.LEFT_TOP:
      case DIRECTION.LEFT_BOTTOM:
        this.left += width;
        break;
      default:
        break;
    }

    return this;
  }

  /**
   * 获得最终的 padding
   */
  public getPadding(): Padding {
    return [this.top, this.right, this.bottom, this.left];
  }

  /**
   * clone 一个 padding cal
   */
  public clone(): PaddingCal {
    return new PaddingCal(...this.getPadding());
  }
}
