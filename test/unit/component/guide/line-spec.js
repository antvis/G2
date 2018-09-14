const expect = require('chai').expect;
const { Canvas, Group } = require('../../../../src/renderer');
const Coord = require('@antv/coord/lib/index');
const Line = require('../../../../src/component/guide/line');
const Scale = require('@antv/scale');

const div = document.createElement('div');
div.id = 'c1';
document.body.appendChild(div);

describe('Guide: 辅助线', function() {
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

  it('guide line without text', function() {
    const line = new Line({
      xScales: {
        month: xScale
      },
      yScales: {
        temp: yScale
      },
      start: {
        month: '一月',
        temp: 200
      },
      end: {
        month: '五月',
        temp: 200
      },
      lineStyle: {
        stroke: '#999',
        lineWidth: 2,
        lineDash: [ 2, 2 ]
      }
    });
    line.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(children[0]).to.an.instanceof(Group);
    expect(children[0].getCount()).to.equal(1);
  });

  it('guide line, the point is array', function() {
    group.clear();

    const line = new Line({
      xScales: {
        month: xScale
      },
      yScales: {
        temp: yScale
      },
      start: [ '一月', 200 ],
      end: {
        month: '五月',
        temp: 200
      },
      lineStyle: {
        stroke: '#999',
        lineWidth: 2,
        lineDash: [ 2, 2 ]
      }
    });
    line.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(children[0]).to.an.instanceof(Group);
    expect(children[0].getCount()).to.equal(1);
  });

  it('guide line, start, end', function() {
    group.clear();

    const line = new Line({
      xScales: {
        month: xScale
      },
      yScales: {
        temp: yScale
      },
      start: [ 'start', 200 ],
      end: [ 'end', 200 ],
      lineStyle: {
        stroke: 'red',
        lineWidth: 2,
        lineDash: [ 2, 2 ]
      }
    });
    line.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(children[0]).to.an.instanceof(Group);
    expect(children[0].getCount()).to.equal(1);
    expect(children[0].get('children')[0].attr('path')[0][1]).eqls(60);
    expect(children[0].get('children')[0].attr('path')[1][1]).eqls(460);
  });


  it('guide line with text, and autoRotate is true', function() {
    group.clear();

    const line = new Line({
      xScales: {
        month: xScale
      },
      yScales: {
        temp: yScale
      },
      start: {
        month: '一月',
        temp: 200
      },
      end: {
        month: '五月',
        temp: 1000
      },
      lineStyle: {
        stroke: '#999',
        lineWidth: 1
      },
      text: {
        position: 'center',
        content: '我是条辅助线哦'
        // autoRotate: true,
        // style: {
        //   fontSize: 16,
        //   fill: 'red'
        // }
      }
    });
    line.render(coord, group);
    canvas.draw();

    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(children[0]).to.an.instanceof(Group);
    expect(children[0].getCount()).to.equal(2);
    const textShape = children[0].get('children')[1];
    expect(textShape.attr('rotate')).not.to.be.undefined;
    expect(textShape.attr('x')).to.equal(260);
    expect(textShape.attr('y')).to.equal(260);
  });

  it('guide line with text, the text has offset', function() {
    group.clear();

    const line = new Line({
      xScales: {
        month: xScale
      },
      yScales: {
        temp: yScale
      },
      start: {
        month: '一月',
        temp: 200
      },
      end: {
        month: '五月',
        temp: 1000
      },
      lineStyle: {
        stroke: '#999',
        lineWidth: 1
      },
      text: {
        position: 'center',
        content: '我是条辅助线哦',
        autoRotate: true,
        style: {
          fontSize: 16,
          fill: 'red',
          textAlign: 'start'
        },
        offsetX: 5,
        offsetY: 10
      }
    });
    line.render(coord, group);
    canvas.draw();

    const children = group.get('children');
    const textShape = children[0].get('children')[1];
    expect(textShape.attr('rotate')).not.to.be.undefined;
    expect(textShape.attr('x')).to.equal(265);
    expect(textShape.attr('y')).to.equal(270);
  });

  it('guide line with text but not rotate with line.', function() {
    group.clear();

    const line = new Line({
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
      end: {
        month: '四月',
        temp: 800
      },
      lineStyle: {
        stroke: '#999',
        lineWidth: 1
      },
      text: {
        position: 'start',
        content: '我是条辅助线哦',
        autoRotate: false,
        style: {
          fontSize: 16,
          fill: 'red'
        }
      }
    });
    line.render(coord, group);
    canvas.draw();

    const children = group.get('children');
    const textShape = children[0].get('children')[1];
    expect(textShape.get('type')).to.equal('Text');
    expect(textShape.attr('x')).to.equal(160);
    expect(textShape.attr('rotate')).to.be.undefined;
  });

  it('guide line with text, and text has own angle.', function() {
    group.clear();

    const line = new Line({
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
      end: {
        month: '二月',
        temp: 1000
      },
      lineStyle: {
        stroke: '#999',
        lineWidth: 1
      },
      text: {
        position: 'end',
        content: '我是条辅助线哦',
        autoRotate: false,
        style: {
          fontSize: 14,
          fill: 'red',
          textAlign: 'end',
          rotate: 60
        }
      }
    });
    line.render(coord, group);
    canvas.draw();

    const children = group.get('children');
    const textShape = children[0].get('children')[1];
    expect(textShape.get('type')).to.equal('Text');
    expect(textShape.attr('x')).to.equal(160);
    expect(textShape.attr('rotate')).to.equal(Math.PI / 3);
  });

  it('guide line with text, the position is value like "40%"', function() {
    group.clear();

    const line = new Line({
      xScales: {
        month: xScale
      },
      yScales: {
        temp: yScale
      },
      start: {
        month: '一月',
        temp: 200
      },
      end: {
        month: '五月',
        temp: 200
      },
      lineStyle: {
        stroke: '#999',
        lineWidth: 1
      },
      text: {
        position: '80%',
        content: '我是条辅助线哦',
        autoRotate: false,
        style: {
          fontSize: 16,
          fill: 'red',
          textAlign: 'start'
        }
      }
    });
    line.render(coord, group);
    canvas.draw();

    const children = group.get('children');
    const textShape = children[0].get('children')[1];
    expect(textShape.attr('x')).to.equal(380);
  });

  it('guide line with text, the position is value like 0.5', function() {
    group.clear();

    const line = new Line({
      xScales: {
        month: xScale
      },
      yScales: {
        temp: yScale
      },
      start: {
        month: '一月',
        temp: 200
      },
      end: {
        month: '五月',
        temp: 200
      },
      lineStyle: {
        stroke: '#999',
        lineWidth: 1
      },
      text: {
        position: 0.1,
        content: '我是条辅助线哦',
        autoRotate: false,
        style: {
          fontSize: 16,
          fill: 'red',
          textAlign: 'start'
        },
        offsetY: 20
      }
    });
    line.render(coord, group);
    canvas.draw();

    const children = group.get('children');
    const textShape = children[0].get('children')[1];
    expect(textShape.attr('x')).to.equal(100);
  });

  it('guide line with text, the position is value like 150%', function() {
    group.clear();

    const line = new Line({
      xScales: {
        month: xScale
      },
      yScales: {
        temp: yScale
      },
      start: {
        month: '一月',
        temp: 200
      },
      end: {
        month: '五月',
        temp: 200
      },
      lineStyle: {
        stroke: '#999',
        lineWidth: 1
      },
      text: {
        position: '150%',
        content: '我是条辅助线哦',
        autoRotate: false,
        style: {
          fontSize: 16,
          fill: 'red',
          textAlign: 'start'
        }
      }
    });
    line.render(coord, group);
    canvas.draw();

    const children = group.get('children');
    const textShape = children[0].get('children')[1];
    expect(textShape.attr('x')).to.equal(460);
    canvas.destroy();
  });
});
