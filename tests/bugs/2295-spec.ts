import { Chart } from '../../src';
import { delay } from '../util/delay';
import { createDiv } from '../util/dom';

describe('2295', () => {
  it('2295', async () => {
    const data = [
      {
        city: 'Tokyo',
        month: 'Jan',
        temperature: 7,
      },
      {
        city: 'London',
        month: 'Jan',
        temperature: 3.9,
      },
      {
        city: 'Tokyo',
        month: 'Feb',
        temperature: 6.9,
      },
      {
        city: 'London',
        month: 'Feb',
        temperature: 4.2,
      },
      {
        city: 'Tokyo',
        month: 'Mar',
        temperature: 9.5,
      },
      {
        city: 'London',
        month: 'Mar',
        temperature: 5.7,
      },
      {
        city: 'Tokyo',
        month: 'Apr',
        temperature: 14.5,
      },
      {
        city: 'London',
        month: 'Apr',
        temperature: 8.5,
      },
      {
        city: 'Tokyo',
        month: 'May',
        temperature: 18.4,
      },
      {
        city: 'London',
        month: 'May',
        temperature: 11.9,
      },
      {
        city: 'Tokyo',
        month: 'Jun',
        temperature: 21.5,
      },
      {
        city: 'London',
        month: 'Jun',
        temperature: 15.2,
      },
      {
        city: 'Tokyo',
        month: 'Jul',
        temperature: 25.2,
      },
      {
        city: 'London',
        month: 'Jul',
        temperature: 17,
      },
      {
        city: 'Tokyo',
        month: 'Aug',
        temperature: 26.5,
      },
      {
        city: 'London',
        month: 'Aug',
        temperature: 16.6,
      },
      {
        city: 'Tokyo',
        month: 'Sep',
        temperature: 23.3,
      },
      {
        city: 'London',
        month: 'Sep',
        temperature: 14.2,
      },
      {
        city: 'Tokyo',
        month: 'Oct',
        temperature: 18.3,
      },
      {
        city: 'London',
        month: 'Oct',
        temperature: 10.3,
      },
      {
        city: 'Tokyo',
        month: 'Nov',
        temperature: 13.9,
      },
      {
        city: 'London',
        month: 'Nov',
        temperature: 6.6,
      },
      {
        city: 'Tokyo',
        month: 'Dec',
        temperature: 9.6,
      },
      {
        city: 'London',
        month: 'Dec',
        temperature: 4.8,
      },
    ];
    const chart = new Chart({
      container: createDiv(),
      width: 500,
      height: 300,
      appendPadding: [20],
    });

    chart.data(data);
    chart.interval().position('month*temperature').color('city');
    chart.tooltip({ shared: true });
    chart.option('slider', {
      start: 0.2,
      end: 0.8,
    });
    chart.render();
    chart.render();

    await delay(1);

    expect(chart.getData().length).toBe(Math.floor(data.length * (0.8 - 0.2)));
  });
});
