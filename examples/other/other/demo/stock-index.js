fetch('../data/stocks.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet({
      state: {
        date: 'Jan 1 2005'
      }
    });
    const priceByKey = {};
    const srcDv = new DataSet.View(ds, {
      watchingStates: []
    });
    srcDv.source(data)
      .transform({
        type: 'map',
        callback(row) {
          row.key = `${row.symbol}-${row.date}`;
          row.price = parseInt(row.price, 10);
          priceByKey[row.key] = row.price;
          return row;
        }
      });
    const destDv = new DataSet.View(ds, {
      watchingStates: [ 'date' ]
    });
    destDv.source(srcDv)
      .transform({
        type: 'map',
        callback(row) {
          const key = `${row.symbol}-${ds.state.date}`;
          const indexedPrice = priceByKey[key];
          row.rate = (!indexedPrice || indexedPrice === 0) ? 0 : (row.price - indexedPrice) / indexedPrice;
          return row;
        }
      });

    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 'auto', 'auto', 50, 'auto' ],
      animate: false
    });
    chart.scale({
      date: {
        type: 'time'
      },
      rate: {
        formatter: val => `${(val * 100).toFixed(1)}%`
      }
    });
    chart.axis('rate', {
      grid: {
        hightLightZero: true
      }
    });
    chart.axis('date', false);
    chart.legend({
      attachLast: true
    });
    chart.tooltip(false);
    chart.source(destDv);
    chart.line()
      .position('date*rate')
      .color('symbol');

    let dateLineGuide;
    chart.on('mousemove', ev => {
      const records = chart.getSnapRecords(ev);
      if (G2.Util.isArray(records) && records.length) {
        const date = records[0]._origin.date;
        if (date !== ds.state.date) {
          if (dateLineGuide) {
            dateLineGuide.clear();
            dateLineGuide = null;
          }
          ds.setState('date', records[0]._origin.date);
          dateLineGuide = chart.guide().line({
            start: [ date, 'start' ],
            end: [ date, 'end' ],
            lineStyle: {
              lineDash: null,
              stroke: 'grey'
            },
            text: {
              autoRotate: false,
              position: 'start',
              content: ds.state.date,
              style: {
                fill: 'grey',
                textAlign: 'center'
              },
              offsetY: 22
            }
          });
        }
      }
    });
    chart.render();
  });
