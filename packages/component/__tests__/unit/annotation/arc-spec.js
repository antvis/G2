const expect = require('chai').expect;
const { Canvas } = require('@antv/g');
const { getCoordinate } = require('@antv/coord');
const { getScale } = require('@antv/scale');
const { Arc } = require('../../../src/annotation');

const Polar = getCoordinate('polar');
const Cat = getScale('cat');
const Linear = getScale('linear');

describe('Annotation Arc', () => {
  const xScale = new Cat({
    values: ['一月', '二月', '三月', '四月', '五月'],
  });
  const yScale = new Linear({
    min: 0,
    max: 1200,
  });
  const coord = new Polar({
    start: { x: 60, y: 460 },
    end: { x: 460, y: 60 },
    startAngle: -Math.PI,
    endAngle: Math.PI,
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

  beforeEach(() => {
    group.clear();
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });

  it('simple arc, angle < 180', () => {
    const arc = new Arc({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      start: {
        month: 0,
        temp: 1200,
      },
      end: {
        month: 1,
        temp: 1200,
      },
      style: {
        lineWidth: 2,
        stroke: 'blue',
      },
    });
    arc.render(coord, group);
    canvas.draw();
    const el = arc.get('el');
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(el.getBBox().width).to.be.closeTo(202, 0.000001);
    expect(el.getBBox().height).to.be.closeTo(202, 0.000001);
  });

  it('simple arc, angle > 180', () => {
    const arc = new Arc({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      start: {
        month: 0,
        temp: 1200,
      },
      end: {
        month: 3,
        temp: 1200,
      },
      style: {
        lineWidth: 2,
        stroke: 'blue',
      },
    });
    arc.render(coord, group);
    canvas.draw();
    const el = arc.get('el');
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(el.getBBox().width).to.equal(402);
    expect(el.getBBox().height).to.equal(402);
  });

  it('cicle arc', () => {
    const arc = new Arc({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      start: {
        month: 0,
        temp: 1200,
      },
      end: {
        month: 4,
        temp: 1200,
      },
      style: {
        lineWidth: 2,
        stroke: 'red',
      },
      appendInfo: 'Arc',
    });
    arc.render(coord, group);
    canvas.draw();
    const el = arc.get('el');
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(el.getBBox().width).to.equal(402);
    expect(el.getBBox().height).to.equal(402);
  });

  it('same point', () => {
    const arc = new Arc({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      start: {
        month: 0,
        temp: 1200,
      },
      end: {
        month: 0,
        temp: 1200,
      },
      appendInfo: 'Arc',
    });
    arc.render(coord, group);
    canvas.draw();
    const el = arc.get('el');
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(el.getBBox().width).to.equal(0);
    expect(el.getBBox().height).to.equal(0);
    expect(el.get('appendInfo')).to.equal('Arc');
  });
});
