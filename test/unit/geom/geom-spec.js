const expect = require('chai').expect;
const { Canvas } = require('@ali/g');
const Geom = require('../../../src/geom/index');
const Global = require('../../../src/global');
const Scale = require('../../../src/scale/index');
const Coord = require('../../../src/coord/index');
const Util = require('../../../src/util');
const div = document.createElement('div');
div.id = 'cgbase';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'cgbase',
  width: 500,
  height: 500
});

let scaleA = Scale.linear({
  field: 'a',
  min: 0,
  max: 10
});

const scaleB = Scale.linear({
  field: 'b',
  min: 0,
  max: 5,
  nice: false
});

const scaleC = Scale.cat({
  field: 'c',
  values: [ '1', '2' ]
});

const ScaleRed = Scale.identity({
  field: 'red',
  value: 'red'
});

const ScaleTen = Scale.identity({
  field: '10',
  value: 10
});
const coord = new Coord.Rect({
  start: {
    x: 0,
    y: 0
  },
  end: {
    x: 500,
    y: 500
  }
});

describe('test geoms', function() {
  const data = [{
    a: 1,
    b: 2,
    c: '1'
  }, {
    a: 1,
    b: 3,
    c: '2'
  },
  {
    a: 2,
    b: 1,
    c: '1'
  }, {
    a: 2,
    b: 4,
    c: '2'
  },

  {
    a: 3,
    b: 5,
    c: '1'
  }, {
    a: 3,
    b: 1,
    c: '2'
  }
  ];

  describe('test create', function() {
    const geom = new Geom({
      type: 'test'
    });

    it('create geom', function() {
      expect(geom.get('type')).equal('test');
    });

    it('test base method', function() {
      expect(geom.on).to.be.a('function');
    });

    it('test attr method position', function() {
      geom.position('a*b');
      expect(geom.get('attrOptions').position).eqls({ field: 'a*b', adjusts: undefined });
      geom.position([ 'a', 'b' ], 'stack');
      expect(geom.get('attrOptions').position).eqls({ field: [ 'a', 'b' ], adjusts: [{ type: 'stack' }] });
      // expect(geom.get('adjusts')).eqls([{ type: 'stack' }]);

      geom.position([ 'a', 'b' ], { adjusts: [ 'stack', 'dodge' ] });
      // expect(geom.get('adjusts')).eqls([{ type: 'stack' }, { type: 'dodge' }]);
      expect(geom.hasAdjust('stack')).equal(true);
    });
    it('other attrs', function() {
      geom.color('red')
          .shape('a', [ 'circle', 'rect' ])
          .size('b', function() {

          })
          .opacity(0.8);
      const attrOptions = geom.get('attrOptions');
      // debugger;
      expect(attrOptions.color.field).eqls('red');
      expect(attrOptions.color.values).eqls(Global.colors);
      expect(attrOptions.shape).eqls({ field: 'a', values: [ 'circle', 'rect' ] });
      expect(attrOptions.size.field).equal('b');
      expect(attrOptions.size.callback).to.be.a('function');
      expect(attrOptions.opacity.field).equal(0.8);
    });
  });

  describe('test init data', function() {
    const newData = data.slice(0);
    let geom;
    it('init attrs', function() {
      geom = new Geom({
        type: 'test',
        coord,
        data: newData,
        scales: { a: scaleA, b: scaleB, c: scaleC }
      });
      geom.position('a*b').color('c');
      geom._initAttrs();
      const attrs = geom.get('attrs');
      expect(attrs.position.type).equal('position');
      expect(attrs.position.scales.length).equal(2);
      expect(attrs.color.scales.length).eqls(1);
    });
    it('test group data', function() {
      const arr = geom._groupData(newData);
      expect(arr.length).equal(2);
      expect(arr[0][0].c).equal('1');
      expect(arr[1][0].c).equal('2');
    });

    it('save origin', function() {
      const rst = geom._saveOrigin(newData);
      expect(newData[0]._origin).equal(undefined);
      expect(rst[0]._origin).equal(newData[0]);
    });

    it('test numberic', function() {
      geom.position('a*c');
      geom._initAttrs();
      const attrs = geom.get('attrs');
      expect(attrs.position.scales.length).equal(2);
      expect(attrs.color.scales.length).eqls(1);
      const temp = newData.slice(0);
      geom._numberic(temp);
      expect(temp[0].c).to.be.equal(0);
    });

    it('test adjust', function() {
      geom.position('a*b', 'stack');
      geom._initAttrs();
      let arr = geom._groupData(Util.cloneDeep(newData));
      geom._adjust(arr);
      expect(arr[0][0].b).eqls([ 3, 5 ]);
      expect(arr[1][0].b).eqls([ 0, 3 ]);

      coord.isTransposed = true;
      arr = geom._groupData(Util.cloneDeep(newData));
      geom._adjust(arr);
      expect(arr[0][0].b).eqls([ 0, 2 ]);
      expect(arr[1][0].b).eqls([ 2, 5 ]);
    });

    it('reset', function() {
      geom.reset();
      expect(geom.get('attrs')).eqls({});
      expect(geom.get('adjusts')).eqls(null);
    });
    it('test total init', function() {
      geom.position('a*b', 'stack').color('c');
      geom.init();
      const dataArray = geom.get('dataArray');
      expect(dataArray[0][0].b).eqls([ 0, 2 ]);
      expect(dataArray[1][0].b).eqls([ 2, 5 ]);
    });

    it('destroy', function() {
      geom.destroy();
      expect(geom.destroyed).equal(true);
    });
  });

  describe('test paint', function() {
    const newData = data.slice(0);
    const group = canvas.addGroup();
    let geom;
    const scaleA = Scale.linear({
      field: 'a',
      min: 0,
      max: 10
    });
    const scaleB = Scale.linear({
      field: 'b',
      min: 0,
      max: 5,
      nice: false
    });
    it('test generate points and ', function() {
      geom = new Geom({
        shapeType: 'point',
        coord,
        data: newData,
        container: group,
        generatePoints: true,
        scales: { a: scaleA, b: scaleB, c: scaleC, red: ScaleRed }
      });
      geom.position('a*b').color('red');
      geom.init();
      const data = [
        { a: 1, b: [ 1, 2 ], c: '1' },
        { a: 2, b: [ 2, 3 ], c: '2' }
      ];
      geom._beforeMapping([ data ]);
      expect(data[0].points).eqls([{ x: 0.1, y: 0.2 }, { x: 0.1, y: 0.4 }]);
    });

    it('test mapping', function() {
      const data = [
        { a: 1, b: [ 1, 2 ], c: '1' },
        { a: 2, b: [ 2, 3 ], c: '2' }
      ];
      coord.isTransposed = false;
      geom._beforeMapping([ data ]);
      const mappedData = geom._mapping(data);
      const obj1 = mappedData[0];
      expect(obj1.x).equal(50);
      expect(obj1.y).eqls([ 100, 200 ]);
      expect(obj1.color).equal('red');
    });

    it('test paint', function() {
      geom.reset();
      geom.position('a*b').color('c');
      geom.init();
      geom.paint();
      expect(group.getCount()).to.be.equal(6);
      canvas.draw();
    });

    it('test style no fields', function() {
      geom.reset();
      geom.position('a*b').color('c').style({
        fill: 'blue'
      });
      geom.init();
      geom.paint();
      const shape = group.getFirst();
      expect(shape.attr('fill')).equal('blue');
      canvas.draw();
    });
    it('test style with fields', function() {
      geom.reset();
      geom.position('a*b').color('c').style('a', {
        fill: 'blue',
        lineWidth(a) {
          return a * 2;
        }
      });

      geom.init();
      geom.paint();
      const shape = group.getFirst();
      expect(shape.attr('fill')).equal('blue');
      expect(shape.attr('lineWidth')).equal(data[0].a * 2);
      canvas.draw();
    });
  });

});

