const expect = require('chai').expect;
import * as Simulate from 'event-simulate';
import * as _ from '@antv/util';
import { sizeItems as items, createNewCanvas } from './util';
import { Size } from '../../../../src/legend/continuous';

describe('连续图例 - Size - rect', function() {
  it('水平图例，可交互，rect 滑块', function() {
    const canvas = createNewCanvas(300, 100);
    const cfg = {
      container: canvas,
      title: '这是一个图例标题',
      items,
      width: 150,
      height: 16,
      range: [ 0.3, 0.8 ],
      offsetX: 20,
      offsetY: 0,
      // handleIcon: 'circle'
      operational: true,
      formatter: (v) => v,
    };

    const legend = new Size(cfg);
    legend.once('itemfilter', (ev) => {
      expect(ev.range).to.be.eql([ 10, 50 ]);
    });
    legend.moveTo(0, 0);
    legend.draw();

    expect(legend.get('type')).to.equal('size-legend');

    const slider = legend.get('slider');
    expect(slider.isHorizontal()).to.be.equal(true);

    slider.emit('sliderchange', {
      range: [ 0, 1 ],
      value: [ 10, 50 ],
    });

    expect(slider.range).to.be.eql([ 0.3, 0.8 ]);
    expect(slider.max).to.be.eql(50);
    expect(slider.min).to.be.eql(10);
    expect(slider.operational).to.be.eql(true);
    expect(slider.sliderType).to.be.eql('rect');

    // drag min
    slider.emit('mousedown', {
      target: slider.minSliderShape,
      event: {
        stopPropagation: _.identity,
        preventDefault: _.identity,
        clientX: 50,
        clientY: 15,
      },
    });

    expect(slider.pos).to.be.eql(50);

    Simulate.simulate(canvas.get('containerDOM'), 'mousemove', {
      clientX: 60,
      clientY: 15,
    });

    expect(slider.pos).to.be.eql(60);

    expect(slider.range[0] > 0.3).to.be.eql(true);

    Simulate.simulate(canvas.cfg.el, 'mouseup', {});

    // drag min < 0
    slider.emit('mousedown', {
      target: slider.minSliderShape,
      event: {
        stopPropagation: _.identity,
        preventDefault: _.identity,
        clientX: 500,
        clientY: 15,
      },
    });

    Simulate.simulate(canvas.get('containerDOM'), 'mousemove', {
      clientX: 60,
      clientY: 15,
    });

    expect(slider.pos).to.be.eql(60);

    expect(slider.range[0]).to.be.eql(0);

    Simulate.simulate(canvas.get('containerDOM'), 'mousemove', {
      clientX: 70,
      clientY: 15,
    });

    expect(slider.range[0] > 0).to.be.eql(true);

    Simulate.simulate(canvas.cfg.el, 'mouseup', {});

    // drag max
    slider.emit('mousedown', {
      target: slider.maxSliderShape,
      event: {
        stopPropagation: _.identity,
        preventDefault: _.identity,
        clientX: 60,
        clientY: 15,
      },
    });

    Simulate.simulate(canvas.cfg.el, 'mousemove', {
      clientX: 50,
      clientY: 15,
    });

    Simulate.simulate(canvas.cfg.el, 'mouseup', {});

    expect(slider.range[1] < 0.8).to.be.eql(true);

    // drag max < min
    slider.emit('mousedown', {
      target: slider.maxSliderShape,
      event: {
        stopPropagation: _.identity,
        preventDefault: _.identity,
        clientX: 500,
        clientY: 15,
      },
    });

    Simulate.simulate(canvas.cfg.el, 'mousemove', {
      clientX: 60,
      clientY: 15,
    });

    Simulate.simulate(canvas.cfg.el, 'mouseup', {});

    expect(slider.range).to.be.eql([ 0, 0 ]);

    // drag max, max + diff > 1
    slider.emit('mousedown', {
      target: slider.maxSliderShape,
      event: {
        stopPropagation: _.identity,
        preventDefault: _.identity,
        clientX: 50,
        clientY: 15,
      },
    });

    Simulate.simulate(canvas.cfg.el, 'mousemove', {
      clientX: 600,
      clientY: 15,
    });

    Simulate.simulate(canvas.cfg.el, 'mouseup', {});

    expect(slider.range[1]).to.be.equal(1);

    // drag all
    slider.emit('mousedown', {
      target: slider.rangeSliderShape,
      event: {
        stopPropagation: _.identity,
        preventDefault: _.identity,
        clientX: 50,
        clientY: 15,
      },
    });

    // right overflow
    Simulate.simulate(canvas.cfg.el, 'mousemove', {
      clientX: 60,
      clientY: 15,
    });

    // left overflow
    Simulate.simulate(canvas.cfg.el, 'mousemove', {
      clientX: 50,
      clientY: 15,
    });

    Simulate.simulate(canvas.cfg.el, 'mousemove', {
      clientX: 50,
      clientY: 15,
    });

    Simulate.simulate(canvas.cfg.el, 'mouseup', {});

    expect(slider.range).to.be.eql([ 0, 1 ]);
  });

  it('水平图例，不可交互，rect 滑块', function() {
    const canvas = createNewCanvas();
    const cfg = {
      container: canvas,
      items,
      width: 150,
      height: 16,
      offsetX: 50,
      offsetY: 10,
      // handleIcon: 'circle'
      operational: false,
    };

    const legend = new Size(cfg);
    legend.moveTo(0, 0);
    legend.draw();

    expect(legend.get('type')).to.equal('size-legend');

    legend.get('slider').emit('sliderchange', {
      range: [ 0, 1 ],
      value: [ 10, 50 ],
    });
  });

  it('垂直图例，可交互，rect 滑块', function() {
    const canvas = createNewCanvas(300, 200);
    const cfg = {
      container: canvas,
      items,
      layout: 'vertical',
      width: 16,
      height: 150,
      offsetX: 50,
      offsetY: 10,
      // handleIcon: 'circle'
      // operational: true,
    };

    const legend = new Size(cfg);
    legend.moveTo(0, 0);
    legend.draw();

    const slider = legend.get('slider');

    expect(legend.get('type')).to.equal('size-legend');

    // drag min
    slider.emit('mousedown', {
      target: slider.minSliderShape,
      event: {
        stopPropagation: _.identity,
        preventDefault: _.identity,
        clientX: 50,
        clientY: 50,
      },
    });

    expect(slider.pos).to.be.eql(50);

    Simulate.simulate(canvas.get('containerDOM'), 'mousemove', {
      clientX: 50,
      clientY: 40,
    });

    expect(slider.pos).to.be.eql(40);

    expect(slider.range[0] > 0).to.be.eql(true);

    Simulate.simulate(canvas.cfg.el, 'mouseup', {});
  });

  it('垂直图例，不可交互，rect 滑块', function() {
    const canvas = createNewCanvas(300, 200);
    const cfg = {
      container: canvas,
      items,
      layout: 'vertical',
      width: 16,
      height: 150,
      offsetX: 50,
      offsetY: 10,
      // handleIcon: 'circle'
      operational: false,
    };

    const legend = new Size(cfg);
    legend.moveTo(0, 0);
    legend.draw();

    expect(legend.get('type')).to.equal('size-legend');
  });
});
