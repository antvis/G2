const data = [
  { time: '03-19', type: '101-1000', value: 32000 },
  { time: '03-19', type: '31-100', value: 30000 },
  { time: '03-19', type: '11-30', value: 27000 },
  { time: '03-19', type: '1-10', value: 24000 },

  { time: '03-20', type: '101-1000', value: 35000 },
  { time: '03-20', type: '31-100', value: 32000 },
  { time: '03-20', type: '11-30', value: 30000 },
  { time: '03-20', type: '1-10', value: 27000 },

  { time: '03-21', type: '101-1000', value: 39000 },
  { time: '03-21', type: '31-100', value: 37000 },
  { time: '03-21', type: '11-30', value: 34000 },
  { time: '03-21', type: '1-10', value: 30000 },

  { time: '03-22', type: '101-1000', value: 44000 },
  { time: '03-22', type: '31-100', value: 42000 },
  { time: '03-22', type: '11-30', value: 38000 },
  { time: '03-22', type: '1-10', value: 34000 },

  { time: '03-23', type: '101-1000', value: 47000 },
  { time: '03-23', type: '31-100', value: 44000 },
  { time: '03-23', type: '11-30', value: 40000 },
  { time: '03-23', type: '1-10', value: 36000 },

  { time: '03-24', type: '101-1000', value: 48000 },
  { time: '03-24', type: '31-100', value: 46000 },
  { time: '03-24', type: '11-30', value: 42000 },
  { time: '03-24', type: '1-10', value: 38000 },

  { time: '03-25', type: '101-1000', value: 50000 },
  { time: '03-25', type: '31-100', value: 48000 },
  { time: '03-25', type: '11-30', value: 44000 },
  { time: '03-25', type: '1-10', value: 38000 }
];

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 20, 70, 50, 50 ]
});
chart.source(data);
chart.scale('value', {
  alias: '金额(元)'
});
chart.axis('time', {
  label: {
    textStyle: {
      fill: '#aaaaaa'
    }
  },
  tickLine: {
    alignWithLabel: false,
    length: 0
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
  },
  title: {
    offset: 80
  }
});
chart.legend({
  position: 'right-center'
});
chart.interval()
  .position('time*value')
  .color('type', [ '#40a9ff', '#1890ff', '#096dd9', '#0050b3' ])
  .opacity(1);
chart.render();
