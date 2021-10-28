import { BoxObject } from './types';
import { Variable } from './variable';

/**
 * 定义一个布局元素的大小，其实就是包含有四个变量
 */
export class Bounds {
  /**
   * x 变量
   */
  public x: Variable;

  /**
   * y 变量
   */
  public y: Variable;

  /**
   * width 变量
   */
  public width: Variable;

  /**
   * height 变量
   */
  public height: Variable;

  /**
   * bounds 的名字
   */
  public name: string;

  constructor(name: string) {
    this.x = new Variable(`${name}.x`);
    this.y = new Variable(`${name}.y`);
    this.width = new Variable(`${name}.w`);
    this.height = new Variable(`${name}.h`);
  }

  /**
   * 最终的布局信息
   */
  public get bbox(): BoxObject {
    return {
      x: this.x.value,
      y: this.y.value,
      width: this.width.value,
      height: this.height.value,
    };
  }
}
