/**
 * @description 基础基类
 */
import EventEmitter from '@antv/event-emitter';
import { DataPointType } from './interface';

export default abstract class Base extends EventEmitter {
  cfg: DataPointType = {};
  destroyed = false;

  constructor(cfg: DataPointType) {
    super();
    this.cfg = {
      visible: true,
      ...cfg,
    };
  }

  get(name: string): any {
    return this.cfg[name];
  }

  set(name: string, value: any) {
    this.cfg[name] = value;
    return this;
  }

  show() {
    const visible = this.get('visible');
    if (!visible) {
      this.set('visible', true);
      this.changeVisible(true);
    }
  }

  hide() {
    const visible = this.get('visible');
    if (visible) {
      this.set('visible', false);
      this.changeVisible(false);
    }
  }

  destroy() {
    this.cfg = {};
    this.off(); // 接触所有的事件绑定
    this.destroyed = true;
  }

  abstract changeVisible(visible: boolean, stopDrawing?: boolean): void;
}
