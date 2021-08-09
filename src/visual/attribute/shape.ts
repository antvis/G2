import { Attribute, AttributeCfg } from './attribute';

export class Shape extends Attribute {
  constructor(cfg: Partial<AttributeCfg>) {
    super(cfg);
    this.type = 'shape';
    this.fields = ['shape'];
    this.isLinear = false;
  }

  /**
   * @override
   */
  public getLinearValue(percent: number): string {
    const idx = Math.round((this.value.length - 1) * percent);
    return this.value[idx];
  }
}
