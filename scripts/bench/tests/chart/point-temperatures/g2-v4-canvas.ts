import { Chart } from '@antv/g2';
import type { Chart as ChartType } from '../types';

export const g2V4Canvas: ChartType = (data, { start, end }) => {
  start();
  const node = document.createElement('div');
  const chart = new Chart({
    container: node,
    width: 640,
    height: 480,
  });

  chart.data(data);

  chart.point().position('date*value').style({ stroke: 'black' });

  chart.animate(false);

  chart.render();

  end(node);
};
