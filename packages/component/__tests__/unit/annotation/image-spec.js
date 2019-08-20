const expect = require('chai').expect;
const { Canvas } = require('@antv/g');
const { getCoord } = require('@antv/coord');
const { getScale } = require('@antv/scale');
const { Image } = require('../../../src/annotation');

const Rect = getCoord('Rect');
const Cat = getScale('cat');
const Linear = getScale('linear');

describe('Annotation Image', () => {
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
    group.clear();
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });

  it('simple image, set start, width, height', () => {
    const img = new Image({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      start: {
        month: '二月',
        temp: 600,
      },
      src: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
      width: 64,
      height: 64,
    });
    img.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    const el = img.get('el');

    expect(el).to.eql(children[0]);
    expect(el.attr('x')).to.equal(160);
    expect(el.attr('y')).to.equal(260);
    expect(el.attr('width')).to.equal(64);
    expect(el.attr('height')).to.equal(64);
    expect(el.name).to.equal('annotation-image');
  });

  it('simple image, set start only', () => {
    const img = new Image({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      start: {
        month: '二月',
        temp: 600,
      },
      src: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
      appendInfo: 'Image',
    });
    img.render(coord, group);
    canvas.draw();
    const el = img.get('el');
    expect(el.attr('width')).to.equal(32);
    expect(el.attr('height')).to.equal(32);
    expect(el.get('appendInfo')).to.equal('Image');
  });

  it('simple image, set offset', () => {
    const img = new Image({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      src: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
      start: [ '三月', 0 ],
      end: [ '五月', 1200 ],
      offsetX: -100,
      offsetY: 100,
    });
    img.render(coord, group);
    canvas.draw();

    const el = img.get('el');
    expect(el.attr('width')).to.equal(200);
    expect(el.attr('height')).to.equal(-400);
    expect(el.attr('x')).to.equal(160);
    expect(el.attr('y')).to.equal(560);
  });
});
