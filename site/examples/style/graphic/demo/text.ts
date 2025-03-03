import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 350,
});

chart.options({
  type: 'liquid',
  autoFit: true,
  data: 0.581,
  style: {
    waveLength: 50,
    contentText: 'center text',
    outlineBorder: 4,
    outlineDistance: 8,
    // 绘图属性
    contentFontSize: 30,
    contentFontFamily: 'sans-serif',
    contentFontWeight: 500,
    contentLineHeight: 20,
    contentTextAlign: 'center',
    contentTextBaseline: 'middle',
    contentFill: '#fff',
    contentFillOpacity: 0.9,
    contentStroke: 'yellow',
    contentStrokeOpacity: 0.9,
    contentLineWidth: 2,
    contentLineDash: [4, 8],
    contentOpacity: 1,
    contentShadowColor: '#d3d3d3',
    contentShadowBlur: 10,
    contentShadowOffsetX: 10,
    contentShadowOffsetY: 10,
    contentCursor: 'pointer',
  },
});

chart.render();
