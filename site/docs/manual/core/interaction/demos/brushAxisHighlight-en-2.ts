import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  data: [
    { x: 10, y: 5, category: 'A' },
    { x: 15, y: 8, category: 'A' },
    { x: 20, y: 12, category: 'A' },
    { x: 25, y: 15, category: 'A' },
    { x: 30, y: 10, category: 'B' },
    { x: 35, y: 7, category: 'B' },
    { x: 40, y: 13, category: 'B' },
    { x: 45, y: 18, category: 'B' },
    { x: 50, y: 20, category: 'C' },
    { x: 55, y: 16, category: 'C' },
    { x: 60, y: 9, category: 'C' },
    { x: 65, y: 6, category: 'C' },
  ],
  encode: {
    color: 'category',
    x: 'x',
    y: 'y',
  },
  state: {
    inactive: { stroke: 'gray', opacity: 0.5 },
  },
  interaction: {
    brushAxisHighlight: {
      maskHandleSize: 20,
      maskHandleNFill: 'blue',
      maskHandleEFill: 'red',
      maskHandleSFill: 'green',
      maskHandleWFill: 'yellow',
      maskHandleNWFill: 'black',
      maskHandleNEFill: 'steelblue',
      maskHandleSEFill: 'pink',
      maskHandleSWFill: 'orange',
    },
  },
});

chart.render();
