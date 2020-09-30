import { Chart } from '@antv/g2';

const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];

// step1: 创建 Chart 图表对象，指定图表所在的容器 ID、指定图表的宽高、边距等信息
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

// step2: 载入图表数据源
chart.data(data);
chart.scale('sales', {
  nice: true,
});

chart.tooltip({
  showMarkers: false,
});

chart.interaction('active-region');

// step3: 使用图形语法进行图表的绘制
chart.interval().position('year*sales');

// step4: 渲染图表
chart.render();
