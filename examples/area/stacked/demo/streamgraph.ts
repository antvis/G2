import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('../data/baby-names.json')
  .then((res) => res.json())
  .then((data) => {
    const { DataView } = DataSet;
    const dv = new DataView()
      .source(data)
      .transform({
        type: 'fill-rows',
        groupBy: ['name'],
        orderBy: ['year'],
      })
      .transform({
        type: 'impute',
        field: 'n',
        method: 'value',
        value: 0,
      })
      .transform({
        type: 'aggregate',
        fields: ['n'],
        operations: ['sum'],
        groupBy: ['year', 'name'],
        orderBy: ['year'],
        as: ['count'],
      });

    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [20, 140, 60, 50],
    });
    chart.data(dv.rows);
    chart.scale('year', {
      tickInterval: 20,
    });
    chart.legend({
      flipPage: true,
      position: 'right',
    });
    chart.tooltip({
      showCrosshairs: false,
    });
    chart.axis('count', {
      line: {
        style: {
          lineWidth: 1,
          stroke: '#BFBFBF',
        },
      },
      tickLine: {
        length: 8,
        style: {
          stroke: '#ddd',
        },
      },
      grid: null,
    });
    chart
      .area()
      .position('year*count')
      .adjust(['stack', 'symmetric'])
      .color('name')
      .shape('smooth');
    chart.render();
  });
