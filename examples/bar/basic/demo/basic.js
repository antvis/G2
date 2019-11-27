import { Chart } from '@antv/g2';

// 注意由于分类轴的顺序是从下往上的，所以数组的数值顺序要从小到大
const data = [
  { country: '巴西', population: 18203 },
  { country: '印尼', population: 23489 },
  { country: '美国', population: 29034 },
  { country: '印度', population: 104970 },
  { country: '中国', population: 131744 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart.data(data);

chart.axis('country', {
  label: {
    offset: 12,
  },
});

chart.coordinate().transpose();
chart.interval().position('country*population');

chart.render();
