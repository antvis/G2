import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

const data = [
  { year: '2000', '类型 A': 21.0, '类型 B': 16, '类型 C': 8 },
  { year: '2001', '类型 A': 25.0, '类型 B': 16, '类型 C': 8 },
  { year: '2002', '类型 A': 25.0, '类型 B': 15, '类型 C': 8 },
  { year: '2003', '类型 A': 25.0, '类型 B': 14, '类型 C': 7 },
  { year: '2004', '类型 A': 25.0, '类型 B': 14, '类型 C': 7 },
  { year: '2005', '类型 A': 24.0, '类型 B': 13, '类型 C': 8 },
  { year: '2006', '类型 A': 24.0, '类型 B': 14, '类型 C': 7 },
  { year: '2007', '类型 A': 26.0, '类型 B': 16, '类型 C': 7 },
  { year: '2008', '类型 A': 26.0, '类型 B': 15.2, '类型 C': 8 },
  { year: '2009', '类型 A': 27.1, '类型 B': 15.2, '类型 C': 10 },
  { year: '2010', '类型 A': 27.5, '类型 B': 15.4, '类型 C': 8 },
  { year: '2011', '类型 A': 26.4, '类型 B': 15.2, '类型 C': 9 },
  { year: '2012', '类型 A': 28.8, '类型 B': 15.4, '类型 C': 9 },
  { year: '2013', '类型 A': 33.3, '类型 B': 16.7, '类型 C': 12 },
  { year: '2014', '类型 A': 38.2, '类型 B': 19.5, '类型 C': 18 },
];

const { DataView } = DataSet;
const dv = new DataView();
dv.source(data).transform({
  type: 'fold',
  fields: ['类型 A', '类型 B', '类型 C'],
  key: '难民类型',
  value: 'count',
  remains: 'year',
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});
chart.data(dv.rows);
chart.coordinate('polar', {
  innerRadius: 0.1,
  radius: 0.8
});

chart.legend('难民类型', {
  position: 'bottom',
});

chart.tooltip({
  showMarkers: false,
  showCrosshairs: true,
  showContent: false,
  crosshairs: {
    line: {
      style: {
        stroke: '#000'
      }
    },
    text: {
      position: 'end',
      offset: 10,
      autoRotate: true,
      style: {
        fontSize: 14,
        fontWeight: 'bold'
      }
    },
    textBackground: null
  }
});

chart
  .interval()
  .position('year*count')
  .color('难民类型')
  .style({
    lineWidth: 1,
    stroke: '#fff',
  })
  .adjust('stack');

chart.interaction('element-highlight');

chart.render();
