import { Chart } from '@antv/g2';

const data = [
  { consumption: 0.65, price: 1, year: 1965 },
  { consumption: 0.66, price: 1.05, year: 1966 },
  { consumption: 0.64, price: 1.1, year: 1967 },
  { consumption: 0.63, price: 1.12, year: 1968 },
  { consumption: 0.55, price: 1.15, year: 1969 },
  { consumption: 0.57, price: 1.19, year: 1970 },
  { consumption: 0.58, price: 1.14, year: 1971 },
  { consumption: 0.59, price: 1, year: 1972 },
  { consumption: 0.57, price: 0.96, year: 1973 },
  { consumption: 0.55, price: 0.92, year: 1974 },
  { consumption: 0.54, price: 0.88, year: 1975 },
  { consumption: 0.55, price: 0.87, year: 1976 },
  { consumption: 0.42, price: 0.89, year: 1977 },
  { consumption: 0.28, price: 1, year: 1978 },
  { consumption: 0.15, price: 1.1, year: 1979 },
];
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 450
});
chart.data(data);
chart.scale({
  price: { nice: true },
  consumption: { nice: true },
});
chart
  .path()
  .animate({
    appear: {
      animation: 'path-in',
      duration: 1000,
      easing: 'easeLinear',
    }
  })
  .position('price*consumption')
  .label('year', (val) => {
    return {
      content: `${val} 年`,
      animate: {
        appear: {
          delay: 1000
        }
      }
    };
  });
chart
  .point()
  .animate({
    appear: {
      appear: 'fade-in',
      duration: 200,
      delay: (obj) => {
        const index = data.findIndex(item => item.year === obj.year);
        return index * (1000 / data.length);
      },
      easing: 'easeLinear',
    }
  })
  .position('price*consumption')
  .shape('square');
chart.render();
