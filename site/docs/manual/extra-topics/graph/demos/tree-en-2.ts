import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'tree',
  data: {
    type: 'inline',
    value: {
      name: 'root',
      children: [
        {
          name: 'branch1',
          value: 100,
          children: [
            { name: 'leaf1', value: 50 },
            { name: 'leaf2', value: 30 },
          ],
        },
        {
          name: 'branch2',
          value: 80,
          children: [
            { name: 'leaf3', value: 40 },
            { name: 'leaf4', value: 40 },
          ],
        },
      ],
    },
  },
});

chart.render();
