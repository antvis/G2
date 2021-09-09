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

  constructor() {
    this.x = new Variable();
    this.y = new Variable();
    this.width = new Variable();
    this.height = new Variable();
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
