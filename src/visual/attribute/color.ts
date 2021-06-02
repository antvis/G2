import colorUtil from '@antv/color-util';
import { OrdinalOptions } from '@antv/scale';
import { Attribute, AttributeCfg } from './attribute';
import { ScaleDef } from '../scale';

export class Color extends Attribute {
  public gradient: (percent: number) => string;

  constructor(cfg: Partial<AttributeCfg>) {
    super(cfg);

    this.type = 'color';
    this.fields = ['color'];

    this.gradient = colorUtil.gradient(this.value);

    // 对 catScale 进行必要的特殊处理
    this.initCategoryScales();
  }

  private getRangeForCategoryScale(scale: ScaleDef) {
    const val = this.value;
    // 是数组，天生支持 category 映射
    if (Array.isArray(val)) {
      return val;
    }

    // 单字符串, 形如 '#000000-#0000ff' 或者 'red'
    if (typeof this.value === 'string') {
      const scaleOptions = scale.getOptions() as OrdinalOptions;
      const { domain } = scaleOptions;
      const result = [];
      // 按照百分比生成新的颜色数组
      const division = domain.length > 1 ? domain.length - 1 : 0;
      const prePercentage = 1 / division;
      let base = 0;
      for (let i = 0; i < domain.length; i += 1) {
        const targetColor = this.gradient(base);
        base += prePercentage;
        result.push(targetColor);
      }
      return result;
    }

    // 不符合任何要求
    return [val];
  }

  /**
   * 对 catScale 进行必要的特殊处理
   * 如果值基于的 scale 为 category，
   * 并且 value 为一个数组
   */
  private initCategoryScales() {
    const len = this.scales.length;

    for (let i = 0; i < len; i += 1) {
      const scale = this.scales[i];
      const isScaleRangeCanBeValue = scale.isCategory();
      if (isScaleRangeCanBeValue) {
        scale.update({
          range: this.getRangeForCategoryScale(scale),
        });
      }
    }
  }

  performUnitOfScale(param: any, scale: ScaleDef) {
    // 如果非线性，直接 map 即可
    if (scale.isCategory()) {
      return scale.map(param);
    }

    const percentage = scale.map(param);
    return this.gradient(percentage);
  }
}
