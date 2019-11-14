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
  height: 500,
  animate: false
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
  radius: 0.75,
  innerRadius: 0.6
});
chart.tooltip({
  showTitle: false,
  itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
});
// 辅助文本
chart.guide().html({
  position: [ '50%', '50%' ],
  html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">主机<br><span style="color:#8c8c8c;font-size:20px">200</span>台</div>',
  alignX: 'middle',
  alignY: 'middle'
});
const interval = chart.intervalStack()
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
interval.setSelected(data[0]);
