import { isArray, isNil } from '@antv/util';
import { Attribute } from './attribute';

type PositionValue = number | string;

/**
 * 位置 x y 通道的映射
 */
export class Position extends Attribute {
  /**
   * @override attribute 类型
   */
  public type: string = 'position';

  /**
   * @override 重写映射函数，直接使用 scale 记性转换
   * @param x
   * @param y
   */
  public mapping(x: PositionValue, y: PositionValue) {
    const [scaleX, scaleY] = this.scales;

    if (isNil(x) || isNil(y)) {
      return [];
    }

    return [
      isArray(x) ? x.map((xi) => scaleX.scale(xi)) : scaleX.scale(x),
      isArray(y) ? y.map((yi) => scaleY.scale(yi)) : scaleY.scale(y),
    ];
  }
}
