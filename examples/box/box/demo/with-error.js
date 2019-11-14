const data = [
  { x: '职业 A', low: 20000, q1: 26000, median: 27000, q3: 32000, high: 38000, outliers: [ 50000, 52000 ] },
  { x: '职业 B', low: 40000, q1: 49000, median: 62000, q3: 73000, high: 88000, outliers: [ 32000, 29000, 106000 ] },
  { x: '职业 C', low: 52000, q1: 59000, median: 65000, q3: 74000, high: 83000, outliers: [ 91000 ] },
  { x: '职业 D', low: 58000, q1: 96000, median: 130000, q3: 170000, high: 200000, outliers: [ 42000, 210000, 215000 ] },
  { x: '职业 E', low: 24000, q1: 28000, median: 32000, q3: 38000, high: 42000, outliers: [ 48000 ] },
  { x: '职业 F', low: 47000, q1: 56000, median: 69000, q3: 85000, high: 100000, outliers: [ 110000, 115000, 32000 ] },
  { x: '职业 G', low: 64000, q1: 74000, median: 83000, q3: 93000, high: 100000, outliers: [ 110000 ] },
  { x: '职业 H', low: 67000, q1: 72000, median: 84000, q3: 95000, high: 110000, outliers: [ 57000, 54000 ] }
];

const { DataView } = DataSet;
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
  // padding: [ 20, 120, 95 ]
});
chart.source(dv, {
  range: {
    min: 0,
    max: 240000
  },
  outliers: {
    min: 0,
    max: 240000
  }
});
chart.tooltip({
  showTitle: false,
  crosshairs: {
    type: 'rect'
  },
  itemTpl: '<li data-index={index} style="margin-bottom:4px;">'
    + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
    + '{name}<br/>'
    + '<span style="padding-left: 16px">最大值：{high}</span><br/>'
    + '<span style="padding-left: 16px">上四分位数：{q3}</span><br/>'
    + '<span style="padding-left: 16px">中位数：{median}</span><br/>'
    + '<span style="padding-left: 16px">下四分位数：{q1}</span><br/>'
    + '<span style="padding-left: 16px">最小值：{low}</span><br/>'
    + '</li>'
});
chart.schema().position('x*range')
  .shape('box')
  .tooltip('x*low*q1*median*q3*high', (x, low, q1, median, q3, high) => {
    return {
      name: x,
      low,
      q1,
      median,
      q3,
      high
    };
  })
  .style({
    stroke: '#545454',
    fill: '#1890FF',
    fillOpacity: 0.3
  });

const errorPointView = chart.view();
errorPointView.source(data);
errorPointView.axis(false);
errorPointView.tooltip(false);
errorPointView.point().position('x*outliers')
  .shape('circle')
  .size(3)
  .active(false);
chart.render();
