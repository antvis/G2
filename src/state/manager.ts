import EE from '@antv/event-emitter';
import { isEqual } from '@antv/util';

/**
 * The states manager of chart
 */
export default class StateManager extends EE {
  /** store current states */
  public states: Record<string, any> = {};

  /**
   * 设置状态量，同时当状态量发生变更时，会释放 `${name}change` 事件
   * @param name 状态名
   * @param value 状态值
   */
  public setState(name: string, value: any) {
    const preValue = this.states[name];

    // 状态量发生了变化
    if (!isEqual(preValue, value)) {
      this.emit(`${name}change`, {
        name,
        value,
        preValue,
      });
    }

    this.states[name] = value;
  }

  /**
   * 根据状态名获取对应的状态值
   * @param name 状态名
   * @returns 返回对应的状态值
   */
  public getState(name: string) {
    return this.states[name];
  }

  public destroy() {
    this.off();
    this.states = null;
  }

  // tslint:disable-next-line: ban-types
  public on(evtName: string, callback: Function, once?: boolean) {
    return super.on(`${evtName}change`, callback, once);
  }

  // tslint:disable-next-line: ban-types
  public off(evtName?: string, callback?: Function) {
    return evtName ? super.off(`${evtName}change`, callback) : super.off();
  }
}
