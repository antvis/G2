import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('tooltip ellipsis tip', () => {
  it('max-width 50%', () => {
    const Tokyo = 'TokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyoTokyo';
    const London = 'LondonLondonLondonLondonLondonLondonLondonLondonLondonLondonLondonLondonLondonLondonLondonLondonLondonLondonLondonLondonLondonLondonLondonLondonLondonLondon';

    const data = [
      { month: 'Jan', city: Tokyo, temperature: 7 },
      { month: 'Jan', city: London, temperature: 3.9 },
      { month: 'Feb', city: Tokyo, temperature: 6.9 },
      { month: 'Feb', city: London, temperature: 4.2 },
    ];

    const div = createDiv();
    const chart = new Chart({
      container: div,
      width: 600,
      height: 300,
      autoFit: false,
    });

    chart.data(data);
    chart.line().position('month*temperature').color('city').shape('smooth').adjust('stack');
    chart.render();

    const label = chart.getController('legend').getComponents()[0].component.get('container').findById(`-legend-item-${Tokyo}-name`);

    chart.emit('legend-item-name:mousemove', {
      x: 0,
      y: 0,
      target: label,
    });

    // 超长 tooltip 自动换行
    expect(div.querySelector('.g2-tooltip').getBoundingClientRect().height).toBeGreaterThan(36);

    chart.destroy();
  });
});
