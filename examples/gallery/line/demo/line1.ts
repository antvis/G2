import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/terrorism.json')
  .then(res => res.json())
  .then(data => {
    const ds = new DataSet();

    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      syncViewPadding: true,
    });

    chart.scale({
      Deaths: {
        sync: true,
        nice: true,
      },
      death: {
        sync: true,
        nice: true,
      },
    });


    const dv1 = ds.createView().source(data);
    dv1.transform({
      type: 'map',
      callback: (row) => {
        if (typeof (row.Deaths) === 'string') {
          row.Deaths = row.Deaths.replace(',', '');
        }
        row.Deaths = parseInt(row.Deaths, 10);
        row.death = row.Deaths;
        row.year = row.Year;
        return row;
      }
    });
    const view1 = chart.createView();
    view1.data(dv1.rows);
    view1.axis('Year', {
      subTickLine: {
        count: 3,
        length: 3,
      },
      tickLine: {
        length: 6,
      },
    });
    view1.axis('Deaths', {
      label: {
        formatter: text => {
          return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        }
      }
    });
    view1.line().position('Year*Deaths');


    const dv2 = ds.createView().source(dv1.rows);
    dv2.transform({
      type: 'regression',
      method: 'polynomial',
      fields: ['year', 'death'],
      bandwidth: 0.1,
      as: ['year', 'death']
    });

    const view2 = chart.createView();
    view2.axis(false);
    view2.data(dv2.rows);
    view2.line().position('year*death').style({
      stroke: '#969696',
      lineDash: [3, 3]
    })
      .tooltip(false);
    view1.annotation().text({
      content: '趋势线',
      position: ['1970', 2500],
      style: {
        fill: '#8c8c8c',
        fontSize: 14,
        fontWeight: 300
      },
      offsetY: -70
    });
    chart.render();
  });
