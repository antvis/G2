
function getTextAttrs(cfg) {
  return {
    ...cfg.style,

    fillOpacity: cfg.opacity,
    fontSize: cfg.origin._origin.size,
    rotate: cfg.origin._origin.rotate,
    text: cfg.origin._origin.text,
    textAlign: 'center',
    fontFamily: cfg.origin._origin.font,
    fill: cfg.color,
    textBaseline: 'Alphabetic'
  };
}

// 给point注册一个词云的shape
G2.Shape.registerShape('point', 'cloud', {
  drawShape(cfg, container) {
    const attrs = getTextAttrs(cfg);
    return container.addShape('text', {
      attrs: {
        ...attrs,
        x: cfg.x,
        y: cfg.y
      }
    });
  }
});
fetch('../data/world-population.json')
  .then(res => res.json())
  .then(data => {
    const dv = new DataSet.View().source(data);
    const range = dv.range('value');
    const min = range[0];
    const max = range[1];
    dv.transform({
      type: 'tag-cloud',
      fields: [ 'x', 'value' ],
      size: [ 600, 400 ],
      font: 'Verdana',
      padding: 0,
      timeInterval: 5000, // max execute time
      rotate() {
        let random = ~~(Math.random() * 4) % 4;
        if (random === 2) {
          random = 0;
        }
        return random * 90; // 0, 90, 270
      },
      fontSize(d) {
        if (d.value) {
          return ((d.value - min) / (max - min)) * (80 - 24) + 24;
        }
        return 0;
      }
    });
    const chart = new G2.Chart({
      container: 'container',
      width: 600,
      height: 400,
      padding: 0
    });
    chart.source(dv, {
      x: { nice: false },
      y: { nice: false }
    });
    chart.legend(false);
    chart.axis(false);
    chart.tooltip({
      showTitle: false
    });
    chart.coord().reflect();
    chart.point()
      .position('x*y')
      .color('category')
      .shape('cloud')
      .tooltip('value*category');
    chart.render();
  });
