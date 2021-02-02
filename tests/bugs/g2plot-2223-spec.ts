import { Chart } from '../../src';
import { createDiv } from '../util/dom';
import { delay } from '../util/delay';

const data = [
  {
    click_count: 423,
    hour: '00',
  },
  {
    click_count: 570,
    hour: '01',
  },
  {
    click_count: 634,
    hour: '02',
  },
  {
    click_count: 432,
    hour: '03',
  },
  {
    click_count: 657,
    hour: '04',
  },
  {
    click_count: 876,
    hour: '05',
  },
  {
    click_count: 432,
    hour: '06',
  },
  {
    click_count: 200,
    hour: '07',
  },
  {
    click_count: 542,
    hour: '08',
  },
  {
    click_count: 123,
    hour: '09',
  },
  {
    click_count: 765,
    hour: '10',
  },
  {
    click_count: 313,
    hour: '11',
  },
  {
    click_count: 645,
    hour: '12',
  },
  {
    click_count: 523,
    hour: '13',
  },
];

describe('#2223', () => {
  it('tooltip', async () => {
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      autoFit: true,
    });

    chart.animate(false);
    chart.data(data);

    chart
      .interval()
      .position('hour*click_count');

    chart.tooltip({
      shared: true,
    });

    chart.render();

    chart.showTooltip({
      x: 100,
      y: 100,
    });

    expect(chart.ele.querySelector('.g2-tooltip .g2-tooltip-list .g2-tooltip-list-item .g2-tooltip-name').innerHTML).toBe('click_count');

    chart.tooltip({
      shared: true,
      customItems: (items) => {
        return [{
          ...items[0],
          name: 'hello g2',
        }];
      },
    });

    chart.render();

    chart.showTooltip({
      x: 110,
      y: 110,
    });

    expect(chart.ele.querySelector('.g2-tooltip .g2-tooltip-list .g2-tooltip-list-item .g2-tooltip-name').innerHTML).toBe('hello g2');

    chart.destroy();
  });
});
