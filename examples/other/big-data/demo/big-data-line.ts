import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500
});

const series = ['分类1', '分类2', '分类3', '分类4', '分类5', '分类6', '分类7'];
const data = new Array(500).fill(null).map((_, idx) => {
  return series.map((d) => ({ type: d, y: Number((Math.random() * 100).toFixed(2)), x: `${idx}` }))
}).flat(1);

chart.data(data);
// Use `useDeferredLabel` to defer render label.
chart.line({ useDeferredLabel: true }).position('x*y').color('type').label('y', {
  style: {
    stroke: '#333',
    fontSize: 12,
    strokeOpacity: 0.65,
  },
  layout: [{ type: 'hide-overlap' }]
});

console.time('render');
chart.render();
console.timeEnd('render');
