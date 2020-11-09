import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

const data = [
  { year: '2002', value: 10 },
  { year: '2003', value: 20 },
  { year: '2004', value: 50 },
  { year: '2005', value: 40 },
  { year: '2006', value: 50 },
  { year: '2007', value: 20 },
  { year: '2008', value: 25 },
  { year: '2009', value: 70 },
  { year: '2010', value: 120 },
  { year: '2011', value: 140 },
  { year: '2012', value: 80 },
  { year: '2013', value: 250 },
  { year: '2014', value: 280 },
  { year: '2015', value: 400 },
  { year: '2016', value: 400 },
  { year: '2017', value: 800 },
  { year: '2018', value: 1000 }
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'map',
  callback: row => {
    row.year = parseInt(row.year, 10);
    return row;
  }
}).transform({
  type: 'regression',
  method: 'polynomial',
  fields: ['year', 'value'],
  bandwidth: 0.1,
  as: ['Year', 'Value']
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding: [20, 40],
});

chart.scale({
  Year: {
    range: [0, 1],
  },
  value: {
    alias: '市值 (亿美元)',
    sync: true,
    nice: true
  },
  Value: {
    sync: true,
    nice: true
  },
});
chart.axis('year', {
  tickLine: null
});

const view1 = chart.createView();
view1.data(data);
view1
  .interval()
  .position('year*value')
  .style({
    fillOpacity: 1,
  });

const view2 = chart.createView();
view2.axis(false);
view2.data(dv.rows);
view2
  .line()
  .position('Year*Value')
  .style({
    stroke: '#969696',
    lineDash: [3, 3]
  })
  .tooltip(false);
view2.annotation().text({
  content: '趋势线',
  position: ['min', 'min'],
  style: {
    fill: '#8c8c8c',
    fontSize: 14,
    fontWeight: 300
  },
  offsetY: -140
});

chart.render();
