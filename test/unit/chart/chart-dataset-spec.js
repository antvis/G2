const expect = require('chai').expect;
const Chart = require('../../../src/chart/chart');
const DataSet = require('@antv/data-set');

const div = document.createElement('div');
div.id = 'cdataset';
document.body.appendChild(div);

describe('use dataset in chart', () => {
  const data = [
      { a: 1, b: 2, c: '1' },
      { a: 2, b: 5, c: '1' },
      { a: 3, b: 4, c: '1' },

      { a: 1, b: 3, c: '2' },
      { a: 2, b: 1, c: '2' },
      { a: 3, b: 2, c: '2' }
  ];

  const chart = new Chart({
    height: 500,
    forceFit: true,
    animate: false,
    container: 'cdataset'
  });

  const ds = new DataSet({
    state: {
      value: 0
    }
  });
  const view = ds.createView('1').source(data)
    .transform({
      type: 'filter',
      callback(row) {
        return row.a > ds.state.value; // origin data range: [2002, 2015]
      }
    });

  it('init with view', () => {
    chart.source(view);
    chart.line().position('a*b').color('c');
    chart.render();
    const viewContainer = chart.get('viewContainer');
    expect(viewContainer.getCount()).equal(1);
    const group = viewContainer.getFirst();
    const path = group.getFirst();
    expect(group.getCount()).equal(2);
    expect(path.attr('path').length).equal(3);
  });

  it('data view change', done => {
    ds.setState('value', 1);
    setTimeout(() => {
      const viewContainer = chart.get('viewContainer');
      expect(viewContainer.getCount()).equal(1);
      const group = viewContainer.getFirst();
      const path = group.getFirst();
      expect(group.getCount()).equal(2);
      expect(path.attr('path').length).equal(2);
      done();
    }, 20);
  });

  it('change data', () => {
    chart.changeData(data);
    const viewContainer = chart.get('viewContainer');
    expect(viewContainer.getCount()).equal(1);
    const group = viewContainer.getFirst();
    const path = group.getFirst();
    expect(path.attr('path').length).equal(3);
  });

  it('multiple views', done => {
    chart.clear();
    chart.source([]);
    chart.scale('b', {
      sync: true
    });
    ds.setState('value', 0);

    setTimeout(() => {
      const v1 = chart.view().source(view);
      v1.line().position('a*b').color('c');

      const v2 = chart.view().source(view);
      v2.point().position('a*b').color('c');
      chart.render(0);

      const viewContainer = chart.get('viewContainer');
      expect(viewContainer.getCount()).equal(2);
      expect(viewContainer.getFirst().getCount()).equal(2);
      expect(viewContainer.getLast().getCount()).equal(data.length);
      done();
    }, 40);
  });

  it('state change with multiple views', done => {
    ds.setState('value', 1);

    setTimeout(() => {
      const viewContainer = chart.get('viewContainer');
      expect(viewContainer.getCount()).equal(2);
      const group = viewContainer.getFirst();
      const path = group.getFirst();
      expect(group.getCount()).equal(2);
      expect(path.attr('path').length).equal(2);

      const intervalGroup = viewContainer.getLast();
      expect(intervalGroup.getCount()).equal(4);
      done();
    }, 40);
  });

  it('destroy', () => {
    chart.destroy();
    expect(chart.destroyed).equal(true);
  });
});
