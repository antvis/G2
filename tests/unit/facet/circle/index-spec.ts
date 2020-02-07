import { DataView } from '@antv/data-set';
import DIAMOND from '../../../../examples/data/diamond.json';
import { Chart } from '../../../../src';
import { CircleData, ListData } from '../../../../src/facet/interface';
import { createDiv } from '../../../util/dom';

function eachView(view, facet) {
  const facetData = facet.data;
  const dv = new DataView();
  dv.source(facetData).transform({
    type: 'aggregate',
    fields: [ 'price' ],
    operations: [ 'mean' ],
    as: [ 'mean' ],
    groupBy: [ 'cut' ]
  });

  view.data(dv.rows);
  view.interval().position('cut*mean').color('cut');
}

describe('facet circle', () => {
  const div = createDiv();
  const chart = new Chart({
    container: div,
    autoFit: true,
    height: 500,
    padding: [ 30, 90, 80, 80 ]
  });
  chart.data(DIAMOND);

  chart.scale({
    mean: {
      sync: true
    },
    cut: {
      sync: true
    }
  });

  chart.coordinate('polar');
  chart.axis(false);

  chart.facet('circle', {
    fields: [ 'clarity' ],
    title: { style: { fill: 'red' } },
    eachView,
  });
  chart.render();

  it('circle', () => {
    // facet views
    expect(chart.views.length).toBe(8);
    // @ts-ignore
    expect(chart.views[3].region).toEqual({
      start: {
        x: 0.6578483985907019,
        y: 0.657848398590702,
      },
      end: {
        x: 0.8535533905932738,
        y: 0.8535533905932737,
      },
    });

    // @ts-ignore
    const facetCfg = chart.facetInstance.cfg;
    expect(facetCfg.showTitle).toBe(true);
    expect(facetCfg.title.style.fill).toBe('red');
  });

  it('no field throw', () => {
    chart.facet('circle', {
      fields: [],
      eachView,
    });

    expect(() => {
      chart.render()
    }).toThrow('No `fields` specified!');
  });

  it('title style', () => {
    chart.facet('circle', {
      fields: [ 'clarity' ],
      showTitle: false,
      eachView,
    });
    chart.render();

    // @ts-ignore
    const facetCfg = chart.facetInstance.cfg;
    expect(facetCfg.showTitle).toBe(false);
    expect(facetCfg.title.style.fill).toBe('#666');
  });
});
