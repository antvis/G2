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

    chart.axis('nlp', false);

    chart.legend({
      custom: true,
      items: [
        { name: 'blockchain', value: 'blockchain', marker: { symbol: 'line', style: { stroke: '#1890ff', lineWidth: 2 } } },
        { name: 'nlp', value: 'nlp', marker: { symbol: 'line', style: { stroke: '#2fc25b', lineWidth: 2 } } },
      ],
    });

    chart.line().position('date*blockchain').color('#1890ff');
    chart.line().position('date*nlp').color('#2fc25b');

    chart.annotation().dataMarker({
      top: true,
      position: ['2016-02-28', 9],
      text: {
        content: 'Blockchain 首超 NLP',
        style: {
          textAlign: 'left',
        },
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
      },
      text: {
        content: '2017-12-17, 受比特币影响，\n blockchain搜索热度达到顶峰\n峰值：100',
        style: {
          textAlign: 'right',
        }
      },
    });
    chart.removeInteraction('legend-filter'); // 自定义图例，移除默认的分类图例筛选交互
    chart.render();
  });
