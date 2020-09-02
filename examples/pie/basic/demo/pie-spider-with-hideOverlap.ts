import { Chart, getEngine } from '@antv/g2';

const G = getEngine('canvas');
const data = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
];

for (let i = 1; i < 20; i++) {
  data.push({ item: `事例 ${i}`, count: Number((100 * Math.random()).toFixed(2)), percent: 0.4 });
}

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  localRefresh: false,
});

chart.coordinate('theta', {
  radius: 0.75,
});

chart.data(data);

chart.scale('percent', {
  formatter: (val) => {
    val = val * 100 + '%';
    return val;
  },
});

chart.tooltip({
  showTitle: false,
  showMarkers: false,
});

chart
  .interval()
  .position('percent')
  .color('item')
  .label('percent', {
    layout: [{ type: 'pie-spider' }, { type: 'hide-overlap' }],
    offset: 8,
    labelHeight: 38,
    content: (obj, item) => {
      const group = new G.Group({});
      // 了解 shape 的绘制原理：y0 左下起点 y1 右上起点
      const [y0, y1] = item.y || [0, 0];
      const inRight = y0 < y1;
      const textAlign = inRight ? 'left' : 'right';

      const topFontSize = 12;
      const bottomFontSize = 14;
      group.addShape({
        type: 'text',
        attrs: {
          x: 0,
          y: 0,
          text: obj.item,
          fill: 'rgba(0, 0, 0, 0.65)',
          fontSize: topFontSize,
          textAlign,
        },
      });

      group.addShape({
        type: 'text',
        attrs: {
          x: 0,
          y: 4,
          text: obj.count,
          textAlign,
          textBaseline: 'top',
          fill: 'rgba(0, 0, 0, 0.65)',
          fontWeight: 700,
          fontSize: bottomFontSize,
        },
      });
      if (!inRight) {
        group.translate(group.getBBox().width, 0);
      }
      group.translate(0, topFontSize);
      return group;
    },
    labelLine: {
      style: {
        lineWidth: 0.5,
      },
    },
  })
  .adjust('stack');

chart.interaction('element-active');

chart.render();
