const data = [
  { name: 'Internet Explorer', value: 26 },
  { name: 'Chrome', value: 40 },
  { name: 'Firefox', value: 30 },
  { name: 'Safari', value: 24 },
  { name: 'Opera', value: 15 },
  { name: 'Undetectable', value: 8 }
];
const imageMap = {
  'Internet Explorer': 'https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png',
  Chrome: 'https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png',
  Firefox: 'https://gw.alipayobjects.com/zos/rmsportal/ZEPeDluKmAoTioCABBTc.png',
  Safari: 'https://gw.alipayobjects.com/zos/rmsportal/eZYhlLzqWLAYwOHQAXmc.png',
  Opera: 'https://gw.alipayobjects.com/zos/rmsportal/vXiGOWCGZNKuVVpVYQAw.png',
  Undetectable: 'https://gw.alipayobjects.com/zos/rmsportal/NjApYXminrnhBgOXyuaK.png'
};
const dv = new DataSet.View().source(data)
  .transform({
    type: 'waffle',
    rows: 10
  });
const chart = new G2.Chart({
  container: 'container',
  width: 500,
  height: 500,
  padding: 20
});
chart.source(dv);
chart.legend(false);
chart.axis(false);
chart.tooltip(false);
chart.point()
  .position('x*y')
  .size(30)
  .shape('name', name => [ 'image', imageMap[name] ]); // 根据具体的字段指定 shape

chart.render();
