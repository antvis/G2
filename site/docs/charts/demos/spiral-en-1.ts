import { Chart } from '@antv/g2';

// 需要精确对比的数据示例
const data = [];
const categories = ['产品A', '产品B', '产品C', '产品D'];
categories.forEach((category, index) => {
  for (let month = 1; month <= 12; month++) {
    data.push({
      time: `2023-${month.toString().padStart(2, '0')}`,
      category: category,
      sales: 80 + index * 5 + Math.random() * 10, // 接近的数值，需要精确比较
    });
  }
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 400,
  padding: [50, 50, 50, 50],
});

chart.options({
  type: 'interval',
  data,
  coordinate: {
    type: 'helix',
    startAngle: 1 * Math.PI,
    endAngle: 5 * Math.PI,
  },
  encode: {
    x: 'time',
    y: 'sales',
    color: 'category',
  },
  scale: {
    color: {
      palette: ['#1890ff', '#52c41a', '#fa8c16', '#f5222d'],
    },
    time: {
      type: 'time',
      mask: 'yyyy.mm',
    },
  },
  style: {
    fillOpacity: 0.8,
  },
});

chart.render();
