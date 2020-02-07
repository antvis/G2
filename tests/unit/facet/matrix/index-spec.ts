import { DataView } from '@antv/data-set';
import { Chart } from '../../../../src';
import { ListData } from '../../../../src/facet/interface';
import { createDiv } from '../../../util/dom';
import IRIS from '../../../../examples/data/iris.json';
import Matrix from '../../../../src/facet/matrix';

const COLOR = ['#1890FF', '#2FC25B', '#FACC14'];

describe('facet matrix', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    autoFit: true,
    height: 500,
    padding: [16, 16, 48, 48],
  });

  chart.data(IRIS);

  chart.scale({
    Species: {
      sync: true,
    }
  });

  chart.facet('matrix', {
    fields: [ 'SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth' ],
    eachView(view, facet) {
      if (facet.rowIndex === facet.columnIndex) {
        // 对角线的图形，做数据封箱之后绘制图形
        const dv = new DataView();
        dv.source(facet.data)
          .transform({
            type: 'bin.histogram',
            field: facet.columnField,  // 对应数轴上的一个点
            bins: 30,               // 分箱个数
            as: [ facet.columnField, 'count' ],
            groupBy: [ 'Species' ]
          });
        view.data(dv.rows);

        view.interval()
          .position(facet.columnField + '*count')
          .color('Species', COLOR)
          .adjust('stack')
          .style({ opacity: 0.85 });
      } else {
        view.point()
          .position([ facet.columnField, facet.rowField ])
          .color('Species', COLOR)
          .shape('circle')
          .style({ opacity: 0.3 })
          .size(3);
      }
    }
  });
  chart.render();

  it('matrix', () => {
    expect(chart.views.length).toBe(16);
    expect(chart.views[0].geometries[0].type).toBe('interval');
    expect(chart.views[1].geometries[0].type).toBe('point');
    // @ts-ignore
    expect(chart.views[3].region).toEqual({
      start: { x: 0, y: 3 / 4 },
      end: { x: 1 / 4, y: 1 },
    });

    // @ts-ignore
    const facetData0 = chart.facetInstance.facets[0] as ListData;
    // 分面数据和原始数据一样
    expect(facetData0.data).toEqual(IRIS);

    // 默认不显示 title
    // @ts-ignore
    expect(chart.views[0].annotation().option).toEqual([]);
  });

  it('showTitle', () => {
    chart.facet('matrix', {
      fields: ['SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth'],
      showTitle: true,
      rowTitle: {
        style: {
          fill: 'red',
        }
      },
      eachView(view, facet) {
        if (facet.rowIndex === facet.columnIndex) {
          // 对角线的图形，做数据封箱之后绘制图形
          const dv = new DataView();
          dv.source(facet.data)
            .transform({
              type: 'bin.histogram',
              field: facet.columnField,  // 对应数轴上的一个点
              bins: 30,               // 分箱个数
              as: [facet.columnField, 'count'],
              groupBy: ['Species']
            });
          view.data(dv.rows);

          view.interval()
            .position(facet.columnField + '*count')
            .color('Species', COLOR)
            .adjust('stack')
            .style({opacity: 0.85});
        } else {
          view.point()
            .position([facet.columnField, facet.rowField])
            .color('Species', COLOR)
            .shape('circle')
            .style({opacity: 0.3})
            .size(3);
        }
      }
    });

    chart.render();

    // @ts-ignore
    const facetInstance = chart.facetInstance as Matrix;
    // @ts-ignore
    expect(facetInstance.cfg.showTitle).toBe(true);
    // @ts-ignore
    const fontFamily = chart.getTheme().fontFamily;
    // @ts-ignore
    expect(facetInstance.cfg.rowTitle.style).toEqual({
      fontSize: 14,
      fill: 'red',
      fontFamily,
    });
    // @ts-ignore
    expect(chart.views[12].annotation().option[0].style.fill).toBe('#666');
    // @ts-ignore
    expect(chart.views[12].annotation().option[1].style.fill).toBe('red');
  });
});
