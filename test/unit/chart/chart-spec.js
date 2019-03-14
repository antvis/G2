const expect = require('chai').expect;
const Chart = require('../../../src/chart/chart');
const { DomUtil } = require('../../../src/util');

const div = document.createElement('div');
document.body.appendChild(div);

describe('test chart', () => {
  const chart = new Chart({
    container: div,
    width: 800,
    height: 500,
    padding: [ 0, 50, 20, 50 ],
    animate: false
  });
  chart.scale({
    b: {
      min: 0,
      max: 10
    }
  });
  const data = [
      { a: 1, b: 2, c: '1' },
      { a: 2, b: 5, c: '1' },
      { a: 3, b: 4, c: '1' },

      { a: 1, b: 3, c: '2' },
      { a: 2, b: 1, c: '2' },
      { a: 3, b: 2, c: '2' }
  ];
  it('init', () => {
    expect(chart.get('width')).equal(800);
    expect(chart.get('height')).equal(500);
    expect(chart.get('_id')).equal('chart');
  });

  it('plot test', () => {
    expect(chart.get('plotRange').tl).eqls({ x: 50, y: 0 });
    expect(chart.get('plotRange').br).eqls({ x: 750, y: 480 });
  });

  it('method', () => {
    chart.source(data);
    expect(chart.get('data').length).equal(6);
    const point = chart.point().position('a*b').color('c');
    expect(point.get('attrOptions').position.field).equal('a*b');
  });

  it('render', () => {
    chart.render();
    expect(chart.get('viewContainer').getCount()).equal(1);
    expect(chart.get('viewContainer').getFirst().getCount()).equal(6);
  });

  it('change data', () => {
    const data = [
      { a: 1, b: 2, c: '1' },
      { a: 3, b: 2, c: '2' }
    ];
    chart.changeData(data);
    expect(chart.get('data').length).equal(2);
    expect(chart.get('viewContainer').getCount()).equal(1);
    expect(chart.get('viewContainer').getFirst().getCount()).equal(2);
  });

  it('changeSize', () => {
    chart.changeSize(500, 500);
    expect(chart.get('plotRange').tl).eqls({ x: 50, y: 0 });
    expect(chart.get('plotRange').br).eqls({ x: 450, y: 480 });
    expect(chart.get('canvas').get('width')).equal(500);
  });

  // TODO 如果直接调用chart.showToolTip,非shared的tooltip不显示
  // it('showTooltip', function() {
  //   const point = chart.getXY({ a: 1, b: 2 });
  //   chart.showTooltip(point);
  //   const tooltipController = chart.get('tooltipController');
  //   const { tooltip } = tooltipController;
  //   const tooltipItems = chart.getTooltipItems(point);
  //   expect(tooltip.get('items').length).eql(tooltipItems.length);
  // });

  it('forceFit', () => {
    chart.forceFit();
    expect(chart.get('canvas').get('width')).equal(DomUtil.getWidth(div));
  });

  it('clear', () => {
    chart.clear();
    expect(chart.get('geoms').length).equal(0);
    expect(chart.get('viewContainer').getCount()).equal(0);
  });

  it('destroy', () => {
    chart.destroy();
    expect(div.childNodes.length).equal(0);
  });

});

