const expect = require('chai').expect;
import { sizeItems as items, createNewCanvas } from './util';
import { Size } from '../../../../src/legend/continuous';

describe('连续图例 - Size - circle', function() {

  it('水平图例，可交互，circle 滑块', function() {
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
      handleIcon: 'circle',
      // operational: true,
    };

    const legend = new Size(cfg);
    legend.moveTo(0, 0);
    legend.draw();

    expect(legend.get('type')).to.equal('size-legend');
  });

  it('水平图例，不可交互，circle 滑块', function() {
    const canvas = createNewCanvas();
    const cfg = {
      container: canvas,
      items,
      width: 150,
      height: 16,
      offsetX: 50,
      offsetY: 10,
      handleIcon: 'circle',
      operational: false,
    };

    const legend = new Size(cfg);
    legend.moveTo(0, 0);
    legend.draw();

    expect(legend.get('type')).to.equal('size-legend');
  });

  it('垂直图例，可交互，circle 滑块', function() {
    const canvas = createNewCanvas(300, 200);
    const cfg = {
      container: canvas,
      items,
      layout: 'vertical',
      width: 16,
      height: 150,
      offsetX: 50,
      offsetY: 30,
      handleIcon: 'circle',
      // operational: true,
    };

    const legend = new Size(cfg);
    legend.moveTo(0, 0);
    legend.draw();

    expect(legend.get('type')).to.equal('size-legend');
  });

  it('垂直图例，不可交互，circle 滑块', function() {
    const canvas = createNewCanvas(300, 200);
    const cfg = {
      container: canvas,
      items,
      layout: 'vertical',
      width: 16,
      height: 150,
      offsetX: 50,
      offsetY: 30,
      handleIcon: 'circle',
      operational: false,
    };

    const legend = new Size(cfg);
    legend.moveTo(0, 0);
    legend.draw();

    expect(legend.get('type')).to.equal('size-legend');
  });
});
