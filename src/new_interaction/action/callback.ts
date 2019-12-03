import { ActionCallback } from '../../interface';
import Action from './base';

/** 回调函数构建的 Action */
export default class CallbackAction extends Action {
  public readonly name: string = 'callback';
  public callback: ActionCallback;
  public execute() {
    if (this.callback) {
      this.callback(this.context);
    }
  }
  public destroy() {
    super.destroy();
    this.callback = null;
  }
}
