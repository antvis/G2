import DataSet from '@antv/data-set';
import { Chart, registerShape, Util } from '@antv/g2';

function getTextAttrs(cfg) {
  return {
    ...cfg.style,
    fontSize: cfg.data.size,
    text: cfg.data.text,
    textAlign: 'center',
    fontFamily: cfg.data.font,
    fill: cfg.color,
    textBaseline: 'Alphabetic'
  };
}

// 给 point 注册一个词云的 shape
registerShape('point', 'cloud', {
  draw(cfg, container) {
    const attrs = getTextAttrs(cfg);
    const textShape = container.addShape('text', {
      attrs: {
        ...attrs,
        x: cfg.x,
        y: cfg.y
      }
    });
    if (cfg.data.rotate) {
      Util.rotate(textShape, cfg.data.rotate * Math.PI / 180);
    }
    return textShape;
  }
});

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json')
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
        fields: ['name', 'value'],
        imageMask,
        font: 'Verdana',
        size: [600, 400], // 宽高设置最好根据 imageMask 做调整
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
      const chart = new Chart({
        container: 'container',
        autoFit: false,
        width: 600, // 宽高设置最好根据 imageMask 做调整
        height: 400,
        padding: 0
      });
      chart.data(dv.rows);
      chart.scale({
        x: { nice: false },
        y: { nice: false }
      });
      chart.legend(false);
      chart.axis(false);
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      });
      chart.coordinate().reflect();
      chart.point()
        .position('x*y')
        .color('text')
        .shape('cloud')
        .state({
          active: {
            style: {
              fillOpacity: 0.4
            }
          }
        });
      chart.interaction('element-active');
      chart.render();
    };
  });

