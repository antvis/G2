const expect = require('chai').expect;
const { Shape } = require('@antv/g');
const { getCoordinate } = require('@antv/coord');
const { getScale } = require('@antv/scale');
const Guide = require('../../../src').default;
const { Annotation } = require('../../../src/annotation');

const Rect = getCoordinate('rect');
const Cat = getScale('cat');
const Linear = getScale('linear');

describe('Annotation', () => {
  const coord = new Rect({
    start: { x: 60, y: 460 },
    end: { x: 460, y: 60 },
  });
  const xScale = new Cat({
    values: ['一月', '二月', '三月', '四月', '五月'],
  });
  const yScale = new Linear({
    min: 0,
    max: 1200,
  });
  const annotation = new Annotation();

  it('instance', () => {
    expect(annotation).to.be.an.instanceOf(Guide);
    expect(annotation.get('visible')).to.be.true;
    expect(annotation.get('zIndex')).to.equal(1);
  });

  it('changeVisible()', () => {
    annotation.changeVisible(false);
    expect(annotation.get('visible')).to.be.false;
  });

  it('parsePoint(coord, point)', () => {
    annotation.set('xScales', {
      x: xScale,
    });
    annotation.set('yScales', {
      y: yScale,
    });

    // 对象
    expect(annotation.parsePoint(coord, { x: 1, y: 600 })).to.eql({ x: 160, y: 260 });
    expect(annotation.parsePoint(coord, { x: 2.5, y: 600 })).to.eql({ x: 310, y: 260 });
    // 百分比
    expect(annotation.parsePoint(coord, ['10%', '50%'])).to.eql({ x: 100, y: 260 });
    // 数组
    expect(annotation.parsePoint(coord, ['三月', 1200])).to.eql({ x: 260, y: 60 });
    // 关键字
    expect(annotation.parsePoint(coord, ['start', 'end'])).to.eql({ x: 60, y: 60 });
    expect(annotation.parsePoint(coord, ['median', 'median'])).to.eql({ x: 260, y: 260 });
    expect(annotation.parsePoint(coord, ['max', 'min'])).to.eql({ x: 460, y: 460 });
    expect(annotation.parsePoint(coord, ['min', 'max'])).to.eql({ x: 60, y: 60 });
    // 混用
    expect(annotation.parsePoint(coord, ['max', 1200])).to.eql({ x: 460, y: 60 });
    // 回调
    expect(annotation.parsePoint(coord, () => [3, 600])).to.eql({ x: 360, y: 260 });
    // undefined
    expect(annotation.parsePoint(coord)).to.eql({ x: 60, y: 460 });
  });

  it('change', () => {
    expect(annotation.get('top')).to.be.undefined;
    annotation.change({ top: false });
    expect(annotation.get('top')).to.be.false;
    annotation.change({ top: true });
    expect(annotation.get('top')).to.be.true;
  });

  it('branch else', () => {
    annotation.clear();
    annotation.changeVisible(false);
    expect(annotation.get('visible')).to.be.false;
  });
});

describe('Annotation with dom', () => {
  const ul = document.createElement('ul');
  ul.appendChild(document.createElement('li'));
  const annotation = new Annotation({
    el: ul.querySelector('li'),
  });

  it('clear()', () => {
    expect(ul.childNodes.length).to.eql(1);
    annotation.clear();
    expect(ul.childNodes.length).to.eql(0);
  });

  it('changeVisible()', () => {
    const el = annotation.get('el');
    expect(el.style.display).to.eql('');
    annotation.changeVisible();
    expect(el.style.display).to.eql('none');
    annotation.changeVisible(true);
    expect(el.style.display).to.eql('');
  });
});

describe('Annotation with g shape', () => {
  const annotation = new Annotation({
    el: new Shape(),
  });

  it('changeVisible()', () => {
    const el = annotation.get('el');
    expect(el.get('visible')).to.be.true;
    annotation.changeVisible(false);
    expect(el.get('visible')).to.be.false;
  });
});
