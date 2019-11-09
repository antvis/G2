const data = [{
  State: 'AL',
  'Under 5 Years': 310504,
  '5 to 13 Years': 552339,
  '14 to 17 Years': 259034,
  '18 to 24 Years': 450818,
  '25 to 44 Years': 1231572,
  '45 to 64 Years': 1215966,
  '65 Years and Over': 641667
}, {
  State: 'AK',
  'Under 5 Years': 52083,
  '5 to 13 Years': 85640,
  '14 to 17 Years': 42153,
  '18 to 24 Years': 74257,
  '25 to 44 Years': 198724,
  '45 to 64 Years': 183159,
  '65 Years and Over': 50277
}, {
  State: 'AZ',
  'Under 5 Years': 515910,
  '5 to 13 Years': 828669,
  '14 to 17 Years': 362642,
  '18 to 24 Years': 601943,
  '25 to 44 Years': 1804762,
  '45 to 64 Years': 1523681,
  '65 Years and Over': 862573
}, {
  State: 'AR',
  'Under 5 Years': 202070,
  '5 to 13 Years': 343207,
  '14 to 17 Years': 157204,
  '18 to 24 Years': 264160,
  '25 to 44 Years': 754420,
  '45 to 64 Years': 727124,
  '65 Years and Over': 407205
}, {
  State: 'CA',
  'Under 5 Years': 2704659,
  '5 to 13 Years': 4499890,
  '14 to 17 Years': 2159981,
  '18 to 24 Years': 3853788,
  '25 to 44 Years': 10604510,
  '45 to 64 Years': 8819342,
  '65 Years and Over': 4114496
}, {
  State: 'CO',
  'Under 5 Years': 358280,
  '5 to 13 Years': 587154,
  '14 to 17 Years': 261701,
  '18 to 24 Years': 466194,
  '25 to 44 Years': 1464939,
  '45 to 64 Years': 1290094,
  '65 Years and Over': 511094
}, {
  State: 'CT',
  'Under 5 Years': 211637,
  '5 to 13 Years': 403658,
  '14 to 17 Years': 196918,
  '18 to 24 Years': 325110,
  '25 to 44 Years': 916955,
  '45 to 64 Years': 968967,
  '65 Years and Over': 478007
}];
const ages = [ 'Under 5 Years', '5 to 13 Years', '14 to 17 Years', '18 to 24 Years', '25 to 44 Years', '45 to 64 Years', '65 Years and Over' ];

const dv = new DataSet.View().source(data)
  .transform({
    type: 'fold',
    fields: ages,
    key: 'name'
  })
  .transform({
    type: 'waffle',
    maxCount: 500,
    groupBy: 'State'
  });

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 20, 20, 80, 50 ]
});
chart.source(dv);
chart.scale({
  x: { nice: false },
  y: { nice: false }
});
chart.axis(false);
chart.legend('name', {
  position: 'bottom'
});
chart.legend('_hStep', false);
chart.legend('_wStep', false);
chart.point()
  .position('x*y')
  .shape('square')
  .size('_hStep', hStep => Math.min(120 * hStep, 5))
  .color('name');

const guideDv = new DataSet.View().source(dv)
  .transform({
    type: 'aggregate',
    fields: [ 'y' ],
    operations: [ 'median' ],
    as: [ 'medianY' ],
    groupBy: 'State'
  });
guideDv.rows.forEach(row => {
  chart.guide().text({
    top: true,
    position: [ 0, row.medianY ],
    content: row.State,
    offsetX: -10,
    style: {
      fill: '#666', // 文本颜色
      fontSize: 24, // 文本大小
      fontWeight: 'bold', // 文本粗细
      textAlign: 'right'
    }
  });
});

chart.render();
