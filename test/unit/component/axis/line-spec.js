const expect = require('chai').expect;
const { Canvas, Group } = require('@ali/g');
const LineAxis = require('../../../../src/component/axis/line');

const div = document.createElement('div');
div.id = 'c1';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'c1',
  width: 600,
  height: 600,
  pixelRatio: 2
});

canvas.draw();

function findByName(group, name) {
  return group.findBy(function(node) {
    return node.name === name;
  });
}

describe('测试底部坐标轴生成', function() {
  const axis = canvas.addGroup(LineAxis, {
    start: {
      x: 60,
      y: 460
    },
    end: {
      x: 460,
      y: 460
    },
    isVertical: false,
    factor: 1,
    ticks: [
      { text: '0', value: 0 },
      { text: '1', value: 0.1 },
      { text: '2', value: 0.2 },
      { text: '3', value: 0.3 },
      { text: '4', value: 0.4 },
      { text: '5', value: 0.5 },
      { text: '6', value: 0.6 },
      { text: '7', value: 0.7 },
      { text: '8', value: 0.8 },
      { text: '9', value: 0.9 },
      { text: '10', value: 1 }
    ],
    title: {
      text: 'x 轴坐标',
      fontSize: 18,
      // offset: 30,
      fill: '#000'
    },
    grid: {
      lineStyle: {
        stroke: '#000',
        lineDash: [ 2, 4 ]
      },
      alternateColor: 'rgba(0, 0, 255, 0.1)',
      items: [
        [{ x: 60, y: 460 }, { x: 60, y: 450 }, { x: 60, y: 440 }, { x: 60, y: 430 }],
        [{ x: 100, y: 460 }, { x: 100, y: 450 }, { x: 100, y: 440 }, { x: 100, y: 430 }],
        [{ x: 140, y: 460 }, { x: 140, y: 450 }, { x: 140, y: 440 }, { x: 140, y: 430 }],
        [{ x: 180, y: 460 }, { x: 180, y: 450 }, { x: 180, y: 440 }, { x: 180, y: 430 }],
        [{ x: 220, y: 460 }, { x: 220, y: 450 }, { x: 220, y: 440 }, { x: 220, y: 430 }],
        [{ x: 260, y: 460 }, { x: 260, y: 450 }, { x: 260, y: 440 }, { x: 260, y: 430 }],
        [{ x: 300, y: 460 }, { x: 300, y: 450 }, { x: 300, y: 440 }, { x: 300, y: 430 }],
        [{ x: 340, y: 460 }, { x: 340, y: 450 }, { x: 340, y: 440 }, { x: 340, y: 430 }],
        [{ x: 380, y: 460 }, { x: 380, y: 450 }, { x: 380, y: 440 }, { x: 380, y: 430 }],
        [{ x: 420, y: 460 }, { x: 420, y: 450 }, { x: 420, y: 440 }, { x: 420, y: 430 }],
        [{ x: 460, y: 460 }, { x: 460, y: 450 }, { x: 460, y: 440 }, { x: 460, y: 430 }]
      ]
    },
    label: {
      textStyle: {
        fill: '#f80',
        textAlign: 'center'
      },
      formatter(value) {
        return value;
      },
      offset: 20
    },
    subTickCount: 3,
    subTickLine: {
      length: 20,
      stroke: 'yellow'
    }
  });
  canvas.draw();

  it('测试坐标轴生成', function() {
    expect(axis).not.to.be.undefined;
    expect(axis).to.be.an.instanceof(Group);
  });

  it('测试线生成', function() {
    const line = axis.get('lineShape');
    const path = line.attr('path');
    expect(findByName(axis, 'axis-line')).not.to.be.null;
    expect(path[0][1]).to.equal(60);
    expect(path[0][2]).to.equal(460);
  });

  it('测试点生成', function() {
    expect(findByName(axis, 'axis-ticks')).not.to.be.null;
  });

  it('测试label生成', function() {
    const labelsGroup = axis.get('labelsGroup');
    expect(labelsGroup).not.to.be.undefined;
    expect(labelsGroup.get('children').length).to.equal(axis.get('ticks').length);
  });

  it('测试title', function() {
    const title = findByName(axis, 'axis-title');
    expect(title).not.to.be.null;
    expect(title.attr('y')).to.equal(480);
  });

  it('ticks 生成', function() {
    expect(axis.get('tickItems').length).to.equal(axis.get('ticks').length);
  });

  it('subTicks 生成', function() {
    expect(axis.get('subTickItems').length).to.equal(axis.get('ticks').length * (axis.get('subTickCount') - 1));
  });

  it('测试网格线生成', function() {
    const gridGroup = axis.get('gridGroup');
    expect(gridGroup).not.to.be.undefined;
    expect(findByName(axis, 'axis-grid')).not.to.be.null;
  });

  it('测试移除', function() {
    axis.remove();
    expect(canvas.contain(axis)).to.be.false;
  });
});

