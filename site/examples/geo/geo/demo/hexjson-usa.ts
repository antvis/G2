/**
 * A recreation of this demo: http://blog.apps.npr.org/2015/05/11/hex-tile-maps.html
 */
import { Chart, register } from '@antv/g2';
import { getGridForHexJSON, renderHexJSON } from 'd3-hexjson';

function processRow(row) {
  row.cx = row.x;
  row.cy = row.y;
  row.x = [];
  row.y = [];
  row.vertices.forEach((v) => {
    row.x.push(v.x + row.cx);
    row.y.push(v.y + row.cy);
  });
  return row;
}

register('data.hexbin', ({ width = 1, height = 1 }) => {
  return (data) => renderHexJSON(data.value, width, height).map(processRow);
});

register('data.hexgird', ({ width = 1, height = 1 }) => {
  return (data) =>
    renderHexJSON(getGridForHexJSON(data.value), width, height).map(processRow);
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/us-states.hex.json',
  },
  axis: false,
  children: [
    {
      type: 'polygon',
      data: {
        transform: [{ type: 'hexgird' }],
      },
      encode: {
        x: 'x',
        y: 'y',
      },
      style: {
        fill: 'grey',
        opacity: 0.2,
        lineWidth: 2,
        stroke: '#fff',
        pointerEvents: 'none',
      },
      tooltip: false,
    },
    {
      type: 'polygon',
      data: {
        transform: [{ type: 'hexbin' }],
      },
      encode: {
        x: 'x',
        y: 'y',
      },
      style: {
        fill: '#5B8FF9',
        lineWidth: 5,
        stroke: '#fff',
      },
      labels: [
        {
          text: 'key',
          fontSize: 16,
          fontWeight: 500,
          position: 'inside',
          pointerEvents: 'none',
        },
      ],
      tooltip: {
        items: [
          {
            field: 'capital',
          },
        ],
      },
      state: {
        active: { fill: 'orange' },
        inactive: { opacity: 0.5 },
      },
      interaction: {
        elementHighlight: true,
      },
    },
  ],
});

chart.render();