describe('test chart with views', () => {
  let chart;
  const data = [
      { a: 1, b: 2, c: '1' },
      { a: 2, b: 5, c: '1' },
      { a: 3, b: 4, c: '1' },
      { a: 1, b: 3, c: '2' },
      { a: 2, b: 1, c: '2' },
      { a: 3, b: 2, c: '2' }
  ];
  it('init', () => {
    chart = new Chart({
      height: 500,
      forceFit: true,
      padding: 50,
      container: div,
      animate: false
    });

    chart.scale({
      a: {
        formatter(a) {
          return a.toFixed(2);
        }
      }
    });
    chart.axis('b', {
      title: null
    });

    expect(div.childNodes.length).equal(1);
  });

  it('add view', () => {
    const v1 = chart.view();
    expect(v1.get('_id')).equal('view0');
    expect(v1.get('options').scales.a).not.equal(undefined);
    expect(v1.get('options').axes.b).eqls({
      title: null
    });
    v1.source(data);
    v1.line().position('a*b').color('c');
    expect(chart.get('views').length).equal(1);
    expect(chart.get('viewContainer').getCount()).equal(0);
  });
  it('render', () => {
    chart.render();
    const v1 = chart.get('views')[0];
    expect(v1.get('viewContainer').getFirst().getCount()).equal(2);
  });

  it('change size', () => {
    const v1 = chart.get('views')[0];
    let viewRange = v1.getViewRegion();
    expect(viewRange.start).eqls({ x: 50, y: 450 });
    expect(viewRange.end).eqls({ x: DomUtil.getWidth(div) - 50, y: 50 });

    chart.changeSize(500, 500);
    viewRange = v1.getViewRegion();
    expect(viewRange.end).eqls({ x: 450, y: 50 });
  });

  it('clear', () => {
    chart.clear();
    expect(chart.get('views').length).equal(0);
    expect(chart.get('viewContainer').getCount()).equal(0);
  });

  it('destroy', () => {
    chart.destroy();
    expect(chart.destroyed).equal(true);
  });
});

describe('test chart width filter', () => {
  const data = [
    { genre: 'Sports', sold: 475, type: '1' },
    { genre: 'Strategy', sold: 115, type: '1' },
    { genre: 'Action', sold: 120, type: '1' },
    { genre: 'Shooter', sold: 350, type: '1' },
    { genre: 'Other', sold: 150, type: '1' }
  ];
  let chart;
  it('init filter', () => {
    chart = new Chart({
      height: 500,
      forceFit: true,
      container: div,
      animate: false
    });

    chart.filter('genre', genre => genre === 'Sports');

    const rst = chart.execFilter(data);
    expect(rst.length).equal(1);
  });
  it('change fitler', () => {
    chart.filter('genre', genre => genre !== 'Sports');
    const rst = chart.execFilter(data);
    expect(rst.length).equal(data.length - 1);
  });

  it('combine', () => {
    chart.filter('sold', sold => sold > 200);
    const rst = chart.execFilter(data);
    expect(rst.length).equal(1);
  });

  it('clear', () => {
    chart.clear();
    const rst = chart.execFilter(data);
    expect(rst.length).equal(data.length);
  });

  it('destroy', () => {
    chart.destroy();
  });

});

describe('test chart width filter, ignore legend', () => {
  const data = [
    { genre: 'Sports', sold: 475, type: '1' },
    { genre: 'Strategy', sold: 115, type: '1' },
    { genre: 'Action', sold: 120, type: '1' },
    { genre: 'Shooter', sold: 350, type: '1' },
    { genre: 'Other', sold: 150, type: '1' }
  ];
  let chart;
  it('init filter', () => {
    chart = new Chart({
      height: 500,
      forceFit: true,
      container: div,
      animate: false
    });
    chart.source(data);
    chart.line().position('genre*sold').color('genre');
    chart.filter('genre', genre => genre === 'Sports');

    const rst = chart.execFilter(data);
    expect(rst.length).equal(1);

    chart.initView();
    const scale = chart.createScale('genre');
    expect(scale.values.length).equal(5);
  });
  it('change fitler', () => {
    chart.filter('genre', null);
    chart.set('scales', {});
    chart.filter('sold', sold => sold > 200);
    chart.initView();
    const scale = chart.createScale('genre');
    expect(scale.values.length).equal(5);
    const scale1 = chart.createScale('sold');

    expect(scale1.min > 200).equal(true);

  });
  it('destroy', () => {
    chart.destroy();
  });

});

