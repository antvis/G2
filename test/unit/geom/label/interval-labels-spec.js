const expect = require('chai').expect;
const { Canvas } = require('../../../../src/renderer');
const Scale = require('@antv/scale');
const Coord = require('@antv/coord/lib/index');
const IntervalLabels = require('../../../../src/geom/label/interval-labels');

describe('interval labels', () => {
  const div = document.createElement('div');
  div.id = 'gl1';
  document.body.appendChild(div);

  const canvas = new Canvas({
    containerId: 'gl1',
    width: 500,
    height: 500
  });

  const coord = new Coord.Cartesian({
    start: {
      x: 80, y: 168
    },
    end: {
      x: 970, y: 20
    }
  });

  const labelScale = Scale.linear({
    field: 'percent',
    formatter: val => { return val.toFixed(4) * 100 + '%'; },
    values: [ 0.5169927909371782, 0.5545851528384279 ]
  });
  const points = [
    { _origin: { country: 'Asia', year: '1750', value: 502, percent: 0.5169927909371782 }, points: [{ x: 0.03571428571428571, y: 0.48300720906282185 }, { x: 0.03571428571428571, y: 1 }, { x: 0.10714285714285714, y: 1 }, { x: 0.10714285714285714, y: 0.48300720906282185 }], nextPoints: [{ x: 0.03571428571428571, y: 0.3738414006179197 }, { x: 0.03571428571428571, y: 0.48300720906282185 }, { x: 0.10714285714285714, y: 0.48300720906282185 }, { x: 0.10714285714285714, y: 0.3738414006179197 }], x: 143.57142857142856, y: [ 219.04222451081358, 20 ], color: '#FF6A84', shape: 'top-line' },
    { _origin: { country: 'Asia', year: '1800', value: 635, percent: 0.5545851528384279 }, points: [{ x: 0.17857142857142855, y: 0.4454148471615721 }, { x: 0.17857142857142855, y: 1 }, { x: 0.25, y: 1 }, { x: 0.25, y: 0.4454148471615721 }], x: 270.71428571428567, y: [ 233.51528384279476, 20 ], color: '#FF6A84', shape: 'top-line' }
  ];

  /* const labelScale1 = Scale.cat({
    field: 'z',
    values: [[ '1', '2' ], [ '3', '4' ]]
  });
  const points1 = [
    { x: 100, y: [ 10, 20 ], z: [ '1', '2' ], _origin: { x: 100, y: [ 10, 20 ], z: [ '1', '2' ] } },
    { x: 100, y: [ 30, 40 ], z: [ '3', '4' ], _origin: { x: 100, y: [ 30, 40 ], z: [ '3', '4' ] } }
  ];*/

  it('single label position middle', () => {
    const gLabels = canvas.addGroup(IntervalLabels, {
      coord,
      labelCfg: {
        cfg: {
          position: 'middle',
          offset: 0
        },
        scales: [ labelScale ]
      },
      geomType: 'interval'
    });
    const cfg = gLabels.get('label');
    expect(cfg.position).to.equal('middle');
    const items = gLabels.getLabelsItems(points);
    expect(items[0].x).to.equal(143.57142857142856);
    expect(items[0].y).to.equal(58.257466529351184);
    expect(items[1].x).to.equal(270.71428571428567);
    expect(items[1].y).to.equal(61.03930131004366);
  });

  it('single label position left', () => {
    const gLabels = canvas.addGroup(IntervalLabels, {
      coord,
      labelCfg: {
        cfg: {
          position: 'left',
          offset: 0
        },
        scales: [ labelScale ]
      },
      geomType: 'interval'
    });
    const cfg = gLabels.get('label');
    expect(cfg.position).to.equal('left');
    const items = gLabels.getLabelsItems(points);
    expect(items[0].x).to.equal(111.78571428571428);
    expect(items[0].y).to.equal(58.257466529351184);
    expect(items[0].textAlign).to.equal('right');
    expect(items[1].x).to.equal(238.9285714285714);
    expect(items[1].y).to.equal(61.03930131004366);
    expect(items[1].textAlign).to.equal('right');
  });

  it('single label position right', () => {
    const gLabels = canvas.addGroup(IntervalLabels, {
      coord,
      labelCfg: {
        cfg: {
          position: 'right',
          offset: 0
        },
        scales: [ labelScale ]
      },
      geomType: 'interval'
    });
    const cfg = gLabels.get('label');
    expect(cfg.position).to.equal('right');
    const items = gLabels.getLabelsItems(points);
    expect(items[0].x).to.equal(175.35714285714283);
    expect(items[0].y).to.equal(58.257466529351184);
    expect(items[0].textAlign).to.equal('left');
    expect(items[1].x).to.equal(302.49999999999994);
    expect(items[1].y).to.equal(61.03930131004366);
    expect(items[1].textAlign).to.equal('left');
  });
});
