import View from '../chart/view';

export default class Interaction {

  /** 交互绑定的 view */
  public view: View;

  constructor(view: View) {
    this.view = view;
  }

  /**
   * 销毁这个交互
   */
  public destroy() {
  }
}
