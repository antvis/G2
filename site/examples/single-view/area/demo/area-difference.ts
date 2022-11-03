import { Chart } from '@antv/g2';

fetch('https://assets.antv.antgroup.com/g2/temperature-compare.json')
  .then((res) => res.json())
  .then((data) =>
    data.map((d) => ({
      ...d,
      date: new Date(d.date),
    })),
  )
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
    });

    chart.data(data);

    chart
      .area()
      .data({
        transform: [
          {
            type: 'fold',
            fields: ['New York', 'San Francisco'],
            as: ['city', 'temperature'],
          },
        ],
      })
      .transform([{ type: 'diffY' }]) // Diff the 2 area shape.
      .encode('x', 'date')
      .encode('y', 'temperature')
      .encode('color', 'city')
      .encode('shape', 'step')
      .scale('color', { range: ['#67a9cf', '#ef8a62'] });

    chart
      .line()
      .encode('x', 'date')
      .encode('y', 'San Francisco')
      .encode('shape', 'hvh')
      .style('stroke', '#000');

    chart.render();
  });
