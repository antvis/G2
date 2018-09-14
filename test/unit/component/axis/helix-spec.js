const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const HelixAxis = require('../../../../src/component/axis/helix');
const Coord = require('@antv/coord/lib/index');

const div = document.createElement('div');
div.id = 'c1';
document.body.appendChild(div);

const coord = new Coord.Helix({
  start: {
    x: 60,
    y: 460
  },
  end: {
    x: 460,
    y: 60
  }
});

const canvas = new Canvas({
  containerId: 'c1',
  width: 500,
  height: 500,
  pixelRatio: 2
});

describe('Helix 螺旋坐标轴', function() {
  const xAxis = canvas.addGroup(HelixAxis, {
    center: {
      x: 260,
      y: 260
    },
    line: {
      lineWidth: 1,
      stroke: '#C0D0E0'
    },
    ticks: [ 0, 60, 120, 180, 240 ],
    tickLine: {
      lineWidth: 1,
      length: 10,
      stroke: '#C0D0E0'
    },
    label: {
      textStyle: {
        fill: '#444'
      },
      offset: 30
    },
    grid: {
      line: {
        lineWidth: 1,
        stroke: '#C0D0E0'
      },
      items: [
        { _id: 'test1', points: [{ x: 260, y: 260 }, { x: 260, y: 60 }] },
        { _id: 'test2', points: [{ x: 260, y: 260 }, { x: 460, y: 260 }] },
        { _id: 'test3', points: [{ x: 260, y: 260 }, { x: 260, y: 460 }] },
        { _id: 'test4', points: [{ x: 260, y: 260 }, { x: 60, y: 260 }] }
      ]
    },
    a: coord.a,
    crp: (function() {
      const index = 100;
      const crp = [];
      for (let i = 0; i <= index; i++) {
        const point = coord.convertPoint({
          x: i / 100,
          y: 0
        });
        crp.push(point.x);
        crp.push(point.y);
      }
      return crp;
    })(),
    axisStart: coord.convertPoint({ x: 0, y: 0 })
  });

  canvas.draw();

  it('测试坐标轴生成', function() {
    expect(xAxis).not.to.be.undefined;
    expect(xAxis.get('type')).to.equal('helix');
  });

  it('测试线', function() {
    const lineShape = xAxis.get('lineShape');
    expect(lineShape).not.to.be.undefined;
    expect(lineShape.attr('path').length).not.to.equal(0);
  });

  it('测试 ticks', function() {
    const ticks = xAxis.get('ticks');
    expect(ticks.length).to.equal(5);
  });

  it('测试 labels', function() {
    const labelsGroup = xAxis.get('labelsGroup');
    expect(labelsGroup).not.to.null;
    expect(labelsGroup.getCount()).to.equal(5);
  });

  it('测试栅格', function() {
    const gridGroup = xAxis.get('gridGroup');
    expect(gridGroup).not.to.be.undefined;
    expect(gridGroup.getCount()).to.equal(4);
  });
});

// describe('Helix 设置了 radius 和 innerRadiuss', function() {

// });
