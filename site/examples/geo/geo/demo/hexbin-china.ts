import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .polygon()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/hexbin-china.json',
    transform: [
      {
        type: 'custom',
        callback: (data) => {
          const dv = new DataSet.View().source(data).transform({
            type: 'bin.hexagon',
            fields: ['longitude', 'latitude'],
            binWidth: [2, 3],
            as: ['longitude', 'latitude', 'count'],
          });
          return dv.rows;
        },
      },
    ],
  })
  .encode('x', 'longitude')
  .encode('y', 'latitude')
  .encode('color', 'count')
  .scale('color', {
    range: '#BAE7FF-#1890FF-#0050B3',
  })
  .style('lineWidth', 5)
  .style('stroke', '#fff')
  .axis(false)
  .legend(false)
  .tooltip({
    field: 'count',
  })
  .state('active', { fill: 'orange' })
  .state('inactive', { opacity: 0.8 })
  .interaction('elementHighlight', true);

chart.render();
