/**
 * @fileOverview Chart、View、Geometry 的基类
 * @author dxq613@gmail.com
 */

const EventEmitter = require('wolfy87-eventemitter');
const Util = require('./util');

class Base extends EventEmitter {

  getDefaultCfg() {
    return {};
  }

  constructor(cfg) {
    super();
    const attrs = {};
    const defaultCfg = this.getDefaultCfg();
    this._attrs = attrs;

    Util.assign(attrs, defaultCfg, cfg);
  }

  get(name) {
    return this._attrs[name];
  }

  set(name, value) {
    this._attrs[name] = value;
  }

}

module.exports = Base;
