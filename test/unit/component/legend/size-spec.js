const expect = require('chai').expect;
const Simulate = require('event-simulate');
const { Canvas, Event } = require('../../../../src/renderer');
const { Size } = require('../../../../src/component/legend/index');

const div = document.createElement('div');
div.id = 'legend';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'legend',
  width: 500,
  height: 500
});

const items = [
  { value: '10' },
  { value: '20' },
  { value: '40' },
  { value: '50' }
];

describe('连续图例 - Size', function() {
  it('大小图例，不可筛选', function() {
    const legend = canvas.addGroup(Size, {
      items,
      title: {
        text: '图例标题',
        fill: '#333',
        textBaseline: 'middle'
      },
      width: 150,
      height: 60,
      slidable: false
    });
    legend.move(10, 10);
    canvas.draw();
    expect(legend.get('slider')).to.be.undefined;
    expect(legend.get('type')).to.equal('size-legend');
  });

  it('水平大小图例，可筛选', function() {
    const legend = canvas.addGroup(Size, {
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
    expect(legend.get('type')).to.equal('size-legend');

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
      clientY: 50
    });

    Simulate.simulate(canvasDOM, 'mouseup', {
      clientX: 227,
      clientY: 50
    });
    expect(slider.get('middleHandleElement').attr('width')).to.equal(150);
    expect(legend.get('minTextElement').attr('text')).to.equal('10');
  });

  it('垂直大小图例，可筛选，不带标题', function() {

    const legend = canvas.addGroup(Size, {
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
    expect(legend.get('type')).to.equal('size-legend');

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
    expect(legend.get('maxTextElement').attr('text')).to.equal('50');
    canvas.destroy();
  });
});