describe('chart forceFit', () => {
  let chart;
  const data = [
      { a: 1, b: 2, c: '1' },
      { a: 2, b: 5, c: '1' },
      { a: 3, b: 4, c: '1' },

      { a: 1, b: 3, c: '2' },
      { a: 2, b: 1, c: '2' },
      { a: 3, b: 2, c: '2' }
  ];

  it('init filter', () => {
    chart = new Chart({
      height: 500,
      forceFit: true,
      container: div,
      animate: false,
      padding: [ 20, 80, 60, 80 ]
    });
    expect(chart.get('canvas').get('width')).equal(DomUtil.getWidth(div));
    chart.source(data);
    chart.line().position('a*b').color('c');
    chart.render();
  });

  it('window resize', done => {
    div.style.width = '500px';
    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);
    setTimeout(() => {
      expect(chart.get('canvas').get('width')).equal(500);
      done();
    }, 300);
  });

  it('multiple views', () => {
    div.style.width = 'auto';
    chart.clear();
    const v1 = chart.view({
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 0.5,
        y: 0.5
      }
    });
    v1.source(data);
    v1.line().position('a*b').color('c');

    const v2 = chart.view({
      start: {
        x: 0.5,
        y: 0.5
      },
      end: {
        x: 1,
        y: 1
      }
    });
    v2.source(data);
    v2.line().position('a*b').color('c');
    chart.render();
    const viewRange1 = v1.getViewRegion();
    expect(viewRange1.end).eqls({ x: 250, y: 20 });

  });

  it('destroy', () => {
    chart.destroy();
  });
});

describe('filter shape', () => {
  let chart;
  const data = [
      { a: 1, b: 2, c: '1' },
      { a: 2, b: 5, c: '1' },
      { a: 3, b: 4, c: '1' },

      { a: 1, b: 3, c: '2' },
      { a: 2, b: 1, c: '2' },
      { a: 3, b: 2, c: '2' }
  ];

  it('init chart', () => {
    chart = new Chart({
      height: 500,
      forceFit: true,
      container: div
    });
    const viewContainer = chart.get('viewContainer');
    expect(viewContainer.getCount()).equal(0);
  });

  it('filter point', () => {
    chart.source(data);
    chart.point().position('a*b').color('c');
    chart.render();
    const container = chart.get('viewContainer').getFirst();
    expect(container.getCount()).equal(data.length);

    chart.filterShape(record => record.a !== 1);

    expect(container.getCount()).equal(data.length);
    expect(container.getFirst().get('visible')).equal(false);
    expect(container.get('children')[3].get('visible')).equal(false);
  });

  it('filter line', () => {
    chart.clear();
    chart.line().position('a*b').color('c');
    chart.render();
    const container = chart.get('viewContainer').getFirst();
    expect(container.getCount()).equal(2);
    chart.filterShape(arr => arr[0].c !== '1');
    expect(container.getCount()).equal(2);
    expect(container.getFirst().get('visible')).equal(false);
    expect(container.getLast().get('visible')).equal(true);
  });

  it('destroy', () => {
    chart.destroy();
    expect(chart.destroyed).equal(true);
  });
});

