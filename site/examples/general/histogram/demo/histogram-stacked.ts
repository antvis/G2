import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });

    chart.options({
      type: 'view',
      children: [
        {
          type: 'interval',
          encode: {
            x: 'depth',
            y: 'count',
            color: 'cut',
          },
          data: data,
          transform: [
            {
              type: 'binX',
              y: 'count',
              thresholds: 25,
            },
          ],
          style: {
            columnWidthRatio: 1,
            inset: 0.5,
          },
        },
      ],
    });

    chart.render();
  });
