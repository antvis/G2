import { Chart } from '@antv/g2';

const data = [
  { term: 'Zombieland', count: 9 },
  { term: 'Wieners', count: 8 },
  { term: 'Toy Story', count: 8 },
  { term: 'trashkannon', count: 7 },
  { term: 'the GROWLERS', count: 6 },
  { term: 'mudweiser', count: 6 },
  { term: 'ThunderCats', count: 4 },
  { term: 'The Taqwacores - Motion Picture', count: 4 },
  { term: 'The Shawshank Redemption', count: 2 },
  { term: 'The Olivia Experiment', count: 1 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding: 50,
});

chart.data(data);

chart.coordinate('theta', {
  innerRadius: 0.2,
  endAngle: Math.PI,
});

chart.axis('term', {
  tickLine: null,
  grid: null,
  line: null,
});

chart
  .interval()
  .position('term*count')
  .shape('line')
  .style({
    lineAppendWidth: 10,
  }); // 线状柱状图

chart
  .point()
  .position('term*count')
  .shape('circle');

chart.annotation().text({
  position: ['50%', '50%'],
  content: 'Music',
  style: {
    textAlign: 'center',
    fontSize: 24,
  },
});

chart.render();