describe('测试顶部坐标轴', function() {

  const axis = canvas.addGroup(LineAxis, {
    isVertical: false,
    factor: -1,
    start: {
      x: 60,
      y: 60
    },
    end: {
      x: 460,
      y: 60
    },
    ticks: [ 1000000, 2000000, 3000000, '4000000', '5000000', 6000000, 7000000, 8000000, 9000000, 10000000 ],
    title: {
      text: 'top axis',
      fontSize: 12,
      fill: 'red',
      textBaseline: 'bottom',
      fontWeight: 700,
      offset: 25
    },
    label: {
      autoRotate: true,
      textStyle: {
        fill: '#444',
        textAlign: 'center'
      }
      // offset: 10
    }
  });

  canvas.draw();

  it('测试线生成', function() {
    const line = axis.get('lineShape');
    const path = line.attr('path');

    expect(path[0][1]).to.equal(60);
    expect(path[0][2]).to.equal(60);
  });

  it('测试点生成位置', function() {
    const line = axis.get('lineShape');
    const path = line.attr('path');

    expect(path[0][2]).to.equal(60);
    expect(path[1][2]).to.equal(60);
  });

  it('测试 tite 位置', function() {
    const title = findByName(axis, 'axis-title');
    expect(title).not.to.be.null;
    expect(title.attr('y')).to.equal(35);
  });
});

describe('测试左侧坐标轴', function() {
  const axis = canvas.addGroup(LineAxis, {
    isVertical: true,
    factor: -1,
    start: {
      x: 60,
      y: 60
    },
    end: {
      x: 60,
      y: 460
    },
    ticks: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    title: {
      text: 'axis left',
      fill: 'red',
      rotate: -90,
      offset: 40
    },
    grid: {
      lineStyle: {
        stroke: '#c0c0c0'
      },
      items: [
        [{ x: 120, y: 200 }, { x: 180, y: 200 }, { x: 240, y: 200 }, { x: 300, y: 200 }]
      ]
    },
    label: {
      textStyle: {
        fill: '#f80',
        textAlign: 'center',
        textBaseline: 'middle'
      },
      offset: 30
    }
  });

  canvas.sort();
  canvas.draw();

  it('测试线生成', function() {
    const line = axis.get('lineShape');
    const path = line.attr('path');

    expect(path[1][1]).to.equal(60);
    expect(path[1][2]).to.equal(460);
  });

  it('测试点生成位置', function() {
    const line = axis.get('lineShape');
    const path = line.attr('path');

    expect(path[0][1]).to.equal(60);
    expect(path[1][1]).to.equal(60);
  });

  it('测试栅格', function() {
    const gridGroup = axis.get('gridGroup');
    expect(gridGroup).not.to.be.null;
    expect(findByName(gridGroup, 'axis-grid')).not.to.be.null;
  });

  it('测试tite位置', function() {
    const text = findByName(axis, 'axis-title');
    expect(text).not.to.be.null;
    expect(text.attr('x')).to.equal(20);
  });
});

