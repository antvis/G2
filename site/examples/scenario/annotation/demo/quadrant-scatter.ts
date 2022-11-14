import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.data({
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/bmw-prod/0b37279d-1674-42b4-b285-29683747ad9a.json',
});

chart.lineX().data([0]).style('zIndex', -1);
chart.lineY().data([0]).style('zIndex', -1);
chart
  .range()
  .data([
    { x: [-25, 0], y: [-30, 0], region: '1' },
    { x: [-25, 0], y: [0, 20], region: '2' },
    { x: [0, 5], y: [-30, 0], region: '2' },
    { x: [0, 5], y: [0, 20], region: '1' },
  ])
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('color', 'region')
  .scale('color', {
    range: ['#d8d0c0', '#a3dda1'],
    independent: true,
    guide: null,
  })
  .style('fillOpacity', 0.2);
chart
  .point()
  .encode('x', 'change in female rate')
  .encode('y', 'change in male rate')
  .encode('size', 'pop')
  .encode('color', 'continent')
  .encode('shape', 'point')
  .scale('color', {
    range: ['#ffd500', '#82cab2', '#193442', '#d18768', '#7e827a'],
  })
  .axis('x', { title: false })
  .axis('y', { title: false })
  .scale('x', { domain: [-25, 5] })
  .scale('y', { domain: [-30, 20] })
  .scale('size', { range: [4, 30] })
  .style('stroke', '#bbb')
  .style('fillOpacity', 0.8);

chart.render();
