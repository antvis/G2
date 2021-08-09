import { isString } from '@antv/util';
import colorUtil from '@antv/color-util';
import { Attribute, AttributeCfg } from './attribute';

export class Color extends Attribute {
  /**
   * 颜色差值器
   */
  public gradient: (percent: number) => string;

  constructor(cfg: Partial<AttributeCfg>) {
    super(cfg);
    this.type = 'color';
    this.fields = ['color'];

    if (isString(this.value)) {
      this.isLinear = true;
    }

    this.gradient = colorUtil.gradient(this.value);
  }

  /**
   * @override
   */
  public getLinearValue(percent: number): string {
    return this.gradient(percent);
  }
}
