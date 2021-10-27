import { isNumber } from '@antv/util';
import { multiply } from './gauss';
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

    // todo 去重
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
   * 获得方程组的高斯矩阵数组
   * 按照指定的 variable 顺序
   * @param variableMap 变量对应的 idx
   */
  public getGaussArr(variableMap: Map<Variable, number>) {
    const size = variableMap.size;
    // size 额外加上 b 常量
    const arr = new Array(size + 1).fill(0);

    this.elements.forEach((element: Element) => {
      const [a, variable] = this.parseElement(element);
      const idx = variableMap.get(variable);

      // 存在 -> 变量
      if (isNumber(idx)) {
        arr[idx] += a;
      } else {
        // 常数（最后一位）
        arr[size] += a;
      }
    });

    return arr;
  }

  /**
   * 解析 element，产生 [a, variable]
   * @param element
   */
  private parseElement(e: Element): [number, Variable] {
    if (isNumber(e)) {
      return [e, undefined];
    }

    if (Variable.isVariable(e)) {
      return [1, e];
    }

    if (Array.isArray(e)) {
      const mul = multiply(e.filter((i) => isNumber(i)) as number[]);
      const variable = e.find((i) => Variable.isVariable(i)) as Variable;
      return [mul, variable];
    }

    // 其他非法情况
    return [0, undefined];
  }
}
