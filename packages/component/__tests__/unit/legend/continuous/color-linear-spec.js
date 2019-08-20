import { expect } from 'chai';
import { colorItems as items, createNewCanvas } from './util';
import { Color } from '../../../../src/legend/continuous';

describe('连续图例 - Color - 线性', function() {

  it('水平图例，不可交互', function() {
    const canvas = createNewCanvas(300, 80);
    const cfg = {
      container: canvas,
      title: '这是一个 color 图例标题',
      items,
      width: 150,
      height: 8,
      offsetX: 10,
      offsetY: 10,
      operational: false,
    };

    const legend = new Color(cfg);
    legend.moveTo(0, 0);
    legend.draw();

    expect(legend.get('type')).to.equal('color-legend');
  });

  it('垂直图例，不可交互', function() {
    const canvas = createNewCanvas(300, 200);
    const cfg = {
      container: canvas,
      title: '这是一个 color 图例标题',
      items,
      width: 8,
      height: 150,
      offsetX: 10,
      offsetY: 10,
      layout: 'vertical',
      operational: false,
    };

    const legend = new Color(cfg);
    legend.moveTo(0, 0);
    legend.draw();

    expect(legend.get('type')).to.equal('color-legend');
  });

  it('水平图例，可交互', function() {
    const canvas = createNewCanvas(300, 100);
    const cfg = {
      container: canvas,
      title: '这是一个 color 图例标题',
      items,
      range: [ 0.3, 0.8 ],
      width: 150,
      height: 8,
      offsetX: 50,
      offsetY: 30,
    };

    const legend = new Color(cfg);
    legend.moveTo(0, 0);
    legend.draw();

    expect(legend.get('type')).to.equal('color-legend');
  });

  it('垂直图例，可交互', function() {
    const canvas = createNewCanvas(300, 300);
    const cfg = {
      container: canvas,
      title: '这是一个 color 图例标题',
      items,
      width: 8,
      height: 150,
      offsetX: 50,
      offsetY: 30,
      layout: 'vertical',
    };

    const legend = new Color(cfg);
    legend.moveTo(0, 0);
    legend.draw();

    expect(legend.get('type')).to.equal('color-legend');
  });
});
