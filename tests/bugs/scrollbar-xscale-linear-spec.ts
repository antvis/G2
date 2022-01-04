import { Chart } from '../../src';
import { delay } from '../util/delay';
import { createDiv, removeDom } from '../util/dom';

const Data = [
  { year: 1999, value: 13 },
  { year: 1992, value: 4 },
  { year: 1993, value: 3.5 },
  { year: 1994, value: 5 },
  { year: 1995, value: 4.9 },
  { year: 1996, value: 6 },
  { year: 1997, value: 7 },
  { year: 1998, value: 9 },
  { year: 1991, value: 3 },
];

describe('Scrollbar', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    height: 500,
    width: 300,
  });

  chart.data(Data);

  chart.option('scrollbar', {});

  chart.interval().position('year*value');
  chart.render();

  it('xScale linear', async () => {
    const scrollbar = chart.getController('scrollbar');

    await delay(1);
    scrollbar.setValue(0);
    // @ts-ignore
    expect(chart.filteredData.find(data => data['year'] === 1991)).toEqual({ year: 1991, value: 3 });

    await delay(1);
    scrollbar.setValue(1);
    // @ts-ignore
    expect(chart.filteredData.find(data => data['year'] === 1999)).toEqual({ year: 1999, value: 13 });
  });

  afterAll(() => {
    chart.destroy();
    removeDom(div);
  });
});
