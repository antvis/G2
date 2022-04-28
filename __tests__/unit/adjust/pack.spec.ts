import { Vector2 } from '@antv/coord';
import { Pack } from '../../../src/adjust';

describe('pack', () => {
  it('Pack() returns function pack points uniformly', () => {
    const adjust = Pack();
    const layout = { innerWidth: 100, innerHeight: 200 };
    const points: Vector2[][] = new Array(6).fill(null).map((i) => [
      [0, 0],
      [5, 5],
    ]);
    const transforms = adjust(points, points.length, layout);
    expect(transforms).toEqual([
      'translate(22.5, 172.5) scale(10, 10)',
      'translate(72.5, 172.5) scale(10, 10)',
      'translate(22.5, 97.5) scale(10, 10)',
      'translate(72.5, 97.5) scale(10, 10)',
      'translate(22.5, 22.5) scale(10, 10)',
      'translate(72.5, 22.5) scale(10, 10)',
    ]);
  });
});
