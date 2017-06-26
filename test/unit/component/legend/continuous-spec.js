const expect = require('chai').expect;
const Util = require('../../../../src/util');
const { Canvas } = require('@ali/g');
const Legend = require('../../../../src/component/legend/continuous');

const div = document.createElement('div');
div.id = 'legend';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'legend',
  width: 500,
  height: 500
});

const items = [
  { name: '0', value: 0, color: 'blue' },
  { name: '20', value: 0.2, color: '#4D4DB2' },
  { name: '40', value: 0.4, color: 'green' },
  { name: '60', value: 0.6, color: 'orange' },
  { name: '80', value: 0.8, color: '#FF00FE' },
  { name: '100', value: 1, color: 'red' }
];

describe('theme gradient', function() {
  // it ('默认渐变图例', function() {
  //   const legend = canvas.addGroup(Legend, {
  //     items: items,
  //     layout: 'horizontal',
  //     attrType: 'color',
  //     title: {
  //       text: "这就是连续图例A的Title",
  //       fill: '#333',
  //       textBaseline: 'middle'
  //     }
  //   });
  //   legend.move(50, 30);
  //   canvas.draw();
  //   console.log(legend);
  // });

  // it ('垂直布局颜色图例', function() {
  //   const legendItems = [
  //     { name: '-15', value: 0, color: '#3060cf' },
  //     { name: '0', value: 0.4, color: '#fffbbc' },
  //     { name: '20', value: 0.9, color: '#c4463a' },
  //     { name: '25', value: 1, color: '#c4463a' }
  //   ];
  //   const legend = canvas.addGroup(Legend, {
  //     items: legendItems,
  //     layout: 'vertical',
  //     attrType: 'color',
  //     width: 20,
  //     height: 200,
  //     title: {
  //       text: "这就是连续图例A的Title",
  //       fill: '#333',
  //       textBaseline: 'middle'
  //     },
  //     textStyle: {
  //       textAlign: 'start',
  //       textBaseline: 'middle',
  //       fill: '#000'
  //     },
  //     itemFormatter(val) {
  //       return val + '℃';
  //     }
  //   });
  //   legend.move(50, 30);
  //   canvas.draw();
  // });

  // it('水平方向，大小图例', function() {
  //   const legend = canvas.addGroup(Legend, {
  //     items: items,
  //     layout: 'horizontal',
  //     attrType: 'size',
  //     title: {
  //       text: "这就是连续图例A的Title"
  //     }
  //   });
  //   legend.move(50, 30);
  //   canvas.draw();
  // });

  it('垂直方向，大小图例', function() {
    const legend = canvas.addGroup(Legend, {
      items: items,
      layout: 'vertical',
      width: 20,
      height: 200,
      attrType: 'size',
      title: {
        text: "这就是连续图例A的Title"
      }
    });
    legend.move(50, 30);
    canvas.draw();
  });
});

canvas.draw();
