import { Chart } from '@antv/g2';

fetch('../data/nintendo.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [30, 20, 50, 30]
    });
    chart.data(data);
    chart.scale({
      Date: {
        tickCount: 10
      },
      Close: {
        nice: true,
      }
    });
    chart.axis('Date', {
      label: {
        style: {
          fill: '#aaaaaa'
        },
        formatter: text => {
          const dataStrings = text.split('.');
          return dataStrings[2] + '-' + dataStrings[1] + '-' + dataStrings[0];
        }
      }
    });
    chart.axis('Close', {
      label: {
        style: {
          fill: '#aaaaaa'
        }
      }
    });

    chart.line().position('Date*Close');
    // guide
    const max_min = findMaxMin();
    const max = max_min.max;
    const min = max_min.min;
    chart.annotation().dataMarker({
      top: true,
      position: [max.Date, max.Close],
      text: {
        content: '全部峰值：' + max.Close,
        style: {
          fontSize: 12
        },
      },
      line: {
        length: 30,
      }
    });
    chart.annotation().dataMarker({
      top: true,
      position: [min.Date, min.Close],
      text: {
        content: '全部谷值：' + min.Close,
        style: {
          fontSize: 12
        },
      },
      line: {
        length: 50,
      }
    });
    chart.render();

    function findMaxMin() {
      let maxValue = 0;
      let minValue = 50000;
      let maxObj = null;
      let minObj = null;
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        if (d.Close > maxValue) {
          maxValue = d.Close;
          maxObj = d;
        }
        if (d.Close < minValue) {
          minValue = d.Close;
          minObj = d;
        }
      }
      return { max: maxObj, min: minObj };
    }

  });
