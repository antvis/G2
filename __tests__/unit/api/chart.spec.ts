import { Chart } from '../../../src';
import { optionsOf } from '../../../src/api/chart';
import { Interval } from '../../../src/api/interval';
import { createDiv } from '../../utils/dom';

describe('Chart', () => {
  it('Chart() should have expected defaults', () => {
    const chart = new Chart();
    expect(chart.type).toBe('view');
    expect(chart.parentNode).toBeNull();
    expect(chart.value).toEqual({});
    expect(chart['container'].nodeName).toBe('DIV');
  });

  it('Chart({...}) should support HTML container', () => {
    const container = createDiv();
    const chart = new Chart({
      container,
    });
    expect(chart['container']).toBe(container);
  });

  it('Chart({...}) should support id container', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'root');
    document.body.appendChild(div);
    const chart = new Chart({
      container: 'root',
    });
    expect(chart['container']).toBe(div);
  });

  it('Chart({...}) should override default value', () => {
    const chart = new Chart({
      data: [1, 2, 3],
    });
    expect(chart.value).toEqual({
      data: [1, 2, 3],
    });
  });

  it('chart.interval() should return a interval node', () => {
    const chart = new Chart();
    const interval = chart.interval();
    expect(interval).toBeInstanceOf(Interval);
    expect(optionsOf(chart)).toEqual({
      type: 'view',
      children: [{ type: 'interval' }],
    });
  });

  it('chart.render() should render chart', () => {
    const chart = new Chart({
      container: createDiv(),
    });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);

    chart
      .interval()
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    expect(chart.render()).toBe(chart);
  });
});
