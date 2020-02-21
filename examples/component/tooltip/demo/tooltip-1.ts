import { Chart } from '@antv/g2';

// 构造数据
const data = [
  { year: '2001', population: 41.8 },
  { year: '2002', population: 38 },
  { year: '2003', population: 33.7 },
  { year: '2004', population: 30.7 },
  { year: '2005', population: 25.8 },
  { year: '2006', population: 31.7 },
  { year: '2007', population: 33 },
  { year: '2008', population: 46 },
  { year: '2009', population: 38.3 },
  { year: '2010', population: 28 },
  { year: '2011', population: 42.5 },
  { year: '2012', population: 30.3 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding: 50,
});

chart.data(data);
chart.scale('population', {
  nice: true,
});
chart.coordinate('polar', {
  innerRadius: 0.4,
});
chart.axis(false);
chart.legend(false);
chart.tooltip({
  showContent: false,
  showCrosshairs: true,
  crosshairs: {
    line: {
      style: {
        lineDash: [2],
      }
    },
    text: {
      position: 'end',
      offset: 5,
      autoRotate: true,
      style: {
        fontSize: 14,
      }
    },
    textBackground: null
  },
});
chart.interval().position('year*population').color('year').size(100);
chart.render();
