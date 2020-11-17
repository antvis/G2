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

describe('#1899', () => {
  it('slider', async () => {
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

    chart.option('slider', {
      start: 0.2,
      end: 0.8,
    });

    chart.render();

    await delay(50);

    // @ts-ignore
    expect(chart.getController('slider').slider.component.get('minText')).toBe('02');
    // @ts-ignore
    expect(chart.getController('slider').slider.component.get('maxText')).toBe('10');

    // @ts-ignore
    expect(chart.filteredData).toEqual(data.slice(2, 11));

    chart.destroy();
  });

  it('scrollbar', async () => {
    const chart = new Chart({
      container: createDiv(),
      width: 200,
      height: 300,
    });

    chart.animate(false);
    chart.data(data);

    chart
      .interval()
      .position('hour*click_count');

    chart.option('scrollbar', {
      type: 'horizontal',
      width: 500,
    });

    chart.render();

    await delay(50);

    // @ts-ignore
    expect(chart.filteredData).toEqual(data.slice(0, 5));
  })
});
