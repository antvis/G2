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
  { year: '2014', '类型 A': 38.2, '类型 B': 19.5, '类型 C': 18 }
];
const { DataView } = DataSet;
const dv = new DataView();
dv.source(data)
  .transform({
    type: 'fold',
    fields: [ '类型 A', '类型 B', '类型 C' ],
    key: '难民类型',
    value: 'count',
    remains: 'year'
  });

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: 'auto'
});
chart.source(dv);
chart.coord('polar', { inner: 0.1 });
chart.legend('难民类型', {
  position: 'bottom'
});
chart.intervalStack()
  .position('year*count')
  .color('难民类型')
  .style({
    lineWidth: 1,
    stroke: '#fff'
  });
chart.render();
