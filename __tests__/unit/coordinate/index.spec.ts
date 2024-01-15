import {
  Cartesian,
  Polar,
  Transpose,
  Parallel,
  Fisheye,
} from '../../../src/coordinate';

describe('coordinate', () => {
  it('Cartesian() returns expected coordinate transformations', () => {
    expect(Cartesian()).toEqual([['cartesian']]);
  });

  it('Transpose() returns expected coordinate transformations', () => {
    expect(Transpose()).toEqual([
      ['transpose'],
      ['translate', 0.5, 0.5],
      ['reflect.x'],
      ['translate', -0.5, -0.5],
    ]);
  });

  it('Polar({...}) returns expected coordinate transformations', () => {
    expect(Polar({})).toEqual([
      ['translate', 0, 0.5],
      ['reflect.y'],
      ['translate', 0, -0.5],
      ['polar', (3 * Math.PI) / 2, (Math.PI * 7) / 2, 0, 1],
    ]);
    // startAngle > endAgle && endAgle < 0
    expect(
      Polar({
        startAngle: Math.PI,
        endAngle: -Math.PI / 2,
        innerRadius: 0.2,
        outerRadius: 0.8,
      }),
    ).toEqual([
      ['translate', 0, 0.5],
      ['reflect.y'],
      ['translate', 0, -0.5],
      ['polar', Math.PI, (3 * Math.PI) / 2, 0.2, 0.8],
    ]);
    // endAgle - startAngle >= 2*Math.PI
    const [, , , [, startAngle, endAngle]] = Polar({
      startAngle: 3 * Math.PI,
      endAngle: (15 * Math.PI) / 2,
      innerRadius: 0.2,
      outerRadius: 0.8,
    });
    expect(startAngle).toBeCloseTo(Math.PI);
    expect(endAngle).toBeCloseTo((3 * Math.PI) / 2);
  });

  it('Parallel({...}) returns expected coordinate transformations', () => {
    expect(Parallel()).toEqual([['parallel', 0, 1, 0, 1]]);
  });

  it('Fisheye({...}) returns expected coordinate transformations', () => {
    expect(Fisheye({})).toEqual([['fisheye', 0, 0, 2, 2, false]]);
  });
});
