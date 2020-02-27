import { Chart } from '@antv/g2';

const data = [
  { type: '收纳', value: 340, cat: '办公用品' },
  { type: '笔', value: 20760, cat: '办公用品' },
  { type: '纸张', value: 28750, cat: '办公用品' },
  { type: '配件', value: 4090, cat: '技术' },
  { type: '电话', value: 9880, cat: '技术' },
  { type: '复印机', value: 40988, cat: '技术' },
  { type: '桌子', value: 14870, cat: '家具' },
  { type: '椅子', value: 37098, cat: '家具' },
  { type: '书架', value: 49099, cat: '家具' },
];
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding: [20, 0, 50, 100],
});
chart.data(data);
chart.scale({
  value: {
    max: 55000,
    min: 0,
    alias: '金额（元）',
  },
});
chart.axis('type', {
  tickLine: null,
  line: null,
});
chart.axis('value', {
  label: null,
  title: {
    offset: 30,
    style: {
      fontWeight: 300,
    },
  },
  grid: null,
});
chart.legend(false);
chart.coordinate('rect').transpose();
chart
  .interval()
  .position('type*value')
  .color('cat', ['#face1d', '#37c461', '#2194ff'])
  .size(26)
  .label('value', {
    style: {
      fill: '#8d8d8d',
    },
    offset: 10,
    content: (originData) => {
      return (originData.value + '').replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
  });

chart.annotation().text({
  top: true,
  position: ['椅子', 'min'],
  content: '家具',
  style: {
    fill: '#c0c0c0',
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
  },
  offsetX: -70,
  rotate: Math.PI * -0.5
});
chart.annotation().text({
  top: true,
  position: ['电话', 'min'],
  content: '技术',
  style: {
    fill: '#c0c0c0',
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
  },
  offsetX: -70,
  rotate: Math.PI * -0.5
});
chart.annotation().text({
  top: true,
  position: ['笔', 'min'],
  content: '办公用品',
  style: {
    fill: '#c0c0c0',
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
  },
  offsetX: -70,
  rotate: Math.PI * -0.5
});
chart.annotation().line({
  start: ['-20%', '33.2%'],
  end: ['100%', '33.2%'],
  style: {
    stroke: '#c0c0c0',
    lineDash: [2, 2],
  },
});
chart.annotation().line({
  start: ['-20%', '66.8%'],
  end: ['100%', '66.8%'],
  style: {
    stroke: '#c0c0c0',
    lineDash: [2, 2],
  },
});
chart.interaction('element-active');

chart.render();
