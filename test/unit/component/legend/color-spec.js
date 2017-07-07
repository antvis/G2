const expect = require('chai').expect;
const Simulate = require('event-simulate');
const { Canvas, Event } = require('@ali/g');
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
  { name: '0', value: 0, attrValue: 'blue' },
  { name: '20', value: 0.2, attrValue: '#4D4DB2' },
  { name: '40', value: 0.4, attrValue: 'green' },
  { name: '60', value: 0.6, attrValue: 'orange' },
  { name: '80', value: 0.8, attrValue: '#FF00FE' },
  { name: '100', value: 1, attrValue: 'red' }
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
      pageY: 260,
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
      clientY: 260
    });

    Simulate.simulate(canvasDOM, 'mouseup', {
      clientX: 227,
      clientY: 260
    });
    expect(slider.get('middleHandleElement').attr('width')).to.equal(120);
    expect(legend.get('minTextElement').attr('text')).to.equal('20');
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
      pageY: 300,
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
      clientY: 350
    });

    Simulate.simulate(canvasDOM, 'mouseup', {
      clientX: 206,
      clientY: 350
    });
    expect(slider.get('middleHandleElement').attr('height')).to.equal(50);
    expect(legend.get('maxTextElement').attr('text')).to.equal('50');
    canvas.destroy();
  });
});
