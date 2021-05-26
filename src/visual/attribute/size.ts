import { Attribute, AttributeCfg } from './attribute';

export class Size extends Attribute {
  constructor(cfg: Partial<AttributeCfg>) {
    super(cfg);

    this.type = 'size';
    this.fields = ['size'];

    for (let i = 0; i < this.scales.length; i += 1) {
      const scale = this.scales[i];
      scale.update({
        range: this.value,
      });
    }
  }
}
