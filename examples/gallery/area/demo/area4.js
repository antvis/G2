fetch('../data/gas-import-export.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 50, 20, 30, 30 ]
    });
    chart.source(data);

    chart.axis('year', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });

    chart.axis('value', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.tooltip({
      crosshairs: 'y',
      share: true
    });
    // Y轴单位
    chart.guide().text({
      position: [ 2015, 8 ],
      content: '万立方/英尺',
      style: {
        fill: '#8c8c8c',
        fontSize: 12,
        fontWeight: 300
      },
      offsetY: -30,
      offsetX: -20
    });
    // export mexico
    chart.guide().text({
      top: true,
      position: [ 2040, 6.3 ],
      content: '出口至墨西哥',
      style: {
        fill: 'white',
        fontSize: 12,
        fontWeight: 300,
        textAlign: 'end',
        textBaseline: 'center'
      },
      offsetX: -10
    });
    // export canada
    chart.guide().text({
      top: true,
      position: [ 2040, 5 ],
      content: '出口至加拿大',
      style: {
        fill: 'white',
        fontSize: 12,
        fontWeight: 300,
        textAlign: 'end',
        textBaseline: 'center'
      },
      offsetX: -10
    });
    // export nature
    chart.guide().text({
      top: true,
      position: [ 2040, 2 ],
      content: '来自40个州的液化天然气出口',
      style: {
        fill: 'white',
        fontSize: 12,
        fontWeight: 300,
        textAlign: 'end',
        textBaseline: 'center'
      },
      offsetX: -10
    });
    // import canada
    chart.guide().text({
      top: true,
      position: [ 2015, -1.5 ],
      content: '从加拿大进口',
      style: {
        fill: 'white',
        fontSize: 12,
        fontWeight: 300,
        textAlign: 'start',
        textBaseline: 'center'
      },
      offsetX: 10
    });
    // import nature
    chart.guide().text({
      top: true,
      position: [ 2019, -3.5 ],
      content: '从其他国家进口',
      style: {
        fill: '#6b6b6b',
        fontSize: 12,
        fontWeight: 300,
        textAlign: 'center',
        textBaseline: 'center'
      },
      offsetX: 10
    });

    chart.guide().region({
      start: [ 2019, 8 ],
      end: [ 2040, -4 ],
      style: {
        lineWidth: 0,
        fill: '#dcdcdc',
        fillOpacity: 0.3,
        stroke: '#ccc'
      }
    });

    chart.legend(false);
    chart.areaStack()
      .position('year*value')
      .color('type', [ '#1890ff', '#40a9ff', '#0050b3', '#003a8c', '#002766' ])
      .opacity(1);
    chart.lineStack()
      .position('year*value')
      .color('type', [ 'white' ])
      .size(1)
      .opacity(0.2)
      .tooltip(false);
    chart.render();
  });