describe('test geom point', function() {
  let data = [{ a: 4, b: 3, c: '1' }, { a: 5, b: 2, c: '2' }];
  const group = canvas.addGroup();
  const geom = new Geom.Point({
    data,
    coord,
    container: group,
    scales: { a: scaleA, b: scaleB, c: scaleC, red: ScaleRed }
  });
  it('draw points', function() {
    geom.position('a*b').color('c');
    geom.init();
    geom.paint();
    expect(group.getCount()).equal(2);
  });
  it('draw points y is array', function() {
    data = [{ a: 4, b: [ 3, 5 ], c: '1' }, { a: 5, b: [ 2, 4 ], c: '2' }];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b').color('red');
    geom.init();
    geom.paint();
    expect(group.getCount()).equal(4);
    canvas.draw();
  });
});

describe('test geom path', function() {
  let data = [{ a: 4, b: 3, c: '1' }, { a: 5, b: 2, c: '2' }];
  const group = canvas.addGroup();
  const geom = new Geom.Path({
    data,
    coord,
    container: group,
    scales: { a: scaleA, b: scaleB, c: scaleC, red: ScaleRed }
  });
  it('draw path', function() {
    geom.position('a*b');
    geom.init();
    geom.paint();
    expect(group.getCount()).equal(1);
    const path = group.getFirst();
    expect(path.attr('path').length).eql(2);
    canvas.draw();
  });

  it('draw multiple path', function() {
    data = [{ a: 4, b: [ 3, 5 ], c: '1' }, { a: 5, b: [ 2, 4 ], c: '2' }];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b');
    geom.init();
    geom.paint();
    expect(group.getCount()).equal(1);
    const path = group.getFirst();
    expect(path.attr('path').length).eql(4);
    canvas.draw();
  });

  it('draw path with color', function() {
    const data = [{ a: 1, b: 3, c: '1' }, { a: 2, b: 3.5, c: '1' }, { a: 1, b: 2, c: '2' }, { a: 2, b: 1.5, c: '2' }];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b').color('c');
    geom.init();
    geom.paint();
    expect(group.getCount()).equal(2);
    const path = group.getFirst();
    expect(path.attr('path').length).eql(2);
    canvas.draw();
  });
});


