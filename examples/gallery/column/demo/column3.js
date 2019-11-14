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

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 20, 20, 50, 60 ]
});
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'map',
  callback: row => {
    row.year = parseInt(row.year);
    return row;
  }
}).transform({
  type: 'regression',
  method: 'polynomial',
  fields: [ 'year', 'value' ],
  bandwidth: 0.1,
  as: [ 'Year', 'Value' ]
});
chart.scale('value', {
  alias: '市值 (亿美元)'
});
chart.scale('year', {
  type: 'cat'
});
chart.scale('Year', {
  range: [ 0, 1 ],
  type: 'timeCat'
});
chart.axis('year', {
  label: {
    textStyle: {
      fill: '#aaaaaa'
    }
  },
  tickLine: {
    alignWithLabel: false,
    length: 0
  }
});
chart.axis('value', {
  label: {
    textStyle: {
      fill: '#aaaaaa'
    }
  },
  title: {
    offset: 50
  }
});
chart.tooltip({
  share: true
});


const view1 = chart.view();
view1.source(data);
view1.interval().position('year*value').opacity(1);

const view2 = chart.view();
view2.axis(false);
view2.source(dv);
view2.line().position('Year*Value').style({
  stroke: '#969696',
  lineDash: [ 3, 3 ]
})
.tooltip(false);
view2.guide().text({
  content: '趋势线',
  position: [ 'min', 'min' ],
  style: {
    fill: '#8c8c8c',
    fontSize: 14,
    fontWeight: 300
  },
  offsetY: -140
});

chart.render();
