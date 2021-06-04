import { Attribute, AttributeCfg } from './attribute';

export class Shape extends Attribute {
  constructor(cfg: Partial<AttributeCfg>) {
    super(cfg);

    this.type = 'shape';
    this.fields = ['shape'];
  }
}
