fetch('../data/basement.json')
  .then(res => res.json())
  .then(data => {
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 20, 50, 50, 50 ]
    });
    chart.axis('time', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.axis('UV', {
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
      time: {
        tickCount: 5
      },
      UV: {
        tickCount: 5
      }
    });
    chart.line().position('time*UV');
    // guide
    const max_min = findMaxMin();
    const max = max_min.max;
    const min = max_min.min;
    chart.guide().dataMarker({
      top: true,
      content: '峰值：' + max.UV,
      position: [ max.time, max.UV ],
      style: {
        text: {
          fontSize: 13,
          stroke: 'white',
          lineWidth: 2
        }
      },
      lineLength: 30
    });
    chart.guide().dataMarker({
      top: true,
      content: '谷值：' + min.UV,
      position: [ min.time, min.UV ],
      style: {
        text: {
          fontSize: 13,
          stroke: 'white',
          lineWidth: 2
        }
      },
      lineLength: 50
    });
    chart.guide().region({
      start: [ '2018-09-01', 'min' ],
      end: [ '2018-09-02', 'max' ]
    });
    chart.guide().region({
      start: [ '2018-09-08', 'min' ],
      end: [ '2018-09-09', 'max' ]
    });
    chart.guide().region({
      start: [ '2018-09-15', 'min' ],
      end: [ '2018-09-16', 'max' ]
    });
    chart.guide().region({
      start: [ '2018-09-22', 'min' ],
      end: [ '2018-09-24', 'max' ]
    });
    chart.render();

    function findMaxMin() {
      let maxValue = 0;
      let minValue = 50000;
      let maxObj = null;
      let minObj = null;
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
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
  });
