import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antfincdn/F5VcgnqRku/wind.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
    });

    chart
      .vector()
      .data(data)
      .encode('x', 'longitude')
      .encode('y', 'latitude')
      .encode('rotate', ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI)
      .encode('size', ({ u, v }) => Math.hypot(v, u))
      .encode('color', ({ u, v }) => Math.hypot(v, u))
      .scale('size', { range: [6, 20] })
      .legend(false);

    chart.render();
  });
