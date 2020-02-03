import { Chart } from '@antv/g2';

function findMaxMin(data) {
  let maxValue = 0;
  let minValue = 50000;
  let maxObj = null;
  let minObj = null;
  for (const d of data) {
    if (d.UV > maxValue) {
      maxValue = d.UV;
      maxObj = d;
    }
    if (d.UV < minValue) {
      minValue = d.UV;
      minObj = d;
    }
  }
  return { max: maxObj, min: minObj };
}

fetch('../data/basement.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });
    chart.data(data);
    chart.scale({
      time: {
        tickCount: 5
      },
      UV: {
        tickCount: 5,
        nice: true,
      }
    });
    chart.axis('time', {
      label: {
        style: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.axis('UV', {
      label: {
        style: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.line().position('time*UV');
    // annotation
    const { min, max } = findMaxMin(data);
    chart.annotation().dataMarker({
      top: true,
      position: [max.time, max.UV],
      text: {
        content: '峰值：' + max.UV,
        style: {
          fontSize: 13,
          stroke: 'white',
          lineWidth: 2
        },
      },
      line: {
        length: 30,
      },
    });
    chart.annotation().dataMarker({
      top: true,
      position: [min.time, min.UV],
      text: {
        content: '谷值：' + min.UV,
        style: {
          fontSize: 13,
          stroke: 'white',
          lineWidth: 2
        },
      },
      line: {
        length: 50,
      },
    });
    chart.annotation().region({
      start: ['2018-09-01', 'min'],
      end: ['2018-09-02', 'max']
    });
    chart.annotation().region({
      start: ['2018-09-08', 'min'],
      end: ['2018-09-09', 'max']
    });
    chart.annotation().region({
      start: ['2018-09-15', 'min'],
      end: ['2018-09-16', 'max']
    });
    chart.annotation().region({
      start: ['2018-09-22', 'min'],
      end: ['2018-09-24', 'max']
    });
    chart.render();
  });
