import { Chart } from '@antv/g2';
import { throttle } from 'lodash';

const data = {};

const chart = new Chart({
  container: 'container',
  width: 640,
  height: 480,
  padding: 0,
});

chart.options({
  type: 'view',
  style: {
    viewFill: '#4e79a7',
  },
  data: [],
  axis: false,
  children: [
    {
      type: 'heatmap',
      encode: {
        x: 'x',
        y: 'y',
        color: 'v',
      },
      scale: {
        x: { domain: [0, 640] },
        y: { domain: [0, 480], range: [0, 1] },
      },
      style: {
        opacity: 0,
      },
      tooltip: false,
      animate: false,
    },
  ],
});

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

    chart.options({ data: d }).render();
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
