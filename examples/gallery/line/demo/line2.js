fetch('../data/salesTrend.json')
  .then(res => res.json())
  .then(data => {
    const TICKS = [ '2012-09', '2013-05', '2014-01', '2014-09', '2015-05', '2016-01', '2016-09', '2017-05', '2018-02' ];
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 50, 20, 50, 20 ]
    });
    chart.source(data, {
      date: {
        ticks: TICKS
      }
    });
    chart.legend(false);
    chart.axis('buyin', false);
    chart.axis('date', {
      label: {
        textStyle: {
          fill: '#aaaaaa'
        }
      }
    });
    chart.line().position('date*buyin');
    chart.point().position('date*buyin')
      .size('date', val => {
        if (TICKS.indexOf(val) >= 0) {
          return 3;
        }
        return 0;
      })
      .label('date*buyin', (date, buyin) => {
        if (TICKS.indexOf(date) >= 0) {
          return buyin + '万';
        }
        return '';
      }, {
        textStyle: {
          fill: '#7a7a7a',
          fontSize: 12,
          stroke: 'white',
          lineWidth: 2,
          fontWeight: 300
        }
      })
      .style({ lineWidth: 2 });

    chart.guide().line({
      top: true,
      start: [ '2012-09', 5396 ],
      end: [ '2018-02', 5396 ],
      lineStyle: {
        stroke: '#595959',
        lineWidth: 1,
        lineDash: [ 3, 3 ]
      },
      text: {
        position: 'start',
        style: {
          fill: '#8c8c8c',
          fontSize: 12,
          fontWeight: 300
        },
        content: '均值线 5,396万',
        offsetY: -5
      }
    });
    chart.render();
  });
