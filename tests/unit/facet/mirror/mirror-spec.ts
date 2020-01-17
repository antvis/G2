import DataSet from '@antv/data-set';
import POPULATION from '../../../../examples/data/population.json';
import { Chart } from '../../../../src';

import { createDiv } from '../../../util/dom';

function getData() {
  const data = POPULATION;

  const tmp = [];
  const dates = [];
  // @ts-ignore
  data.male.values.forEach(function(obj) {
    if (dates.indexOf(obj.date) === -1) {
      dates.push(obj.date);
    }
    obj.age_groups.forEach(function(subObject) {
      // @ts-ignore
      subObject.gender = 'male';
      // @ts-ignore
      subObject.date = obj.date;
      tmp.push(subObject);
    });
  });
  // @ts-ignore
  data.female.values.forEach(function(obj) {
    obj.age_groups.forEach(function(subObject) {
      // @ts-ignore
      subObject.gender = 'female';
      // @ts-ignore
      subObject.date = obj.date;
      tmp.push(subObject);
    });
  });

  const ds = new DataSet();
  const dv = ds.createView()
    .source(tmp)
    .transform({
      type: 'filter',
      callback(row) { // 判断某一行是否保留，默认返回true
        return new Date(row.date * 1000).getFullYear() === new Date(dates[0] * 1000).getFullYear();
      }
    });

  return dv.rows;
}

describe('facet mirror transpose = false', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    width: 600,
    height: 500,
    padding: [16, 48, 0, 48]
  });

  chart.data(getData());
  chart.scale({
    age: {
      sync: true,
      tickCount: 11
    },
    total_percentage: {
      sync: true,
      formatter(v) {
        return v + '%';
      }
    },
    gender: {
      sync: true
    }
  });

  chart.facet('mirror', {
    fields: [ 'gender' ],
    transpose: false,
    padding: [ 0, 0, 32, 0 ],
    title: {
      offsetX: 16,
      offsetY: 0,
    },
    eachView(view) {
      view.interval()
        .position('age*total_percentage')
        .color('gender', [ '#1890ff', '#f04864' ]);
    }
  });

  it('render', () => {
    chart.render();

    // @ts-ignore
    const facetInstance = chart.facetInstance;
    // @ts-ignore
    const facets = facetInstance.facets;
    // facet data
    expect(facets.length).toBe(2);
    const [top, bottom] = facets;
    expect(top.rowIndex).toBe(0);
    expect(top.columnIndex).toBe(0);

    expect(bottom.rowIndex).toBe(1);
    expect(bottom.columnIndex).toBe(0);

    // axis 处理逻辑
    expect(top.view.getOptions().axes).toEqual({
      age: undefined,
      total_percentage: undefined,
    });
    expect(bottom.view.getOptions().axes).toEqual({
      age: {
        label: null,
        title: null,
      },
      total_percentage: undefined,
    });

    // annotation
    // @ts-ignore
    const topOption = top.view.getController('annotation').option[0];
    // @ts-ignore
    expect(topOption.type).toEqual('text');
    // @ts-ignore
    expect(topOption.position).toEqual(['100%', '50%']);
    // @ts-ignore
    expect(topOption.offsetX).toEqual(16);
    // @ts-ignore
    expect(topOption.offsetY).toEqual(0);

    // @ts-ignore
    const bottomOption = bottom.view.getController('annotation').option[0];
    // @ts-ignore
    expect(bottomOption.type).toEqual('text');
    // @ts-ignore
    expect(bottomOption.position).toEqual(['100%', '50%']);
    // @ts-ignore
    expect(bottomOption.offsetX).toEqual(16);
    // @ts-ignore
    expect(bottomOption.offsetY).toEqual(0);
  });
});

describe('facet mirror transpose = true', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    width: 600,
    height: 500,
    padding: [32, 16, 48, 16]
  });

  chart.data(getData());
  chart.scale({
    age: {
      sync: true,
      tickCount: 11
    },
    total_percentage: {
      sync: true,
      formatter(v) {
        return v + '%';
      }
    },
    gender: {
      sync: true
    }
  });

  chart.facet('mirror', {
    fields: [ 'gender' ],
    transpose: true,
    padding: [ 0, 48, 0, 0 ],
    title: {
      offsetX: 0,
      offsetY: -16,
    },
    eachView(view) {
      view.interval()
        .position('age*total_percentage')
        .color('gender', [ '#1890ff', '#f04864' ]);
    }
  });

  it('render', () => {
    chart.render();

    // @ts-ignore
    const facetInstance = chart.facetInstance;
    // @ts-ignore
    const facets = facetInstance.facets;
    // facet data
    expect(facets.length).toBe(2);
    const [left, right] = facets;
    expect(left.rowIndex).toBe(0);
    expect(left.columnIndex).toBe(0);

    expect(right.rowIndex).toBe(0);
    expect(right.columnIndex).toBe(1);

    // axis 处理逻辑
    expect(left.view.getOptions().axes).toEqual({
      age: undefined,
      total_percentage: undefined,
    });
    expect(right.view.getOptions().axes).toEqual({
      age: {
        label: null,
        title: null,
      },
      total_percentage: undefined,
    });

    // annotation
    // @ts-ignore
    const leftOption = left.view.getController('annotation').option[0];
    // @ts-ignore
    expect(leftOption.type).toEqual('text');
    // @ts-ignore
    expect(leftOption.position).toEqual(['50%', '0%']);
    // @ts-ignore
    expect(leftOption.offsetX).toEqual(0);
    // @ts-ignore
    expect(leftOption.offsetY).toEqual(-16);

    // @ts-ignore
    const rightOption = right.view.getController('annotation').option[0];
    // @ts-ignore
    expect(rightOption.type).toEqual('text');
    // @ts-ignore
    expect(rightOption.position).toEqual(['50%', '0%']);
    // @ts-ignore
    expect(rightOption.offsetX).toEqual(0);
    // @ts-ignore
    expect(rightOption.offsetY).toEqual(-16);
  });

  it('rerender', () => {
    chart.render();
    // @ts-ignore
    const facetInstance = chart.facetInstance;

    // @ts-ignore
    expect(facetInstance.facets.length).toBe(2);
    expect(facetInstance.destroyed).toBe(false);
  });

  it('clear', () => {
    // @ts-ignore
    const facetInstance = chart.facetInstance;
    facetInstance.clear();

    // @ts-ignore
    expect(facetInstance.facets.length).toBe(2);
    // @ts-ignore
    expect(facetInstance.facets[0].view).toBe(undefined);
    expect(facetInstance.destroyed).toBe(false);

    expect(facetInstance.container).toBeDefined();

    expect(chart.views.length).toBe(0);
  });

  it('destroy', () => {
    // @ts-ignore
    const facetInstance = chart.facetInstance;
    facetInstance.destroy();

    // @ts-ignore
    expect(facetInstance.facets).toEqual([]);
    expect(facetInstance.destroyed).toBe(true);
    expect(chart.views.length).toBe(0);
  });
});
