const Shape = G2.Shape;
Shape.registerShape('point', 'image', {
  drawShape(cfg, container) {
    cfg.points = this.parsePoints(cfg.points);
    const coord = this._coord;
    container.addShape('line', {
      attrs: {
        x1: cfg.points[0].x,
        y1: cfg.points[0].y,
        x2: cfg.points[0].x,
        y2: coord.start.y,
        stroke: '#ccc',
        lineWidth: 1,
        lineDash: [ 4, 2 ]
      }
    });
    return container.addShape('image', {
      attrs: {
        x: cfg.points[0].x - (12 * cfg.size / 2),
        y: cfg.points[0].y - 12 * cfg.size,
        width: 12 * cfg.size,
        height: 12 * cfg.size,
        img: cfg.shape[1]
      }
    });
  }
});
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
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 20, 20, 90 ]
});
chart.source(data, {
  value: {
    nice: false,
    max: 60,
    min: 0
  }
});
chart.legend(false);
chart.axis('value', false);
chart.point().position('name*value')
  .size('value')
  .color('name')
  .shape('name', function(name) {
    return [ 'image', imageMap[name] ]; // 根据具体的字段指定 shape
  })
  .label('value', {
    offset: -20,
    textStyle: {
      fontSize: 16 // 文本大小
    }
  });
chart.render();

