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
  padding: 50,
});

chart
  .data(data)
  .coordinate({ type: 'radial', innerRadius: 0.2, endAngle: Math.PI });

chart
  .interval()
  .encode('x', 'term')
  .encode('y', 'count')
  .encode('size', 5)
  .axis({
    y: false,
    x: {
      title: false,
    },
  });

chart
  .point()
  .encode('x', 'term')
  .encode('y', 'count')
  .encode('shape', 'point')
  .encode('size', 4)
  .tooltip({
    title: (item) => item.term,
    items: [
      (item) => ({
        name: 'count',
        value: item.count,
      }),
    ],
  });

chart
  .text()
  .style('text', 'Music')
  .style('x', '50%')
  .style('y', '50%')
  .style('textAlign', 'center')
  .style('fontSize', 24);

chart.render();
