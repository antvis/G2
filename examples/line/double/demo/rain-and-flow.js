import { Chart } from '@antv/g2';

fetch('../data/rain-flow.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      padding: 8,
    });

    chart.animate(false);
    chart.scale('time', {
      type: 'time',
      tickCount: 10,
    });
    chart.data(data);

    const v1 = chart.createView({
      region: {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0.5 },
      },
    });

    v1.line()
      .position('time*rain')
      .color('#4FAAEB');

    v1.axis('time', false);

    const v2 = chart.createView({
      region: {
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 1 },
      },
    });

    v2.line()
      .position('time*flow')
      .color('#9AD681');

    chart.render();
  });
