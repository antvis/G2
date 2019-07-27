/**
 * @fileOverview track g2
 * @author dxq613@gmail.com
 */
// const Util = require('./util');
// const Global = require('./global');
// const SERVER_URL = 'https://kcart.alipay.com/web/bi.do';

// // 延迟发送请求
// setTimeout(function() {
//   if (Global.trackable) {
//     const image = new Image();
//     const newObj = Util.mix({}, Global.trackingInfo, {
//       pg: document.URL,
//       r: new Date().getTime(),
//       g2: true,
//       version: Global.version,
//       page_type: 'syslog'
//     });
//     const d = encodeURIComponent(JSON.stringify([ newObj ]));
//     image.src = `${SERVER_URL}?BIProfile=merge&d=${d}`;
//   }
// }, 3000);
