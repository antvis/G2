import { Chart, register, type SymbolFactor } from '@antv/g2';

const customSquare = Object.assign<SymbolFactor, Partial<SymbolFactor>>(
  (x, y, r) => {
    const radius = r / 2;

    return [
      ['M', x + radius, y - r],
      ['L', x - radius, y - r],
      ['A', radius, radius, 0, 0, 0, x - r, y - radius],
      ['L', x - r, y + radius],
      ['A', radius, radius, 0, 0, 0, x - radius, y + r],
      ['L', x + radius, y + r],
      ['A', radius, radius, 0, 0, 0, x + r, y + radius],
      ['L', x + r, y - radius],
      ['A', radius, radius, 0, 0, 0, x + radius, y - r],
      ['Z'],
    ];
  },
  {
    // 空心请设置为 ['stroke', 'lineWidth']
    style: ['fill']
  },
);

register('symbol.customSquare', customSquare);

const chart = new Chart({
  container: 'container',
});

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const colorField = 'genre';

chart
  .interval()
  .data(data)
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', colorField)
  .legend({
    color: {
      itemMarker: 'customSquare',
    },
  });

chart.render();

