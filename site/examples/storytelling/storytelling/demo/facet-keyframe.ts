import { Chart } from '@antv/g2';

fetch(
  'https://gw.alipayobjects.com/os/bmw-prod/7fbb7084-cf34-4e7c-91b3-09e4748dc5e9.json',
)
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      width: 800,
    });
    const padding = { paddingRight: 120, paddingLeft: 70 };
    const encode = {
      shape: 'smooth',
      x: (d) => new Date(d.date),
      y: 'unemployed',
      color: 'industry',
      key: 'industry',
    };

    chart.options({
      type: 'timingKeyframe',
      direction: 'alternate',
      iterationCount: 2,
      children: [
        {
          type: 'facetRect',
          ...padding,
          paddingBottom: 60,
          data,
          encode: { y: 'industry' },
          children: [
            {
              type: 'area',
              class: 'area',
              frame: false,
              encode,
              scale: {
                x: { utc: true },
                y: { facet: false },
              },
              style: { fillOpacity: 1 },
              animate: { enter: { type: 'scaleInY' } },
            },
          ],
        },
        {
          type: 'area',
          ...padding,
          data,
          class: 'area',
          transform: [{ type: 'stackY', reverse: true }],
          encode,
          scale: { x: { utc: true } },
          style: { fillOpacity: 1 },
        },
        {
          type: 'area',
          ...padding,
          data,
          class: 'area',
          encode,
          scale: { x: { utc: true } },
          style: { fillOpacity: 0.8 },
        },
      ],
    });

    chart.render();
  });
