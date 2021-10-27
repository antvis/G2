import { uniqueId } from '@antv/util';

/**
 * 定义一个变量
 */
export class Variable {
  /**
   * 变量的名称
   */
  public name = '';

  /**
   * 实际的值
   */
  public value: number;

  /**
   * 判断是否为一个变量
   * @param v
   * @returns
   */
  public static isVariable(v: any): v is Variable {
    return v instanceof Variable;
  }

  /**
   * 构造方法
   * @param name
   */
  constructor(name?: string) {
    this.name = name ?? `𝒳${uniqueId('_')}`;
  }
}
