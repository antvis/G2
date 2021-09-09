import { uniq } from '@antv/util';
import type { Constraint } from './constraint';
import type { Variable } from './variable';

/**
 * 约束布局构建和计算
 */
export class Solver {
  
  /**
   * 存在的约束
   */
  public constraints: Constraint[] = [];

  public variables: Variable[] = [];

  /**
   * 添加多条约束
   * @param constraint
   */
  public addConstraint(...constraints: Constraint[]) {
    this.constraints = constraints;
  }

  /**
   * 计算返回布局
   */
  public calc() {
    // 1. 拿到变量
    this.variables = this.getVariables();

    // 2. 消元
    
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
}