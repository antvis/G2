/**
 * @fileOverview track g2
 * @author dxq613@gmail.com
 */
const Global = require('./global');
const SERVER_URL = 'https://kcart.alipay.com/web/bi.do';
const Util = require('./util');

class Monitor {
  constructor(opt) {
    const _self = this;
    const config = opt || {};
    const image = new Image();
    Util.mix(_self, {
      image,
      server: SERVER_URL
    }, config);
  }
  /**
   * 发送请求
   * @param {object} opt 埋点记录参数
   *   opt.pg：访问的页面url
   */
  log(opt) {
    const _self = this;
    const config = opt || {};
    const newObj = Util.mix({
      pg: document.URL,
      r: new Date().getTime()
    }, config);
    const d = encodeURIComponent(JSON.stringify([ newObj ]));
    _self.image.src = `${_self.server}?BIProfile=merge&d=${d}`;
  }
}

// 延迟发送请求
setTimeout(function() {
  if (Global.trackable) {
    const m = new Monitor();
    m.log({
      g2: true,
      version: Global.version,
      page_type: 'syslog'
    });
  }
}, 3000);
