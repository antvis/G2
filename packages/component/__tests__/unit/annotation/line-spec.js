const expect = require('chai').expect;
const { Canvas, Group } = require('@antv/g');
const { getCoordinate } = require('@antv/coord');
const { getScale } = require('@antv/scale');
const { Line } = require('../../../src/annotation');

const Rect = getCoordinate('rect');
const Cat = getScale('cat');
const Linear = getScale('linear');

describe('Annotation Line', () => {
  const xScale = new Cat({
    values: ['一月', '二月', '三月', '四月', '五月'],
  });
  const yScale = new Linear({
    min: 0,
    max: 1200,
  });
  const coord = new Rect({
    start: { x: 60, y: 460 },
    end: { x: 460, y: 60 },
  });
  let canvas, group, div;

  before(() => {
    div = document.createElement('div');
    div.id = 'c1';
    document.body.appendChild(div);

    canvas = new Canvas({
      containerId: 'c1',
      width: 500,
      height: 500,
      pixelRatio: 2,
    });
    group = canvas.addGroup();
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });

  it('line only', () => {
    const line = new Line({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      start: {
        month: '一月',
        temp: 200,
      },
      end: {
        month: '五月',
        temp: 200,
      },
      line: {
        style: {
          stroke: '#999',
          lineWidth: 2,
          lineDash: [2, 2],
        },
      },
    });
    line.render(coord, group);
    canvas.draw();

    expect(group.get('children').length).to.eql(1);
    const el = line.get('el');
    expect(el).to.an.instanceof(Group);
    expect(el.getCount()).to.eql(1);
    const lineShape = el.get('children')[0];
    expect(lineShape.name).to.equal('annotation-line');
    expect(lineShape.attr('path')).to.eql([['M', 60, 393.33333333333337], ['L', 460, 393.33333333333337]]);
  });

  it('line + text, autorotate', () => {
    group.clear();
    const line = new Line({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      start: {
        month: '一月',
        temp: 600,
      },
      end: {
        month: '五月',
        temp: 0,
      },
      line: {
        style: {
          stroke: '#999',
          lineWidth: 1,
        },
      },
      text: {
        position: 0.5,
        content: '我是条辅助线哦',
        autoRotate: true,
        style: null,
      },
    });
    line.render(coord, group);
    canvas.draw();

    const children = group.get('children');
    const el = line.get('el');
    expect(children.length).to.equal(1);
    expect(el).to.an.instanceof(Group);
    expect(el.getCount()).to.equal(2);
    const textShape = el.get('children')[1];
    expect(textShape.name).to.equal('annotation-line');
    expect(textShape.attr('rotate')).to.closeTo(Math.atan(0.5), 0.0000001);
    expect(textShape.attr('x')).to.equal(260);
    expect(textShape.attr('y')).to.equal(360);
  });

  it('line + text, autorotate + offset', () => {
    group.clear();
    const line = new Line({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      start: {
        month: '一月',
        temp: 600,
      },
      end: {
        month: '五月',
        temp: 0,
      },
      line: {
        style: {
          stroke: '#999',
          lineWidth: 1,
        },
      },
      text: {
        position: 'center',
        content: '我是条辅助线哦',
        autoRotate: true,
        style: {
          fontSize: 16,
          fill: 'red',
          textAlign: 'start',
        },
        offsetX: 5,
        offsetY: 10,
      },
    });
    line.render(coord, group);
    canvas.draw();

    const children = group.get('children');
    const textShape = children[0].get('children')[1];
    expect(textShape.attr('rotate')).to.closeTo(Math.atan(0.5), 0.0000001);
    expect(textShape.attr('x')).to.equal(265);
    expect(textShape.attr('y')).to.equal(370);
  });

  it('line + text, text rotate 60', () => {
    group.clear();
    const line = new Line({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      start: {
        month: '二月',
        temp: 200,
      },
      end: {
        month: '二月',
        temp: 1000,
      },
      line: {
        style: {
          stroke: '#999',
          lineWidth: 1,
        },
      },
      text: {
        position: 'end',
        content: '我是条辅助线哦',
        autoRotate: true,
        style: {
          fontSize: 14,
          fill: 'red',
          textAlign: 'end',
          rotate: 60,
        },
      },
    });
    line.render(coord, group);
    canvas.draw();

    const children = group.get('children');
    const textShape = children[0].get('children')[1];
    expect(textShape.get('type')).to.equal('Text');
    expect(textShape.attr('x')).to.equal(160);
    expect(textShape.attr('rotate')).to.equal(Math.PI / 3);
  });

  it('line + text, text not rotate', () => {
    group.clear();
    const line = new Line({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      start: {
        month: '二月',
        temp: 200,
      },
      end: {
        month: '二月',
        temp: 1000,
      },
      line: {
        style: {
          stroke: '#999',
          lineWidth: 1,
        },
      },
      text: {
        position: 'end',
        content: '我是条辅助线哦',
        autoRotate: false,
        style: {
          fontSize: 14,
          fill: 'red',
          textAlign: 'end',
        },
      },
    });
    line.render(coord, group);
    canvas.draw();

    const children = group.get('children');
    const textShape = children[0].get('children')[1];
    expect(textShape.attr('rotate')).to.be.undefined;
  });

  it('line + text, text position start', () => {
    group.clear();
    const line = new Line({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      start: {
        month: '一月',
        temp: 200,
      },
      end: {
        month: '一月',
        temp: 1000,
      },
      text: {
        position: 'start',
        content: '我是条辅助线哦',
        autoRotate: false,
        style: {
          fontSize: 14,
          fill: 'red',
          textAlign: 'end',
          rotate: 60,
        },
      },
    });
    line.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    const textShape = children[0].get('children')[1];
    expect(textShape.attr('x')).to.equal(60);
  });

  it('line + text, text position 50%', () => {
    group.clear();
    const line = new Line({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      start: {
        month: '一月',
        temp: 200,
      },
      end: {
        month: '二月',
        temp: 1000,
      },
      text: {
        position: '50%',
        content: '我是条辅助线哦',
        autoRotate: false,
        style: {
          fontSize: 14,
          fill: 'red',
          textAlign: 'end',
          rotate: 60,
        },
      },
    });
    line.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    const textShape = children[0].get('children')[1];
    expect(textShape.attr('x')).to.equal(110);
  });

  it('line + text, has appendInfo', () => {
    group.clear();
    const line = new Line({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      start: {
        month: '一月',
        temp: 200,
      },
      end: {
        month: '二月',
        temp: 1000,
      },
      text: {
        position: '50%',
        content: '我是条辅助线哦',
        autoRotate: false,
        style: {
          fontSize: 14,
          fill: 'red',
          textAlign: 'end',
          rotate: 60,
        },
      },
      appendInfo: { num: 100 },
    });
    line.render(coord, group);
    canvas.draw();

    const children = group.get('children');
    const lineShape = children[0].get('children')[0];
    const textShape = children[0].get('children')[1];

    expect(lineShape.get('appendInfo')).to.eql({ num: 100 });
    expect(textShape.get('appendInfo')).to.eql({ num: 100 });
  });
});
