
fetch('../data/fertility2.json')
  .then(res => res.json())
  .then(data => {
    const dv = new DataSet.View().source(data).transform({
      type: 'aggregate',
      fields: [ 'value', 'value' ],
      operations: [ 'min', 'max' ],
      as: [ 'min', 'max' ],
      groupBy: [ 'country' ],
      orderBy: [ 'year' ]
    }).rows;

    data = new DataSet.View().source(data)
      .transform({
        type: 'sort-by',
        field: 'year',
        orderBy: 'ASC'
      });
    const valueMap = {};
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: [ 10, 200, 50, 50 ]
    });
    chart.source(data);
    chart.legend({ attachLast: true });
    chart.line().position('year*value').color('country')
      .size('country', country => {
        if (country === 'China') return 5;
        return 2;
      })
      .label('country*value*year', function(country, value, year) {
        let result = null;
        for (let i = 0; i < dv.length; i++) {
          if (dv[i].country === country) {
            if (dv[i].min === value && !valueMap[country + 'min']) {
              valueMap[country + 'min'] = year;
              result = value;
              break;
            }

            if (dv[i].max === value && !valueMap[country + 'max']) {
              valueMap[country + 'max'] = year;
              result = value;
              break;
            }
          }
        }
        return result;
      }, {
        labelLine: false,
        offset: 10,
        textStyle: {
          stroke: '#fff',
          lineWidth: 2
        }
      })
      .style({ lineCap: 'round' });
    chart.point()
      .position('year*value')
      .color('country')
      .style({ lineWidth: 2 })
      .size('country*value*year', function(country, value, year) {
        if (valueMap[country + 'min'] === year || valueMap[country + 'max'] === year) {
          return 3;
        }
        return 0;
      });
    chart.render();
  });
