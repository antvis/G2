fetch('../data/nintendo.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 30, 20, 50, 30 ]
    });
    chart.axis('Date', {
      label: {
        textStyle: {
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
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.tooltip({
      crosshairs: false
    });
    chart.source(data, {
      Date: {
        tickCount: 10
      }
    });
    chart.line().position('Date*Close');
    // guide
    const max_min = findMaxMin();
    const max = max_min.max;
    const min = max_min.min;
    chart.guide().dataMarker({
      top: true,
      content: '全部峰值：' + max.Close,
      position: [ max.Date, max.Close ],
      style: {
        text: {
          fontSize: 12
        }
      },
      lineLength: 30
    });
    chart.guide().dataMarker({
      top: true,
      content: '全部谷值：' + min.Close,
      position: [ min.Date, min.Close ],
      style: {
        text: {
          fontSize: 12
        }
      },
      lineLength: 50
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
