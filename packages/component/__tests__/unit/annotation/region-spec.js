const expect = require('chai').expect;
const _ = require('@antv/util');
const { Canvas } = require('@antv/g');
const { getCoord } = require('@antv/coord');
const { getScale } = require('@antv/scale');
const { Region } = require('../../../src/annotation');

const Rect = getCoord('Rect');
const Cat = getScale('cat');
const Linear = getScale('linear');

describe('Annotation Region', () => {
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

  it('simple region', () => {
    const region = new Region({
      xScales: {
        month: xScale,
      },
      yScales: {
        temp: yScale,
      },
      start: {
        month: 0,
        temp: 200,
      },
      end: {
        month: 4,
        temp: 800,
      },
      style: {
        lineWidth: 1,
        fill: '#CCD7EB',
        fillOpacity: 0.4,
        stroke: 'blue',
      },
      appendInfo: 'Region',
    });
    region.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    const el = region.get('el');
    expect(children[0]).to.eql(el);

    const path = el.attr('path');
    expect(el.name).to.equal('annotation-region');
    expect(path[1][1] - path[0][1]).to.equal(400);
    expect(_.isNumberEqual(path[0][2] - path[3][2], 200)).to.be.true;
    expect(el.get('appendInfo')).to.equal('Region');
  });
});
