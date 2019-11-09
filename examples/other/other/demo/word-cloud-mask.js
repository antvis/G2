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

fetch('../data/antv-keywords.json')
  .then(res => res.json())
  .then(data => {
    const dv = new DataSet.View().source(data);
    const range = dv.range('value');
    const min = range[0];
    const max = range[1];
    const imageMask = new Image();
    imageMask.crossOrigin = '';
    imageMask.src = 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ';
    imageMask.onload = () => {
      dv.transform({
        type: 'tag-cloud',
        fields: [ 'name', 'value' ],
        imageMask,
        font: 'Verdana',
        size: [ 600, 400 ], // 宽高设置最好根据 imageMask 做调整
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
          return ((d.value - min) / (max - min)) * (32 - 8) + 8;
        }
      });
      const chart = new G2.Chart({
        container: 'container',
        width: 600, // 宽高设置最好根据 imageMask 做调整
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
        .color('text')
        .shape('cloud');
      chart.render();
    };
  });

