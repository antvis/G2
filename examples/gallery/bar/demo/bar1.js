const data = [
  { type: '汽车', value: 34 },
  { type: '建材家居', value: 85 },
  { type: '住宿旅游', value: 103 },
  { type: '交通运输与仓储邮政', value: 142 },
  { type: '建筑房地产', value: 251 },
  { type: '教育', value: 367 },
  { type: 'IT 通讯电子', value: 491 },
  { type: '社会公共管理', value: 672 },
  { type: '医疗卫生', value: 868 },
  { type: '金融保险', value: 1234 }
];
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 20, 40, 50, 124 ]
});
chart.source(data, {
  value: {
    max: 1300,
    min: 0,
    nice: false,
    alias: '销量（百万）'
  }
});
chart.axis('type', {
  label: {
    textStyle: {
      fill: '#8d8d8d',
      fontSize: 12
    }
  },
  tickLine: {
    alignWithLabel: false,
    length: 0
  },
  line: {
    lineWidth: 0
  }
});
chart.axis('value', {
  label: null,
  title: {
    offset: 30,
    textStyle: {
      fontSize: 12,
      fontWeight: 300
    }
  }
});
chart.legend(false);
chart.coord().transpose();
chart.interval().position('type*value').size(26)
  .opacity(1)
  .label('value', {
    textStyle: {
      fill: '#8d8d8d'
    },
    offset: 10
  });
chart.render();
