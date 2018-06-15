const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer2d');
const Coord = require('../../../../src/coord/index');
const Text = require('../../../../src/component/guide/text');
const Scale = require('../../../../src/scale/index');

const div = document.createElement('div');
div.id = 'c1';
document.body.appendChild(div);

describe('Guide: 辅助文本', function() {
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

  it('guide text', function() {
    const text = new Text({
      xScales: {
        month: xScale
      },
      yScales: {
        temp: yScale
      },
      content: '(一月，200)',
      position: {
        month: '三月',
        temp: 'min'
      }
    });
    text.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(children[0].name).to.equal('guide-text');
    expect(children[0].attr('x')).to.equal(260);
    expect(children[0].attr('y')).to.equal(460);
  });

  it('guide text has some offset', function() {
    group.clear();
    const text = new Text({
      xScales: {
        month: xScale
      },
      yScales: {
        temp: yScale
      },
      content: '(一月，200)',
      position: {
        month: '三月',
        temp: 'max'
      },
      style: {
        fill: 'rgb(251, 192, 45)',
        fontSize: 24,
        fontWeight: 600,
        shadowBlur: 12,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffsetX: 2,
        shadowOffsetY: 4,
        rotate: 180,
        textAlign: 'center'
      },
      offsetX: 100,
      offsetY: 100
    });
    text.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(children[0].name).to.equal('guide-text');
    expect(children[0].attr('x')).to.equal(360);
    expect(children[0].attr('y')).to.equal(160);
    expect(children[0].attr('rotate')).to.equal(Math.PI);
  });

  it('guide text with the start is a function', function() {
    group.clear();
    const text = new Text({
      xScales: {
        month: xScale
      },
      yScales: {
        temp: yScale
      },
      content: '(一月，200)',
      position(xScales) {
        return {
          month: xScales.month.values[3],
          temp: 'median'
        };
      },
      style: {
        fill: 'rgb(251, 192, 45)',
        fontSize: 24,
        fontWeight: 600,
        textAlign: 'center'
      }
    });
    text.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(children[0].name).to.equal('guide-text');
    expect(children[0].attr('x')).to.equal(360);
    expect(children[0].attr('y')).to.equal(260);
  });
});
