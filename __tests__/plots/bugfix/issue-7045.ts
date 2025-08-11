import { Chart } from '../../../src';

export function issue7045(context) {
  const { container, canvas } = context;

  const chart = new Chart({
    container,
    autoFit: true,
    canvas,
  });

  chart.options({
    type: 'interval',
    animate: false,
    data: [{ letter: 'A', frequency: 0.08167 }],
    encode: { x: 'letter', y: 'frequency' },
    labels: [
      {
        text: 'frequency',
        position: 'bottom',
        dy: 20,
        transform: [
          {
            type: 'exceedAdjust', // 加了这个，标签应该在图表内
            bounds: 'main',
          },
        ],
      },
    ],
    slider: {
      x: {
        values: [0, 0.5], // 注释后正常生效，label 展示在图表区域内
      },
    },
  });

  chart.render();

  return {
    chart,
    finished: Promise.resolve(),
  };
}
