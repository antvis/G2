import { Chart } from '@antv/g2';

const data = [
  { city: '中国（北京）', type: '首都人口', value: 0.01 },
  { city: '中国（北京）', type: '城市人口', value: 0.53 },
  { city: '中国（北京）', type: '农村人口', value: 0.46 },
  { city: '美国（华盛顿）', type: '首都人口', value: 0.01 },
  { city: '美国（华盛顿）', type: '城市人口', value: 0.8 },
  { city: '美国（华盛顿）', type: '农村人口', value: 0.19 },
  { city: '印度（德里）', type: '首都人口', value: 0.02 },
  { city: '印度（德里）', type: '城市人口', value: 0.3 },
  { city: '印度（德里）', type: '农村人口', value: 0.68 },
  { city: '俄罗斯（莫斯科）', type: '首都人口', value: 0.08 },
  { city: '俄罗斯（莫斯科）', type: '城市人口', value: 0.66 },
  { city: '俄罗斯（莫斯科）', type: '农村人口', value: 0.26 },
  { city: '法国（巴黎）', type: '首都人口', value: 0.16 },
  { city: '法国（巴黎）', type: '城市人口', value: 0.63 },
  { city: '法国（巴黎）', type: '农村人口', value: 0.21 },
  { city: '韩国（首尔）', type: '首都人口', value: 0.19 },
  { city: '韩国（首尔）', type: '城市人口', value: 0.63 },
  { city: '韩国（首尔）', type: '农村人口', value: 0.18 },
  { city: '丹麦（哥本哈根）', type: '首都人口', value: 0.22 },
  { city: '丹麦（哥本哈根）', type: '城市人口', value: 0.65 },
  { city: '丹麦（哥本哈根）', type: '农村人口', value: 0.13 },
  { city: '冰岛（雷克雅未克）', type: '首都人口', value: 0.56 },
  { city: '冰岛（雷克雅未克）', type: '城市人口', value: 0.38 },
  { city: '冰岛（雷克雅未克）', type: '农村人口', value: 0.06 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});
chart.data(data);
chart.scale('value', {

  alias: '占比（%）',
});
chart.axis('city', {
  tickLine: null,
  line: null,
});
chart.axis('value', {
  label: null,
  title: {
    style: {
      fontSize: 14,
      fontWeight: 300,
    },
  },
  grid: null,
});
chart.legend({
  position: 'top',
});
chart.coordinate('rect').transpose();
chart.tooltip({
  shared: true,
  showMarkers: false,
});
chart.interaction('active-region');
chart
  .interval()
  .adjust('stack')
  .position('city*value')
  .color('type*city', (type, city) => {
    if (type === '首都人口') {
      return '#1890ff';
    }
    if (type === '城市人口') {
      return '#ced4d9';
    }
    if (type === '农村人口') {
      return '#f0f2f3';
    }
    if (type === '首都人口' && city === '中国（北京）') {
      return '#f5222d';
    }
  })
  .size(26)
  .label('value*type', (val, t) => {
    const color = t === '首都人口' ? 'white' : '#47494b';
    if (val < 0.05) {
      return null;
    }
    return {
      position: 'middle',
      offset: 0,
      style: {
        fontSize: 12,
        fill: color,
        lineWidth: 0,
        stroke: null,
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)',
      },
    };
  });
chart.render();
