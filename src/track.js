/**
 * @fileOverview track g2
 * @author dxq613@gmail.com
 */
const Global = require('./global');
const Monitor = require('@ali/g2-monitor');
// 延迟发送请求
setTimeout(function() {
  if (Monitor.tracking) {
    const m = new Monitor();
    m.log({
      g2: true,
      version: Global.version,
      page_type: 'syslog'
    });
  }
}, 3000);
