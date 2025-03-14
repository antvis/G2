import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 300 });

chart.options({
  type: 'legends',
  title: '图例标题',
  titleSpacing: 0,
  titleInset: 0,
  titlePosition: 't',
  titleFontSize: 16,
  titleFontFamily: 'sans-serif',
  titleFontWeight: 500,
  titleLineHeight: 20,
  titleTextAlign: 'center',
  titleTextBaseline: 'middle',
  titleFill: '#000',
  titleFillOpacity: 0.9,
  titleStroke: '#DAF5EC',
  titleStrokeOpacity: 0.9,
  titleLineWidth: 2,
  titleLineDash: [4, 8],
  titleOpacity: 1,
  titleShadowColor: '#d3d3d3',
  titleShadowBlur: 10,
  titleShadowOffsetX: 10,
  titleShadowOffsetY: 10,
  titleCursor: 'pointer',
  scale: {
    size: {
      type: 'linear',
      domain: [0, 10],
      range: [0, 100],
    },
  },
});

chart.render();
