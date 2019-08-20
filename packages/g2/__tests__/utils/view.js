import EventEmitter from '@antv/event-emitter';

export default class View extends EventEmitter {
  get() {
    return 'view';
  }
}
