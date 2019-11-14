const data = [
  { month: 'Jan', key: 'series1', value: 125 },
  { month: 'Jan', key: 'series2', value: 51 },
  { month: 'Feb', key: 'series1', value: 132 },
  { month: 'Feb', key: 'series2', value: 91 },
  { month: 'Mar', key: 'series1', value: 141 },
  { month: 'Mar', key: 'series2', value: 34 },
  { month: 'Apr', key: 'series1', value: 158 },
  { month: 'Apr', key: 'series2', value: 47 },
  { month: 'May', key: 'series1', value: 133 },
  { month: 'May', key: 'series2', value: 63 },
  { month: 'June', key: 'series1', value: 143 },
  { month: 'June', key: 'series2', value: 58 },
  { month: 'July', key: 'series1', value: 176 },
  { month: 'July', key: 'series2', value: 56 },
  { month: 'Aug', key: 'series1', value: 194 },
  { month: 'Aug', key: 'series2', value: 77 },
  { month: 'Sep', key: 'series1', value: 115 },
  { month: 'Sep', key: 'series2', value: 99 },
  { month: 'Oct', key: 'series1', value: 134 },
  { month: 'Oct', key: 'series2', value: 106 },
  { month: 'Nov', key: 'series1', value: 110 },
  { month: 'Nov', key: 'series2', value: 88 },
  { month: 'Dec', key: 'series1', value: 91 },
  { month: 'Dec', key: 'series2', value: 56 }];

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
chart
  .line()
  .position('month*value')
  .shape('hv')
  .color('key');
chart.render();
