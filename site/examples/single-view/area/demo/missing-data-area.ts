import { Chart } from '@antv/g2';

fetch('https://assets.antv.antgroup.com/g2/aapl.json')
  .then((res) => res.json())
  // Mock missing data. Set NaN from Jan. to Mar.
  .then((data) =>
    data.map((d) => ({
      date: new Date(d.date),
      close: new Date(d.date).getUTCMonth() <= 3 ? NaN : d.close,
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
      .encode('x', 'date')
      .encode('y', 'close')
      .scale('x', { type: 'time' })
      .style('connectNulls', true)
      .style('connectFill', 'grey')
      .style('connectFillOpacity', 0.15);

    chart.render();
  });
