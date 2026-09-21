import { Chart } from '@antv/g2';

// 完整的barley数据集 - 演示横向堆叠柱状图的优化效果
const barleyData = [
  { yield: 27, variety: 'Manchuria', year: 1931, site: 'University Farm' },
  { yield: 48.87, variety: 'Manchuria', year: 1931, site: 'Waseca' },
  { yield: 27.43, variety: 'Manchuria', year: 1931, site: 'Morris' },
  { yield: 39.93, variety: 'Manchuria', year: 1931, site: 'Crookston' },
  { yield: 32.97, variety: 'Manchuria', year: 1931, site: 'Grand Rapids' },
  { yield: 28.97, variety: 'Manchuria', year: 1931, site: 'Duluth' },
  { yield: 43.07, variety: 'Glabron', year: 1931, site: 'University Farm' },
  { yield: 55.2, variety: 'Glabron', year: 1931, site: 'Waseca' },
  { yield: 28.77, variety: 'Glabron', year: 1931, site: 'Morris' },
  { yield: 38.13, variety: 'Glabron', year: 1931, site: 'Crookston' },
  { yield: 29.13, variety: 'Glabron', year: 1931, site: 'Grand Rapids' },
  { yield: 29.67, variety: 'Glabron', year: 1931, site: 'Duluth' },
  { yield: 35.13, variety: 'Svansota', year: 1931, site: 'University Farm' },
  { yield: 47.33, variety: 'Svansota', year: 1931, site: 'Waseca' },
  { yield: 25.77, variety: 'Svansota', year: 1931, site: 'Morris' },
  { yield: 40.47, variety: 'Svansota', year: 1931, site: 'Crookston' },
  { yield: 29.67, variety: 'Svansota', year: 1931, site: 'Grand Rapids' },
  { yield: 25.7, variety: 'Svansota', year: 1931, site: 'Duluth' },
  { yield: 39.9, variety: 'Velvet', year: 1931, site: 'University Farm' },
  { yield: 50.23, variety: 'Velvet', year: 1931, site: 'Waseca' },
  { yield: 26.13, variety: 'Velvet', year: 1931, site: 'Morris' },
  { yield: 41.33, variety: 'Velvet', year: 1931, site: 'Crookston' },
  { yield: 23.03, variety: 'Velvet', year: 1931, site: 'Grand Rapids' },
  { yield: 26.3, variety: 'Velvet', year: 1931, site: 'Duluth' },
  { yield: 36.57, variety: 'Trebi', year: 1931, site: 'University Farm' },
  { yield: 63.83, variety: 'Trebi', year: 1931, site: 'Waseca' },
  { yield: 43.77, variety: 'Trebi', year: 1931, site: 'Morris' },
  { yield: 46.93, variety: 'Trebi', year: 1931, site: 'Crookston' },
  { yield: 29.77, variety: 'Trebi', year: 1931, site: 'Grand Rapids' },
  { yield: 33.93, variety: 'Trebi', year: 1931, site: 'Duluth' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 400,
});

chart.options({
  type: 'interval',
  data: barleyData,
  coordinate: {
    transform: [{ type: 'transpose' }],
  },
  encode: {
    x: 'site',
    y: 'yield',
    color: 'variety',
  },
  transform: [{ type: 'stackY' }, { type: 'sortX', by: 'y', reverse: true }],
  axis: {
    y: {
      labelAutoHide: false,
      title: 'Yield (bushels/acre)',
    },
    x: {
      labelAutoHide: false,
    },
  },
  tooltip: {
    title: 'site',
  },
});

chart.render();
