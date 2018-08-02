const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const Coord = require('../../../../src/coord/index');
const Image = require('../../../../src/component/guide/image');
const Scale = require('@antv/scale');

const div = document.createElement('div');
div.id = 'c1';
document.body.appendChild(div);

describe('Guide: 辅助图片', function() {
  const coord = new Coord.Rect({
    start: { x: 60, y: 460 },
    end: { x: 460, y: 60 }
  });

  const canvas = new Canvas({
    containerId: 'c1',
    width: 500,
    height: 500,
    pixelRatio: 2
  });

  const group = canvas.addGroup();

  const xScale = Scale.cat({
    values: [ '一月', '二月', '三月', '四月', '五月' ]
  });

  const yScale = Scale.linear({
    min: 0,
    max: 1200
  });

  it('image, set start, width and height', function(done) {
    group.clear();

    const img = new Image({
      xScales: {
        month: xScale
      },
      yScales: {
        temp: yScale
      },
      start: {
        month: '二月',
        temp: 200
      },
      src: 'https://zos.alipayobjects.com/rmsportal/YZsqDCAvphpUzpNHMqvv.png',
      width: 32,
      height: 32
    });
    img.render(coord, group);
    canvas.draw();
    const children = group.get('children');

    setTimeout(function() {
      expect(children[0].attr('width')).to.equal(32);
      expect(children[0].attr('height')).to.equal(32);
      done();
    }, 200);
  });

  it('image set start and end', function(done) {
    group.clear();

    const img = new Image({
      xScales: {
        month: xScale
      },
      yScales: {
        temp: yScale
      },
      start: {
        month: '三月',
        temp: 800
      },
      end: {
        month: '五月',
        temp: 200
      },
      src: 'https://zos.alipayobjects.com/rmsportal/gbwjstijrvcgTWOPCirr.png',
      offsetX: 100,
      offsetY: 100
    });
    img.render(coord, group);
    canvas.draw();

    const children = group.get('children');

    setTimeout(function() {
      expect(children[0].attr('width')).to.equal(200);
      expect(children[0].attr('height')).to.equal(200);
      expect(children[0].attr('x')).to.equal(360);
      expect(children[0].attr('y')).to.equal(293.33333333333337);
      done();
    }, 200);
  });
});
