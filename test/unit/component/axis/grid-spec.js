// var $ = require('jquery');

// var Util = require('@antv/g-util');
// var expect = require('@ali/expect.js');
// var Canvas = require('@antv/g-canvas');
// var Components = require('../../index')
// var Coord = require('@antv/g-coord');
// var CartesianAxis = Components.Axis;
// var CircleAxis = Components.Axis.Circle;

// $('<div id="c1"></div>').appendTo('body');

// var cartesian = new Coord.Cartesian({
//   start: {
//     x: 60,
//     y: 460
//   },
//   end: {
//     x: 460,
//     y: 60
//   },
// });

// var polar = new Coord.Polar({
//   start: {
//     x: 60,
//     y: 460
//   },
//   end: {
//     x: 460,
//     y: 60
//   },
//   endAngle: (2 / 5) * Math.PI
// });

// var canvas = new Canvas({
//   containerId: 'c1',
//   widthStyle: '500px',
//   heightStyle: '500px',
//   pixelRatio: 1
// });
// var sampleCartesianAxisCfg = {
//   start: {
//     x: 60,
//     y: 460
//   },
//   end: {
//     x: 460,
//     y: 460
//   },
//   isVertical: false,
//   factor: 1,
//   ticks: [{
//     text: '0',
//     value: 0,
//     point: {
//       x: 22,
//       y: 23
//     }
//   }, {
//     text: '1',
//     value: 0.1
//   }, {
//     text: '2',
//     value: 0.2
//   }, {
//     text: '3',
//     value: 0.3
//   }, {
//     text: '4',
//     value: 0.4
//   }, {
//     text: '5',
//     value: 0.5
//   }, {
//     text: '6',
//     value: 0.6
//   }, {
//     text: '7',
//     value: 0.7
//   }, {
//     text: '8',
//     value: 0.8
//   }, {
//     text: '9',
//     value: 0.9
//   }, ],
//   title: {
//     text: 'x 轴坐标',
//     'fontSize': 18,
//     y: 30
//   },
//   grid: {
//     line: {
//       stroke: '#c0c0c0'
//     },
//     items: [
//       [{
//         x: 260,
//         y: 200,
//         radius: 60,
//         flag: 1
//       }, {
//         x: 320,
//         y: 260,
//         radius: 60,
//         flag: 1
//       }, {
//         x: 260,
//         y: 320,
//         radius: 60,
//         flag: 1
//       }, {
//         x: 200,
//         y: 260,
//         radius: 60,
//         flag: 1
//       }]
//     ]
//   },
//   labels: {
//     label: {
//       fill: '#444'
//     }
//   },
//   attrs: {
//     fill: '#333'
//   },
//   subTick: 3,
//   titleOffset: 10,
//   formatter: function(value) {
//     return value;
//   }
// };
// var xAxis = canvas.addGroup(CircleAxis, {
//   radius: 200,
//   inner: 0,
//   center: {
//     x: 260,
//     y: 260
//   },
//   endAngle: (2 / 5) * Math.PI,
//   line: {
//     'stroke-width': 1,
//     'stroke': '#C0D0E0'
//   },
//   tickLine: {
//     'stroke-width': 1,
//     value: 5,
//     'stroke': '#C0D0E0'
//   },
//   ticks: [0, 60, 180, 240, 300],
//   labels: {
//     label: {
//       fill: '#444'
//     }
//   },
//   grid: {
//     line: {
//       'stroke-width': 1,
//       'stroke': '#C0D0E0'
//     },
//     items: [
//       [{
//         x: 260,
//         y: 260
//       }, {
//         x: 260,
//         y: 60
//       }],
//       [{
//         x: 260,
//         y: 260
//       }, {
//         x: 460,
//         y: 260
//       }],
//       [{
//         x: 260,
//         y: 260
//       }, {
//         x: 260,
//         y: 460
//       }],
//       [{
//         x: 260,
//         y: 260
//       }, {
//         x: 60,
//         y: 260
//       }],
//     ]
//   }
// });
// var sampleRadiusAxisCfg = {
//   factor: -1,
//   start: {
//     x: 260,
//     y: 60
//   },
//   end: {
//     x: 260,
//     y: 260
//   },
//   line: {
//     'stroke-width': 1,
//     'stroke': '#aaa'
//   },
//   ticks: [0, 20, 40, 60, 80, 100],
//   circle: xAxis,
//   labels: {
//     label: {
//       fill: '#444'
//     }
//   },
//   subTick: 5
// };
// canvas.draw();
// describe('测试直角坐标系删格', function() {
//   it('测试多边形删格线', function() {
//     var axis = canvas.addGroup(CartesianAxis, Util.mix({}, sampleRadiusAxisCfg, {
//       grid: {
//         line: {
//           'stroke-width': 1,
//           'stroke': '#C0D0E0'
//         },
//         items: [
//           [{
//             x: 260,
//             y: 200,
//             radius: 60,
//             flag: 1
//           }, {
//             x: 320,
//             y: 260,
//             radius: 60,
//             flag: 1
//           }, {
//             x: 260,
//             y: 320,
//             radius: 60,
//             flag: 1
//           }, {
//             x: 200,
//             y: 260,
//             radius: 60,
//             flag: 1
//           }]
//         ],
//         type: 'polygon'
//       }
//     }));
//     canvas.draw();
//   });
//   it('测试非多边形删格线', function() {
//     var axis = canvas.addGroup(CartesianAxis, Util.mix({}, sampleRadiusAxisCfg, {
//       grid: {
//         line: {
//           'stroke-width': 1,
//           'stroke': '#C0D0E0'
//         },
//         items: [
//           [{
//             x: 260,
//             y: 200,
//             radius: 60,
//             flag: 1
//           }, {
//             x: 320,
//             y: 260,
//             radius: 60,
//             flag: 1
//           }, {
//             x: 260,
//             y: 320,
//             radius: 60,
//             flag: 1
//           }, {
//             x: 200,
//             y: 260,
//             radius: 60,
//             flag: 1
//           }]
//         ],
//         type: 'dash'
//       }
//     }));
//     canvas.draw();
//   });
//   it('测试奇背景', function() {
//     var axis = canvas.addGroup(CartesianAxis, Util.mix({}, sampleCartesianAxisCfg, {
//       grid: {
//         line: {
//           stroke: '#c0c0c0'
//         },
//         odd: {
//           fill: 'rgba(221,21,213,0.4)',
//         }
//       }
//     }));
//     canvas.draw();
//   });
//   it('测试偶背景', function() {
//     var axis = canvas.addGroup(CartesianAxis, Util.mix({}, sampleCartesianAxisCfg, {
//       grid: {
//         line: {
//           stroke: 'blue'
//         },
//         even: {
//           fill: 'rgba(212,21,23,0.4)',
//         }
//       }
//     }));
//     canvas.draw();
//   });
// });
