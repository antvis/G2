import { DataView } from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('../data/stock-03.json')
  .then(res => res.json())
  .then(data => {
    const dv = new DataView();
    dv.source(data)
      .transform({
        type: 'map',
        callback: obj => {
          obj.stockRange = [obj.start, obj.end, obj.highest, obj.lowest];
          return obj;
        }
      });
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });
    chart.data(dv.rows);
    chart.scale({
      date: {
        type: 'time',
        nice: false,
        // mask: 'MM-DD',
        tickCount: 10
      },
      range: {
        min: 20,
        max: 35,
        nice: false,
        tickInterval: 2
      },
      mean: {
        min: 20,
        max: 35,
        nice: false
      },
      stockRange: {
        min: 20,
        max: 35,
        nice: false
      }
    });
    chart.axis('mean', false);
    chart.axis('stockRange', false);
    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });
    chart.area().position('date*range').color('#64b5f6');
    chart.schema()
      .position('date*stockRange')
      .color('trend', val => {
        if (val === 'up') {
          return '#f04864';
        }

        if (val === 'down') {
          return '#2fc25b';
        }
      })
      .shape('candle')
      .tooltip('start*end*highest*lowest')
      .animate({
        appear: {
          animation: 'waveIn'
        }
      });
    chart.line().position('date*mean').color('#FACC14');
    chart.render();
  });
