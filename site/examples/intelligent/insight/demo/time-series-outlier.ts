/**
 * AVA: https://github.com/antvis/AVA
 * g2-extension-ava: https://github.com/antvis/g2-extensions/tree/master/ava
 */
import { Chart } from '@antv/g2';
import { TimeSeriesOutlier } from '@antv/g2-extension-ava';

const data = [
  {
    date: '2001',
    discount_price: 727.12,
  },
  {
    date: '2002',
    discount_price: 729.59,
  },
  {
    date: '2003',
    discount_price: 730.21,
  },
  {
    date: '2004',
    discount_price: 732.11,
  },
  {
    date: '2005',
    discount_price: 733.22,
  },
  {
    date: '2006',
    discount_price: 741.19,
  },
  {
    date: '2007',
    discount_price: 742.37,
  },
  {
    date: '2008',
    discount_price: 752.34,
  },
  {
    date: '2009',
    discount_price: 761.12,
  },
  {
    date: '2010',
    discount_price: 783.99,
  },
  {
    date: '2011',
    discount_price: 791.23,
  },
  {
    date: '2012',
    discount_price: 781.99,
  },
  {
    date: '2013',
    discount_price: 835.71,
  },
  {
    date: '2014',
    discount_price: 839.24,
  },
  {
    date: '2015',
    discount_price: 883.51,
  },
  {
    date: '2016',
    discount_price: 873.98,
  },
  {
    date: '2017',
    discount_price: 802.78,
  },
  {
    date: '2018',
    discount_price: 807.05,
  },
  {
    date: '2019',
    discount_price: 885.12,
  },
  {
    date: '2020',
    discount_price: 1018.85,
  },
  {
    date: '2021',
    discount_price: 934.49,
  },
  {
    date: '2022',
    discount_price: 908.74,
  },
  {
    date: '2023',
    discount_price: 930.55,
  },
  {
    date: '2024',
    discount_price: 978.53,
  },
  {
    date: '2025',
    discount_price: 931.47,
  },
  {
    date: '2026',
    discount_price: 891,
  },
  {
    date: '2027',
    discount_price: 836.41,
  },
  {
    date: '2028',
    discount_price: 826.11,
  },
  {
    date: '2029',
    discount_price: 820.11,
  },
  {
    date: '2030',
    discount_price: 811.11,
  },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data(data).encode('x', 'date').encode('y', 'discount_price');

chart.line();

chart.mark(TimeSeriesOutlier);

chart.render();
