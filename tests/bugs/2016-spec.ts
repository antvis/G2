import { Chart } from '../../src';
import { createDiv, removeDom } from '../util/dom';

describe('#2016', () => {
  let chart;
  const container = createDiv();

  it('Duplicate data', () => {
    chart = new Chart({
      container,
      width: 400,
      height: 300,
      autoFit: false,
    });
    chart.data([
      { gender: 'female', height: 161.2, weight: 51.6 },
      { gender: 'female', height: 161.2, weight: 51.6 },
      { gender: 'female', height: 161.2, weight: 51.6 },
      { gender: 'female', height: 157, weight: 63 },
    ]);
    chart.scale({
      width: { nice: true },
      height: { nice: true },
    });
    const point = chart
      .point()
      .position('height*weight')
      .shape('circle');
    chart.render();

    expect(point.elements.length).toBe(4);

    chart.render(true);
    expect(point.elements.length).toBe(4);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});
