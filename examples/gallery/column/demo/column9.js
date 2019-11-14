const data = [
  { name: '张伟', value: 95 },
  { name: '王秀英', value: 94 },
  { name: '李明', value: 92 },
  { name: '王丽', value: 89 },
  { name: '刘洋', value: 80 },
  { name: '何勇', value: 80 },
  { name: '王强', value: 78 },
  { name: '林杰', value: 76 },
  { name: '李桂英', value: 75 },
  { name: '何秀兰', value: 73 },
  { name: '卢芳', value: 68 },
  { name: '张德', value: 61 }
];
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 20, 20, 50, 30 ]
});
chart.source(data);
chart.scale('value', {
  alias: '体能分'
});
chart.axis('name', {
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
  label: null,
  title: {
    offset: 20
  }
});
chart.legend(false);
chart.guide().region({
  start: [ 'start', 'max' ],
  end: [ 'end', 80 ],
  style: {
    lineWidth: 0,
    fill: '#dcdcdc',
    fillOpacity: 0.3,
    stroke: '#ccc'
  }
});
chart.guide().text({
  top: true,
  position: [ 'end', 'max' ],
  content: '达标区间',
  style: {
    fill: '#aaaaaa',
    textAlign: 'end',
    textBaseline: 'top',
    fontWeight: 300
  },
  offsetX: -10,
  offsetY: 6
});
chart.interval().position('name*value').opacity(1)
  .label('value', {
    offset: 10,
    textStyle: {
      fill: '#595959',
      fontSize: 12
    }
  });
chart.render();
