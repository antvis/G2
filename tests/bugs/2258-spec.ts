import { Chart, getTheme } from '../../src';
import { createDiv } from '../util/dom';

describe('2258', () => {
  let chart;
  it('mergeTheme', () => {
    const data = [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ];
    chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 400,
      theme: {
        defaultColor: 'red',
      }
    });

    chart.data(data);
    chart.animate(false);
    chart.point().position('year*value');

    chart.render();

    expect(chart.getTheme().defaultColor).toBe('red');
    expect(getTheme('default').defaultColor).toBe('#5B8FF9');
    expect(chart.getTheme().colors10).toEqual([
      '#5B8FF9',
      '#5AD8A6',
      '#5D7092',
      '#F6BD16',
      '#E86452',
      '#6DC8EC',
      '#945FB9',
      '#FF9845',
      '#1E9493',
      '#FF99C3',
    ]);
  });

  it('chart.theme()', () => {
    chart.theme();
    expect(chart.getTheme().defaultColor).toBe('#5B8FF9');

    chart.theme({
      colors10: ['#F6BD16', '#E86452'],
    });
    expect(chart.getTheme().defaultColor).toBe('#5B8FF9');
    expect(getTheme('default').colors10).toEqual([
      '#5B8FF9',
      '#5AD8A6',
      '#5D7092',
      '#F6BD16',
      '#E86452',
      '#6DC8EC',
      '#945FB9',
      '#FF9845',
      '#1E9493',
      '#FF99C3',
    ]);
    expect(chart.getTheme().colors10).toEqual(['#F6BD16', '#E86452']);

    chart.theme('dark');
    chart.render(true);

    expect(chart.geometries[0].elements[0].shape.attr('fill')).toBe('#000');
  });
});
