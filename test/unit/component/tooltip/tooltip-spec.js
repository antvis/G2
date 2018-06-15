// const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer2d');
const Tooltip = require('../../../../src/component/tooltip/index');

const div = document.createElement('div');
div.id = 'tooltip';
div.style.margin = '20px';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'tooltip',
  width: 500,
  height: 500
});

const plotRange = {
  tl: { x: 25, y: 50 },
  tr: { x: 425, y: 50 },
  bl: { x: 25, y: 440 },
  br: { x: 425, y: 440 },
  cc: { x: 225, y: 245 }
};

describe('Tooltip', function() {
  it('默认', function() {
    const tooltip = new Tooltip({
      x: 10,
      y: 10,
      plotRange,
      titleContent: '这是测试title',
      showTitle: true,
      visible: true,
      crosshairs: {
        type: 'cross',
        lineStyle: {
          stroke: '#f80',
          lineStash: [ 2, 2 ]
        }
      },
      items: [
        { color: 'red', name: 'name1', value: '1222333' },
        { color: 'blue', name: 'n2', value: '1233' },
        { color: 'yellow', name: 'name3', value: 'swww - afas' }
      ],
      offset: 50,
      canvas,
      frontPlot: canvas.addGroup()
    });
    tooltip.setPosition(50, 100);
    tooltip.show();
    canvas.draw();
  });
});