describe('test geom line', function() {
  let data = [{ a: 4, b: 3, c: '1' }, { a: 2, b: 2, c: '2' }];
  const scaleA = Scale.linear({
    field: 'a',
    min: 0,
    max: 10
  });
  const scaleB = Scale.linear({
    field: 'b',
    min: 0,
    max: 5,
    nice: false
  });
  const group = canvas.addGroup();
  const geom = new Geom.Line({
    data,
    coord,
    container: group,
    scales: { a: scaleA, b: scaleB, c: scaleC, red: ScaleRed }
  });
  it('draw path', function() {
    expect(geom.get('type')).eql('line');
    geom.position('a*b');
    geom.init();
    geom.paint();
    expect(group.getCount()).equal(1);
    const path = group.getFirst();
    expect(path.attr('path').length).eql(2);
    expect(path.attr('path')[0]).eqls([ 'M', 100, 200 ]);
    expect(path.attr('path')[1]).eqls([ 'L', 200, 300 ]);
    canvas.draw();
  });

  it('draw multiple path', function() {
    data = [{ a: 4, b: [ 3, 5 ], c: '1' }, { a: 5, b: [ 2, 4 ], c: '2' }];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b');
    geom.init();
    geom.paint();
    expect(group.getCount()).equal(1);
    const path = group.getFirst();
    expect(path.attr('path').length).eql(4);
    canvas.draw();
  });

  it('draw path with color', function() {
    const data = [{ a: 1, b: 3, c: '1' }, { a: 2, b: 3.5, c: '1' }, { a: 1, b: 2, c: '2' }, { a: 2, b: 1.5, c: '2' }];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b').color('c');
    geom.init();
    geom.paint();
    expect(group.getCount()).equal(2);
    const path = group.getFirst();
    expect(path.attr('path').length).eql(2);
    canvas.draw();
  });

  it('destroy & reset', function() {
    geom.destroy();
    expect(geom.destroyed).equal(true);
    canvas.draw();
  });
});
/**/

