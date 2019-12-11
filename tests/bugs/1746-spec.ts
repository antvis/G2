import { Chart } from '../../src';
import { CITY_SALE } from '../util/data';
import { createDiv } from '../util/dom';

describe('#1746', () => {
  const chart = new Chart({
    container: createDiv(),
    height: 500,
    padding: 16,
  });

  chart.data(CITY_SALE);

  const interval = chart
    .interval()
    .position('city*sale')
    .color('category')
    .adjust('stack');

  chart.render();

  it('shapeFactory cache cause coordinate update is invalid', () => {
    // @ts-ignore
    expect(interval.shapeFactory.coordinate.isTransposed).toBe(false);
    // @ts-ignore
    expect(interval.shapeFactory.theme.customKey).toBeUndefined();

    chart.coordinate('rect').transpose();
    chart.theme({
      geometries: {
        interval: {
          customKey: true,
        },
      },
    });
    chart.render();

    // @ts-ignore
    expect(interval.shapeFactory.coordinate.isTransposed).toBe(true);
    // @ts-ignore
    expect(interval.shapeFactory.theme.customKey).toBeDefined();
  });
});
