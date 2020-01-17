import { Chart } from '@antv/g2';

fetch('../data/blockchain.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [30, 20, 70, 30]
    });

    chart.data(data);
    chart.scale({
      nlp: {
        min: 0,
        max: 100
      },
      blockchain: {
        min: 0,
        max: 100
      }
    });
    chart.axis('date', {
      label: {
        style: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.axis('blockchain', {
      label: {
        style: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.axis('nlp', false);
    chart.line().position('date*blockchain').color('#1890ff');
    chart.line().position('date*nlp').color('#2fc25b');
    chart.annotation().dataMarker({
      top: true,
      position: ['2016-02-28', 9],
      text: {
        content: 'Blockchain 首超 NLP',
        style: {
          textAlign: 'left',
          fontSize: 12,
          stroke: 'white',
          lineWidth: 2,
          fontWeight: 10
        },
      },
      point: {
        style: {
          stroke: '#2fc25b',
          r: 4
        }
      },
      line: {
        length: 30,
      },
    });
    chart.annotation().dataMarker({
      top: true,
      position: ['2017-12-17', 100],
      line: {
        length: 30,
        style: {
          stroke: '#A3B1BF',
          lineWidth: 2
        }
      },
      point: {
        style: {
          r: 4,
        }
      },
      text: {
        content: '2017-12-17, 受比特币影响，\n blockchain搜索热度达到顶峰\n峰值：100',
        style: {
          textAlign: 'right',
          fontSize: 12,
          stroke: 'white',
          lineWidth: 2,
          fontWeight: 10
        }
      },
    });
    chart.render();
  });
