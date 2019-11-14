const { DataView } = DataSet;
const data = [
  { item: 'Design', a: 70, b: 30 },
  { item: 'Development', a: 60, b: 70 },
  { item: 'Marketing', a: 50, b: 60 },
  { item: 'Users', a: 40, b: 50 },
  { item: 'Test', a: 60, b: 70 },
  { item: 'Language', a: 70, b: 50 },
  { item: 'Technology', a: 50, b: 40 },
  { item: 'Support', a: 30, b: 40 },
  { item: 'Sales', a: 60, b: 40 },
  { item: 'UX', a: 50, b: 60 }

];
const dv = new DataView().source(data);
dv.transform({
  type: 'fold',
  fields: [ 'a', 'b' ], // 展开字段集
  key: 'user', // key字段
  value: 'score' // value字段
});
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 20, 20, 95, 20 ]
});
chart.source(dv, {
  score: {
    min: 0,
    max: 80
  }
});
chart.coord('polar', {
  radius: 0.8
});
chart.axis('item', {
  line: null,
  tickLine: null,
  grid: {
    lineStyle: {
      lineDash: null
    },
    hideFirstLine: false
  }
});
chart.axis('score', {
  line: null,
  tickLine: null,
  grid: {
    type: 'polygon',
    lineStyle: {
      lineDash: null
    }
  }
});
chart.legend('user', {
  marker: 'circle',
  offset: 30
});
chart.line().position('item*score').color('user')
  .size(2);
chart.point().position('item*score').color('user')
  .shape('circle')
  .size(4)
  .style({
    stroke: '#fff',
    lineWidth: 1,
    fillOpacity: 1
  });
chart.area().position('item*score').color('user');
chart.render();
