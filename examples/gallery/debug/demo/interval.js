import { Chart } from '@antv/g2';

const data = [
  { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
  { name: 'London', 月份: 'Feb.', 月均降雨量: 8.8 },
];

const chart = new Chart({
  container: 'container',
  autoFit: false,
  height: 300,
  width: 400,
});
chart.data(data);
chart.interval().position('月份*月均降雨量');

chart.render();

setTimeout(() => {
  const newData = [{ name: 'London', 月份: 'Jan.', 月均降雨量: 50 }];
  chart.changeData(newData);
}, 1000);
