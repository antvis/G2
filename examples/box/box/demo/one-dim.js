const { DataView } = DataSet;
const data = [
  { low: 1, q1: 9, median: 16, q3: 22, high: 24 }

];
const dv = new DataView().source(data);
dv.transform({
  type: 'map',
  callback: obj => {
    obj.range = [ obj.low, obj.q1, obj.median, obj.q3, obj.high ];
    return obj;
  }
});
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500
});
chart.source(dv, {
  range: {
    max: 35
  }
});
chart.tooltip({
  crosshair: false
});
chart.schema().position('range*1')
  .shape('box')
  .tooltip('x*low*q1*median*q3*high')
  .style({
    stroke: '#545454',
    fill: '#1890FF',
    fillOpacity: 0.3
  });
chart.render();