function equal(v1, v2) {
  return Math.abs(v1 - v2) < 0.001;
}
describe('test geom interval', function() {
  const data = [
      { a: '1', b: 2, c: '1' },
      { a: '2', b: 5, c: '1' },
      { a: '3', b: 4, c: '1' },

      { a: '1', b: 3, c: '2' },
      { a: '2', b: 1, c: '2' },
      { a: '3', b: 2, c: '2' }
  ];

  scaleA = Scale.cat({
    field: 'a',
    values: [ '1', '2', '3' ],
    range: [ 0.2, 0.8 ]
  });

  const group = canvas.addGroup();
  const geom = new Geom.Interval({
    data,
    coord,
    container: group,
    scales: { a: scaleA, b: scaleB, c: scaleC, red: ScaleRed, 10: ScaleTen }
  });

  it('draw interval', function() {
    expect(geom.get('type')).eql('interval');
    geom.position('a*b', 'dodge').color('c');

    geom.init();
    geom.paint();
    expect(group.getCount()).equal(data.length);

  });

  it('size test dodge', function() {
    const path = group.getFirst();
    const arr = path.attr('path');
    expect(arr.length).eql(6);
    expect(equal(arr[2][1] - arr[0][1], (500 * 0.6) / 3 * 1 / 4)).equal(true);
  });

  it('size test no dodge', function() {
    geom.reset();
    geom.position('a*b').color('c');
    geom.set('data', [
      { a: '1', b: 2, c: '1' },
      { a: '2', b: 5, c: '1' },
      { a: '3', b: 4, c: '1' }
    ]);
    geom.init();
    geom.paint();

    const path = group.getFirst();
    const arr = path.attr('path');
    expect(arr.length).eql(6);
    // expect(arr[2][1] - arr[0][1]).equal(0);
    expect(equal((arr[2][1] - arr[0][1]), (500 * 0.6) / 3 / 2)).equal(true);
    expect(geom.getSize()).equal((500 * 0.6) / 3 / 2);

  });

  it('custom size', function() {

    geom.reset();
    geom.position('a*b').color('c').size(10);
    geom.set('data', [
      { a: '1', b: 2, c: '1' },
      { a: '2', b: 5, c: '1' },
      { a: '3', b: 4, c: '1' }
    ]);
    geom.init();
    geom.paint();

    const path = group.getFirst();
    const arr = path.attr('path');
    expect(arr.length).eql(6);
    expect(equal((arr[2][1] - arr[0][1]), 10)).equal(true);
    expect(geom.getSize()).equal(10);
  });

  it('polar coord, draw interval', function() {
    const coord1 = new Coord.Polar({
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 500,
        y: 500
      }
    });
    scaleA.range = [ 1 / 6, 1 - 1 / 6 ];
    geom.set('coord', coord1);
    geom.reset();
    geom.position('a*b');

    geom.init();
    geom.paint();

    const path = group.getFirst();
    const points = path.get('origin').points;
    expect(path.attr('path').length).eql(5);
    expect(Math.abs(points[2].x - points[0].x - 1 / 3) < 0.001).equal(true);
  });

  it('polar coord dodge size', function() {
    scaleA.range = [ 0, 1 - 1 / 3 ];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b', 'dodge').color('c');
    geom.init();
    geom.paint();
    expect(group.getCount()).equal(6);
    canvas.draw();
  });

  it('ploar transpose', function() {
    scaleA.range = [ 0, 1 - 1 / 6 ];
    geom.get('coord').isTransposed = true;
    geom.reset();
    geom.position('a*b', 'dodge').color('c');
    geom.init();
    geom.paint();
    canvas.draw();
  });

  it('geom destroy', () => {
    geom.destroy();
    canvas.draw();
    expect(geom.destroyed).equal(true);
  });

});

describe('test geom area', function() {
  const data = [
      { a: '1', b: 2, c: '1' },
      { a: '2', b: 5, c: '1' },
      { a: '3', b: 4, c: '1' },

      { a: '1', b: 3, c: '2' },
      { a: '2', b: 1, c: '2' },
      { a: '3', b: 2, c: '2' }
  ];
  const group = canvas.addGroup();
  let geom;
  it('create area', function() {
    scaleA = Scale.cat({
      field: 'a',
      values: [ '1', '2', '3' ],
      range: [ 0.2, 0.8 ]
    });
    geom = new Geom.Area({
      data,
      coord,
      container: group,
      scales: { a: scaleA, b: scaleB, c: scaleC, red: ScaleRed, 10: ScaleTen }
    });

    expect(geom.get('type')).equal('area');
    expect(geom.get('shapeType')).equal('area');
  });

  it('draw area', function() {
    geom.position('a*b').color('c');
    geom.init();
    geom.paint();
    expect(group.getCount()).equal(2);
    canvas.draw();
  });

  it('draw range area', function() {
    const data = [
      { a: '1', b: [ 2, 3 ], c: '1' },
      { a: '2', b: [ 3, 5 ], c: '1' },
      { a: '3', b: [ 0, 4 ], c: '1' }
    ];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b').color('c');
    geom.init();
    geom.paint();
    expect(group.getCount()).equal(1);
    expect(group.getFirst().attr('path').length).equal(7);
    canvas.draw();
  });

  it('draw area in polar', function() {
    const coord1 = new Coord.Polar({
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 500,
        y: 500
      }
    });
    geom.reset();
    geom.set('coord', coord1);
    geom.position('a*b').color('c');
    geom.init();
    geom.paint();
    expect(group.getCount()).equal(1);
    expect(group.getFirst().attr('path').length).equal(9);
    canvas.draw();
  });

  it('geom destroy', function() {
    geom.destroy();
    expect(geom.destroyed).equal(true);
  });
});

