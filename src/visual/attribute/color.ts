import colorUtil from '@antv/color-util';
import { isString } from '@antv/util';
import { Attribute, AttributeCfg } from './attribute';

/**
 * 映射的映射，可以根据索引映射，也可以根据渐变连续映射
 */
export class Color extends Attribute {
  /**
   * @override attribute 类型
   */
  public type: string = 'color';

  /**
   * 用于缓存，提升性能
   */
  private gradientFunc: (percent: number) => string;

  constructor(cfg: AttributeCfg) {
    super(cfg);

    // value 参数决定是否是线性的
    // 其实可以根据 scale 的 type 来决定（避免信息的丢失）
    this.isLinear = isString(this.value);
  }

  /**
   * @override
   */
  protected getLinearValue(percent: number): string {
    // 不存在则创建一个，并缓存起来
    if (!this.gradientFunc) {
      this.gradientFunc = colorUtil.gradient(this.value);
    }

    return this.gradientFunc(percent);
  }

  /**
   * @override
   */
  public update(cfg: AttributeCfg) {
    super.update(cfg);

    // 额外需要清空缓存
    this.gradientFunc = undefined;
  }
}
