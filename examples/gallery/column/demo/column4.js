const data = [
  { time: '9:00-10:00', value: 30 },
  { time: '10:00-11:00', value: 90 },
  { time: '11:00-12:00', value: 50 },
  { time: '12:00-13:00', value: 30 },
  { time: '13:00-14:00', value: 70 }
];

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 20, 20, 50, 30 ]
});
chart.source(data);
chart.scale('value', {
  alias: '销售额(万)'
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
    }
  }
});

chart.tooltip({
  share: true
});
chart.interval().position('time*value')
  .opacity('time', val => {
    if (val === '13:00-14:00') {
      return 0.4;
    }
    return 1;
  })
  .style('time', {
    lineWidth: val => {
      if (val === '13:00-14:00') {
        return 1;
      }
      return 0;
    },
    stroke: '#636363',
    lineDash: [ 3, 2 ]
  });
chart.render();
