const data = [
  { label: 'Mon.', type: 'series1', value: 2800 },
  { label: 'Mon.', type: 'series2', value: 2260 },
  { label: 'Tues.', type: 'series1', value: 1800 },
  { label: 'Tues.', type: 'series2', value: 1300 },
  { label: 'Wed.', type: 'series1', value: 950 },
  { label: 'Wed.', type: 'series2', value: 900 },
  { label: 'Thur.', type: 'series1', value: 500 },
  { label: 'Thur.', type: 'series2', value: 390 },
  { label: 'Fri.', type: 'series1', value: 170 },
  { label: 'Fri.', type: 'series2', value: 100 }
];
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500
});
chart.source(data);
chart.axis('value', {
  position: 'right'
});
chart.axis('label', {
  label: {
    offset: 12
  }
});
chart.coord().transpose().scale(1, -1);
chart.interval().position('label*value').color('type')
  .adjust([{
    type: 'dodge',
    marginRatio: 1 / 32
  }]);
chart.render();
