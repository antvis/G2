const expect = require('chai').expect;
const Simulate = require('event-simulate');
const { Canvas, Event } = require('../../../../src/renderer');
const { Color } = require('../../../../src/component/legend/index');

const div = document.createElement('div');
div.id = 'legend';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'legend',
  width: 500,
  height: 500
});

const items = [
  { value: '0', attrValue: 'blue' },
  { value: '20', attrValue: '#4D4DB2' },
  { value: '40', attrValue: 'green' },
  { value: '60', attrValue: 'orange' },
  { value: '80', attrValue: '#FF00FE' },
  { value: '100', attrValue: 'red' }
];

describe('连续图例 - Color', function() {
  it('水平渐变图例，不可筛选', function() {
    const legend = canvas.addGroup(Color, {
      items,
      layout: 'horizontal',
      title: {
        text: '这就是连续图例A的Title',
        fill: '#333',
        textBaseline: 'middle'
      },
      width: 150,
      height: 15,
      slidable: false
    });
    legend.move(10, 10);
    canvas.draw();
    expect(legend.get('slider')).to.be.undefined;
    expect(legend.get('type')).to.equal('color-legend');
  });

  it('水平渐变图例，不可筛选', function() {
    const legend = canvas.addGroup(Color, {
      items,
      layout: 'vertical',
      width: 20,
      height: 200,
      textStyle: {
        textAlign: 'start',
        textBaseline: 'middle',
        fill: '#333'
      },
      itemFormatter(val) {
        return val + '℃';
      },
      slidable: false
    });
    legend.move(10, 80);
    canvas.draw();
    expect(legend.get('slider')).to.be.undefined;
    expect(legend.get('type')).to.equal('color-legend');
  });

  it('水平渐变图例，可筛选', function() {
    const legend = canvas.addGroup(Color, {
      items,
      layout: 'horizontal',
      title: {
        text: '这就是连续图例A的Title',
        fill: '#333',
        textBaseline: 'middle'
      },
      width: 150,
      height: 15
    });
    legend.move(200, 10);
    canvas.draw();
    expect(legend.get('slider')).not.to.be.undefined;
    expect(legend.get('type')).to.equal('color-legend');

    // 模拟筛选事件
    const slider = legend.get('slider');
    const event = new Event('mousedown', {
      pageX: 197,
      pageY: 12,
      stopPropagation() {
        return true;
      },
      preventDefault() {
        return true;
      }
    }, true, true);
    event.currentTarget = legend.get('minButtonElement');
    slider.trigger('mousedown', [ event ]);

    const canvasDOM = canvas.get('el');
    Simulate.simulate(canvasDOM, 'mousemove', {
      clientX: 227,
      clientY: 12
    });

    Simulate.simulate(canvasDOM, 'mouseup', {
      clientX: 227,
      clientY: 12
    });
    expect(slider.get('middleHandleElement').attr('width')).to.equal(150);
    expect(legend.get('minTextElement').attr('text')).to.equal('0');
  });

  it('垂直渐变图例，可筛选，不带标题', function() {
    const legend = canvas.addGroup(Color, {
      items,
      layout: 'vertical',
      title: {
        fill: '#333',
        textBaseline: 'middle'
      },
      width: 15,
      height: 100
    });
    legend.move(200, 100);
    canvas.draw();
    expect(legend.get('slider')).not.to.be.undefined;
    expect(legend.get('type')).to.equal('color-legend');

    // 模拟筛选事件
    const slider = legend.get('slider');
    const event = new Event('mousedown', {
      pageX: 206,
      pageY: 100,
      stopPropagation() {
        return true;
      },
      preventDefault() {
        return true;
      }
    }, true, true);
    event.currentTarget = legend.get('maxButtonElement');
    slider.trigger('mousedown', [ event ]);

    const canvasDOM = canvas.get('el');
    Simulate.simulate(canvasDOM, 'mousemove', {
      clientX: 206,
      clientY: 150
    });

    Simulate.simulate(canvasDOM, 'mouseup', {
      clientX: 206,
      clientY: 150
    });
    expect(slider.get('middleHandleElement').attr('height')).to.equal(100);
    expect(legend.get('maxTextElement').attr('text')).to.equal('100');
    canvas.destroy();
  });
});
