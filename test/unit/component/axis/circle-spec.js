const expect = require('chai').expect;
const Util = require('../../../../src/util');
const { Canvas } = require('@antv/g');
const CircleAxis = require('../../../../src/component/axis/circle');
const RadiusAxis = require('../../../../src/component/axis/line');

const div = document.createElement('div');
div.id = 'c1';
document.body.appendChild(div);

function findByName(group, name) {
  return group.findBy(function(node) {
    return node.name === name;
  });
}

const canvas = new Canvas({
  containerId: 'c1',
  width: 500,
  height: 500,
  pixelRatio: 2
});

describe('测试中轴坐标系', function() {
  const xAxis = canvas.addGroup(CircleAxis, {
    radius: 200,
    inner: 0,
    center: {
      x: 260,
      y: 260
    },
    line: {
      lineWidth: 1,
      stroke: '#C0D0E0'
    },
    tickLine: {
      lineWidth: 1,
      length: 5,
      stroke: '#C0D0E0'
    },
    ticks: [ 0, 60, 180, 240, 300 ],
    label: {
      textStyle: {
        fill: '#444',
        fontSize: 16
      }
    },
    grid: {
      lineStyle: {
        lineWidth: 1,
        stroke: '#C0D0E0'
      },
      items: [
        { _id: 'test1', points: [{ x: 260, y: 260 }, { x: 260, y: 60 }] },
        { _id: 'test2', points: [{ x: 260, y: 260 }, { x: 460, y: 260 }] },
        { _id: 'test3', points: [{ x: 260, y: 260 }, { x: 260, y: 460 }] },
        { _id: 'test4', points: [{ x: 260, y: 260 }, { x: 60, y: 260 }] }
      ]
    }
  });
  const yAxis = canvas.addGroup(RadiusAxis, {
    factor: -1,
    start: {
      x: 260,
      y: 60
    },
    end: {
      x: 260,
      y: 260
    },
    line: {
      lineWidth: 1,
      stroke: '#aaa'
    },
    ticks: [ 0, 20, 40, 60, 80, 100 ],
    circle: xAxis,
    grid: {
      lineStyle: {
        lineWidth: 1,
        stroke: '#C0D0E0'
      },
      items: [
        {
          _id: 'grid',
          points: [
            { x: 260, y: 200, radius: 60, flag: 1 },
            { x: 320, y: 260, radius: 60, flag: 1 },
            { x: 260, y: 320, radius: 60, flag: 1 },
            { x: 200, y: 260, radius: 60, flag: 1 }
          ]
        }
      ]
    },
    label: {
      textStyle: {
        fill: '#444'
      }
    },
    subTickCount: 5
  });
  canvas.draw();

  describe('测试中轴坐标系', function() {
    it('测试坐标轴生成', function() {
      expect(xAxis).not.to.be.undefined;
    });
    it('测试半径,圆心', function() {
      const center = xAxis.get('center');
      const r = xAxis.get('radius');

      expect(center.x).to.equal(260);
      expect(center.y).to.equal(260);
      expect(r).to.equal(200);
    });
    it('测试线', function() {
      const lineShape = xAxis.get('lineShape');
      expect(lineShape).not.to.be.undefined;
      expect(lineShape.attr('path').length).not.to.equal(0);
    });
    it('测试ticks', function() {
      const ticks = xAxis.get('ticks');
      const tickShape = findByName(xAxis, 'axis-ticks');

      expect(ticks.length).to.equal(5);
      expect(tickShape).not.to.be.undefined;
      expect(tickShape.attr('path')).not.to.be.undefined;
    });
    it('测试lables', function() {
      const labelsGroup = xAxis.get('labelsGroup');
      expect(labelsGroup).not.to.equal(null);
      expect(labelsGroup.getCount()).to.equal(5);
    });

    it('测试栅格', function() {
      const gridGroup = xAxis.get('gridGroup');
      expect(gridGroup).not.to.be.undefined;
      expect(gridGroup.getCount()).to.equal(4);
    });

  });
  describe('测试半径坐标轴', function() {
    it('测试坐标轴生成', function() {
      expect(yAxis).not.to.be.undefined;
    });

    it('测试栅格', function() {
      const gridGroup = xAxis.get('gridGroup');
      expect(gridGroup).not.to.be.undefined;
    });
  });
});

describe('测试中轴坐标系2', function() {
  const canvas = new Canvas({
    containerId: 'c1',
    width: 500,
    height: 500
  });

  const xAxis = canvas.addGroup(CircleAxis, {
    radius: 200,
    inner: 0,
    center: {
      x: 260,
      y: 260
    },
    ticks: [ '一月', '二月', '三', '四月', '五月', '六月' ],
    label: {
      textStyle: {

      }
    },
    grid: {
      lineStyle: {
        lineWidth: 1,
        stroke: '#C0D0E0'
      },
      items: [
        {
          _id: 'grid',
          points: [{ x: 260, y: 260 }, { x: 260, y: 60 }]
        }
      ]
    },
    subTickCount: 5
  });

  const yAxis = canvas.addGroup(RadiusAxis, {
    factor: -1,
    start: {
      x: 260,
      y: 60
    },
    end: {
      x: 260,
      y: 260
    },
    line: {
      lineWidth: 1,
      stroke: '#aaa'
    },
    min: 0,
    max: 100,
    circle: xAxis,
    tickInterval: 20,
    grid: {
      line: {
        lineWidth: 1,
        stroke: '#C0D0E0'
      }
    },
    label: {
      labelStyle: {}
    }
  });
  canvas.draw();
  describe('测试中轴坐标系', function() {
    it('测试坐标轴生成', function() {
      expect(xAxis).not.to.be.undefined;
    });

    it('测试半径,圆心', function() {
      const center = xAxis.get('center');
      const r = xAxis.get('radius');

      expect(center.x).to.equal(260);
      expect(center.y).to.equal(260);
      expect(r).to.equal(200);
    });

    it('测试labels', function() {
      const labelsGroup = xAxis.get('labelsGroup');

      expect(labelsGroup).not.to.equal(null);
      expect(labelsGroup.getCount()).to.equal(6);
    });

    it('测试栅格', function() {
      const gridGroup = xAxis.get('gridGroup');
      expect(gridGroup).not.to.be.undefined;
      expect(gridGroup.getCount()).to.equal(1);
    });
  });

  describe('测试半径坐标轴', function() {

    it('测试坐标轴生成', function() {
      expect(yAxis).not.to.be.undefined;
    });

    it('测试栅格', function() {
      const gridGroup = xAxis.get('gridGroup');
      expect(gridGroup).not.to.be.undefined;
      canvas.clear();
    });
  });
});

