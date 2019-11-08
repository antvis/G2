const data = [
  { month: '1', value: 1078 },
  { month: '2', value: 1216 },
  { month: '3', value: 758 },
  { month: '4', value: 623 },
  { month: '5', value: 319 },
  { month: '6', value: 422 },
  { month: '7', value: -4 },
  { month: '8', value: -217 },
  { month: '9', value: -358 },
  { month: '10', value: 1513 },
  { month: '11', value: 1388 },
  { month: '12', value: 597 }
];

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: 'auto'
});
chart.source(data, {
  value: {
    max: 2000,
    min: -1000
  }
});
chart.scale('month', {
  type: 'cat'
});
chart.axis('month', {
  label: {
    textStyle: {
      fill: '#aaaaaa'
    },
    formatter: text => {
      return text + '月';
    }
  }
});

chart.axis('value', {
  label: {
    textStyle: {
      fill: '#aaaaaa'
    }
  }
});

chart.area().position('month*value').color('white')
  .opacity(0.3);
chart.line().position('month*value').color('white')
  .size(2);
// 分段颜色
chart.guide().regionFilter({
  top: true,
  start: [ 'min', 'max' ],
  end: [ 'max', 0 ],
  color: '#f5222d'
});

chart.guide().regionFilter({
  top: true,
  start: [ 'min', 0 ],
  end: [ 'max', 'min' ],
  color: '#2fc25b'
});
// 数据标注
chart.guide().dataMarker({
  position: [ '2', 1216 ],
  content: '2月份因逢春节水产销售需求旺盛，\n需求大增',
  lineLength: 20,
  autoAdjust: false,
  style: {
    text: {
      textAlign: 'left',
      stroke: '#fff',
      lineWidth: 2
    },
    point: {
      stroke: '#f5222d'
    }
  }
});

chart.guide().dataMarker({
  position: [ '10', 1513 ],
  content: '开渔后产品销售双增，利润达到\n全年新高',
  lineLength: 20,
  autoAdjust: false,
  style: {
    text: {
      textAlign: 'right',
      stroke: '#fff',
      lineWidth: 2
    },
    point: {
      stroke: '#f5222d'
    }
  },
  direction: 'downward'
});

chart.guide().dataMarker({
  position: [ '9', -358 ],
  content: '因休渔期无新进货源，成本摊销\n下来有亏损',
  lineLength: 20,
  autoAdjust: false,
  style: {
    text: {
      textAlign: 'right',
      stroke: '#fff',
      lineWidth: 2
    },
    point: {
      stroke: '#2fc25b'
    }
  },
  direction: 'downward'
});
// 辅助区间
chart.guide().region({
  start: [ '7', 'min' ],
  end: [ '9', 'max' ]
});

chart.render();
