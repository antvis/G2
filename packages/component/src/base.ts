import EventEmitter from '@antv/event-emitter';
import { GuideCfg } from './interface';

export abstract class Guide extends EventEmitter {
  cfg: GuideCfg = {};
  destroyed: boolean;

  constructor(cfg: GuideCfg) {
    super();
    this.cfg = {
      id: null, // 用于动画
      // 容器
      canvas: null,
      container: null, // html，可选
      group: null, // G Group，可选
      // 交互属性
      capture: true,
      // props
      // coord: null,
      offsetX: 0,
      offsetY: 0,
      visible: true,
      zIndex: 1,
      ...cfg,
    };
    this.destroyed = false;
  }

  get(name: string): any {
    return this.cfg[name];
  }

  set(name: string, value: any) {
    this.cfg[name] = value;
    return this;
  }

  destroy() {
    this.off();
    this.destroyed = true;
  }
}

export { GuideCfg };

export default Guide;
