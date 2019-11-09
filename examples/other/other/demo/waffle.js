
const data = [
  { name: 'type 1', value: 102 },
  { name: 'type 2', value: 65 },
  { name: 'type 3', value: 43 },
  { name: 'type 4', value: 12 }
];

const dv = new DataSet.View().source(data)
  .transform({
    type: 'waffle',
    maxCount: 500,
    rows: 12
  });

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 20, 20, 80, 50 ]
});
chart.source(dv);
chart.scale({
  x: { nice: false },
  y: { nice: false }
});
chart.axis(false);
chart.legend('name', {
  position: 'bottom'
});
chart.legend('_hStep', false);
chart.legend('_wStep', false);
chart.point()
  .position('x*y')
  .shape('square')
  .size('_hStep', hStep => Math.min((500 - 100) * 0.4 * hStep, 15))
  .color('name');

chart.render();

