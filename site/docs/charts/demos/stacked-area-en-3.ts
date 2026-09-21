import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', theme: 'classic' });

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { year: '2001', genre: 'Strategy', sold: 11500 },
    { year: '2001', genre: 'Sports', sold: 27500 },
    { year: '2001', genre: 'Action', sold: 6000 },
    { year: '2001', genre: 'Shooter', sold: 3500 },
    { year: '2001', genre: 'Other', sold: 1500 },

    { year: '2002', genre: 'Strategy', sold: 10500 },
    { year: '2002', genre: 'Sports', sold: 29500 },
    { year: '2002', genre: 'Action', sold: 8000 },
    { year: '2002', genre: 'Shooter', sold: 4500 },
    { year: '2002', genre: 'Other', sold: 1800 },

    { year: '2003', genre: 'Strategy', sold: 12500 },
    { year: '2003', genre: 'Sports', sold: 30500 },
    { year: '2003', genre: 'Action', sold: 4000 },
    { year: '2003', genre: 'Shooter', sold: 6500 },
    { year: '2003', genre: 'Other', sold: 2000 },

    { year: '2004', genre: 'Strategy', sold: 14500 },
    { year: '2004', genre: 'Sports', sold: 31500 },
    { year: '2004', genre: 'Action', sold: 5000 },
    { year: '2004', genre: 'Shooter', sold: 6800 },
    { year: '2004', genre: 'Other', sold: 1800 },
  ],
  encode: { x: 'year', y: 'sold', color: 'genre' },
  axis: { x: { title: false }, y: { title: false } },
  transform: [
    {
      type: 'stackY',
    },
  ],
});

chart.render();
