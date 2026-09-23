import { Chart } from '@antv/g2';

fetch(
  'https://gw.alipayobjects.com/os/bmw-prod/fbe4a8c1-ce04-4ba3-912a-0b26d6965333.json',
)
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      paddingTop: 60,
      paddingLeft: 100,
    });

    chart.options({
      type: 'timingKeyframe',
      direction: 'alternate',
      iterationCount: 4,
      children: [
        {
          type: 'interval',
          padding: 'auto',
          data,
          encode: { x: 'gender', color: 'gender', key: 'gender' },
          transform: [{ type: 'groupX', y: 'count' }],
        },
        {
          type: 'point',
          padding: 'auto',
          data,
          encode: {
            x: 'weight',
            y: 'height',
            color: 'gender',
            groupKey: 'gender',
            shape: 'point',
          },
        },
      ],
    });

    chart.render();
  });
