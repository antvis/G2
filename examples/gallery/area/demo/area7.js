const data = [
  { Date: '22 February', 订阅数: 50000, 月收入: 125000 },
  { Date: '28 February', 订阅数: 60000, 月收入: 150000 },
  { Date: '3 March', 订阅数: 100000, 月收入: 250000 },
  { Date: '20 March', 订阅数: 200000, 月收入: 500000 },
  { Date: '7 April', 订阅数: 250000, 月收入: 625000 },
  { Date: '13 June', 订阅数: 210000, 月收入: 525000 }
];
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: 'auto'
});
chart.source(data);
const ds = new DataSet();
const dv = ds.createView()
  .source(data)
  .transform({
    type: 'fold',
    fields: [ '订阅数', '月收入' ],
    key: 'type',
    value: 'value',
    retains: [ 'Date' ]
  });
const dv2 = ds.createView().source(data).transform({
  type: 'map',
  callback(row) {
    row.range = [ row['订阅数'], row['月收入'] ];
    return row;
  }
});
chart.scale('Date', {
  range: [ 0, 1 ],
  tickCount: 10,
  type: 'timeCat'
});
chart.axis('Date', {
  label: {
    textStyle: {
      fill: '#aaaaaa'
    }
  }
});
chart.axis('value', {
  label: {
    textStyle: {
      fill: '#aaaaaa'
    },
    formatter: text => {
      return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }
  }
});
chart.tooltip({
  crosshairs: 'y'
});

// view1
const view1 = chart.view();
view1.source(dv2);
view1.axis(false);
view1.area().position('Date*range').color('#8d8d8d')
  .opacity(0.1)
  .tooltip(false);
// view1
const view2 = chart.view();
view2.source(dv);
view2.line().position('Date*value').color('type')
  .opacity(1);
view2.point().position('Date*value').color('type')
  .opacity(1)
  .shape('circle');

chart.render();
