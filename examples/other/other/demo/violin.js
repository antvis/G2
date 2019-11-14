
fetch('../data/iris.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet();

    const fields = [ 'PetalWidth', 'PetalLength', 'SepalWidth', 'SepalLength' ];
    // 小提琴图用 KDE transform 提供数据
    const dv1 = ds.createView().source(data).transform({
      type: 'kde',
      extent: [ 0, 8 ], // 采样范围
      fields,
      as: [ 'key', 'y', 'size' ], // 生成的统计字段：字段名、采样点、采样点对应的概率值
      groupBy: [ 'Species' ],
      minSize: 0.01 // 小于这个值的概率将被忽略
    });
    // 需要根据分组提供分位值等统计数据，所以提前拍平数据
    const dv2 = ds.createView().source(data);
    dv2.transform({
      type: 'fold',
      fields
    });
    // 计算 95% 分位值，用于画 95% 分位线
    const dv3 = ds.createView().source(dv2).transform({
      type: 'bin.quantile',
      field: 'value',
      as: 'y',
      groupBy: [ 'key', 'Species' ],
      p: [ 0.025, 0.975 ]
    });
    // 计算 Q1 和 Q3 分位值，用于画分位线
    const dv4 = ds.createView().source(dv2).transform({
      type: 'bin.quantile',
      field: 'value',
      as: 'y',
      groupBy: [ 'key', 'Species' ],
      p: [ 1 / 4, 3 / 4 ]
    });
    // 计算中位值
    const dv5 = ds.createView().source(dv2).transform({
      type: 'aggregate',
      fields: [ 'value' ],
      operations: [ 'median' ],
      as: [ 'y' ],
      groupBy: [ 'key', 'Species' ]
    });
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500,
      padding: 'auto',
      theme: {
        widthRatio: {
          column: 0.7 // 小提琴图最宽处占总宽度的比例
        }
      }
    });
    chart.scale({
      key: { sync: true }, // key 字段在其中一个 view 映射到 color 了，在其他所以需要同步，否则
      y: { sync: true }
    });
    // chart.coord('polar');
    chart.axis('key', {
      grid: {
        zIndex: -1,
        align: 'center',
        alternateColor: '#f5f5f5',
        type: 'polygon',
        lineStyle: {
          stroke: 'white'
        }
      },
      tickLine: {
        alignWithLabel: false
      }
    });
    chart.axis('y', {
      line: G2.Global.axis.top.line,
      tickLine: G2.Global.axis.top.tickLine,
      grid: null
    });
    const adjustCfg = [{
      type: 'dodge',
      marginRatio: 1 / 32
    }];
    // violin plot
    const view1 = chart.view();
    view1.source(dv1);
    view1.violin()
      .position('key*y')
      .color('Species')
      .adjust(adjustCfg)
      // .shape('smooth')
      // .shape('smoothHollow')
      .size('size')
      .style({
        lineWidth: 1,
        fillOpacity: 0.3,
        strokeOpacity: 0.75
      })
      .tooltip(false);
    // 95% confidence interval
    const view3 = chart.view();
    view3.source(dv3);
    view3.interval()
      .position('key*y')
      .color('Species')
      .adjust(adjustCfg)
      .size(1)
      .style({
        fill: 'black',
        lineWidth: 0
      })
      .tooltip(false);
    // Q1 / Q3
    const view4 = chart.view();
    view4.source(dv4);
    view4.interval()
      .position('key*y')
      .color('Species')
      .adjust(adjustCfg)
      .size(8)
      .style({
        fill: 'black',
        fillOpacity: 1
      })
      .tooltip('y', value => {
        return {
          name: 'Q1-Q3',
          value
        };
      });
    // median
    const view5 = chart.view();
    view5.source(dv5);
    view5.point()
      .position('key*y')
      .color('Species')
      .adjust(adjustCfg)
      .size(3)
      .style({
        fill: 'white',
        lineWidth: 0
      })
      .tooltip('y', value => {
        return {
          name: 'Median',
          value
        };
      });
    chart.render();
  });
