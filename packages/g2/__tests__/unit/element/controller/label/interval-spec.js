import { expect } from 'chai';
import { Canvas } from '@antv/g';
import { getScale } from '@antv/scale';
import { getCoord } from '@antv/coord';
import IntervalElementLabel from '../../../../../src/element/controller/label/components/interval';
import { Global } from '../../../../../src';

const Rect = getCoord('rect');
const LinearScale = getScale('linear');

describe('interval labels', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const canvas = new Canvas({
    containerDOM: div,
    width: 500,
    height: 500
  });

  const coord = new Rect({
    start: {
      x: 80, y: 168
    },
    end: {
      x: 970, y: 20
    }
  });

  const labelScale = new LinearScale({
    field: 'percent',
    formatter: (val) => { return val.toFixed(4) * 100 + '%'; },
    values: [ 0.5169927909371782, 0.5545851528384279 ]
  });
  const points = [
    { _origin: { country: 'Asia', year: '1750', value: 502, percent: 0.5169927909371782 }, points: [ { x: 0.03571428571428571, y: 0.48300720906282185 }, { x: 0.03571428571428571, y: 1 }, { x: 0.10714285714285714, y: 1 }, { x: 0.10714285714285714, y: 0.48300720906282185 } ], nextPoints: [ { x: 0.03571428571428571, y: 0.3738414006179197 }, { x: 0.03571428571428571, y: 0.48300720906282185 }, { x: 0.10714285714285714, y: 0.48300720906282185 }, { x: 0.10714285714285714, y: 0.3738414006179197 } ], x: 143.57142857142856, y: [ 219.04222451081358, 20 ], color: '#FF6A84', shape: 'top-line' },
    { _origin: { country: 'Asia', year: '1800', value: 635, percent: 0.5545851528384279 }, points: [ { x: 0.17857142857142855, y: 0.4454148471615721 }, { x: 0.17857142857142855, y: 1 }, { x: 0.25, y: 1 }, { x: 0.25, y: 0.4454148471615721 } ], x: 270.71428571428567, y: [ 233.51528384279476, 20 ], color: '#FF6A84', shape: 'top-line' }
  ];

  it('single label position middle', () => {
    const gLabels = canvas.addGroup(IntervalElementLabel, {
      coord,
      labelOptions: {
        callback: () => {
          return {
            position: 'middle',
            offset: 0,
          };
        },
        scales: [ labelScale ],
      },
      elementType: 'interval',
      theme: Global.theme,
    });

    const items = gLabels.getLabelsItems(points);
    expect(items[0].position).to.equal('middle');
    expect(items[0].x).to.equal(143.57142857142856);
    expect(items[0].y).to.equal(58.257466529351184);
    expect(items[1].x).to.equal(270.71428571428567);
    expect(items[1].y).to.equal(61.03930131004366);
  });

  it('single label position left', () => {
    const gLabels = canvas.addGroup(IntervalElementLabel, {
      coord,
      labelOptions: {
        callback: () => {
          return {
            position: 'left',
            offset: 0,
          };
        },
        scales: [ labelScale ],
      },
      elementType: 'interval',
      theme: Global.theme,
    });

    const items = gLabels.getLabelsItems(points);
    expect(items[0].position).to.equal('left');
    expect(items[0].x).to.equal(111.78571428571428);
    expect(items[0].y).to.equal(58.257466529351184);
    expect(items[0].textAlign).to.equal('right');
    expect(items[1].x).to.equal(238.9285714285714);
    expect(items[1].y).to.equal(61.03930131004366);
    expect(items[1].textAlign).to.equal('right');
  });

  it('single label position right', () => {
    const gLabels = canvas.addGroup(IntervalElementLabel, {
      coord,
      labelOptions: {
        callback: () => {
          return {
            position: 'right',
            offset: 0,
          };
        },
        scales: [ labelScale ]
      },
      elementType: 'interval',
      theme: Global.theme,
    });

    const items = gLabels.getLabelsItems(points);
    expect(items[0].x).to.equal(175.35714285714283);
    expect(items[0].y).to.equal(58.257466529351184);
    expect(items[0].textAlign).to.equal('left');
    expect(items[0].position).to.equal('right');
    expect(items[1].x).to.equal(302.49999999999994);
    expect(items[1].y).to.equal(61.03930131004366);
    expect(items[1].textAlign).to.equal('left');
    expect(items[1].position).to.equal('right');
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(div);
  });
});
