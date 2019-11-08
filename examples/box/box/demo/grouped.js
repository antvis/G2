fetch('../data/iris.json')
  .then(res => res.json())
  .then(data => {
    const { DataView } = DataSet;
    const dv = new DataView().source(data);
    dv.transform({
      type: 'fold',
      fields: [ 'SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth' ], // 展开字段集
      key: 'type',
      value: 'value'
    }).transform({
      type: 'bin.quantile',
      field: 'value',    // 计算分为值的字段
      as: '_bin',    // 保存分为值的数组字段
      groupBy: [ 'Species', 'type' ]
    });

    const colorMap = {
      'I. setosa': G2.Global.colors[0],
      'I. versicolor': G2.Global.colors[1],
      'I. virginica': G2.Global.colors[2]
    };

    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
      // padding: [ 20, 120, 95 ]
    });
    chart.source(dv);
    chart.legend({
      marker: 'circle'
    });
    chart.tooltip({
      crosshairs: {
        type: 'rect'
      }
    });
    chart.schema().position('type*_bin')
      .color('Species', val => {
        return colorMap[val];
      })
      .shape('box')
      .style('Species', {
        stroke: '#545454',
        fill: val => {
          return colorMap[val];
        },
        fillOpacity: 0.3
      })
      .adjust('dodge');
    chart.render();
  });
