import { getCoordinate } from '@antv/coord';
import {
  convertNormalPath,
  convertPolarPath,
  getLinePath,
  getPointAngle,
  getPointRadius,
  getSplinePath,
} from '../../../../../src/geometry/shape/util/path';

const Rect = getCoordinate('rect');
const Polar = getCoordinate('polar');

describe('PathUtil', () => {
  test('getLinePath() in cartesian coordinate', () => {
    const points = [{ x: 0, y: 0 }, { x: 100, y: 100 }];
    const path = getLinePath(points);
    expect(path).toEqual([['M', 0, 0], ['L', 100, 100]]);
  });

  test('getLinePath() in polar coordinate', () => {
    const points = [{ x: 0, y: 0 }, { x: 100, y: 100 }];
    const path = getLinePath(points, true);
    expect(path).toEqual([['M', 0, 0], ['L', 100, 100], ['Z']]);
  });

  test('getSplinePath(), two points', () => {
    const points = [{ x: 0, y: 0 }, { x: 0.1, y: 0.1 }];
    const path = getSplinePath(points);
    expect(path).toEqual([['M', 0, 0], ['L', 0.1, 0.1]]);
  });

  test('getSplinePath(), more than two points', () => {
    const points = [{ x: 0, y: 0 }, { x: 0.1, y: 0.5 }, { x: 0.2, y: 0.1 }];
    const path = getSplinePath(points);
    expect(path.length).toBe(3);
  });

  test('getPointRadius()', () => {
    const coord = new Polar({
      start: {
        x: 0,
        y: 0,
      },
      end: {
        x: 200,
        y: 200,
      },
    });
    expect(
      getPointRadius(coord, {
        x: 100,
        y: 100,
      })
    ).toBe(0);
    expect(
      getPointRadius(coord, {
        x: 100,
        y: 0,
      })
    ).toBe(100);
  });

  test('getPointAngle()', () => {
    const coord = new Polar({
      start: {
        x: 0,
        y: 0,
      },
      end: {
        x: 200,
        y: 200,
      },
    });
    expect(
      getPointAngle(coord, {
        x: 100,
        y: 100,
      })
    ).toBe(0);
    expect(
      getPointAngle(coord, {
        x: 0,
        y: 100,
      })
    ).toBe(Math.PI);
  });

  test('convertNormalPath()', () => {
    const coord = new Rect({
      start: {
        x: 0,
        y: 0,
      },
      end: {
        x: 200,
        y: 200,
      },
    });

    const path = [['M', 0, 0], ['L', 1, 1]];
    expect(convertNormalPath(coord, path)).toEqual([['M', 0, 0], ['L', 200, 200]]);
  });

  test('convertPolarPath(', () => {
    const coord = new Polar({
      start: {
        x: 0,
        y: 0,
      },
      end: {
        x: 200,
        y: 200,
      },
    });
    const path = [['M', 0, 0], ['L', 0, 1], ['L', 0.25, 1]];
    const toPath = convertPolarPath(coord, path);
    expect(toPath).toEqual([['M', 100, 100], ['L', 100, 0], ['A', 100, 100, 0, 0, 1, 200, 100]]);
  });
});
