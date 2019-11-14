fetch('../data/blockchain.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 30, 20, 70, 30 ]
    });

    chart.axis('date', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.axis('blockchain', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.axis('nlp', false);
    chart.tooltip({
      crosshairs: false
    });
    chart.legend({
      position: 'top-center'
    });

    chart.source(data, {
      nlp: {
        min: 0,
        max: 100
      },
      blockchain: {
        min: 0,
        max: 100
      }
    });
    chart.line().position('date*blockchain').color('#1890ff');
    chart.line().position('date*nlp').color('#2fc25b');
    chart.guide().dataMarker({
      top: true,
      position: [ '2016-02-28', 9 ],
      lineLength: 30,
      content: 'Blockchain 首超 NLP',
      style: {
        text: {
          textAlign: 'left',
          fontSize: 12,
          stroke: 'white',
          lineWidth: 2,
          fontWeight: 10
        },
        point: {
          stroke: '#2fc25b',
          r: 4
        }
      }
    });
    chart.guide().dataMarker({
      top: true,
      position: [ '2017-12-17', 100 ],
      lineLength: 30,
      content: '2017-12-17, 受比特币影响，\n blockchain搜索热度达到顶峰\n峰值：100',
      style: {
        text: {
          textAlign: 'right',
          fontSize: 12,
          stroke: 'white',
          lineWidth: 2,
          fontWeight: 10
        },
        point: {
          r: 4
        },
        line: {
          stroke: '#A3B1BF',
          lineWidth: 2
        }
      }
    });
    chart.render();
  });
