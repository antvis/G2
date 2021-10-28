import { uniq } from '@antv/util';
import type { Constraint } from './constraint';
import { gauss } from './gauss';
import type { Variable } from './variable';

/**
 * 约束布局构建和计算，目前针对 G2 的场景：
 * - 一定都是等式
 * - 一定有解
 * 所以将算法退化成多元一次方程组的解法，直接使用高斯消元法（o(n^2)）
 */
export class Solver {
  /**
   * 存在的约束
   */
  public constraints: Constraint[] = [];

  public variables: Variable[] = [];

  /**
   * 条件数量
   */
  private m: number;

  /**
   * 变量（元）数量
   */
  private n: number;

  /**
   * 添加多条约束
   * @param constraint
   */
  public addConstraint(...constraints: Constraint[]) {
    this.constraints.push(...constraints);
  }

  /**
   * 计算返回布局
   */
  public calc() {
    // 1. 拿到变量
    this.variables = this.getVariables();

    this.m = this.constraints.length;
    this.n = this.variables.length;

    // 2. 获取消元矩阵
    const matrix = this.getGaussMatrix();

    // 3. 求解
    const result = gauss(matrix);

    this.variables.forEach((v, idx) => {
      v.value = result[idx];
    });

    return this.variables;
  }

  /**
   * 获取约束中所有的变量
   */
  private getVariables() {
    let vars = [];
    for (let i = 0; i < this.constraints.length; i++) {
      const constraint = this.constraints[i];

      vars = vars.concat(constraint.getVariables());
    }

    return uniq(vars);
  }

  /**
   * 获得高斯消元的矩阵
   */
  private getGaussMatrix() {
    const variableMap = new Map<Variable, number>();

    for (let i = 0; i < this.n; i++) {
      const variable = this.variables[i];
      variableMap.set(variable, i);
    }

    const matrix = [];
    for (let i = 0; i < this.m; i++) {
      const constraint = this.constraints[i];

      const arr = constraint.getGaussArr(variableMap);

      matrix.push(arr);
    }

    return matrix;
  }
}
