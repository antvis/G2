import { ActionCallback } from '../../interface';
import Action from './base';

/** 回调函数构建的 Action */
export default class CallbackAction extends Action {
  /**
   * 回调函数
   */
  public callback: ActionCallback;
  /**
   * 执行
   */
  public execute() {
    if (this.callback) {
      this.callback(this.context);
    }
  }
  /**
   * 销毁
   */
  public destroy() {
    super.destroy();
    this.callback = null;
  }
}
