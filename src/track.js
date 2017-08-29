/**
 * @fileOverview track g2
 * @author dxq613@gmail.com
 */
const Monitor = require('@ali/g2-monitor');
const Global = require('./global');
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
