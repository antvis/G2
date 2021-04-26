import { Attribute } from './attribute';

export class Shape extends Attribute {
  /**
   * @override attribute 类型
   */
  public type: string = 'shape';

  /**
   * @override
   */
  public getLinearValue(percent: number): string {
    // shape 的连续映射，其实也是根据分类来的！
    const idx = Math.round((this.value.length - 1) * percent);
    return this.value[idx];
  }
}
