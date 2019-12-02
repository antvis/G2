// FIXME：自定义 HTML Label
import { Chart } from '@antv/g2';

const data = [
  { sex: '男', sold: 0.45 },
  { sex: '女', sold: 0.55 },
];

const chart = new Chart({
  container: 'container',
  padding: [20, 30, 30, 20],
});

const COLORS = ['#1890ff', '#f04864'];

chart.coordinate('theta', {
  radius: 0.8,
});
chart.data(data);
chart.tooltip({
  showTitle: false,
  showTooltipMarkers: false,
});
chart.axis(false);
chart
  .interval()
  .adjust('stack')
  .position('sold')
  .color('sex', COLORS)
  .label('sold', {
    useHtml: true,
    htmlTemplate: (text, item) => {
      const isFemale = item.sex === '女';
      const src = isFemale
        ? 'https://gw.alipayobjects.com/zos/rmsportal/mweUsJpBWucJRixSfWVP.png'
        : 'https://gw.alipayobjects.com/zos/rmsportal/oeCxrAewtedMBYOETCln.png';
      const color = isFemale ? COLORS[1] : COLORS[0];
      const IMG = `<img style="width:40px" src="${src}" /><br/>`;
      return `<div style="text-align:center;color:${color}">${IMG}${(text * 100).toFixed(0)}%</div>`;
    },
  });
chart.interaction('active');
chart.render();
