import { Chart } from '@antv/g2';

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

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});
chart.data(data);
chart.scale({
  value: {
    max: 2000,
    min: -1000
  },
  month: {
    formatter: val => `${val} 月`
  }
});


chart.area().position('month*value').color('white').style({
  fillOpacity: 0.3,
});
chart.line().position('month*value').color('white');
// 分段颜色
chart.annotation().regionFilter({
  top: true,
  start: ['min', 'max'],
  end: ['max', 0],
  color: '#f5222d'
});

chart.annotation().regionFilter({
  top: true,
  start: ['min', 0],
  end: ['max', 'min'],
  color: '#2fc25b'
});
// 数据标注
chart.annotation().dataMarker({
  position: ['2', 1216],
  text: {
    content: '2月份因逢春节水产销售需求旺盛，\n需求大增',
    style: {
      textAlign: 'left',
    },
  },
  line: {
    length: 20,
  },
  point: {
    style: {
      fill: '#f5222d',
      stroke: '#f5222d',
    },
  },
  autoAdjust: false,
});

chart.annotation().dataMarker({
  position: ['10', 1513],
  text: {
    content: '开渔后产品销售双增，利润达到\n全年新高',
    style: {
      textAlign: 'right',
    },
  },
  line: {
    length: 20,
  },
  point: {
    style: {
      fill: '#f5222d',
      stroke: '#f5222d',
    }
  },
  autoAdjust: false,
  direction: 'downward'
});

chart.annotation().dataMarker({
  position: ['9', -358],
  text: {
    content: '因休渔期无新进货源，成本摊销\n下来有亏损',
    style: {
      textAlign: 'right',
      lineWidth: 2
    },
  },
  line: {
    length: 20,
  },
  point: {
    style: {
      fill: '#2fc25b',
      stroke: '#2fc25b',
    },
  },
  autoAdjust: false,
  direction: 'downward'
});
// 辅助区间
chart.annotation().region({
  start: ['7', 'min'],
  end: ['9', 'max']
});

chart.render();
