import { DataView } from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('../data/time-scatter.json')
  .then(res => res.json())
  .then(data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });

    const dv = new DataView();
    dv.source(data)
      .transform({
        type: 'map',
        callback: obj => {
          obj.exp_amo = obj.exp_amo * 1;
          return obj;
        }
      });

    chart.data(dv.rows);
    chart.animate(false);
    chart.scale({
      exp_dat: {
        type: 'time',
        mask: 'M/YY',
        tickCount: 14
      },
      exp_amo: {
        type: 'log',
        ticks: [225, 1000000, 2000000, 4000000, 6000000]
      }
    });
    chart.legend(false);
    chart.tooltip({
      showTitle: false,
    });
    chart.axis('exp_dat', {
      tickLine: null,
      label: {
        style: {
          fontSize: 14
        }
      }
    });
    chart.axis('exp_amo', {
      tickLine: null,
      line: null,
      grid: {
        line: {
          style: {
            lineDash: null,
            stroke: '#999'
          }
        }
      },
      label: {
        formatter: val => {
          let formatted;
          if (+val === 225) {
            formatted = 0;
          } else {
            formatted = +val / 1000000;
          }
          return '$' + formatted + 'M';
        }
      }
    });
    chart.point()
      .position('exp_dat*exp_amo')
      .size('exp_amo', [1, 10])
      .shape('circle')
      .tooltip('exp_dat*can_nam*spe_nam*exp_amo');
    chart.render();
  });
