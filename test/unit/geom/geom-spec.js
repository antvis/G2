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

const scaleA = Scale.linear({
  field: 'a',
  min: 0,
  max: 10
});

const scaleB = Scale.linear({
  field: 'b',
  min: 0,
  max: 5
});

const scaleC = Scale.cat({
  field: 'c',
  values: [ '1', '2' ]
});

const ScaleRed = Scale.identity({
  field: 'red',
  value: 'red'
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

describe('test geom base', function() {
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
      expect(geom.get('attrOptions').position).eqls({ field: 'a*b' });
      geom.position([ 'a', 'b' ], 'stack');
      expect(geom.get('attrOptions').position).eqls({ field: [ 'a', 'b' ] });
      expect(geom.get('adjusts')).eqls([{ type: 'stack' }]);

      geom.position([ 'a', 'b' ], { adjusts: [ 'stack', 'dodge' ] });
      expect(geom.get('adjusts')).eqls([{ type: 'stack' }, { type: 'dodge' }]);
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
    const geom = new Geom({
      type: 'test',
      coord,
      data: newData,
      scales: { a: scaleA, b: scaleB, c: scaleC }
    });

    it('init attrs', function() {
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
    const geom = new Geom({
      shapeType: 'point',
      coord,
      data: newData,
      container: group,
      generatePoints: true,
      scales: { a: scaleA, b: scaleB, c: scaleC, red: ScaleRed }
    });
    geom.position('a*b', 'stack').color('red');
    geom.init();

    it('test generate points and ', function() {
      const data = [
        { a: 1, b: [ 1, 2 ], c: '1' },
        { a: 2, b: [ 2, 3 ], c: '2' }
      ];
      geom._beforeMapping(data);
      expect(data[0].points).eqls([{ x: 0.1, y: 0.2 }, { x: 0.1, y: 0.4 }]);
    });

    it('test mapping', function() {
      const data = [
        { a: 1, b: [ 1, 2 ], c: '1' },
        { a: 2, b: [ 2, 3 ], c: '2' }
      ];
      coord.isTransposed = false;
      geom._beforeMapping(data);
      const mappedData = geom._mapping(data);
      const obj1 = mappedData[0];
      expect(obj1.x).equal(50);
      expect(obj1.y).eqls([ 100, 200 ]);
      expect(obj1.color).equal('red');
    });

    it('test draw', function() {
      geom.reset();
      geom.position('a*b').color('red');
      geom.init();
      const data = [
        { a: 1, b: 2, c: '1' },
        { a: 2, b: 3, c: '2' }
      ];
      geom._beforeMapping(data);
      const mappedData = geom._mapping(data);
      geom.draw(mappedData);
      expect(group.getCount()).to.be.equal(2);
      canvas.draw();

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
    geom.reset();
    canvas.destroy();
    document.body.removeChild(div);
  });
});
