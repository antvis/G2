/**
 * AVA: https://github.com/antvis/AVA
 * g2-extension-ava: https://github.com/antvis/g2-extensions/tree/master/ava
 */
import { Chart } from '@antv/g2';
import { Auto } from '@antv/g2-extension-ava';

const chart = new Chart({
  container: 'container',
});

chart.mark(Auto).data([
  { year: '2007', sales: 28 },
  { year: '2008', sales: 55 },
  { year: '2009', sales: 43 },
  { year: '2010', sales: 91 },
  { year: '2011', sales: 81 },
  { year: '2012', sales: 53 },
  { year: '2013', sales: 19 },
  { year: '2014', sales: 87 },
  { year: '2015', sales: 52 },
]);

chart.render();
