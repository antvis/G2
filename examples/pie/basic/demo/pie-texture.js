// FIXME: label && tooltip 交互
import { Chart } from '@antv/g2';

const data = [
  { sex: '男', sold: 0.45 },
  { sex: '女', sold: 0.55 },
];

const chart = new Chart({
  container: 'container',
});

chart.data(data);
chart.coordinate('theta', {
  radius: 0.8,
});
chart.tooltip({
  showTitle: false,
  showTooltipMarkers: false,
});
chart.axis(false);
chart
  .interval()
  .adjust('stack')
  .position('sold')
  .label('sex')
  .color('sex')
  .style('sex', (sex) => {
    if (sex === '男') {
      return {
        fill: 'p(a)https://gw.alipayobjects.com/zos/rmsportal/nASTPWDPJDMgkDRlAUmw.jpeg',
      };
    }
    return {
      fill: 'p(a)https://gw.alipayobjects.com/zos/rmsportal/ziMWHpHSTlTzURSzCarw.jpeg',
    };
  });

chart.render();
