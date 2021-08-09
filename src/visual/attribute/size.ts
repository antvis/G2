import { Attribute, AttributeCfg } from './attribute';

export class Size extends Attribute {
  constructor(cfg: Partial<AttributeCfg>) {
    super(cfg);
    this.type = 'size';
    this.fields = ['size'];
  }
}
