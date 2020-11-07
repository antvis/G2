import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/gas-import-export.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [50, 20, 30, 30]
    });
    chart.data(data);
    chart.scale({
      value: {
        nice: true,
      }
    });

    chart.tooltip({
      showCrosshairs: true,
      shared: true
    });
    // Y轴单位
    chart.annotation().text({
      position: [2015, 8],
      content: '万立方/英尺',
      style: {
        fill: '#8c8c8c',
        fontWeight: 300
      },
      offsetY: -30,
      offsetX: -20
    });
    // export mexico
    chart.annotation().text({
      position: [2040, 6.3],
      content: '出口至墨西哥',
      style: {
        fill: '#eee',
        fontWeight: 300,
        textAlign: 'end',
        textBaseline: 'center'
      },
      offsetX: -10
    });
    // export canada
    chart.annotation().text({
      position: [2040, 5],
      content: '出口至加拿大',
      style: {
        fill: '#eee',
        fontWeight: 300,
        textAlign: 'end',
        textBaseline: 'center'
      },
      offsetX: -10
    });
    // export nature
    chart.annotation().text({
      top: true,
      position: [2040, 2],
      content: '来自40个州的液化天然气出口',
      style: {
        fill: '#eee',
        fontWeight: 300,
        textAlign: 'end',
        textBaseline: 'center'
      },
      offsetX: -10
    });
    // import canada
    chart.annotation().text({
      position: [2015, -1.5],
      content: '从加拿大进口',
      style: {
        fill: '#eee',
        fontWeight: 300,
        textAlign: 'start',
        textBaseline: 'center'
      },
      offsetX: 10
    });
    // import nature
    chart.annotation().text({
      position: [2019, -3.5],
      content: '从其他国家进口',
      style: {
        fill: '#6b6b6b',
        fontWeight: 300,
        textAlign: 'start',
        textBaseline: 'center'
      },
    });

    chart.annotation().region({
      start: [2019, 8],
      end: [2040, -4],
      style: {
        lineWidth: 0,
        fill: '#dcdcdc',
        fillOpacity: 0.3,
        stroke: '#ccc'
      }
    });

    chart.legend(false);
    chart
      .area()
      .adjust('stack')
      .position('year*value')
      .color('type', ['#1890ff', '#40a9ff', '#0050b3', '#003a8c', '#002766'])
      .style({
        fillOpacity: 1,
      });
    chart
      .line()
      .adjust('stack')
      .position('year*value')
      .color('type', ['white'])
      .size(1)
      .tooltip(false)
      .style({
        fillOpacity: 0.2,
      });;
    chart.render();
  });
