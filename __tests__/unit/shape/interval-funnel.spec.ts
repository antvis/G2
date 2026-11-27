import { Path } from '@antv/g';
import { vi } from 'vitest';
import { Funnel } from '../../../src/shape/interval/funnel';
import * as pathUtils from '../../../src/utils/path';

vi.mock('../../../src/utils/coordinate', () => ({
  isTranspose: () => false,
}));

describe('Funnel radius', () => {
  const points = [
    [0, 0],
    [100, 0],
    [100, 100],
    [0, 100],
  ];
  const context = {
    coordinate: {},
    document: { createElement: () => new Path({}) },
  } as any;

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function expectRadii(options, expected) {
    const roundedPath = vi
      .spyOn(pathUtils, 'createRoundedPath')
      .mockReturnValue('M0,0 L100,0 L100,100 L0,100 Z');
    const funnel = Funnel(options, context);
    funnel(points, { index: 0 }, {}, [points]);
    expect(roundedPath).toHaveBeenCalledWith(points, expected, true);
  }

  it('falls back to inner corner radii when radius is omitted', () => {
    expectRadii(
      { innerRadius: 5, radiusBottomRight: 30, radiusBottomLeft: 0 },
      [5, 5, 30, 0],
    );
  });

  it('honors explicit zero and per-corner overrides', () => {
    expectRadii({ radius: 0, innerRadius: 5, radiusTopRight: 2 }, [0, 2, 0, 0]);
  });

  it('uses array radii for outer corners and inner radii for shared edges', () => {
    expectRadii(
      { radius: [1, 2, 3, 4], innerRadius: 5, first: false },
      [5, 5, 3, 4],
    );
  });

  it('uses inner radii for the last shared edge', () => {
    expectRadii({ radius: [1, 2], innerRadius: 5, last: false }, [1, 2, 5, 5]);
  });
});
