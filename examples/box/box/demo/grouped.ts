import { DataView } from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/iris.json')
  .then(res => res.json())
  .then(data => {
    const dv = new DataView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth'], // 展开字段集
      key: 'type',
      value: 'value'
    }).transform({
      type: 'bin.quantile',
      field: 'value',    // 计算分为值的字段
      as: '_bin',    // 保存分为值的数组字段
      groupBy: ['Species', 'type']
    });

    const colorMap = {
      'I. setosa': '#5B8FF9',
      'I. versicolor': '#5AD8A6',
      'I. virginica': '#5D7092',
    };

    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500
    });
    chart.data(dv.rows);
    chart.scale('_bin', {
      nice: true,
    });
    chart.tooltip({
      showMarkers: false,
      shared: true,
    });

    chart
      .schema()
      .position('type*_bin')
      .color('Species', val => colorMap[val])
      .shape('box')
      .style('Species', (val) => {
        return {
          stroke: '#545454',
          fill: colorMap[val],
          fillOpacity: 0.3,
        };
      })
      .adjust('dodge');

    chart.interaction('active-region');

    chart.render();
  });
