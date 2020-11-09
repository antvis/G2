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
      padding: 30
    });
    chart.data(dv.rows);

    chart.scale({
      value: {
        max: 9,
        min: 1,
        tickCount: 2,
        sync: true,
        formatter: value => {
          return value + '%';
        }
      },
      year: {
        range: [0, 1],
      },
    });

    chart.axis('value', {
      grid: null,
      label: {
        style: {
          fontSize: 10,
        }
      }
    });

    chart.axis('year', {
      tickLine: null,
    });

    chart.facet('rect', {
      rowTitle: {
        style: {
          fontSize: 12,
          textAlign: 'end',
          fontWeight: 300,
          fill: '#8d8d8d'
        }
      },
      fields: [null, 'country'],
      padding: 10,
      eachView: (view) => {
        view.line().position('year*value');
      }
    });
    chart.render();
  });
