const expect = require('chai').expect;
const { Canvas } = require('@antv/g');
const { getCoord } = require('@antv/coord');
const { getScale } = require('@antv/scale');
const { Html } = require('../../../src/annotation');

const Rect = getCoord('Rect');
const Cat = getScale('cat');
const Linear = getScale('linear');

describe('Annotation Html', () => {
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

  beforeEach(() => {
    const dom = document.getElementsByClassName('guide-annotation');
    dom[0] && dom[0].remove();
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });

  it('position align(middle, middle)', () => {
    const html = new Html({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      position: {
        month: 3,
        temp: 600,
      },
      html: () => '<div style="border: none;width: 54.2px;height: 54.2px;"></div>',
    });
    html.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    const dom = document.getElementsByClassName('guide-annotation');
    const el = html.get('el');
    expect(el).to.equal(dom.item(0));
    expect(el.style.left).to.equal('333px');
    expect(el.style.top).to.equal('233px');
    expect(children.length).to.equal(0);
  });

  it('position align(left, top)', () => {
    const html = new Html({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      position: {
        month: 3,
        temp: 600,
      },
      alignX: 'left',
      alignY: 'top',
      html: '<div style="border: none;width: 60px;height: 60px;"></div>',
      offsetX: -5,
      offsetY: 5,
    });
    html.render(coord, group);
    canvas.draw();
    const el = html.get('el');
    expect(el.style.left).to.equal('355px');
    expect(el.style.top).to.equal('265px');
  });

  it('position align(right, bottom)', () => {
    const html = new Html({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      position: {
        month: 3,
        temp: 600,
      },
      alignX: 'right',
      alignY: 'bottom',
      html: '<div style="border: none;width: 60px;height: 60px;"></div>',
      offsetX: 5,
      offsetY: -5,
    });
    html.render(coord, group);
    canvas.draw();
    const el = html.get('el');
    expect(el.style.left).to.equal('305px');
    expect(el.style.top).to.equal('195px');
  });

  it('clear html', () => {
    const html = new Html({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      position: [ 'start', '100%' ],
      html: '<p style="width: 100px;height: 80px;font-size: 20px;">Hoooray</p>',
    });
    html.render(coord, group);
    canvas.draw();
    expect(document.getElementsByClassName('guide-annotation').length).to.equal(1);
    html.clear();
    expect(document.getElementsByClassName('guide-annotation').length).to.equal(0);
  });
});
