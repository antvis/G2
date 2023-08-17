import {
  Cartesian,
  Polar,
  Transpose,
  Parallel,
  Fisheye,
  Cartesian3D,
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
      ['polar', -Math.PI / 2, (Math.PI * 3) / 2, 0, 1],
    ]);

    expect(
      Polar({
        startAngle: -Math.PI / 2,
        endAngle: Math.PI,
        innerRadius: 0.2,
        outerRadius: 0.8,
      }),
    ).toEqual([
      ['translate', 0, 0.5],
      ['reflect.y'],
      ['translate', 0, -0.5],
      ['polar', -Math.PI / 2, Math.PI, 0.2, 0.8],
    ]);
  });

  it('Parallel({...}) returns expected coordinate transformations', () => {
    expect(Parallel()).toEqual([['parallel', 0, 1, 0, 1]]);
  });

  it('Fisheye({...}) returns expected coordinate transformations', () => {
    expect(Fisheye({})).toEqual([['fisheye', 0, 0, 2, 2, false]]);
  });

  it('Cartesian3D({...}) returns expected coordinate transformations', () => {
    expect(Cartesian3D({})).toEqual([['cartesian3D']]);
  });
});
