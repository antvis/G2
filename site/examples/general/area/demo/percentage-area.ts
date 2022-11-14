import { Chart } from '@antv/g2';

fetch('https://assets.antv.antgroup.com/g2/unemployment-by-industry.json')
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
      .transform([{ type: 'stackY' }, { type: 'normalizeY' }])
      .encode('x', 'date')
      .encode('y', 'unemployed')
      .encode('color', 'industry');

    chart.render();
  });
