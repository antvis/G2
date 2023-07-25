import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .vector()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antfincdn/F5VcgnqRku/wind.json',
  })
  .encode('x', 'longitude')
  .encode('y', 'latitude')
  .encode('rotate', ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI)
  .encode('size', ({ u, v }) => Math.hypot(v, u))
  .encode('color', ({ u, v }) => Math.hypot(v, u))
  .scale('size', { range: [6, 20] })
  .scale('color', { palette: 'viridis' })
  .axis('x', { grid: false })
  .axis('y', { grid: false })
  .legend(false)
  .tooltip({ title: { channel: 'color', valueFormatter: '.1f' } });

chart.render();
