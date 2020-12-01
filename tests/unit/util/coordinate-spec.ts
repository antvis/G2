import { getCoordinate } from '@antv/coord';
import {
  getAngleByPoint,
  getDistanceToCenter,
  getXDimensionLength,
  isFullCircle,
  getCoordinateBBox,
} from '../../../src/util/coordinate';

const Polar = getCoordinate('polar');
const Cartesian = getCoordinate('rect');

describe('CoordinateUtil', () => {
  let polar;
  let cartesian;
  let theta;

  beforeAll(() => {
    polar = new Polar({
      start: { x: 0, y: 200 },
      end: { x: 200, y: 0 },
    });

    cartesian = new Cartesian({
      start: { x: 0, y: 40 },
      end: { x: 30, y: 0 },
    });

    theta = new Polar({
      start: { x: 0, y: 40 },
      end: { x: 30, y: 0 },
      isTransposed: true,
    });
  });

  it('getXDimensionLength()', () => {
    expect(getXDimensionLength(polar)).toEqual(Math.PI * 2 * 100);
    expect(getXDimensionLength(cartesian)).toEqual(30);
    expect(getXDimensionLength(theta)).toEqual(15);
  });

  it('isFullCircle()', () => {
    const anotherPolar = new Polar({
      start: { x: 0, y: 200 },
      end: { x: 200, y: 0 },
      startAngle: Math.PI / 6,
      endAngle: Math.PI * 1.5,
    });
    expect(isFullCircle(polar)).toEqual(true);
    expect(isFullCircle(anotherPolar)).toEqual(false);
    expect(isFullCircle(cartesian)).toEqual(false);
  });

  it('getDistanceToCenter()', () => {
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
      getDistanceToCenter(coord, {
        x: 100,
        y: 100,
      })
    ).toBe(0);
    expect(
      getDistanceToCenter(coord, {
        x: 100,
        y: 0,
      })
    ).toBe(100);
  });

  it('getAngleByPoint()', () => {
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
      getAngleByPoint(coord, {
        x: 100,
        y: 100,
      })
    ).toBe(0);
    expect(
      getAngleByPoint(coord, {
        x: 0,
        y: 100,
      })
    ).toBe(Math.PI);
  });

  it('getCoordinateBBox()', () => {
    expect(getCoordinateBBox(cartesian).minX).toBe(0);
    expect(getCoordinateBBox(cartesian).maxX).toBe(30);
    expect(getCoordinateBBox(cartesian).minY).toBe(0);
    expect(getCoordinateBBox(cartesian).maxY).toBe(40);

    const coord = new Cartesian({
      start: { x: 10, y: 20 },
      end: { x: 200, y: 300 },
    });
    expect(getCoordinateBBox(coord).minX).toBe(10);
    expect(getCoordinateBBox(coord).maxX).toBe(200);
    expect(getCoordinateBBox(coord).minY).toBe(20);
    expect(getCoordinateBBox(coord).maxY).toBe(300);
    expect(getCoordinateBBox(coord, 5).minX).toBe(5);
    expect(getCoordinateBBox(coord, 5).maxX).toBe(205);
    expect(getCoordinateBBox(coord, 5).minY).toBe(15);
    expect(getCoordinateBBox(coord, 5).maxY).toBe(305);

    expect(getCoordinateBBox(polar).minX).toBe(0);
    expect(getCoordinateBBox(polar).maxX).toBe(200);
    expect(getCoordinateBBox(polar).minY).toBe(0);
    expect(getCoordinateBBox(polar).maxY).toBe(200);
    expect(getCoordinateBBox(polar, 5).minX).toBe(-5);
    expect(getCoordinateBBox(polar, 5).maxX).toBe(205);
    expect(getCoordinateBBox(polar, 5).minY).toBe(-5);
    expect(getCoordinateBBox(polar, 5).maxY).toBe(205);

    expect(getCoordinateBBox(theta).minX).toBe(0);
    expect(getCoordinateBBox(theta).maxX).toBe(30);
    expect(getCoordinateBBox(theta).minY).toBe(0);
    expect(getCoordinateBBox(theta).maxY).toBe(40);
    expect(getCoordinateBBox(theta, 5).minX).toBe(-5);
    expect(getCoordinateBBox(theta, 5).maxX).toBe(35);
    expect(getCoordinateBBox(theta, 5).minY).toBe(-5);
    expect(getCoordinateBBox(theta, 5).maxY).toBe(45);
  });
});
