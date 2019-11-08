fetch('../data/siteUV.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 20, 90, 50, 50 ]
    });
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'map',
      callback: function callback(row) {
        const times = row.Time.split(' ');
        row.date = times[0];
        row.time = times[1];
        return row;
      }
    });
    chart.axis('time', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.axis('Count', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        },
        formatter: text => {
          return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        }
      }
    });
    chart.tooltip({
      crosshairs: false
    });
    chart.legend({
      attachLast: true
    });
    chart.source(dv, {
      time: {
        tickCount: 12
      },
      date: {
        type: 'cat'
      }
    });
    chart.line().position('time*Count').color('date', [ '#d9d9d9', '#1890ff' ]);
    chart.guide().dataMarker({
      position: [ '13:00', 0 ],
      lineLength: 30,
      content: '服务器宕机\n低值：0',
      style: {
        text: {
          textAlign: 'left',
          fontSize: 12,
          stroke: 'white',
          lineWidth: 2
        }
      }
    });
    chart.guide().dataMarker({
      position: [ '14:00', 4180 ],
      lineLength: 20,
      content: '宕机导致服务积压，恢复后达峰值\n高值：4108',
      style: {
        text: {
          textAlign: 'left',
          fontSize: 12,
          stroke: 'white',
          lineWidth: 2
        }
      }
    });
    chart.render();
  });
