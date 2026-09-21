import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'timingKeyframe',
  autoFit: true,
  direction: 'alternate',
  iterationCount: 2,
  children: [
    {
      type: 'interval',
      data: [
        { gender: 'female', height: 161.2, weight: 51.6 },
        { gender: 'female', height: 167.5, weight: 59 },
        { gender: 'female', height: 159.5, weight: 49.2 },
        { gender: 'female', height: 157, weight: 63 },
        { gender: 'female', height: 155.8, weight: 53.6 },
        { gender: 'female', height: 170, weight: 59 },
        { gender: 'man', height: 159.1, weight: 47.6 },
        { gender: 'man', height: 166, weight: 69.8 },
        { gender: 'man', height: 176.2, weight: 66.8 },
        { gender: 'man', height: 160.2, weight: 75.2 },
        { gender: 'man', height: 172.5, weight: 55.2 },
      ],
      encode: { x: 'gender', y: 'weight', color: 'gender', key: 'gender' },
      transform: [{ type: 'groupX', y: 'mean' }],
    },
    {
      type: 'point',
      data: [
        { gender: 'female', height: 161.2, weight: 51.6 },
        { gender: 'female', height: 167.5, weight: 59 },
        { gender: 'female', height: 159.5, weight: 49.2 },
        { gender: 'female', height: 157, weight: 63 },
        { gender: 'female', height: 155.8, weight: 53.6 },
        { gender: 'female', height: 170, weight: 59 },
        { gender: 'man', height: 159.1, weight: 47.6 },
        { gender: 'man', height: 166, weight: 69.8 },
        { gender: 'man', height: 176.2, weight: 66.8 },
        { gender: 'man', height: 160.2, weight: 75.2 },
        { gender: 'man', height: 172.5, weight: 55.2 },
      ],
      encode: {
        x: 'height',
        y: 'weight',
        color: 'gender',
        shape: 'point',
        groupKey: 'gender',
      },
    },
  ],
  duration: 1000,
});

chart.render();