describe('test polygon', function() {

  const data = [
      { x: [ 1, 2, 2, 1 ], y: [ 0, 0, 2, 1 ] },
      { x: [ 4, 3, 4, 2 ], y: [ 0, 0, 2, 4 ] }
  ];
  const scaleX = Scale.linear({
    field: 'x',
    min: 0,
    max: 5
  });
  const scaleY = Scale.linear({
    field: 'y',
    min: 0,
    max: 5
  });
  const group = canvas.addGroup();

  const geom = new Geom.Polygon({
    data,
    coord,
    container: group,
    scales: { x: scaleX, y: scaleY }
  });

  it('test init', () => {
    expect(geom.get('type')).equal('polygon');
    expect(geom.get('generatePoints')).equal(true);
  });

  it('draw', function() {
    geom.position('x*y');
    geom.init();
    geom.paint();
    expect(group.getCount()).equal(2);
    canvas.draw();
  });

  it('destroy', function() {
    geom.destroy();
    expect(geom.destroyed).equal(true);
  });
});

describe('test schema', function() {
  const scaleX = Scale.linear({
    field: 'x',
    min: 0,
    values: [ 0, 1, 2, 3, 4, 5 ],
    max: 10
  });
  const scaleY = Scale.linear({
    field: 'y',
    min: 0,
    max: 5
  });

  const scaleBox = Scale.identity({
    field: 'box',
    value: 'box'
  });

  const scaleCandle = Scale.identity({
    field: 'candle',
    value: 'candle'
  });

  const group = canvas.addGroup();

  describe('test box', function() {
    const data = [
      { x: 1, y: [ 0, 1, 2, 3, 4 ] },
      { x: 2, y: [ 1, 2, 3, 4 ] },
      { x: 3, y: [ 0, 4 ] }
    ];

    const geom = new Geom.Schema({
      data,
      coord,
      container: group,
      scales: { x: scaleX, y: scaleY, box: scaleBox }
    });

    it('init', function() {
      geom.position('x*y').shape('box');
      expect(geom.get('type')).equal('schema');
    });

    it('draw', function() {
      geom.init();
      expect(geom.getNormalizedSize()).equal(1 / 10 / 2);
      geom.paint();

      expect(group.getCount()).equal(3);
      canvas.draw();
    });

    it('destroy', function() {
      geom.destroy();
      expect(geom.destroyed).equal(true);
    });

  });

  describe('test candle', function() {
    const data = [
      { x: 1, y: [ 0, 1, 2, 3 ] },
      { x: 2, y: [ 1, 2, 3, 4 ] },
      { x: 3, y: [ 0, 4 ] }
    ];

    const geom = new Geom.Schema({
      data,
      coord,
      container: group,
      scales: { x: scaleX, y: scaleY, candle: scaleCandle }
    });

    it('init', function() {
      geom.position('x*y').shape('candle');
      expect(geom.get('type')).equal('schema');
    });

    it('draw', function() {
      geom.init();
      expect(geom.getNormalizedSize()).equal(1 / 10 / 2);
      geom.paint();

      expect(group.getCount()).equal(3);
      canvas.draw();
    });

    it('destroy', function() {
      geom.destroy();
      expect(geom.destroyed).equal(true);
    });


  });
});

describe('test edge', function() {
  const scaleX = Scale.linear({
    field: 'x',
    min: 0,
    max: 5
  });
  const scaleY = Scale.linear({
    field: 'y',
    min: 0,
    max: 5
  });
  const scaleVh = Scale.identity({
    field: 'vhv',
    value: 'vhv'
  });

  const data = [
    { x: [ 1, 2 ], y: [ 3, 4 ] },
    { x: [ 2, 3 ], y: [ 1, 5 ] }
  ];

  const group = canvas.addGroup();
  const geom = new Geom.Edge({
    data,
    coord,
    container: group,
    scales: { x: scaleX, y: scaleY, vhv: scaleVh, red: ScaleRed }
  });

  it('init', function() {
    expect(geom.get('type')).equal('edge');
  });

  it('draw  two point', function() {
    geom.position('x*y').color('red');
    geom.init();
    geom.paint();
    expect(group.getCount()).equal(2);
    expect(group.getFirst().attr('path').length).equal(2);
    canvas.draw();
  });

  it('draw vhv', function() {
    geom.reset();
    geom.position('x*y').shape('vhv');
    geom.init();
    geom.paint();
    expect(group.getCount()).equal(2);
    console.log(group.getFirst().attr('path'));
    expect(group.getFirst().attr('path').length).equal(4);
    canvas.draw();
  });

  xit('final destroy', function() {
    canvas.destroy();
    document.body.removeChild(div);
  });

});
