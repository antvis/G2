const expect = require('chai').expect;
const Attr = require('../../../src/attr/');
const Scale = require('../../../src/scale/');

describe('attr test color', () => {
  const scaleIdentity = Scale.identity({
    dim: 'type',
    value: 'red'
  });

  const scaleCat = Scale.cat({
    dim: 'type',
    values: [ 'a', 'b', 'c', 'd' ]
  });

  const scaleLinear = Scale.linear({
    dim: 'age',
    min: 0,
    max: 10
  });

  describe('no callback category', () => {
    const color = new Attr.Color({
      scales: [ scaleCat, scaleLinear ],
      values: [ 'c1', 'c2', 'c3' ]
    });
    it('init', () => {
      expect(color.type).equal('color');
      expect(color.getNames()).eqls([ 'color' ]);

    });

    it('mapping', () => {
      expect(color.mapping('a')).equal('c1');
      expect(color.mapping('b')).equal('c2');
      expect(color.mapping('c')).equal('c3');
      expect(color.mapping('d')).equal('c1');
    });
  });

  describe('no callback linear', () => {
    const color = new Attr.Color({
      scales: [ scaleLinear ],
      values: [ '#000000', '#0000ff', '#00ff00', '#ff0000', '#ffffff' ]
    });

    it('mapping', () => {
      expect(color.mapping(0)).equal('#000000');
      expect(color.mapping(2.5)).equal('#0000ff');
      expect(color.mapping(5)).equal('#00ff00');
      expect(color.mapping(10)).equal('#ffffff');
      expect(color.mapping(4)).equal('#009966');
    });
  });

  describe('scale identity', () => {
    const color = new Attr.Color({
      scales: [ scaleIdentity ],
      values: [ '#000000', '#0000ff', '#00ff00', '#ff0000', '#ffffff' ]
    });
    it('mapping', () => {
      expect(color.mapping(0)).equal('red');
    });
  });

});

describe('attr test size & opacity', () => {
  const scaleCat = Scale.cat({
    dim: 'type',
    values: [ 'a', 'b', 'c', 'd' ]
  });

  const scaleLinear = Scale.linear({
    dim: 'age',
    min: 0,
    max: 10
  });
  it('mapping size two size', () => {
    const size = new Attr.Size({
      scales: [ scaleLinear ],
      values: [ 0, 100 ]
    });
    expect(size.type).equal('size');
    expect(size.mapping(0)).equal(0);
    expect(size.mapping(10)).equal(100);
    expect(size.mapping(5)).equal(50);
  });

  it('mapping size three size', () => {
    const size = new Attr.Size({
      scales: [ scaleLinear ],
      values: [ 0, 10, 100 ]
    });
    expect(size.mapping(0)).equal(0);
    expect(size.mapping(10)).equal(100);
    expect(size.mapping(4)).equal(8);
    expect(size.mapping(8)).equal(64);
  });

  it('mapping size category', () => {
    const size = new Attr.Size({
      scales: [ scaleCat ],
      values: [ 0, 10, 100 ]
    });

    expect(size.mapping('a')).equal(0);
    expect(size.mapping('b')).equal(10);
    expect(size.mapping('c')).equal(100);
  });

  it('mapping opacity', () => {
    const opactiy = new Attr.Opacity({
      scales: [ scaleLinear ],
      values: [ 0, 1 ]
    });
    expect(opactiy.type).equal('opacity');
    expect(opactiy.mapping(0)).equal(0);
    expect(opactiy.mapping(10)).equal(1);
    expect(opactiy.mapping(5)).equal(0.5);
  });
});

describe('attr test shape', () => {
  const scaleCat = Scale.cat({
    dim: 'type',
    values: [ 'a', 'b', 'c', 'd' ]
  });

  const scaleLinear = Scale.linear({
    dim: 'age',
    min: 0,
    max: 10
  });

  it('init', function() {
    const shape = new Attr.Shape({

    });

    expect(shape.type).equal('shape');
    expect(shape.getNames().length).equal(0);
  });
  it('test category mapping', function() {
    const shape = new Attr.Shape({
      scales: [ scaleCat ],
      values: [ 's1', 's2' ]
    });
    expect(shape.mapping('a')).equal('s1');
    expect(shape.mapping('b')).equal('s2');
    expect(shape.mapping('c')).equal('s1');
    expect(shape.mapping('d')).equal('s2');
  });

  it('test linear mapping', function() {
    const shape = new Attr.Shape({
      scales: [ scaleLinear ],
      values: [ 's1', 's2' ]
    });
    expect(shape.mapping(0)).equal('s1');
    expect(shape.mapping(4)).equal('s1');
    expect(shape.mapping(9)).equal('s2');
    expect(shape.mapping(10)).equal('s2');
  });
});

describe('attr test position', () => {
  const scaleCat = Scale.cat({
    dim: 'type',
    values: [ 'a', 'b', 'c', 'd', 'e' ]
  });

  const scaleLinear = Scale.linear({
    dim: 'age',
    min: 0,
    max: 10
  });
  const coord = {
    convertPoint(obj) {
      return {
        x: obj.x * 100,
        y: obj.y * 200
      };
    }
  };
  const position = new Attr.Position({
    scales: [ scaleCat, scaleLinear ],
    coord
  });

  it('init', () => {
    expect(position.type).equal('position');
    expect(position.getNames().length).equal(2);
  });
  it('mapping x,y', () => {
    const rst = position.mapping('a', 3);
    expect(rst).eqls([ 0, 60 ]);
  });
  it('mapping x, [y1,y2]', () => {
    const rst = position.mapping('b', [ 4, 6 ]);
    expect(rst).eqls([ 25, [ 80, 120 ]]);
  });
  it('mapping [x1,x2], y', () => {
    const rst = position.mapping([ 'b', 'c' ], 8);
    expect(rst).eqls([[ 25, 50 ], 160 ]);
  });
  it('mapping [x1,x2], [y1, y2]', () => {
    const rst = position.mapping([ 'b', 'c', 'd' ], [ 4, 6, 10 ]);
    expect(rst).eqls([[ 25, 50, 75 ], [ 80, 120, 200 ]]);
  });

});
