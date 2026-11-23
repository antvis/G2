import { Coordinate } from '@antv/coord';
import { Band, Linear, Point } from '@antv/scale';
import { abstractOf, pixelsOf, selectionOf } from '../../../src/utils/scale';

describe('brush selection coordinates', () => {
  const domain = ['A', 'B', 'H', 'I', 'J'];

  function scales() {
    return {
      x: new Band({
        domain,
        range: [0, 1],
        paddingInner: 0.2,
        paddingOuter: 0.1,
      }),
      y: new Linear({ domain: [0, 100], range: [0, 1] }),
    };
  }

  it.each([
    [['H'], [0.42, 0.58]],
    [
      ['H', 'I'],
      [0.42, 0.78],
    ],
    [
      ['H', 'I', 'J'],
      [0.42, 0.98],
    ],
    [
      ['B', 'H', 'I', 'J'],
      [0.22, 0.98],
    ],
    [
      ['H', 'J'],
      [0.42, 0.98],
    ],
  ] as [string[], number[]][])(
    'preserves the outer band edges of %j',
    (selection, expected) => {
      const actual = abstractOf(selection, scales().x);
      expect(actual[0]).toBeCloseTo(expected[0]);
      expect(actual[1]).toBeCloseTo(expected[1]);
    },
  );

  it.each([
    [[215, 40, 285, 160], ['H'], [210, 40, 290, 160]],
    [
      [215, 40, 485, 160],
      ['H', 'I', 'J'],
      [210, 40, 490, 160],
    ],
  ] as [number[], string[], number[]][])(
    'replays selectionOf domains from bounds %j',
    (bounds, expected, pixels) => {
      const scale = scales();
      const coordinate = new Coordinate({ width: 500, height: 200 }).transform(
        'cartesian',
      );
      const [x, y, x1, y1] = bounds;
      const selection = selectionOf(x, y, x1, y1, scale, coordinate);

      expect(selection).toEqual([expected, [20, 80]]);
      const replay = pixelsOf(selection, scale, coordinate);
      replay.forEach((value, index) =>
        expect(value).toBeCloseTo(pixels[index]),
      );
    },
  );

  it('replays categorical selections on the y scale', () => {
    const { x: categorical, y: continuous } = scales();
    const scale = { x: continuous, y: categorical };
    const coordinate = new Coordinate({ width: 200, height: 500 }).transform(
      'cartesian',
    );
    const selection = selectionOf(40, 215, 160, 485, scale, coordinate);

    expect(selection).toEqual([
      [20, 80],
      ['H', 'I', 'J'],
    ]);
    const pixels = pixelsOf(selection, scale, coordinate);
    [40, 210, 160, 490].forEach((value, index) =>
      expect(pixels[index]).toBeCloseTo(value),
    );
  });

  it('preserves continuous intervals, including a reversed scale', () => {
    const scale = {
      x: new Linear({ domain: [0, 100], range: [0, 1] }),
      y: new Linear({ domain: [0, 100], range: [1, 0] }),
    };
    const coordinate = new Coordinate({ width: 500, height: 200 }).transform(
      'cartesian',
    );
    const selection = selectionOf(100, 40, 400, 160, scale, coordinate);

    selection.forEach((domain) => {
      expect(domain[0]).toBeCloseTo(20);
      expect(domain[1]).toBeCloseTo(80);
    });
    const pixels = pixelsOf(selection, scale, coordinate);
    [100, 160, 400, 40].forEach((value, index) =>
      expect(pixels[index]).toBeCloseTo(value),
    );
  });

  it.each([
    [['H'], [0.5, 0.5]],
    [
      ['H', 'I', 'J'],
      [0.5, 1],
    ],
    [
      ['H', 'J'],
      [0.5, 1],
    ],
  ] as [string[], number[]][])(
    'preserves point-scale selection %j without adding a band',
    (selection, expected) => {
      const scale = new Point({ domain, range: [0, 1] });
      expect(abstractOf(selection, scale)).toEqual(expected);
    },
  );
});
