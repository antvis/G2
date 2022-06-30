import DataSet from '@antv/data-set';
import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('g2plot #2601', () => {
  it('', () => {

    const values = [
      10.5,
      10.7,
      10.8,
    ];

    const data = values.map((value) => {
      return {
        value,
      };
    });
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'bin.histogram',
      field: 'value',
      binWidth: 2,
      as: ['value', 'count'],
    });

    const chart = new Chart({
      container: createDiv(),
      autoFit: false,
      width: 200,
      height: 400,
    });

    chart.data(dv.rows);
    chart.scale({});
    chart.animate(false);
    chart.tooltip({
      showMarkers: true,
    });
    chart.axis('count',{
      label: null,
    });

    chart.interval().position('value*count');


    chart.render();

    chart.showTooltip({ x: 100, y: 100 });

    expect(chart.canvas.findAllByName('tooltipMarkersGroup')[0].cfg.children[0].attr('x')).toBe(100); 

    chart.destroy();
  });
});
