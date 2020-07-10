import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/heatmap.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [0, 30, 60, 30]
    });
    chart.data(data);
    chart.scale({
      tmp: { nice: true }
    });
    chart.tooltip({
      showTitle: false
    });
    chart.axis(false);
    chart.legend({
      offset: 10
    });
    chart.heatmap()
      .position('g*l')
      .color('tmp', '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2');
    chart.annotation().image({
      start: ['min', 'max'],
      end: ['max', 'min'],
      src: 'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
    });
    chart.render();
  });
