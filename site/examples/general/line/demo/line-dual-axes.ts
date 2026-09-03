/**
 * A recreation of this demo: https://observablehq.com/@mbostock/mareys-trains
 */
import { Chart } from '@antv/g2';

fetch('https://assets.antv.antgroup.com/g2/train.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      width: 800,
      height: 1000,
      paddingLeft: 60,
      paddingTop: 120,
      paddingBottom: 120,
    });
    const distanceName = new Map(data.map((d) => [d.distance, d.name]));
    const xAxis = {
      tickMethod: () => Array.from(distanceName.keys()),
      labelFormatter: (d) => distanceName.get(d),
      title: null,
    };

    chart.options({
      type: 'view',
      children: [
        {
          type: 'line',
          data: data,
          encode: {
            x: 'distance',
            y: (d) => new Date(d.time),
            color: 'type',
            series: 'number',
          },
          scale: {
            color: {
              domain: ['N', 'L', 'B'],
              range: [
                'rgb(34, 34, 34)',
                'rgb(183, 116, 9)',
                'rgb(192, 62, 29)',
              ],
            },
            y: {
              range: [0, 1],
              tickCount: 15,
              utc: true,
            },
          },
          legend: false,
          axis: {
            x: [
              { ...xAxis, position: 'top' },
              { ...xAxis, position: 'bottom' },
            ],
          },
        },
      ],
    });

    chart.render();
  });
