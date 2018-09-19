const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
// const { Color } = require('../../../../src/component/legend/index');
const Color = require('@antv/components/src/legend/color');

const div = document.createElement('div');
div.id = 'legend';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'legend',
  width: 500,
  height: 500
});

const items = [
  { value: 0, color: 'blue' },
  { value: 20, color: '#4D4DB2' },
  { value: 40, color: 'green' },
  { value: 60, color: 'orange' },
  { value: 80, color: '#FF00FE' },
  { value: 100, color: 'red' }
];

describe('连续图例 - Color', function() {
  it('水平渐变图例，不可筛选', function() {
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
      height: 15,
      slidable: false
    };
    const legend = new Color(cfg);
    legend.move(10, 10);
    legend.draw();
    expect(legend.get('slider')).to.be.undefined;
    expect(legend.get('type')).to.equal('color-legend');
  });

  it('水平渐变图例，不可筛选，带格式化函数', function() {
    canvas.clear();
    const cfg = {
      items,
      container: canvas,
      layout: 'vertical',
      width: 20,
      height: 200,
      textStyle: {
        textAlign: 'start',
        textBaseline: 'middle',
        fill: '#333'
      },
      formatter(val) {
        return val + '℃';
      },
      slidable: false
    };
    const legend = new Color(cfg);
    legend.move(10, 80);
    legend.draw();
    expect(legend.get('slider')).to.be.undefined;
    expect(legend.get('type')).to.equal('color-legend');
  });

  it('水平渐变图例，可筛选', function() {
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
    const legend = new Color(cfg);
    legend.move(200, 10);
    legend.draw();
    expect(legend.get('slider')).not.to.be.undefined;
    expect(legend.get('type')).to.equal('color-legend');

    // 模拟筛选事件
    const slider = legend.get('slider');
    const ev = { range: [ 20, 90 ] };
    slider.trigger('sliderchange', [ ev ]);
    expect(slider.get('middleHandleElement').attr('width')).to.equal(150);
    expect(legend.get('minTextElement').attr('text')).to.equal('20');
  });

  it('垂直渐变图例，可筛选，不带标题', function() {
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
    const legend = new Color(cfg);
    legend.move(200, 100);
    legend.draw();
    expect(legend.get('slider')).not.to.be.undefined;
    expect(legend.get('type')).to.equal('color-legend');

    // 模拟筛选事件
    const slider = legend.get('slider');
    const ev = { range: [ 10, 50 ] };
    slider.trigger('sliderchange', [ ev ]);
    expect(slider.get('middleHandleElement').attr('height')).to.equal(100);
    expect(legend.get('maxTextElement').attr('text')).to.equal('50');
  });

  it('不可滑动的水平分块图例', function() {
    canvas.clear();
    const cfg = {
      items,
      container: canvas,
      layout: 'horizontal',
      title: {
        fill: '#333',
        textBaseline: 'middle'
      },
      width: 100,
      height: 15,
      isSegment: true,
      slidable: false
    };
    const legend = new Color(cfg);
    legend.move(200, 100);
    legend.draw();
  });

  it('不可滑动的垂直分块图例', function() {
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
      height: 100,
      isSegment: true,
      slidable: false
    };
    const legend = new Color(cfg);
    legend.move(200, 100);
    legend.draw();
  });

  it('不可滑动的垂直分块图例, activate 图例', function() {
    canvas.clear();
    const cfg = {
      items,
      container: canvas,
      layout: 'vertical',
      width: 15,
      height: 100,
      isSegment: true,
      slidable: false
    };
    const legend = new Color(cfg);
    legend.move(200, 100);
    legend.draw();
    legend.activate(30);
    legend.unactivate();
  });

  it('不可滑动的水平分块图例, mousemove 和 mouseleave', function() {
    canvas.clear();
    const cfg = {
      items,
      container: canvas,
      layout: 'horizontal',
      width: 150,
      height: 15,
      isSegment: true,
      slidable: false
    };
    const legend = new Color(cfg);
    legend.move(200, 100);
    legend.draw();

    const ev = {
      clientX: 90,
      clientY: 31
    };
    legend.get('group').trigger('mousemove', [ ev ]); // hover
    legend.get('group').trigger('mouseleave', [ ev ]); // leave
    legend.get('group').trigger('mousemove', [ ev ]); // hover again
    const ev2 = {
      clientX: 100,
      clientY: 31
    };
    legend.get('group').trigger('mousemove', [ ev2 ]); // hover again
  });

  it('可滑动的水平分块图例，有标题， activate', function() {
    canvas.clear();
    const cfg = {
      items,
      container: canvas,
      title: {
        text: 'aaa'
      },
      layout: 'horizontal',
      width: 150,
      height: 15,
      isSegment: true,
      slidable: true
    };
    const legend = new Color(cfg);
    legend.move(200, 100);
    legend.draw();
    legend.activate(50);
  });

  it('不可滑动的垂直图例带标题, mousemove', function() {
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
      slidable: false
    };
    const legend = new Color(cfg);
    legend.move(200, 100);
    legend.draw();

    const ev = {
      clientX: 90,
      clientY: 31
    };
    legend.get('group').trigger('mousemove', [ ev ]); // hover
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
    const legend = new Color(cfg);
    legend.move(200, 100);
    legend.draw();
    legend.activate(50);
  });

  it('可滑动的水平图例， activate', function() {
    canvas.clear();
    const cfg = {
      items,
      container: canvas,
      layout: 'horizontal',
      width: 150,
      height: 15,
      slidable: true
    };
    const legend = new Color(cfg);
    legend.move(200, 100);
    legend.draw();
    legend.activate(50);
    legend.destroy();
  });
});
