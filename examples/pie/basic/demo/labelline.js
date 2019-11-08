const data = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 }
];
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500
});
chart.source(data, {
  percent: {
    formatter: val => {
      val = (val * 100) + '%';
      return val;
    }
  }
});
chart.coord('theta', {
  radius: 0.75
});
chart.tooltip({
  showTitle: false,
  itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
});
chart.intervalStack()
  .position('percent')
  .color('item')
  .label('percent', {
    formatter: (val, item) => {
      return item.point.item + ': ' + val;
    }
  })
  .tooltip('item*percent', (item, percent) => {
    percent = percent * 100 + '%';
    return {
      name: item,
      value: percent
    };
  })
  .style({
    lineWidth: 1,
    stroke: '#fff'
  });
chart.render();
