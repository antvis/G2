const expect = require('chai').expect;
const Chart = require('../../../src/chart/chart');
const Util = require('../../../src/util');

const div = document.createElement('div');
div.id = 'ccharti';
document.body.appendChild(div);

describe('interval chart', function() {
  const data = [
    { genre: 'Sports', sold: 475, type: '1' },
    { genre: 'Strategy', sold: 115, type: '1' },
    { genre: 'Action', sold: 120, type: '1' },
    { genre: 'Shooter', sold: 350, type: '1' },
    { genre: 'Other', sold: 150, type: '1' }
  ];

  const chart = new Chart({
    container: div,
    height: 300,
    width: 500
  });

  it('init', function() {
    chart.interval().position('genre*sold').color('genre');
    chart.source(data);
    chart.render();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(data.length);
    const first = group.getFirst();
    expect(first.attr('path')[0]).eqls([ 'M', 100.4, 240 ]);
  });

  it('transpose', function() {
    chart.coord().transpose();
    chart.repaint();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(data.length);
    const first = group.getFirst();
    expect(first.attr('path')[0]).eqls([ 'M', 80, 226.8 ]);
  });

  it('polar', function() {

    chart.coord('polar');
    chart.repaint();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(data.length);
    const first = group.getFirst();
    expect(first.attr('path')[0]).eqls([ 'M', 250, 130 ]);
  });

  it('polar transpose', function() {
    chart.coord('polar').transpose();
    chart.repaint();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(data.length);
    const first = group.getFirst();
    expect(first.attr('path')[0]).eqls([ 'M', 250, 130 ]);
  });

  it('stack', function() {
    const newData = [
      { genre: 'Sports', sold: 475, type: '1' },
      { genre: 'Strategy', sold: 115, type: '1' },
      { genre: 'Action', sold: 120, type: '1' },
      { genre: 'Shooter', sold: 350, type: '1' },
      { genre: 'Other', sold: 150, type: '1' },

      { genre: 'Sports', sold: 145, type: '2' },
      { genre: 'Strategy', sold: 415, type: '2' },
      { genre: 'Action', sold: 180, type: '2' },
      { genre: 'Shooter', sold: 50, type: '2' },
      { genre: 'Other', sold: 120, type: '2' }
    ];
    chart.clear();
    chart.coord();
    chart.source(newData);
    chart.interval().position('genre*sold', 'stack').color('type');
    chart.render();

    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(newData.length);
    const firstPath = group.getFirst().attr('path');
    const nextPath = group.get('children')[5].attr('path');
    expect(nextPath[1][1]).eqls(firstPath[0][1]);
    expect(nextPath[1][2]).eqls(firstPath[0][2]);
  });

  it('dodge', function() {
    chart.clear();
    chart.interval().position('genre*sold', 'dodge').color('type');
    chart.render();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(10);
    const first = group.getFirst();
    expect(first.attr('path')[0]).eqls([ 'M', 94.45, 240 ]);
  });

  it('symmetric', function() {
    chart.clear();
    chart.source(data, {
      sold: {
        nice: false
      }
    });
    chart.coord();
    chart.interval().position('genre*sold', 'symmetric').color('genre');
    chart.render();

    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(data.length);
    const first = group.getFirst();
    const second = group.get('children')[1];
    expect(first.get('origin').y[0] - second.get('origin').y[0]).not.eqls(0);
    expect(first.get('origin').y[0] - second.get('origin').y[0]).equal(second.get('origin').y[1] - first.get('origin').y[1]);
  });

  it('funnel', function() {
    chart.clear();
    chart.source(data, {
      sold: {
        nice: false
      }
    });
    chart.interval().position('genre*sold', 'symmetric').color('genre')
      .shape('funnel');
    chart.render();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(data.length);
    const first = group.getFirst();
    const second = group.get('children')[1];
    expect(first.get('origin').y[0] - second.get('origin').y[0]).equal(second.get('origin').y[1] - first.get('origin').y[1]);
  });

  it('pyramid', function() {
    chart.clear();
    chart.source(data, {
      sold: {
        nice: false
      }
    });
    chart.interval().position('genre*sold', 'symmetric').color('genre')
      .shape('pyramid');
    chart.render();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(data.length);
    const first = group.getFirst();
    const second = group.get('children')[1];
    expect(first.get('origin').y[0] - second.get('origin').y[0]).equal(second.get('origin').y[1] - first.get('origin').y[1]);
  });

  it('pie', function() {
    chart.clear();
    chart.coord('theta');
    chart.source(data, {
      sold: {
        nice: false
      }
    });

    chart.interval().position('sold', 'stack').color('genre');
    chart.render();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(data.length);
    const first = group.getFirst();
    expect(first.attr('path')[0][1]).equal(250);
    expect(Util.snapEqual(first.attr('path')[0][2], 130)).equal(true);
  });

  it('ring', function() {
    chart.clear();
    chart.coord('theta', { innerRadius: 0.5 });
    chart.source(data, {
      sold: {
        nice: false
      }
    });

    chart.interval().position('sold', 'stack').color('genre');
    chart.render();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(data.length);
    const first = group.getFirst();
    expect(first.attr('path')[0][1]).equal(250);
    expect(Util.snapEqual(first.attr('path')[0][2], 75)).equal(true);
  });

  it('stack and dodge', function() {

  });

  it('filter', function() {
    chart.clear();
    chart.coord();
    chart.filter('sold', function(obj) {
      return obj.sold > 200;
    });
    chart.interval().position('genre*sold').color('genre');
    chart.source(data);
    chart.render();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(2);
  });

  it('destroy', function() {
    chart.destroy();
    expect(chart.destroyed).equal(true);
  });

});
