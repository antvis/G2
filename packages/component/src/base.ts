import EventEmitter from '@antv/event-emitter';
import { GuideCfg } from './interface';

export abstract class Guide<T extends GuideCfg> extends EventEmitter {
  public cfg: T;
  destroyed: boolean;

  constructor(cfg: T) {
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

  // 由于重构后影响太大了 所以使用any先
  public get<K extends keyof T>(name: K): T[K] | any {
    return this.cfg[name];
  }

  public set<K extends keyof T>(name: K, value: T[K]) {
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
