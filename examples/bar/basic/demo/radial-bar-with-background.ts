import { Chart } from '@antv/g2';

const data = [
  { type: '1-3秒', value: 0.16 },
  { type: '4-10秒', value: 0.125 },
  { type: '11-30秒', value: 0.2 },
  { type: '1-3分', value: 0.2 },
  { type: '3-10分', value: 0.05 },
  { type: '10-30分', value: 0.01 },
  { type: '30+分', value: 0.015 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});
chart.data(data);

chart.axis(false);
chart.tooltip({
  showMarkers: false,
});
chart.coordinate('theta', { innerRadius: 0.35 });
chart.legend(false);
chart
  .interval({
    background: { style: { fill: '#F0F0F0', fillOpacity: 1 }},
  })
  .position('type*value')
  .color('type', (val) => {
    const { colors10 } = chart.getTheme();
    if (val === '10-30分' || val === '30+分') {
      return '#ff4d4f';
    }
    return colors10[0];
  })
  .style({
    lineCap: 'round',
    
  });
chart.theme({
  maxColumnWidth: 12,
  minColumnWidth: 12,
})
chart.interaction('element-active')
chart.annotation().html({
  position: ['50%', '50%'],
  html: () => {
    return `<div style="transform:translate(-50%,-50%)">
      <img width="100" height="80" src="https://gw.alipayobjects.com/mdn/rms_ef85c6/afts/img/A*0DYiQKP08cQAAAAAAAAAAAAAARQnAQ">
    </div>`
  }
})
chart.render();
