import { Attribute, AttributeCfg } from './attribute';
import { ScaleDef } from '../scale';

export class Shape extends Attribute {
  constructor(cfg: Partial<AttributeCfg>) {
    super(cfg);

    this.type = 'shape';
    this.fields = ['shape'];

    this.initCategoryScales();
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
          range: this.value,
        });
      }
    }
  }

  protected performUnitOfScale(param: any, scale: ScaleDef): any {
    if (scale.isCategory()) {
      return scale.map(param);
    }

    const p = scale.map(param);
    const idx = Math.round((this.value.length - 1) * p);
    return this.value[idx];
  }
}
