const { DataView } = DataSet;
fetch('../data/stock-03.json')
  .then(res => res.json())
  .then(data => {
    const dv = new DataView();
    dv.source(data)
      .transform({
        type: 'map',
        callback: obj => {
          obj.stockRange = [ obj.start, obj.end, obj.highest, obj.lowest ];
          return obj;
        }
      });
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      animate: false
    });
    chart.source(dv, {
      date: {
        type: 'time',
        nice: false,
        mask: 'MM-DD',
        tickCount: 10
      },
      range: {
        min: 20,
        max: 35,
        nice: false,
        tickInterval: 2
      },
      mean: {
        min: 20,
        max: 35,
        nice: false
      },
      stockRange: {
        min: 20,
        max: 35,
        nice: false
      }
    });
    chart.axis('mean', false);
    chart.axis('stockRange', false);
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.area().position('date*range').color('#64b5f6');
    chart.schema()
      .position('date*stockRange')
      .color('trend', val => {
        if (val === 'up') {
          return '#f04864';
        }

        if (val === 'down') {
          return '#2fc25b';
        }
      })
      .shape('candle')
      .tooltip('start*end*highest*lowest');
    chart.line().position('date*mean').color('#FACC14');
    chart.render();
  });
