const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const { Legend } = require('@antv/component');
const Size = Legend.Size;

const div = document.createElement('div');
div.id = 'legend';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'legend',
  width: 500,
  height: 500
});

const items = [
  { value: 10 },
  { value: 20 },
  { value: 40 },
  { value: 50 }
];

describe('连续图例 - Size', function() {
  it('垂直大小图例，不可筛选', function() {
    const cfg = {
      items,
      container: canvas,
      title: {
        text: '图例标题',
        fill: '#333',
        textBaseline: 'middle'
      },
      width: 150,
      height: 60,
      slidable: false
    };
    const legend = new Size(cfg);
    legend.move(10, 10);
    legend.draw();
    expect(legend.get('slider')).to.be.undefined;
    expect(legend.get('type')).to.equal('size-legend');
  });

  it('水平大小图例，不可筛选', function() {
    canvas.clear();
    const cfg = {
      items,
      container: canvas,
      width: 150,
      height: 60,
      slidable: false,
      layout: 'horizontal'
    };
    const legend = new Size(cfg);
    legend.move(10, 10);
    legend.draw();
    expect(legend.get('slider')).to.be.undefined;
    expect(legend.get('type')).to.equal('size-legend');
  });

  it('水平大小图例，可筛选', function() {
    canvas.clear();
    const cfg = {
      items,
      container: canvas,
      layout: 'horizontal',
      title: {
        text: '这就是连续图例A的Title',
        fill: '#333',
        textBaseline: 'middle'
      },
      width: 150,
      height: 15
    };
    const legend = new Size(cfg);
    legend.move(200, 10);
    legend.draw();
    expect(legend.get('slider')).not.to.be.undefined;
    expect(legend.get('type')).to.equal('size-legend');

    // 模拟筛选事件
    const slider = legend.get('slider');
    const ev = { range: [ 0, 90 ] };
    slider.trigger('sliderchange', [ ev ]);
    expect(slider.get('middleHandleElement').attr('width')).to.equal(150);
    expect(legend.get('maxTextElement').attr('text')).to.equal('46');
  });

  it('垂直大小图例，可筛选，不带标题', function() {
    canvas.clear();
    const cfg = {
      items,
      container: canvas,
      layout: 'vertical',
      title: {
        fill: '#333',
        textBaseline: 'middle'
      },
      width: 15,
      height: 100
    };
    const legend = new Size(cfg);
    legend.move(200, 100);
    legend.draw();
    expect(legend.get('slider')).not.to.be.undefined;
    expect(legend.get('type')).to.equal('size-legend');

    // 模拟筛选事件
    const slider = legend.get('slider');
    const ev = { range: [ 0, 90 ] };
    slider.trigger('sliderchange', [ ev ]);
    expect(slider.get('middleHandleElement').attr('width')).to.equal(15);
    expect(legend.get('maxTextElement').attr('text')).to.equal('46');
  });

  it('可滑动的垂直图例带标题， activate', function() {
    canvas.clear();
    const cfg = {
      items,
      container: canvas,
      layout: 'vertical',
      title: {
        text: 'aaa',
        fill: '#333',
        textBaseline: 'middle'
      },
      width: 15,
      height: 150,
      slidable: true
    };
    const legend = new Size(cfg);
    legend.move(200, 100);
    legend.draw();
    legend.activate(50);
  });

  it('可滑动的水平图例带标题， activate', function() {
    canvas.clear();
    const cfg = {
      items,
      container: canvas,
      layout: 'horizontal',
      width: 150,
      height: 15,
      slidable: true
    };
    const legend = new Size(cfg);
    legend.move(200, 100);
    legend.draw();
    legend.activate(50);
    legend.destroy();
  });
});
