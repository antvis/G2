import { Chart } from '@antv/g2';

export const roseLabel = ({ container, theme, width, height, tokens }) => {
  const chart = new Chart({
    container,
    width,
    height,
  });

  chart.options({
    type: 'interval',
    theme: { type: theme, tokens },
    coordinate: { type: 'polar', outerRadius: 0.85 },
    transform: [{ type: 'groupX', y: 'sum' }],
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    },
    encode: { x: 'year', color: 'year', y: 'people' },
    scale: { y: { type: 'sqrt' }, x: { padding: 0 } },
    axis: false,
    labels: [
      {
        text: 'people',
        position: 'outside',
        formatter: '~s',
        transform: [{ type: 'overlapDodgeY' }],
      },
    ],
  });

  chart.render();

  return chart;
};
