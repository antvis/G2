import { Attribute, AttributeCfg } from './attribute';
import { ScaleDef } from '../scale';

export class Opacity extends Attribute {
  constructor(cfg: Partial<AttributeCfg>) {
    super(cfg);

    this.type = 'opacity';

    this.fields = ['opacity'];

    for (let i = 0; i < this.scales.length; i += 1) {
      const scale = this.scales[i];
      scale.update({
        range: this.value,
      });
    }
  }

  protected performUnitOfScale(param: any, scale: ScaleDef): any {
    return scale.isIdentity() ? this.value[0] : scale.map(param);
  }
}
