const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const Coord = require('../../../../src/coord/index');
const { Arc } = require('../../../../src/component/guide/index');
const Scale = require('@antv/scale');

const div = document.createElement('div');
div.id = 'c1';
document.body.appendChild(div);

describe('Guide: 辅助圆弧线', function() {
  const coord = new Coord.Polar({
    start: { x: 60, y: 460 },
    end: { x: 460, y: 60 },
    startAngle: -9 / 8 * Math.PI,
    endAngle: 1 / 8 * Math.PI
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
/*    expect(children[0].attr('r')).to.equal(200);
    expect(children[0].attr('startAngle')).to.equal(2.7488935718910694);
    expect(children[0].attr('endAngle')).to.equal(0.39269908169872403);*/
  });
});
