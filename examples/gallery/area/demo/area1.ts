import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/fireworks-sales.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });
    chart.data(data);
    chart.scale('Data', {
      range: [0, 1],
      tickCount: 10,
      type: 'timeCat'
    });
    chart.scale('sales', {
      nice: true,
    });
    chart.axis('sales', {
      label: {
        formatter: text => {
          return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        }
      }
    });
    chart.tooltip({
      showCrosshairs: true,
    });

    chart.annotation().dataMarker({
      position: ['2014-01', 1750],
      top: true,
      text: {
        content: '因政策调整导致销量下滑',
        style: {
          fontSize: 13,
        }
      },
      line: {
        length: 30,
      },
    });

    chart.line().position('Data*sales');
    chart.area().position('Data*sales');
    chart.render();
  });