describe('测试圆轴', function() {
  const simpleAxisCfg = {
    radius: 200,
    inner: 0,
    center: {
      x: 260,
      y: 260
    },
    line: {
      lineWidth: 1,
      stroke: '#C0D0E0'
    },
    tickLine: {
      lineWidth: 1,
      length: 5,
      stroke: '#C0D0E0'
    },
    ticks: [
      { text: '一', value: 0.1 },
      { text: '二', value: 0.2 },
      { text: '三', value: 0.3 },
      { text: '四', value: 0.4 },
      { text: '五', value: 0.5 },
      { text: '六', value: 0.6 },
      { text: '七', value: 0.7 },
      { text: '八', value: 0.8 },
      { text: '九', value: 0.9 },
      { text: '十', value: 1 }
    ],
    label: {
      textStyle: {
        fill: '#444'
      }
    },
    grid: {
      lineStyle: {
        lineWidth: 1,
        stroke: '#C0D0E0'
      }
    }
  };

  it('测试文本自动旋转－情况1', function() {
    const cfg = Util.mix({}, simpleAxisCfg, {
      radius: 200,
      inner: 0,
      center: {
        x: 260,
        y: 260
      },
      startAngle: -Math.PI / 2,
      ticks: [
        { text: '文本', value: -0.4 },
        { text: '文本', value: 0 },
        { text: '文本', value: 0.05 },
        { text: '文本', value: 0.1 },
        { text: '文本', value: 0.15 },
        { text: '文本', value: 0.2 },
        { text: '文本', value: 0.25 },
        { text: '文本', value: 0.3 },
        { text: '文本', value: 0.35 },
        { text: '文本', value: 0.4 },
        { text: '文本', value: 0.45 },
        { text: '文本', value: 0.5 },
        { text: '文本', value: 0.55 },
        { text: '文本', value: 0.6 },
        { text: '文本', value: 0.65 },
        { text: '文本', value: 0.7 },
        { text: '文本', value: 0.75 },
        { text: '文本', value: 0.8 },
        { text: '文本', value: 0.85 },
        { text: '文本', value: 0.9 },
        { text: '文本', value: 0.95 },
        { text: '文本', value: 1 },
        { text: '文本', value: 1.5 }
      ],
      label: {
        textStyle: {
          fill: '#444'
        },
        autoRotate: true
      }
    });
    const axis = canvas.addGroup(CircleAxis, cfg);
    canvas.draw();
    const children = axis.get('children');
    const textChildren = children[children.length - 1];

    expect(textChildren.get('children')[0].attr('matrix')).not.eql([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
    expect(textChildren.get('children')[1].attr('matrix')).to.eql([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
  });
  it('测试文本自动旋转－情况2', function() {
    const cfg = Util.mix({}, simpleAxisCfg, {
      radius: 200,
      inner: 0,
      center: {
        x: 260,
        y: 260
      },
      startAngle: -Math.PI / 2,
      ticks: [
        { text: '文本文本文本', value: -0.05 },
        { text: '文本文本文本', value: 0 },
        { text: '文本文本文本', value: 0.05 },
        { text: '文本文本文本', value: 0.1 },
        { text: '文本文本文本', value: 0.15 },
        { text: '文本文本文本', value: 0.2 },
        { text: '文本文本文本', value: 0.25 },
        { text: '文本文本文本', value: 0.3 },
        { text: '文本文本文本', value: 0.35 },
        { text: '文本文本文本', value: 0.4 },
        { text: '文本文本文本', value: 0.45 },
        { text: '文本文本文本', value: 0.5 },
        { text: '文本文本文本', value: 0.55 },
        { text: '文本文本文本', value: 0.6 },
        { text: '文本文本文本', value: 0.65 },
        { text: '文本文本文本', value: 0.7 },
        { text: '文本文本文本', value: 0.75 },
        { text: '文本文本文本', value: 0.8 },
        { text: '文本文本文本', value: 0.85 },
        { text: '文本文本文本', value: 0.9 },
        { text: '文本文本文本', value: 0.95 },
        { text: '文本文本文本', value: 1 }
      ],
      label: {
        textStyle: {
          fill: '#444'
        },
        autoRotate: true
      }
    });
    const axis = canvas.addGroup(CircleAxis, cfg);
    canvas.draw();
    const children = axis.get('children');
    const textChildren = children[children.length - 1];
    expect(textChildren.get('children')[0].attr('matrix')).not.eql([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
    expect(textChildren.get('children')[6].attr('matrix')).to.eql([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
    expect(textChildren.get('children')[16].attr('matrix')).to.eql([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
  });
});
