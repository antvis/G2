// const Global = require('../global');
const Util = require('../util');

const assign = Util.assign;

class Interaction {
  getDefaultCfg() {
    return {

    };
  }

  constructor(cfg) {
    const me = this;
    const defaultCfg = me.getDefaultCfg();
    assign(me, defaultCfg, cfg);
    me.init();
  }

  init() {
  }

  execute() {
  }

  clear() {
  }
}

module.exports = Interaction;
