import { Chart } from '@antv/g2';
import { throttle } from 'lodash';

const data = {};

const chart = new Chart({
  container: 'container',
  width: 640,
  height: 480,
  padding: 0,
});

chart.style({
  viewFill: '#4e79a7',
});

chart.data([]);
chart.axis(false);

chart
  .heatmap()
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('color', 'v')
  .scale('x', { domain: [0, 640] })
  .scale('y', { domain: [0, 480], range: [0, 1] })
  .style('opacity', 0)
  .tooltip(false)
  .animate(false);

chart.render();

chart.on(
  'plot:pointermove',
  throttle((e) => {
    const { x, y } = e;

    const kx = Math.floor(x - (x % 8));
    const ky = Math.floor(y - (y % 8));

    if (!data[kx]) data[kx] = {};
    if (!data[kx][ky]) data[kx][ky] = 0;

    data[kx][ky] += 1;

    const d = transform(data);

    chart.changeData(d);
  }),
);

function transform(dataMap) {
  const arr = [];
  Object.keys(dataMap).forEach((x) => {
    Object.keys(dataMap[x]).forEach((y) => {
      arr.push({ x, y, v: dataMap[x][y] });
    });
  });
  return arr;
}
