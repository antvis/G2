const expect = require('chai').expect;
const Chart = require('../../../src/chart/chart');
const Facets = require('../../../src/facet/index');
const diamonds = require('../../../demos/data/diamond.json');
const Util = require('../../../src/util');

const div = document.createElement('div');
document.body.appendChild(div);

describe('facets test', function() {
  describe('facets rect test', function() {
    const chart = new Chart({
      container: div,
      width: 500,
      height: 500,
      animate: false,
      padding: [ 40, 50, 60, 50 ]
    });

    chart.source(diamonds, {
      cut: {
        sync: true
      },
      price: {
        sync: true
      },
      carat: {
        sync: true
      }
    });

    chart.axis('price', {
      title: {
        offset: 50
      }
    });
    const rectFacets = new Facets.Rect({
      chart,
      fields: [ 'clarity', 'cut' ],
      eachView(view) {
        view.point().position('carat*price').color('cut');
      }
    });

    it('init test', function() {
      expect(rectFacets.fields).eqls([ 'clarity', 'cut' ]);
      expect(chart.get('views').length).equal(5 * 8);
      chart.render();
      const view0 = chart.get('views')[0];
      expect(view0.get('options').axes.price.label).not.equal(null);
      expect(view0.get('options').axes.carat.label).equal(null);

      const viewLast = chart.get('views')[39];
      expect(viewLast.get('options').axes.price.label).equal(null);
      expect(viewLast.get('options').axes.carat.label).not.equal(null);
    });

    it('chart change data', function() {
      const subArr = diamonds.filter(function(obj) {
        return obj.clarity === 'VS2';
      });
      const arr1 = Util.Array.values(subArr, 'clarity');
      const arr2 = Util.Array.values(subArr, 'cut');
      chart.changeData(subArr);
      expect(chart.get('views').length).equal(arr1.length * arr2.length);
    });

    it('clear', function() {
      chart.clear();
      expect(chart.get('views').length).equal(0);
      chart.source(diamonds);
      chart.point().position('carat*price');
      chart.render();
    });

    it('only col', function() {
      chart.clear();
      const colFacets = new Facets.Rect({
        chart,
        fields: [ 'clarity' ],
        eachView(view) {
          view.point().position('carat*price').color('cut');
        }
      });
      chart.render();
      expect(colFacets.facets.length).equal(8);
      expect(chart.get('views').length).equal(8);
      chart.clear();
      expect(colFacets.facets).equal(null);
    });

    it('only row', function() {
      const rowFacets = new Facets.Rect({
        chart,
        fields: [ null, 'cut' ],
        eachView(view) {
          view.point().position('carat*price').color('cut');
        }
      });
      chart.render();
      expect(rowFacets.facets.length).equal(5);
      expect(chart.get('views').length).equal(5);
      chart.clear();
      expect(rowFacets.facets).equal(null);
    });

    it('only one type', function() {
      const data = [
        { a: 1, b: 2, c: '1' },
        { a: 2, b: 1, c: '1' },
        { a: 3, b: 3, c: '1' },
        { a: 4, b: 5, c: '1' },
        { a: 5, b: 2.5, c: '1' }
      ];
      chart.source(data);

      const singleFacets = new Facets.Rect({
        chart,
        fields: [ null, 'c' ],
        eachView(view) {
          view.point().position('a*b').color('c');
        }
      });
      chart.render();
      expect(chart.get('views').length).equal(1);
      expect(singleFacets.facets.length).equal(1);
    });

    it('destroy', function() {
      chart.clear();
      rectFacets.destroy();
      expect(rectFacets.destroyed).equal(true);
    });
  });

  describe('list facets', function() {
    const chart = new Chart({
      container: div,
      width: 500,
      height: 500,
      padding: [ 40, 50, 50, 50 ]
    });
    chart.source(diamonds, {
      clarity: {
        sync: true
      },
      cut: {
        sync: true,
        formatter(v) {
          return v + '1111';
        }
      }
    });
    let facets;
    it('init', function() {
      facets = new Facets.List({
        fields: [ 'cut' ],
        chart,
        cols: 3,
        padding: [ 20, 10 ],
        eachView(view) {
          view.point().position('carat*price').color('clarity');
        }
      });
      expect(facets.type).equal('list');
      expect(chart.get('views').length).equal(5);
      expect(facets.facets.length).equal(5);
      chart.render();
      const view0 = chart.get('views')[0];
      expect(view0.get('options').axes.price.label).not.equal(null);
      expect(view0.get('options').axes.carat.label).equal(null);
      const view3 = chart.get('views')[2];
      expect(view3.get('options').axes.price.label).equal(null);
      expect(view3.get('options').axes.carat.label).not.equal(null);
    });

    it('change data and cols', function() {
      facets.cols = 2;
      chart.changeData(diamonds);

      const view0 = chart.get('views')[0];
      expect(view0.get('options').axes.price.label).not.equal(null);
      expect(view0.get('options').axes.carat.label).equal(null);
      const view3 = chart.get('views')[2];
      expect(view3.get('options').axes.price.label).not.equal(null);
      expect(view3.get('options').axes.carat.label).equal(null);
    });

    it('destroyed', function() {
      chart.destroy();
      expect(facets.destroyed).equal(true);
    });
  });

  describe('circle facets', function() {
    const chart = new Chart({
      container: div,
      width: 500,
      height: 500,
      padding: 0
    });
    chart.source(diamonds);
    chart.coord().transpose();
    let facets;
    it('init', function() {
      facets = new Facets.Circle({
        fields: [ 'cut' ],
        chart,
        padding: 20,
        eachView(view) {

          view.point().position('carat*price');
        }
      });
      expect(facets.type).equal('circle');
      expect(chart.get('views').length).equal(5);
      expect(facets.facets.length).equal(5);
      chart.render();
    });
    it('destroy', function() {
      chart.destroy();
      expect(facets.destroyed).equal(true);
    });
  });

  describe('tree facets', function() {
    const chart = new Chart({
      container: div,
      width: 500,
      height: 500,
      animate: false,
      padding: [ 0, 0, 20, 30 ]
    });
    chart.coord('polar');
    let facets;
    it('init', function() {
      facets = new Facets.Tree({
        fields: [ 'cut' ],
        chart,
        lineSmooth: true,
        padding: [ 0, 10 ],
        eachView(view) {
          view.point().position('carat*price');
        }
      });
      expect(facets.type).equal('tree');
      chart.source(diamonds);
      expect(chart.get('views').length).equal(6);
      expect(facets.facets.length).equal(6);
      chart.render();
      expect(facets.group.getFirst().getCount()).equal(5);
    });

    it('change size', function() {
      chart.changeSize(1000, 800);
      expect(facets.group.getFirst().getCount()).equal(5);
    });

    it('clear', function() {
      chart.clear();
      expect(facets.group).equal(null);
    });
    it('destroy', function() {
      chart.destroy();
      expect(chart.destroyed).equal(true);
    });
  });

  describe('mirror facets', function() {
    const data = [
      { a: '1', b: 2, c: '1' },
      { a: '2', b: 5, c: '1' },
      { a: '3', b: 4, c: '1' },

      { a: '1', b: 3, c: '2' },
      { a: '2', b: 1, c: '2' },
      { a: '3', b: 2, c: '2' }
    ];
    const chart = new Chart({
      container: div,
      width: 500,
      height: 500,
      padding: [ 0, 30, 20, 10 ]
    });
    chart.source(data);

    let facets;
    it('init', function() {
      facets = new Facets.Mirror({
        fields: [ 'c' ],
        chart,
        padding: [ 20, 10 ],
        eachView(view) {
          view.interval().position('a*b');
        }
      });
      expect(facets.type).equal('mirror');
      expect(chart.get('views').length).equal(2);
      expect(facets.facets.length).equal(2);
      chart.render();
      // TODO
      // const views = chart.get('views');
      // expect(views[1].get('options').coord.actions[0]).eqls([ 'scale', 1, -1 ]);
    });

    it('transpose', function() {
      chart.clear();
      facets = new Facets.Mirror({
        fields: [ 'c' ],
        chart,
        transpose: true,
        padding: [ 20, 10 ],
        eachView(view) {
          view.interval().position('a*b');
        }
      });
      chart.render();
    });

    it('destroy', function() {
      chart.destroy();
      expect(chart.destroyed).equal(true);
    });
  });

  describe('use in chart', function() {
    const data = [
      { a: '1', b: 2, c: '1' },
      { a: '2', b: 5, c: '1' },
      { a: '3', b: 4, c: '1' },

      { a: '1', b: 3, c: '2' },
      { a: '2', b: 1, c: '2' },
      { a: '3', b: 2, c: '2' }
    ];
    let chart;
    it('init chart', function() {
      chart = new Chart({
        container: div,
        width: 500,
        height: 500,
        padding: [ 0, 30, 20, 10 ]
      });
      chart.facet('list', {
        fields: [ 'c' ],
        cols: 3,
        eachView(view) {
          view.interval().position('a*b');
        }
      });
      expect(chart.get('facets').facets).equal(undefined);
      expect(chart.get('views').length).equal(0);
      chart.source(data);
      expect(chart.get('views').length).equal(2);
      chart.render();
    });
    it('chang facet', function() {
      chart.clear();
      chart.facet('mirror', {
        fields: [ 'c' ],
        eachView(view) {
          view.interval().position('a*b');
        }
      });
      expect(chart.get('views').length).equal(2);
      chart.render();
    });
    it('only change facet', function() {
      chart.facet('rect', {
        fields: [ 'c' ],
        eachView(view) {
          view.interval().position('a*b');
        }
      });
      chart.repaint();
    });
    it('destroy', function() {
      const facets = chart.get('facets');
      chart.destroy();
      expect(facets.destroyed).equal(true);
    });
  });

  describe('matrix facets', function() {
    let chart;
    const data = diamonds.slice(0, 100);

    it('init chart', function() {
      chart = new Chart({
        container: div,
        width: 500,
        height: 500,
        padding: [ 20, 30, 50, 40 ]
      });
      chart.facet('matrix', {
        fields: [ 'x', 'y', 'z', 'carat', 'price' ],
        cols: 3,
        eachView(view, facet) {
          view.point()
            .position([ facet.colField, facet.rowField ])
            .color('cut');
        }
      });
      expect(chart.get('facets').facets).equal(undefined);
      expect(chart.get('views').length).equal(0);
      chart.source(data);
      expect(chart.get('views').length).equal(5 * 5);
      chart.render();
    });

    it('destroy', function() {
      const facets = chart.get('facets');
      chart.destroy();
      expect(facets.destroyed).equal(true);
      expect(chart.destroyed).equal(true);
    });
  });
});
