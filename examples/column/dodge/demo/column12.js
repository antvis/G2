const data = [
  { company: 'Apple', type: '整体', value: 30 },
  { company: 'Facebook', type: '整体', value: 35 },
  { company: 'Google', type: '整体', value: 28 },

  { company: 'Apple', type: '非技术岗', value: 40 },
  { company: 'Facebook', type: '非技术岗', value: 65 },
  { company: 'Google', type: '非技术岗', value: 47 },

  { company: 'Apple', type: '技术岗', value: 23 },
  { company: 'Facebook', type: '技术岗', value: 18 },
  { company: 'Google', type: '技术岗', value: 20 },

  { company: 'Apple', type: '技术岗', value: 35 },
  { company: 'Facebook', type: '技术岗', value: 30 },
  { company: 'Google', type: '技术岗', value: 25 }
];

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: 'auto'
});
chart.source(data);
chart.scale('value', {
  alias: '占比（%）',
  max: 75,
  min: 0,
  tickCount: 4
});
chart.axis('type', {
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
  },
  title: {
    offset: 50
  }
});
chart.legend({
  position: 'top-center'
});
chart.interval().position('type*value').color('company')
  .opacity(1)
  .adjust([{
    type: 'dodge',
    marginRatio: 1 / 32
  }]);
chart.render();
