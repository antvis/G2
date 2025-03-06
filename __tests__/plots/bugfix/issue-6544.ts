import { csv } from '@antv/vendor/d3-fetch';
import { Chart } from '../../../src';

export async function issue6544(context) {
  const { container, canvas } = context;

  // Fetch CSV data from local file
  // The custom fetch implementation in tests will resolve this relative to __tests__ directory
  const data = await csv('data/stateages.csv', (row) => {
    return {
      ...row,
      population: Number(row.population),
    };
  });

  const chart = new Chart({
    container: container,
    canvas: canvas,
  });

  // Apply academy theme.
  chart.theme({ type: 'academy' });

  chart
    .line()
    .data(data)
    .encode('x', 'state')
    .encode('y', 'population')
    .encode('series', () => 'b')
    // @ts-ignore
    .transform({ type: 'groupX', reducer: 'sum' })
    .transform({ type: 'sortX', by: 'y', ordinal: false });

  const finished = chart.render();
  return {
    chart,
    finished,
  };
}
