const data = [
  { month: 'Jan', value: 51 },
  { month: 'Feb', value: 91 },
  { month: 'Mar', value: 34 },
  { month: 'Apr', value: 47 },
  { month: 'May', value: 63 },
  { month: 'June', value: 58 },
  { month: 'July', value: 56 },
  { month: 'Aug', value: 77 },
  { month: 'Sep', value: 99 },
  { month: 'Oct', value: 106 },
  { month: 'Nov', value: 88 },
  { month: 'Dec', value: 56 }
];
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500
});
chart.source(data, {
  month: {
    range: [ 0, 1 ]
  }
});
chart.line().position('month*value').shape('hv');
chart.render();
