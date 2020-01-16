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

describe('facet mirror', () => {

  it('transpose = false', () => {
    const div = createDiv();

    const chart = new Chart({
      container: div,
      width: 600,
      height: 500,
      padding: [16, 16, 0, 48]
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
      eachView(view) {
        view.interval()
          .position('age*total_percentage')
          .color('gender', [ '#1890ff', '#f04864' ]);
      }
    });
    chart.render();

    expect(1).toBe(1);
  });

  it('transpose = true', () => {
    const div = createDiv();

    const chart = new Chart({
      container: div,
      width: 600,
      height: 500,
      padding: [16, 16, 48, 16]
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
      eachView(view) {
        view.interval()
          .position('age*total_percentage')
          .color('gender', [ '#1890ff', '#f04864' ]);
      }
    });
    chart.render();

    expect(1).toBe(1);
  });
});
