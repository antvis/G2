import { Chart } from '@antv/g2';

const data = [
  { year: '1951', sales: 38 },
  { year: '1952', sales: 52 },
  { year: '1956', sales: 61 },
  { year: '1957', sales: 145 },
  { year: '1958', sales: 48 },
  { year: '1959', sales: 38 },
  { year: '1960', sales: 38 },
  { year: '1962', sales: 38 },
];
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart.data(data);

chart.interval().position('year*sales');

chart.render();