describe('chart, view, geom visible', () => {
  let chart;
  const data = [
      { a: 1, b: 2, c: '1' },
      { a: 2, b: 5, c: '1' },
      { a: 3, b: 4, c: '1' },

      { a: 1, b: 3, c: '2' },
      { a: 2, b: 1, c: '2' },
      { a: 3, b: 2, c: '2' }
  ];

  it('chart show hide', () => {
    chart = new Chart({
      height: 500,
      forceFit: true,
      container: div,
      animate: false,
      padding: 0
    });
    chart.hide();
    expect(chart.get('wrapperEl').style.display).equal('none');
    chart.show();
    expect(chart.get('wrapperEl').style.display).equal('');
  });

  it('view show hide', () => {
    const v1 = chart.view();
    v1.source(data);
    v1.line().position('a*b').color('c');

    chart.render();
    const viewContainer = chart.get('viewContainer');
    expect(viewContainer.getCount()).equal(1);
    expect(viewContainer.getFirst().get('visible')).equal(true);
    v1.hide();
    expect(viewContainer.getFirst().get('visible')).equal(false);

    v1.show();
    expect(viewContainer.getFirst().get('visible')).equal(true);
    chart.clear();
    expect(viewContainer.getCount()).equal(0);

  });

  it('multiple views show hide', () => {
    chart.scale('b', {
      alias: '别名'
    });
    chart.axis('b', {
      title: {
        offset: 5
      }
    });
    const v1 = chart.view({
      start: { x: 0, y: 0 },
      end: { x: 0.5, y: 0.5 },
      padding: 20
    });
    v1.source(data);
    v1.line().position('a*b').color('c');
    v1.guide().text({
      start: { a: 1, b: 5 },
      zIndex: 5,
      content: '测试文本',
      style: {
        fill: 'red'
      }
    });
    const v2 = chart.view({
      start: { x: 0.5, y: 0.5 },
      end: { x: 1, y: 1 },
      padding: [ 0, 0, 40, 0 ]
    });
    v2.source(data);
    v2.line().position('a*b').color('c');

    v2.filter('c', c => c === '1');
    chart.render();

    const viewContainer = chart.get('viewContainer');
    expect(viewContainer.getCount()).equal(2);
    v1.hide();
    expect(viewContainer.getFirst().get('visible')).equal(false);
    v1.show();

    expect(v1.getViewRegion().start).eqls({ x: 20, y: 230 });
    expect(v2.getViewRegion().end.y).eqls(250);
    expect(v1.get('axisController').axes[1].get('title').text).equal('别名');
  });

  it('geom show hide', () => {
    chart.clear();
    chart.source(data);
    const l1 = chart.line().position('a*b').color('c');
    chart.render();
    const viewContainer = chart.get('viewContainer');
    expect(viewContainer.getCount()).equal(1);
    expect(viewContainer.getFirst().get('visible')).equal(true);

    l1.hide();
    expect(viewContainer.getFirst().get('visible')).equal(false);
    l1.show();
    expect(viewContainer.getFirst().get('visible')).equal(true);
  });
  it('destroy', () => {
    chart.destroy();
    expect(chart.destroyed).equal(true);
  });
});

describe('chart sync scales', () => {
  let chart;
  const data = [
      { a: 1, b: 2, c: '1' },
      { a: 2, b: 5, c: '1' },
      { a: 3, b: 4, c: '1' },

      { a: 1, b: 3, c: '2' },
      { a: 2, b: 1, c: '2' },
      { a: 3, b: 2, c: '2' }
  ];

  const data1 = [
    { a: 1, b: 6, d: '1' },
    { a: 2, b: 9, d: '2' }
  ];

  it('only chart', () => {
    chart = new Chart({
      height: 500,
      forceFit: true,
      container: div,
      animate: false
    });

    chart.scale('b', {
      sync: true,
      min: 0
    });

    chart.source(data);
    chart.line().position('a*b').color('c');
    chart.render();

    expect(chart.get('scales').b.min).equal(0);

  });

  it('one view', () => {
    chart.clear();
    const v1 = chart.view();
    v1.source(data1);
    v1.line().position('a*b').color('c');
    chart.render();
    expect(v1.get('scales').b.min).equal(0);
  });

  it('chart with view', () => {
    chart.clear();
    chart.interval().position('a*b')
      .color('c')
      .adjust('stack');
    chart.scale('a', {
      sync: true
    });
    const v1 = chart.view();
    v1.source(data1);
    v1.line().position('a*b').color('c');
    chart.render();
    expect(v1.get('scales').b).equal(chart.get('scales').b);
  });

  it('multiple views', () => {
    chart.clear();
    chart.scale('a', {
      sync: true
    });

    const v1 = chart.view({
      start: { x: 0, y: 0 },
      end: { x: 0.5, y: 0.5 }
    });
    v1.source(data1);
    v1.line().position('a*b').color('c');

    const v2 = chart.view({
      end: { x: 1, y: 1 },
      start: { x: 0.5, y: 0.5 }
    });
    v2.source(data);
    v2.interval().position('a*b')
      .color('c')
      .adjust('stack');
    chart.render();
    expect(v1.get('scales').b).equal(chart.get('scales').b);
    expect(v1.get('scales').a).equal(chart.get('scales').a);
    expect(v1.get('scales').c).not.equal(chart.get('scales').c);
    expect(v1.get('scales').b.max).equal(10);
  });

  it('toDataURL', () => {
    const str = chart.toDataURL();
    expect(str.length).not.equal(0);
  });

  // xit('download', function() {
  //   const str = chart.downloadImage('xx');
  //   expect(str.length).not.equal(0);
  // });

  it('destroy', () => {
    chart.destroy();
    expect(chart.destroyed).equal(true);
  });
});

