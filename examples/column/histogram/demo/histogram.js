const values = [ 1.2, 3.4, 3.7, 4.3, 5.2, 5.8, 6.1, 6.5, 6.8, 7.1, 7.3, 7.7, 8.3, 8.6, 8.8, 9.1, 9.2, 9.4, 9.5, 9.7, 10.5, 10.7, 10.8, 11.0, 11.0, 11.1, 11.2, 11.3, 11.4, 11.4, 11.7, 12.0, 12.9, 12.9, 13.3, 13.7, 13.8, 13.9, 14.0, 14.2, 14.5, 15, 15.2, 15.6, 16.0, 16.3, 17.3, 17.5, 17.9, 18.0, 18.0, 20.6, 21, 23.4 ];
const data = [];
for (let i = 0; i < values.length; i++) {
  const obj = {};
  obj.value = values[i];
  data.push(obj);
}
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'bin.histogram',
  field: 'value',
  binWidth: 2,
  as: [ 'value', 'count' ]
});
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500
});
chart.source(dv, {
  value: {
    nice: false,
    min: 0,
    tickInterval: 1
  },
  count: {
    max: 14
  }
});
chart.tooltip({
  crosshairs: false,
  inPlot: false,
  position: 'top'
});
chart.axis('value', {
  label: {
    formatter: val => {
      if ((val % 2)) {
        return val;
      }
      return '';
    }
  }
});
chart.interval().position('value*count');
chart.render();
