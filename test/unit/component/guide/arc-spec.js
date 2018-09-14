const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const Coord = require('@antv/coord/lib/index');
const { Arc } = require('../../../../src/component/guide/index');
const Scale = require('@antv/scale');

describe('Guide: 辅助圆弧线', function() {
  const div = document.createElement('div');
  div.id = 'arc-spec';
  document.body.appendChild(div);

  const coord = new Coord.Polar({
    start: { x: 60, y: 460 },
    end: { x: 460, y: 60 },
    startAngle: -9 / 8 * Math.PI,
    endAngle: 1 / 8 * Math.PI
  });

  const canvas = new Canvas({
    containerId: 'arc-spec',
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

  it('guide arc', function() {
    const arc = new Arc({
      xScales: {
        month: xScale
      },
      yScales: {
        temp: yScale
      },
      start: {
        month: 0,
        temp: 1200
      },
      end: {
        month: 4,
        temp: 1200
      },
      style: {
        lineWidth: 3,
        stroke: 'blue'
      }
    });
    arc.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(children[0].name).to.equal('guide-arc');
    expect(children[0].attr('path').length).to.equal(2);
    expect(children[0].getBBox().width).to.equal(403.3810740653281);
    expect(children[0].getBBox().height).to.equal(279.80013887133464);
  });

  it('empty arc', function() {
    const coord = new Coord.Polar({
      start: { x: 80, y: 355 },
      end: { x: 480, y: 20 },
      startAngle: 0,
      endAngle: 2 * Math.PI
    });
    const arc = new Arc({
      xScales: {
        month: xScale
      },
      yScales: {
        temp: yScale
      },
      start: {
        month: 0,
        temp: 1200
      },
      end: {
        month: 0,
        temp: 1200
      },
      style: {
        lineWidth: 3,
        stroke: 'blue'
      }
    });
    arc.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    expect(children.length).to.equal(2);
    expect(children[0].name).to.equal('guide-arc');
    expect(children[1].attr('path').length).to.equal(2);
    expect(children[1].getBBox().width).to.equal(0);
    expect(children[1].getBBox().height).to.equal(0);
  });
});
