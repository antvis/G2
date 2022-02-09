import { Chart } from '../../src';
import { createDiv, removeDom } from '../util/dom';

describe('interval tooltip', () => {
  it('tooltip name lost', () => {
    const div = createDiv();
    const data = [
      { type: '未知', value: 654, percent: 0.02 },
      { type: '17 岁以下', value: 654, percent: 0.02 },
      { type: '18-24 岁', value: 4400, percent: 0.2 },
      { type: '25-29 岁', value: 5300, percent: 0.24 },
      { type: '30-39 岁', value: 6200, percent: 0.28 },
      { type: '40-49 岁', value: 3300, percent: 0.14 },
      { type: '50 岁以上', value: 1500, percent: 0.06 },
    ];

    const chart = new Chart({
      container: div,
      autoFit: true,
      height: 500,
    });

    chart.data(data);
    chart.scale('value', {
      alias: '销售额(万)',
    });
    
    chart.tooltip({
      showMarkers: false,
    });
    chart.interval().position('type*value').color('red');
    
    chart.render();

    const bbox = chart.geometries[0].elements[0].getBBox();
    const point = { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 };
    chart.showTooltip(point);

    expect(chart.ele.querySelectorAll('.g2-tooltip-list-item').length).toBe(1);
    expect(chart.ele.querySelectorAll('.g2-tooltip-name')[0].innerHTML).toBe('销售额(万)');

    chart.destroy();
    removeDom(div);
  });
});