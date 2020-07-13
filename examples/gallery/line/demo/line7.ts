import { Chart } from '@antv/g2';

function findMaxMin(data) {
  let maxValue = 0;
  let minValue = 50000;
  let maxObj = null;
  let minObj = null;
  for (const d of data) {
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

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/nintendo.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
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
        formatter: text => {
          const dataStrings = text.split('.');
          return dataStrings[2] + '-' + dataStrings[1] + '-' + dataStrings[0];
        }
      }
    });

    chart.line().position('Date*Close');
    // annotation
    const { min, max } = findMaxMin(data);
    chart.annotation().dataMarker({
      top: true,
      position: [max.Date, max.Close],
      text: {
        content: '全部峰值：' + max.Close,
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
      },
      line: {
        length: 50,
      }
    });
    chart.render();
  });
