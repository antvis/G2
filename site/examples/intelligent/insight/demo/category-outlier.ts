import { Runtime, corelib, extend } from '@antv/g2';
import { autolib } from '@antv/g2-extension-ava';

const Chart = extend(Runtime, {
  ...corelib(),
  ...autolib(),
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .data([
    {
      date: '2000',
      fertility: 743.37,
    },
    {
      date: '2001',
      fertility: 729.34,
    },
    {
      date: '2002',
      fertility: 709.12,
    },
    {
      date: '2003',
      fertility: 786.99,
    },
    {
      date: '2004',
      fertility: 711.23,
    },
    {
      date: '2005',
      fertility: 781.99,
    },
    {
      date: '2006',
      fertility: 795.71,
    },
    {
      date: '2007',
      fertility: 789.24,
    },
    {
      date: '2008',
      fertility: 93.51,
    },
    {
      date: '2009',
      fertility: 783.98,
    },
    {
      date: '2010',
      fertility: 702.78,
    },
    {
      date: '2011',
      fertility: 797.05,
    },
    {
      date: '2012',
      fertility: 785.12,
    },
    {
      date: '2013',
      fertility: 798.85,
    },
    {
      date: '2014',
      fertility: 34.49,
    },
    {
      date: '2015',
      fertility: 758.74,
    },
    {
      date: '2016',
      fertility: 730.55,
    },
    {
      date: '2017',
      fertility: 778.53,
    },
    {
      date: '2018',
      fertility: 31.47,
    },
    {
      date: '2019',
      fertility: 791,
    },
    {
      date: '2020',
      fertility: 796.41,
    },
  ])
  .encode('x', 'date')
  .encode('y', 'fertility');

chart.interval();
chart.categoryOutlier();

chart.render();
