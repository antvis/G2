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

chart.options({
  type: 'view',
  data: data,
  coordinate: { type: 'radial', innerRadius: 0.2, endAngle: Math.PI },
  children: [
    {
      type: 'interval',
      encode: {
        x: 'term',
        y: 'count',
        size: 5,
      },
      axis: {
        y: false,
        x: {
          title: false,
        },
      },
    },
    {
      type: 'point',
      encode: {
        x: 'term',
        y: 'count',
        shape: 'point',
        size: 4,
      },
      tooltip: {
        title: (item) => item.term,
        items: [
          (item) => ({
            name: 'count',
            value: item.count,
          }),
        ],
      },
    },
    {
      type: 'text',
      style: {
        text: 'Music',
        x: '50%',
        y: '50%',
        textAlign: 'center',
        fontSize: 24,
      },
    },
  ],
});

chart.render();
