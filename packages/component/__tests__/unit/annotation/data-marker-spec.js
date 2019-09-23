const expect = require('chai').expect;
const { Canvas } = require('@antv/g');
const { getCoordinate } = require('@antv/coord');
const { getScale } = require('@antv/scale');
const { DataMarker } = require('../../../src/annotation');

const Rect = getCoordinate('Rect');
const Cat = getScale('cat');
const Linear = getScale('linear');

describe('Annotation DataMarker', () => {
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
  let canvas, group, div, dataMarker;

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

  afterEach(() => {
    dataMarker.clear();
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });

  it('draw only line', () => {
    dataMarker = new DataMarker({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      position: {
        month: '二月',
        temp: 600,
      },
      text: {
        display: false,
        content: '二月，200',
      },
      point: {
        display: false,
      },
      appendInfo: 'data-marker',
    });
    dataMarker.render(coord, group);
    canvas.draw();

    const el = dataMarker.get('el');
    expect(el.get('children').length).to.equal(1);
    const children = el.get('children');
    const line = children[0];

    expect(line.name).to.equal('annotation-data-marker');
    expect(line.attr('path')).to.eql([['M', 160, 260], ['L', 160, 240]]);
    expect(line.get('appendInfo')).to.equal('data-marker');
  });

  it('draw point + text', () => {
    dataMarker = new DataMarker({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      position: {
        month: '二月',
        temp: 600,
      },
      text: {
        content: '二月，200',
      },
      line: {
        display: false,
      },
    });
    dataMarker.render(coord, group);
    canvas.draw();

    expect(dataMarker.get('line').display).to.be.false;
    expect(dataMarker.get('point').display).to.be.true;
    expect(dataMarker.get('text').display).to.be.true;

    const el = dataMarker.get('el');
    expect(el.get('children').length).to.equal(2);
    const children = el.get('children');
    const text = children[0];
    const point = children[1];

    expect(text.attr('x')).to.eql(160);
    expect(text.attr('y')).to.eql(258);
    expect(text.attr('textBaseline')).to.equal('bottom');
    expect(point.attr('x')).to.eql(160);
    expect(point.attr('y')).to.eql(260);
    expect(text.name).to.equal('annotation-data-marker');
    expect(point.name).to.equal('annotation-data-marker');
  });

  it('text is empty', () => {
    dataMarker = new DataMarker({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      position: {
        month: '四月',
        temp: 1200,
      },
      text: {
        display: false,
      },
      line: {
        display: false,
      },
      point: {
        display: false,
      },
    });
    dataMarker.render(coord, group);
    canvas.draw();

    const el = dataMarker.get('el');
    expect(el.get('children').length).to.equal(0);
  });

  it('text right & top is overflow', () => {
    dataMarker = new DataMarker({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      position: {
        month: '五月',
        temp: 1200,
      },
      text: {
        content: 'Guide to designing a site using a design system by Meng To\n Please have fun.',
      },
      appendInfo: 'data-marker',
    });
    dataMarker.render(coord, group);
    canvas.draw();

    const el = dataMarker.get('el');
    expect(el.get('children').length).to.equal(3);
    const children = el.get('children');
    const line = children[0];
    const text = children[1];
    const point = children[2];

    expect(line.attr('path')).to.eql([['M', 460, 60], ['L', 460, 80]]);
    expect(text.attr('x')).to.eql(460);
    expect(text.attr('y')).to.eql(82);
    expect(text.attr('textBaseline')).to.equal('top');
    expect(text.attr('textAlign')).to.equal('end');
    expect(point.attr('x')).to.eql(460);
    expect(point.attr('y')).to.eql(60);
    expect(line.get('appendInfo')).to.equal('data-marker');
    expect(text.get('appendInfo')).to.equal('data-marker');
    expect(point.get('appendInfo')).to.equal('data-marker');
  });

  it('text top is overflow', () => {
    dataMarker = new DataMarker({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      position: {
        month: '三月',
        temp: 1200,
      },
      line: {
        display: false,
      },
      text: {
        content: 'Guide to designing\n Please have fun.',
      },
    });
    dataMarker.render(coord, group);
    canvas.draw();

    const el = dataMarker.get('el');
    expect(el.get('children').length).to.equal(2);
    const children = el.get('children');
    const text = children[0];

    expect(text.attr('x')).to.eql(260);
    expect(text.attr('y')).to.eql(62);
    expect(text.attr('textBaseline')).to.equal('top');
    expect(text.attr('textAlign')).to.equal('start');
  });

  it('text left & bottom is overflow', () => {
    dataMarker = new DataMarker({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      position: {
        month: '一月',
        temp: 0,
      },
      text: {
        content: 'Guide to designing a site using a design system by Meng To\n Please have fun.',
        style: {
          textAlign: 'end',
        },
      },
      line: {
        display: false,
      },
      direction: 'downward',
    });
    dataMarker.render(coord, group);
    canvas.draw();

    const el = dataMarker.get('el');
    expect(el.get('children').length).to.equal(2);
    const children = el.get('children');
    const text = children[0];

    expect(text.attr('x')).to.eql(60);
    expect(text.attr('y')).to.eql(458);
    expect(text.attr('textBaseline')).to.equal('bottom');
    expect(text.attr('textAlign')).to.equal('start');
  });

  it('text bottom is overflow', () => {
    dataMarker = new DataMarker({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      position: {
        month: '三月',
        temp: 0,
      },
      text: {
        content: 'Guide to designing\nPlease have fun.',
        display: {
          textAlign: 'end',
        },
      },
      direction: 'downward',
    });
    dataMarker.render(coord, group);
    canvas.draw();

    const el = dataMarker.get('el');
    expect(el.get('children').length).to.equal(3);
    const children = el.get('children');
    const line = children[0];
    const text = children[1];
    expect(line.attr('path')).to.eql([['M', 260, 460], ['L', 260, 440]]);
    expect(text.attr('x')).to.eql(260);
    expect(text.attr('y')).to.eql(438);
    expect(text.attr('textBaseline')).to.equal('bottom');
    expect(text.attr('textAlign')).to.equal('start');
  });

  it('autojust is off', () => {
    dataMarker = new DataMarker({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      position: {
        month: '五月',
        temp: '1200',
      },
      text: {
        content: 'Guide to designing a site using a design system by Meng To\n Please have fun.',
      },
      autoAdjust: false,
    });
    dataMarker.render(coord, group);
    canvas.draw();

    const el = dataMarker.get('el');
    expect(el.get('children').length).to.equal(3);
    const children = el.get('children');
    const line = children[0];
    const text = children[1];
    expect(line.attr('path')).to.eql([['M', 460, 60], ['L', 460, 40]]);
    expect(text.attr('x')).to.eql(460);
    expect(text.attr('y')).to.eql(38);
    expect(text.attr('textBaseline')).to.equal('bottom');
    expect(text.attr('textAlign')).to.equal('start');
    const bbox = el.getBBox();
    expect(bbox.maxX).to.gt(coord.end.x);
  });
});
