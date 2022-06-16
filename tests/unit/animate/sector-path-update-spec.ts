import { getArcInfo } from '../../../src/animate/animation/sector-path-update';

describe('Util about sector-path', () => {
  it('getArcInfo([]) should returns correct endAngle.', () => {
    const result = getArcInfo([
      ['M', 167.9999999999981, 135.9999949],
      ['L', 167.99999999999997, 34.000005099999996],
      ['A', 101.99999490000002, 101.99999490000002, 0, 0, 0, 167.99996183949202, 34.00000510000713],
      ['L', 167.9999999999981, 135.9999949],
      ['Z'],
    ]);
    expect(result.endAngle).not.toEqual(Math.PI * 1.5);
  });
});
