fetch('../data/income.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 20, 20, 70, 20 ]
    });
    chart.source(data);
    chart.scale('time', {
      range: [ 0, 1 ]
    });
    chart.axis('time', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.axis('rate', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.line().position('time*rate');
    chart.guide().dataMarker({
      position: [ '2014-01-03', 6.763 ],
      content: '受稳健货币政策影响，协定存款利\n率居高不下,收益率达6.763%',
      style: {
        text: {
          textAlign: 'left',
          stroke: '#fff',
          lineWidth: 2
        }
      }
    });
    chart.guide().dataMarker({
      position: [ '2013-05-31', 2.093 ],
      content: '余额宝刚成立时，并未达到目标资产\n配置，故收益率较低',
      style: {
        text: {
          textAlign: 'left',
          stroke: '#fff',
          lineWidth: 2
        }
      }
    });
    chart.guide().dataMarker({
      position: [ '2016-09-04', 2.321 ],
      content: '受积极货币政策的影响，收益率降\n到历史最低2.321%',
      lineLength: 30,
      autoAdjust: false,
      style: {
        text: {
          textAlign: 'right',
          stroke: '#fff',
          lineWidth: 2
        }
      }
    });
    chart.guide().dataRegion({
      start: [ '2016-12-02', 2.517 ],
      end: [ '2017-03-24', 3.83 ],
      content: '',
      lineLength: 50
    }).dataMarker({
      position: [ '2016-12-02', 2.517 ],
      content: '宏观经济过热，受稳健货币政策影\n响，余额宝收益率随之上升',
      lineLength: 130,
      autoAdjust: false,
      style: {
        text: {
          textAlign: 'left'
        }
      }
    })
    .dataMarker({
      position: [ '2017-03-24', 3.83 ],
      content: '',
      lineLength: 50
    });

    chart.render();
  });
