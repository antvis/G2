import { expect } from 'chai';
import { Canvas } from '@antv/g';
import { getCoordinate } from '@antv/coord';
import HelixAxis from '../../../src/axis/helix';

const Helix = getCoordinate('helix');

describe('Helix Axis for Helix Coord', function() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const coord = new Helix({
    start: {
      x: 60,
      y: 460,
    },
    end: {
      x: 460,
      y: 60,
    },
  });
  const canvas = new Canvas({
    containerDOM: div,
    width: 500,
    height: 500,
    pixelRatio: 2,
  });
  const group = canvas.addGroup();
  const xAxis = new HelixAxis({
    inner: 0,
    canvas,
    group,
    center: {
      x: 260,
      y: 260,
    },
    line: {
      lineWidth: 1,
      stroke: '#C0D0E0',
    },
    ticks: [0, 60, 120, 180, 240],
    tickLine: {
      lineWidth: 1,
      length: 10,
      stroke: '#C0D0E0',
    },
    label: {
      textStyle: {
        fill: '#444',
      },
      offset: 30,
    },
    grid: {
      lineWidth: 1,
      stroke: '#C0D0E0',
    },
    gridPoints: [
      { id: 'test1', points: [{ x: 260, y: 260 }, { x: 260, y: 60 }] },
      { id: 'test2', points: [{ x: 260, y: 260 }, { x: 460, y: 260 }] },
      { id: 'test3', points: [{ x: 260, y: 260 }, { x: 260, y: 460 }] },
      { id: 'test4', points: [{ x: 260, y: 260 }, { x: 60, y: 260 }] },
    ],
    a: coord.a,
    crp: (function() {
      const index = 100;
      const crp = [];
      for (let i = 0; i <= index; i++) {
        const point = coord.convertPoint({
          x: i / 100,
          y: 0,
        });
        crp.push(point.x);
        crp.push(point.y);
      }
      return crp;
    })(),
    axisStart: coord.convertPoint({ x: 0, y: 0 }),
  });

  xAxis.render();
  canvas.draw();

  it('init', function() {
    expect(xAxis).not.to.be.undefined;
    expect(xAxis.get('type')).to.equal('helix');
  });

  it('line', function() {
    const lineShape = xAxis.get('lineShape');
    expect(lineShape).not.to.be.undefined;
    expect(lineShape.attr('path').length).not.to.equal(0);
  });

  it('ticks', function() {
    const ticks = xAxis.get('ticks');
    expect(ticks.length).to.equal(5);
  });

  it('labels', function() {
    const labelRenderer = xAxis.get('labelRenderer');
    expect(labelRenderer).not.to.null;
    expect(labelRenderer.get('items').length).to.equal(5);
  });

  it('grid', function() {
    const gridGroup = xAxis.get('gridGroup');
    expect(gridGroup).not.to.be.undefined;
    expect(gridGroup.getCount()).to.equal(4);
  });
});
