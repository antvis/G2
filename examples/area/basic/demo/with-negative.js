const { DataView } = DataSet;
const data = [
  { year: '1996', north: 322, south: 162 },
  { year: '1997', north: 324, south: 90 },
  { year: '1998', north: 329, south: 50 },
  { year: '1999', north: 342, south: 77 },
  { year: '2000', north: 348, south: 35 },
  { year: '2001', north: 334, south: -45 },
  { year: '2002', north: 325, south: -88 },
  { year: '2003', north: 316, south: -120 },
  { year: '2004', north: 318, south: -156 },
  { year: '2005', north: 330, south: -123 },
  { year: '2006', north: 355, south: -88 },
  { year: '2007', north: 366, south: -66 },
  { year: '2008', north: 337, south: -45 },
  { year: '2009', north: 352, south: -29 },
  { year: '2010', north: 377, south: -45 },
  { year: '2011', north: 383, south: -88 },
  { year: '2012', north: 344, south: -132 },
  { year: '2013', north: 366, south: -146 },
  { year: '2014', north: 389, south: -169 },
  { year: '2015', north: 334, south: -184 }
];
// 数据需要加工成 {year: '1996', type: 'north', value: 50} 的模式
const dv = new DataView().source(data);
dv.transform({
  type: 'fold',
  fields: [ 'north', 'south' ], // 展开字段集
  key: 'type',                  // key字段
  value: 'value'               // value字段
});

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500
});
chart.source(dv, {
  year: {
    range: [ 0, 1 ]
  }
});
chart.tooltip({
  crosshairs: {
    type: 'line'
  }
});
chart.area().position('year*value').color('type');
chart.line().position('year*value').color('type')
  .size(2);
chart.render();
