// 在一行中保存多个城市的数据，需要将数据转换成
// {month: 'Jan', city: 'Tokyo', temperature: 3.9}
const data = [
  { month: 'Jan', Tokyo: 7.0, London: 3.9 },
  { month: 'Feb', Tokyo: 6.9, London: 4.2 },
  { month: 'Mar', Tokyo: 9.5, London: 5.7 },
  { month: 'Apr', Tokyo: 14.5, London: 8.5 },
  { month: 'May', Tokyo: 18.4, London: 11.9 },
  { month: 'Jun', Tokyo: 21.5, London: 15.2 },
  { month: 'Jul', Tokyo: 25.2, London: 17.0 },
  { month: 'Aug', Tokyo: 26.5, London: 16.6 },
  { month: 'Sep', Tokyo: 23.3, London: 14.2 },
  { month: 'Oct', Tokyo: 18.3, London: 10.3 },
  { month: 'Nov', Tokyo: 13.9, London: 6.6 },
  { month: 'Dec', Tokyo: 9.6, London: 4.8 }
];
const ds = new DataSet();
const dv = ds.createView().source(data);
// fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
dv.transform({
  type: 'fold',
  fields: [ 'Tokyo', 'London' ], // 展开字段集
  key: 'city', // key字段
  value: 'temperature' // value字段
});
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500
});
chart.source(dv, {
  month: {
    range: [ 0, 1 ]
  }
});
chart.tooltip({
  crosshairs: {
    type: 'line'
  }
});
chart.axis('temperature', {
  label: {
    formatter: val => {
      return val + '°C';
    }
  }
});
chart
  .line()
  .position('month*temperature')
  .color('city')
  .shape('smooth');
chart
  .point()
  .position('month*temperature')
  .color('city')
  .size(4)
  .shape('circle')
  .style({
    stroke: '#fff',
    lineWidth: 1
  });
chart.render();
