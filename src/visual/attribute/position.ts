import { isArray, isNil } from '@antv/util';
import { Attribute, AttributeCfg } from './attribute';

type Value = number | string;
type MappingValue = Value[] | Value;

export class Position extends Attribute {
  constructor(cfg: Partial<AttributeCfg>) {
    super(cfg);

    this.fields = ['x', 'y'];
    this.type = 'position';
    this.isLinear = false;
  }

  /**
   * override
   * @param x
   * @param y
   * @returns
   */
  public mapping(x: MappingValue, y: MappingValue) {
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
