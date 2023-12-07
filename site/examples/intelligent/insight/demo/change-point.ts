/**
 * AVA: https://github.com/antvis/AVA
 * g2-extension-ava: https://github.com/antvis/g2-extensions/tree/master/ava
 */
import { Chart } from '@antv/g2';
import { ChangePoint } from '@antv/g2-extension-ava';

const data = [
  {
    date: '2000',
    discount_price: 43.37,
  },
  {
    date: '2001',
    discount_price: 29.34,
  },
  {
    date: '2002',
    discount_price: 49.12,
  },
  {
    date: '2003',
    discount_price: 56.99,
  },
  {
    date: '2004',
    discount_price: 61.23,
  },
  {
    date: '2005',
    discount_price: 781.99,
  },
  {
    date: '2006',
    discount_price: 895.71,
  },
  {
    date: '2007',
    discount_price: 789.24,
  },
  {
    date: '2008',
    discount_price: 793.51,
  },
  {
    date: '2009',
    discount_price: 783.98,
  },
  {
    date: '2010',
    discount_price: 782.78,
  },
  {
    date: '2011',
    discount_price: 797.05,
  },
  {
    date: '2012',
    discount_price: 785.12,
  },
  {
    date: '2013',
    discount_price: 798.85,
  },
  {
    date: '2014',
    discount_price: 734.49,
  },
  {
    date: '2015',
    discount_price: 708.74,
  },
  {
    date: '2016',
    discount_price: 730.55,
  },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data(data).encode('x', 'date').encode('y', 'discount_price');

chart.line();

chart.mark(ChangePoint);

chart.render();
