import { getCoordinate } from '@antv/coord';
import Interval from '../../../../src/geometry/interval';
import IntervalLabel from '../../../../src/geometry/label/interval';
import Theme from '../../../../src/theme/antv';
import { createCanvas, createDiv } from '../../../util/dom';
import { createScale } from '../../../util/scale';

const CartesianCoordinate = getCoordinate('rect');

describe('interval labels', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 1000,
    height: 300,
  });

  const coord = new CartesianCoordinate({
    start: {
      x: 80,
      y: 168,
    },
    end: {
      x: 970,
      y: 20,
    },
  });

  const points = [
    {
      _origin: { country: 'Asia', year: '1750', value: 502, percent: 0.5169927909371782 },
      points: [
        { x: 0.03571428571428571, y: 0.48300720906282185 },
        { x: 0.03571428571428571, y: 1 },
        { x: 0.10714285714285714, y: 1 },
        { x: 0.10714285714285714, y: 0.48300720906282185 },
      ],
      nextPoints: [
        { x: 0.03571428571428571, y: 0.3738414006179197 },
        { x: 0.03571428571428571, y: 0.48300720906282185 },
        { x: 0.10714285714285714, y: 0.48300720906282185 },
        { x: 0.10714285714285714, y: 0.3738414006179197 },
      ],
      x: 143.57142857142856,
      y: [219.04222451081358, 20],
      color: '#FF6A84',
    },
    {
      _origin: { country: 'Asia', year: '1800', value: 635, percent: 0.5545851528384279 },
      points: [
        { x: 0.17857142857142855, y: 0.4454148471615721 },
        { x: 0.17857142857142855, y: 1 },
        { x: 0.25, y: 1 },
        { x: 0.25, y: 0.4454148471615721 },
      ],
      x: 270.71428571428567,
      y: [233.51528384279476, 20],
      color: '#FF6A84',
    },
  ];
  const data = [
    { country: 'Asia', year: '1750', value: 502, percent: 0.5169927909371782 },
    { country: 'Asia', year: '1800', value: 635, percent: 0.5545851528384279 },
  ];
  const scaleDefs = {
    percent: {
      formatter: (val) => val.toFixed(4) * 100 + '%',
    },
  };

  const scales = {
    year: createScale('year', data, scaleDefs),
    value: createScale('value', data, scaleDefs),
    percent: createScale('percent', data, scaleDefs),
  };
  const interval = new Interval({
    data,
    scales,
    container: canvas.addGroup(),
    labelsContainer: canvas.addGroup(),
    theme: Theme,
    coordinate: coord,
    scaleDefs,
  });
  interval.position('year*value').label('percent', {
    position: 'middle',
    offset: 0,
  });
  interval.init();

  const gLabels = new IntervalLabel(interval);

  it('single label position middle', () => {
    const items = gLabels.getLabelItems(points);
    expect(items[0].x).toBe(143.57142857142856);
    expect(items[0].y).toBe(58.257466529351184);
    expect(items[0].textAlign).toBe('center');
    expect(items[1].x).toBe(270.71428571428567);
    expect(items[1].y).toBe(61.03930131004366);
    expect(items[1].textAlign).toBe('center');
  });

  it('single label position left', () => {
    interval.label('percent', {
      position: 'left',
      offset: 0,
    });
    const items = gLabels.getLabelItems(points);
    expect(items[0].x).toBe(111.78571428571428);
    expect(items[0].y).toBe(58.257466529351184);
    expect(items[0].textAlign).toBe('right');
    expect(items[1].x).toBe(238.9285714285714);
    expect(items[1].y).toBe(61.03930131004366);
    expect(items[1].textAlign).toBe('right');
  });

  it('single label position right', () => {
    interval.label('percent', {
      position: 'right',
      offset: 0,
    });
    const items = gLabels.getLabelItems(points);
    expect(items[0].x).toBe(175.35714285714283);
    expect(items[0].y).toBe(58.257466529351184);
    expect(items[0].textAlign).toBe('left');
    expect(items[1].x).toBe(302.49999999999994);
    expect(items[1].y).toBe(61.03930131004366);
    expect(items[1].textAlign).toBe('left');
  });
});