describe('测试右侧坐标轴', function() {
  const axis = canvas.addGroup(LineAxis, {
    isVertical: true,
    factor: 1,
    start: {
      x: 460,
      y: 60
    },
    end: {
      x: 460,
      y: 460
    },
    ticks: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    title: {
      text: 'axis right',
      offset: 40,
      fill: '#000'
    },
    label: null
  });

  canvas.draw();

  it('测试线生成', function() {
    const line = axis.get('lineShape');
    const path = line.attr('path');
    expect(path[0][1]).to.equal(460);
    expect(path[1][1]).to.equal(460);
    expect(path[0][2]).to.equal(60);
    expect(path[1][2]).to.equal(460);
  });

  it('测试点生成位置', function() {
    const line = axis.get('lineShape');
    const path = line.attr('path');
    expect(path[0][1]).to.equal(460);
    expect(path[1][1]).to.equal(460);
  });
  it('测试label生成位置', function() {
    const labelsGroup = axis.get('labelsGroup');
    expect(labelsGroup).to.be.undefined;
  });
  it('测试tite位置', function() {
    const text = findByName(axis, 'axis-title');
    expect(text).not.to.null;
    expect(text.attr('x')).to.equal(500);
  });
});

// describe('测试公有方法', function() {
//   var axis = canvas.addGroup(Axis, {
//     isVertical: true,
//     factor: 1,
//     start: {
//       x: 460,
//       y: 60
//     },
//     end: {
//       x: 460,
//       y: 460
//     },
//     ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     title: {
//       text: 'axis right'
//     },
//     labels: {
//       label: {}
//     },
//     attrs: {
//       fill: '#333'
//     }
//   });

//   canvas.draw();
//   it('获取文本的最大宽度', function() {
//     var labelsGroup = axis.get('labelsGroup');
//     expect(axis.getMaxLabelWidth(labelsGroup)).above(0);
//   });
// });

// describe('Transposed', function() {
//   var coord = new Coord.Cartesian({
//     start: {
//       x: 60,
//       y: 460
//     },
//     end: {
//       x: 460,
//       y: 60
//     },
//   });
//   coord.transpose();
//   var axis = canvas.addGroup(Axis, {
//     isVertical: true,
//     factor: 1,
//     start: {
//       x: 460,
//       y: 60
//     },
//     end: {
//       x: 460,
//       y: 460
//     },
//     ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//     title: {
//       text: 'axis right'
//     },
//     labels: {
//       label: {}
//     },
//     attrs: {
//       fill: '#333'
//     }
//   });

//   canvas.draw();
//   it('获取文本的最大宽度', function() {
//     var labelsGroup = axis.get('labelsGroup');
//     expect(axis.getMaxLabelWidth(labelsGroup)).above(0);
//   });
// });

// describe('文本自动旋转', function() {
//   var simpleCfg = {
//     isVertical: true,
//     factor: -1,
//     start: {
//       x: 60,
//       y: 60
//     },
//     end: {
//       x: 60,
//       y: 460
//     },
//     ticks: [0, 233211, 2, 3, 4, 5, 6, 7, 8, 9, 123132, 1, 2, 3, 4, 999205, 6, 7, 8, 9],
//     title: {
//       text: 'axis right'
//     },
//     attrs: {
//       fill: '#333'
//     },
//     grid: {
//       line: {
//         stroke: '#c0c0c0'
//       },
//       minorLine: {
//         stroke: '#e0e0e0'
//       },
//       minorCount: 2
//     }
//   };
//   it('左边自动旋转', function() {
//     simpleCfg.position = 'left';
//     var axis = canvas.addGroup(Axis, simpleCfg);
//     canvas.draw();
//   });
//   it('上边边自动旋转', function() {
//     simpleCfg.position = 'top';
//     var axis = canvas.addGroup(Axis, simpleCfg);
//     canvas.draw();
//   });
//   it('右边自动旋转', function() {
//     simpleCfg.position = 'right';
//     var axis = canvas.addGroup(Axis, simpleCfg);
//     canvas.draw();
//   });
//   it('下边自动旋转', function() {
//     simpleCfg.position = 'bottom';
//     var axis = canvas.addGroup(Axis, simpleCfg);
//     canvas.draw();
//   });
// });
