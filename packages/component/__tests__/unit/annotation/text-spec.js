const expect = require('chai').expect;
const { Canvas } = require('@antv/g');
const { getCoord } = require('@antv/coord');
const { getScale } = require('@antv/scale');
const { Text } = require('../../../src/annotation');

const Rect = getCoord('rect');
const Cat = getScale('cat');
const Linear = getScale('linear');

describe('Annotation Text', () => {
  const xScale = new Cat({
    values: [ '一月', '二月', '三月', '四月', '五月' ],
  });
  const yScale = new Linear({
    min: 0,
    max: 1200,
  });
  const coord = new Rect({
    start: { x: 60, y: 460 },
    end: { x: 460, y: 60 },
  });
  let canvas,
    group,
    div;

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

  it('simple text', () => {
    const text = new Text({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      content: '(一月，200)',
      position: {
        month: '三月',
        temp: 'min',
      },
    });
    text.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    expect(children.length).to.equal(1);
    const el = text.get('el');
    expect(el).to.eql(children[0]);
    expect(el.name).to.equal('annotation-text');
    expect(el.attr('x')).to.equal(260);
    expect(el.attr('y')).to.equal(460);
  });

  it('text has complex style', () => {
    group.clear();
    const text = new Text({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      content: '(一月，200)',
      position: {
        month: '三月',
        temp: 'max',
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
        textAlign: 'center',
      },
      offsetX: 100,
      offsetY: 100,
    });
    text.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(children[0].attr('x')).to.equal(360);
    expect(children[0].attr('y')).to.equal(160);
    expect(children[0].attr('rotate')).to.equal(Math.PI);
  });

  it('text has appendInfo', () => {
    group.clear();
    const text = new Text({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      content: '(一月，200)',
      position: {
        month: '三月',
        temp: 'min',
      },
      appendInfo: { num: 100 },
    });
    text.render(coord, group);
    canvas.draw();

    const children = group.get('children');
    const textShape = children[0];

    expect(textShape.get('appendInfo')).to.eql({ num: 100 });
  });
});
