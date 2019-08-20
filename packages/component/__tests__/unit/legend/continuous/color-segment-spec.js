import { expect } from 'chai';
import { colorItems as items, createNewCanvas } from './util';
import { Color } from '../../../../src/legend/continuous';

describe('连续图例 - Color - segment', function() {

  it('水平图例，不可交互', function() {
    const canvas = createNewCanvas(300, 120);
    const cfg = {
      container: canvas,
      title: '这是一个 color 图例标题',
      items,
      width: 150,
      height: 8,
      offsetX: 10,
      offsetY: 10,
      operational: false,
      isSegment: true,
    };

    const legend = new Color(cfg);
    legend.moveTo(0, 0);
    legend.draw();

    expect(legend.get('type')).to.equal('color-legend');
  });

  it('垂直图例，不可交互', function() {
    const canvas = createNewCanvas(300, 300);
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
      isSegment: true,
      formatter: (v) => `$ ${v}`,
    };

    const legend = new Color(cfg);
    legend.moveTo(0, 0);
    legend.draw();

    expect(legend.get('type')).to.equal('color-legend');
  });
});