describe('chart empty data', () => {
  let chart;
  it('init', () => {
    chart = new Chart({
      container: div,
      width: 800,
      height: 500,
      animate: false
    });
  });

  it('no data', () => {
    chart.point().position('x*y');
    expect(chart.get('viewContainer').getCount()).equal(0);
    chart.render();
    expect(chart.get('viewContainer').getCount()).equal(1);
    expect(chart.get('viewContainer').getFirst().getCount()).equal(0);
  });

  it('chart epmty data', () => {
    chart.clear();
    chart.source([], {
      x: {
        type: 'linear',
        min: 0,
        max: 100
      },
      y: {
        type: 'cat',
        values: [ '1', '2' ]
      }
    });
    chart.point().position('x*y');
    chart.render();
    expect(chart.get('viewContainer').getCount()).equal(1);
    expect(chart.get('viewContainer').getFirst().getCount()).equal(0);
  });

  it('view epmty data', () => {
    chart.clear();
    expect(chart.get('viewContainer').getCount()).equal(0);
    const v1 = chart.view();
    v1.source([]);
    v1.point().position('x*y');
    chart.render();
    expect(chart.get('viewContainer').getCount()).equal(1);
    expect(chart.get('viewContainer').getFirst().getCount()).equal(0);
  });

  it('destroy', () => {
    chart.destroy();
    expect(chart.destroyed).equal(true);
  });
});

describe('chart set keyFields', () => {
  let chart;
  const data = [
      { a: 1, b: 2, c: '1' },
      { a: 2, b: 5, c: '1' },
      { a: 3, b: 4, c: '1' },

      { a: 1, b: 3, c: '2' },
      { a: 2, b: 1, c: '2' },
      { a: 3, b: 2, c: '2' }
  ];

  it('chart.source', () => {
    chart = new Chart({
      height: 500,
      forceFit: true,
      container: div,
      animate: false
    });
    chart.source(data, {
      a: {
        key: true
      }
    });
    chart.line().position('a*b').color('c');
    chart.render();

    expect(chart.get('geoms')[0].get('keyFields')).eql([ 'a' ]);
  });

  it('chart.scale', () => {
    chart.clear();
    chart.scale({
      c: {
        key: true
      },
      b: {
        key: true
      }
    });
    chart.line().position('a*b').color('c');
    chart.render();

    expect(chart.get('geoms')[0].get('keyFields')).eql([ 'a', 'c', 'b' ]);
  });

  it('destroy', () => {
    chart.destroy();
    expect(chart.destroyed).equal(true);
  });
});

describe('chart display axis title', () => {
  it('the axis title of a is showed.', () => {
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
      container: div,
      animate: false,
      data,
      options: {
        geoms: [{
          type: 'line',
          position: 'a*b',
          color: 'c'
        }],
        axes: {
          a: {
            title: true
          }
        }
      }
    });

    chart.render();

    const axisController = chart.get('axisController');
    const axes = axisController.axes;
    expect(axes.length).equal(2);

    const aAxis = axes[0];
    expect(aAxis.get('title')).to.be.an.instanceof(Object);
    expect(aAxis.get('title').text).to.eql('a');

    chart.destroy();
  });

  it('set title position.', () => {
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
      container: div,
      animate: false,
      data,
      options: {
        geoms: [{
          type: 'line',
          position: 'a*b',
          color: 'c'
        }],
        axes: {
          a: {
            title: {
              position: 'bottom',
              autoRotate: true,
              textStyle: {
                rotate: 45 // 以用户设置的角度为准
              }
            }
          }
        }
      }
    });
    chart.render();

    const axisController = chart.get('axisController');
    const axes = axisController.axes;
    expect(axes.length).equal(2);

    const aAxis = axes[0];
    expect(aAxis.get('title')).to.be.an.instanceof(Object);
    expect(aAxis.get('title').text).to.eql('a');
    expect(aAxis.get('title').position).to.eql('bottom');
    expect(aAxis.get('title').textStyle.rotate).to.eql(45);
    chart.destroy();
  });
});

