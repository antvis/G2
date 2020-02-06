import DIAMOND from '../../../../examples/data/diamond.json';
import { Chart } from '../../../../src';
import { ListData } from '../../../../src/facet/interface';
import { createDiv } from '../../../util/dom';

describe('facet rect', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    autoFit: true,
    height: 500,
    padding: 48,
  });
  chart.data(DIAMOND);

  chart.scale({
    carat: {
      sync: true
    },
    price: {
      sync: true
    },
    cut: {
      sync: true
    }
  });

  chart.facet('list', {
    fields: [ 'cut' ],
    cols: 3, // 超过3个换行
    padding: 30,
    eachView(view) {
      view.point()
        .position('carat*price')
        .color('cut')
        .shape('circle')
        .style({ opacity: 0.3 })
        .size(3);
    }
  });
  chart.render();

  it('list', () => {
    // facet views
    expect(chart.views.length).toBe(5);
    // @ts-ignore
    expect(chart.views[0].padding).toEqual(30);
    // @ts-ignore
    expect(chart.views[3].region).toEqual({
      start: { x: 0, y: 1 / 2 },
      end: { x: 1 / 3, y: 1 },
    });

    // @ts-ignore
    const facetData0 = chart.facetInstance.facets[0] as ListData;
    expect(facetData0.total).toBe(5);
  });

  it('no field throw', () => {
    chart.facet('list', {
      fields: [],
      cols: 3,
      padding: 30,
      eachView(view) {
        view.point()
          .position('carat*price')
          .color('cut')
          .shape('circle')
          .style({ opacity: 0.3 })
          .size(3);
      }
    });

    expect(() => {
      chart.render()
    }).toThrow('No `fields` specified!');
  });

  it('default cols', () => {
    chart.facet('list', {
      fields: ['cut'],
      padding: 30,
      eachView(view) {
        view.point()
          .position('carat*price')
          .color('cut')
          .shape('circle')
          .style({ opacity: 0.3 })
          .size(3);
      }
    });

    chart.render();

    // @ts-ignore
    const facetData0 = chart.facetInstance.facets[0] as ListData;
    expect(facetData0.rowValuesLength).toBe(1);
    expect(facetData0.columnValuesLength).toBe(5);
  });
});
