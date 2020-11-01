import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/fertility.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'sort',
      callback(a, b) {
        return a.year - b.year;
      }
    });
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [50, 20, 50, 50]
    });
    chart.data(dv.rows);

    chart.scale({
      value: {
        max: 9,
        min: 1
      },
      year: {
        range: [0, 1],
        ticks: ['1950', '2015']
      }
    });

    chart.axis('year', {
      grid: {
        line: {
          style: {
            lineDash: [0, 0],
            lineWidth: 1,
            stroke: '#e9e9e9'
          }
        }
      },
      label: {
        rotate: Math.PI / 4,
      }
    });

    chart.tooltip({
      showCrosshairs: true
    });

    chart.facet('rect', {
      fields: ['country'],
      columnTitle: {
        style: {
          fontSize: 12,
          textAlign: 'center',
          fontWeight: 300,
          fill: '#8d8d8d'
        }
      },
      padding: 8,
      eachView: (view, facet) => {
        view.line()
          .position('year*value')
          .shape('smooth')
          .style({ opacity: 0.8 });
      },
    });
    chart.render();
  });
