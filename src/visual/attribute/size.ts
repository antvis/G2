import { Attribute, AttributeCfg } from './attribute';

/**
 * 尺寸 size 的映射，可以是分类的，也可以是连续的
 */
export class Size extends Attribute {
  /**
   * @override attribute 类型
   */
  public type: string = 'size';
}
