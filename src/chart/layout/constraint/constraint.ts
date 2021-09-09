import { isNumber } from '@antv/util';
import { Operator, Element } from './types';
import { Variable } from './variable';

/**
 * 定义一个约束条件
 */
export class Constraint {

  /**
   * 操作符
   */
  public operator: Operator;

  /**
   * 方程组四则运算 + 连接的内容
   */
  public elements: Element[];

  constructor(operator: Operator, ...elements) {
    this.operator = operator;
    this.elements = elements;
  }

  /**
   * 获得表达式中所有的变量
   */
  public getVariables() {
    const vars: Variable[] = [];

    for (let i = 0; i < this.elements.length; i++) {
      let element = this.elements[i];
      element = Array.isArray(element) ? element : [element];

      // @ts-ignore
      for (let j = 0; j < element.length; j++) {
        const el = element[j];

        if (Variable.isVariable(el)) {
          vars.push(el);
        }
      }
    }

    return vars;
  }

  /**
   * 转字符串
   */
  public toString(): string {
    return this.elements.map((element: Element) => {
      if (Array.isArray(element)) {
        return element.map(el => el.toString()).join('*');
      }
      
      return element.toString();
    }).join(' + ') + ' = 0';
  }
}
