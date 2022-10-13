import { Chart } from '@antv/g2';

export function g2V4Canvas(data, { start, end }) {
  start();
  const node = document.createElement('div');
  const chart = new Chart({
    container: node,
    width: 640,
    height: 480,
  });

  chart.data(data);

  chart.point().position('date*value').style({ stroke: 'black' });

  chart.render();

  end(node);
}
