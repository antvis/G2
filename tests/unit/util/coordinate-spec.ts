import { getCoordinate } from '@antv/coord';
import { expect } from 'chai';
import * as CoordinateUtil from '../../../src/util/coordinate';

const Polar = getCoordinate('polar');
const Cartesian = getCoordinate('rect');

describe('CoordinateUtil', () => {
  let polar;
  let cartesian;
  let theta;

  before(() => {
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
    expect(CoordinateUtil.getXDimensionLength(polar)).to.equal(Math.PI * 2 * 100);
    expect(CoordinateUtil.getXDimensionLength(cartesian)).to.equal(30);
    expect(CoordinateUtil.getXDimensionLength(theta)).to.equal(15);
  });

  it('isFullCircle()', () => {
    const anotherPolar = new Polar({
      start: { x: 0, y: 200 },
      end: { x: 200, y: 0 },
      startAngle: Math.PI / 6,
      endAngle: Math.PI * 1.5,
    });
    expect(CoordinateUtil.isFullCircle(polar)).to.equal(true);
    expect(CoordinateUtil.isFullCircle(anotherPolar)).to.equal(false);
    expect(CoordinateUtil.isFullCircle(cartesian)).to.equal(false);
  });
});
