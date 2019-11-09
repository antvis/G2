const sets = [
  { sets: [ 'A' ], size: 12, label: 'A' },
  { sets: [ 'B' ], size: 12, label: 'B' },
  { sets: [ 'C' ], size: 12, label: 'C' },
  { sets: [ 'A', 'B' ], size: 2, label: 'A&B' },
  { sets: [ 'A', 'C' ], size: 2, label: 'A&C' },
  { sets: [ 'B', 'C' ], size: 2, label: 'B&C' },
  { sets: [ 'A', 'B', 'C' ], size: 1 }
];

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: 10
});
chart.source(sets);
chart.axis(false);
chart.legend(false);
chart.tooltip(false);
chart.venn()
  .position('x*y')
  .sets('sets')
  .label('label') // 这个字段用来获取集合关系字段
  .size('size') // 这个字段用来获取集合 size
  .color('label')
  .active(false)
  .shape('hollow')
  .style({
    lineWidth: 10,
    padding: 10,
    textStyle: {
      fontSize: 32
    }
  });
chart.render();
