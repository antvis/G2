const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer2d');
const PolyLineAxis = require('../../../../src/component/axis/polyline');

const div = document.createElement('div');
div.id = 'c1';
document.body.appendChild(div);

function findByName(group, name) {
  return group.findBy(function(node) {
    return node.name === name;
  });
}

describe('Polyline 多段线坐标系', function() {
  const canvas = new Canvas({
    containerId: 'c1',
    width: 500,
    height: 500,
    pixelRatio: 2
  });

  const axis = canvas.addGroup(PolyLineAxis, {
    start: {
      x: 60,
      y: 460
    },
    end: {
      x: 460,
      y: 460
    },
    tickPoints: [
      { x: 60, y: 460 },
      { x: 110, y: 460 },
      { x: 160, y: 350 },
      { x: 210, y: 460 },
      { x: 260, y: 460 },
      { x: 310, y: 350 }
    ],
    line: {
      lineWidth: 1,
      stroke: 'red'
    },
    tickLine: {
      lineWidth: 1,
      length: 15,
      stroke: 'red'
    },
    ticks: [ 0, 60, 180, 240, 300, 360 ],
    label: {
      textStyle: {
        fill: '#444'
      }
    }
  });
  canvas.draw();

  it('测试坐标轴生成', function() {
    expect(axis).not.to.be.undefined;
    expect(axis.get('type')).to.equal('polyline');
  });

  it('测试线生成', function() {
    expect(findByName(axis, 'axis-line')).not.to.be.null;
  });

  it('测试点生成', function() {
    expect(findByName(axis, 'axis-ticks')).not.to.be.null;
  });

  it('测试label生成', function() {
    const labelsGroup = axis.get('labelsGroup');
    expect(labelsGroup).not.to.be.undefined;
    expect(labelsGroup.get('children').length).to.equal(axis.get('ticks').length);
  });
});
