import { DataView } from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('../data/iris.json')
  .then((res) => res.json())
  .then((data) => {
    const fields = ['PetalWidth', 'PetalLength', 'SepalWidth', 'SepalLength'];
    // 小提琴图用 KDE transform 提供数据
    const dv1 = new DataView().source(data).transform({
      type: 'kde',
      extent: [0, 8], // 采样范围
      fields,
      as: ['key', 'y', 'size'], // 生成的统计字段：字段名、采样点、采样点对应的概率值
      groupBy: ['Species'],
      minSize: 0.01, // 小于这个值的概率将被忽略
    });
    // 需要根据分组提供分位值等统计数据，所以提前拍平数据
    const dv2 = new DataView().source(data);
    dv2.transform({
      type: 'fold',
      fields,
    });
    // 计算 95% 分位值，用于画 95% 分位线
    const dv3 = new DataView().source(dv2).transform({
      type: 'bin.quantile',
      field: 'value',
      as: 'y',
      groupBy: ['key', 'Species'],
      p: [0.05, 0.95],
    });
    // 计算 Q1 和 Q3 分位值，用于画分位线
    const dv4 = new DataView().source(dv2).transform({
      type: 'bin.quantile',
      field: 'value',
      as: 'y',
      groupBy: ['key', 'Species'],
      p: [1 / 4, 3 / 4],
    });
    // 计算中位值
    const dv5 = new DataView().source(dv2).transform({
      type: 'aggregate',
      fields: ['value'],
      operations: ['median'],
      as: ['y'],
      groupBy: ['key', 'Species'],
    });
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      syncViewPadding: true,
    });
    chart.scale({
      key: { sync: true },
      y: { sync: true },
    });
    chart.tooltip({ showMarkers: false, shared: true });

    const adjustCfg = [
      {
        type: 'dodge',
        marginRatio: 1 / 32,
      },
    ];
    // violin plot
    const view1 = chart.createView();
    view1.data(dv1.rows);
    view1
      .violin()
      .position('key*y')
      .color('Species')
      .adjust(adjustCfg)
      // 小提琴图还支持 smooth，smooth-hollow 两种 shape
      // .shape('smooth')
      // .shape('smooth-hollow')
      .size('size')
      .style({
        lineWidth: 1,
        fillOpacity: 0.3,
        strokeOpacity: 0.75,
      })
      .tooltip(false);

    // 95% confidence interval
    const view3 = chart.createView();
    view3.data(dv3.rows);
    view3
      .interval()
      .position('key*y')
      .color('Species')
      .adjust(adjustCfg)
      .size(1)
      .style({
        lineWidth: 0,
      })
      .tooltip(false);
    // // Q1 / Q3
    const view4 = chart.createView();
    view4.data(dv4.rows);
    view4
      .interval()
      .position('key*y')
      .color('Species')
      .adjust(adjustCfg)
      .size(8)
      .style({
        fillOpacity: 1,
      })
      .tooltip('y', (value) => {
        return {
          name: 'Q1-Q3',
          value,
        };
      });
    // median
    const view5 = chart.createView();
    view5.data(dv5.rows);
    view5
      .point()
      .position('key*y')
      .color('Species')
      .adjust(adjustCfg)
      .size(3)
      .style({
        fill: 'white',
        lineWidth: 0,
      })
      .tooltip('y', (value) => {
        return {
          name: 'Median',
          value,
        };
      });

    view1.axis('key', {
      grid: {
        line: null,
      },
      tickLine: {
        alignTick: false,
      },
    });
    view1.axis('y', {
      grid: {
        line: {
          style: {
            lineWidth: 0.5,
            lineDash: [4, 4],
          },
        },
      },
    });
    view3.axis(false);
    view4.axis(false);
    view5.axis(false);
    chart.render();
  });
