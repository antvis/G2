import { path as d3path } from 'd3-path';
import { appendPolygon } from '../../../src/shape/utils';

describe('utils', () => {
  it('polygon() returns polygon path string', () => {
    expect(
      appendPolygon(d3path(), [
        [100, 100],
        [200, 100],
        [200, 200],
        [100, 200],
      ]).toString(),
    ).toBe('M100,100L200,100L200,200L100,200Z');
  });
});
