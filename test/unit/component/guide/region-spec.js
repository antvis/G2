const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const Coord = require('@antv/coord/lib/index');
const Region = require('../../../../src/component/guide/region');
const Scale = require('@antv/scale');

const div = document.createElement('div');
div.id = 'c1';
document.body.appendChild(div);

describe('Guide: 辅助背景框', function() {
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

  it('guide region', function() {
    const region = new Region({
      xScales: {
        month: xScale
      },
      yScales: {
        temp: yScale
      },
      start: {
        month: 0,
        temp: 200
      },
      end: {
        month: 4,
        temp: 800
      },
      style: {
        lineWidth: 1,
        fill: '#CCD7EB',
        fillOpacity: 0.4,
        stroke: 'blue'
      }
    });
    region.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    const path = children[0].attr('path');
    expect(children.length).to.equal(1);
    expect(children[0].name).to.equal('guide-region');
    expect(path[1][1] - path[0][1]).to.equal(400);
    expect(path[0][2] - path[3][2]).to.equal(200);
  });
});
