import {
  MaybeZeroY2,
  MaybeZeroX1,
  MaybeTuple,
  MaybeSeries,
  MaybeStackY,
  MaybeSplitPosition,
  MaybeKey,
  MaybeSize,
  MaybeZeroY1,
  MaybeTitle,
  MaybeTooltip,
} from '../../../src/infer';

describe('infer', () => {
  it('MaybeZeroY2() returns a function inferring zero y2', () => {
    const infer = MaybeZeroY2();

    const e1 = { y: 'name' };
    expect(infer({ encode: e1 }).encode).toEqual({
      y: ['name', { type: 'constant', value: 0 }],
    });

    const e2 = { y: ['name'] };
    expect(infer({ encode: e2 }).encode).toEqual({
      y: ['name', { type: 'constant', value: 0 }],
    });

    const e3 = { y: ['name', 'age'] };
    expect(infer({ encode: e3 }).encode).toEqual(e3);

    const e4 = {};
    expect(infer({ encode: e4 }).encode).toEqual(e4);
  });

  it('MaybeZeroX1() returns a function inferring zero x1', () => {
    const infer = MaybeZeroX1();

    const e1 = {};
    expect(infer({ encode: e1 }).encode).toEqual({
      x: [{ type: 'constant', value: 0 }],
    });

    const e2 = { x: 'name', y: 'age' };
    expect(infer({ encode: e2 }).encode).toEqual({
      x: 'name',
      y: 'age',
    });
  });

  it('MaybeTuple() returns a function converting x and y to tuple', () => {
    const infer = MaybeTuple();

    const e1 = {};
    expect(infer({ encode: e1 }).encode).toEqual(e1);

    const e2 = { x: 0 };
    expect(infer({ encode: e2 }).encode).toEqual({ x: [0] });

    const e3 = { x: [0] };
    expect(infer({ encode: e3 }).encode).toEqual(e3);

    const e4 = { y: 0 };
    expect(infer({ encode: e4 }).encode).toEqual({ y: [0] });

    const e5 = { y: [0] };
    expect(infer({ encode: e5 }).encode).toEqual(e5);

    const e6 = { x: 0, y: 0 };
    expect(infer({ encode: e6 }).encode).toEqual({ x: [0], y: [0] });

    const e7 = { tooltip: 'a' };
    expect(infer({ encode: e7 }).encode).toEqual({ tooltip: ['a'] });

    const e8 = { tooltip: ['a'] };
    expect(infer({ encode: e8 }).encode).toEqual({ tooltip: ['a'] });
  });

  it('MaybeSize returns a function producing constant size encode', () => {
    const infer = MaybeSize();

    const e1 = { size: 0 };
    expect(infer({ encode: e1 }).encode).toEqual(e1);

    const e2 = {};
    expect(infer({ encode: e2 }).encode).toEqual({
      size: { type: 'constant', value: 3 },
    });
  });

  it('MaybeZeroY1() returns a function inferring zero y1', () => {
    const infer = MaybeZeroY1();

    const e1 = {};
    expect(infer({ encode: e1 }).encode).toEqual({
      y: [{ type: 'constant', value: 0 }],
    });

    const e2 = { y: 'name' };
    expect(infer({ encode: e2 }).encode).toEqual(e2);
  });

  it('MaybeSeries returns a function inferring series channel by color channel', () => {
    const infer = MaybeSeries();

    const e1 = {};
    expect(infer({ encode: e1 }).encode).toEqual(e1);

    const e2 = { series: [1, 2, 3] };
    expect(infer({ encode: e2 }).encode).toEqual(e2);

    const e3 = { color: [1, 2, 3] };
    expect(infer({ encode: e3 }).encode).toEqual({
      color: [1, 2, 3],
      series: [1, 2, 3],
    });
  });

  it('MaybeTitle() returns a function inferring tooltip title', () => {
    const infer = MaybeTitle();

    const e1 = { title: 'value' };
    expect(infer({ encode: e1 }).encode).toEqual(e1);

    const e2 = { x: ['name'] };
    expect(infer({ encode: e2 }).encode).toEqual({
      x: ['name'],
      title: 'name',
    });

    const e3 = {};
    expect(infer({ encode: e3 }).encode).toEqual(e3);
  });

  it('MaybeTooltip() returns a function inferring tooltip value', () => {
    const infer = MaybeTooltip();

    const e1 = {};
    expect(infer({ encode: e1 }).encode).toEqual(e1);

    const e2 = { y: ['name'] };
    expect(infer({ encode: e2 }).encode).toEqual({
      y: ['name'],
      tooltip: ['name'],
    });

    const e3 = { position: ['a', 'b'] };
    expect(infer({ encode: e3 }).encode).toEqual({
      position: ['a', 'b'],
      tooltip: ['a', 'b'],
    });

    const e4 = { tooltip: ['a'] };
    expect(infer({ encode: e4 }).encode).toEqual(e4);
  });

  it('MaybeStackY returns a function inferring stackY statistic', () => {
    const infer = MaybeStackY();

    const { transform } = infer({ transform: () => [] });

    expect(transform(null, [{ type: 'stackY' }])).toEqual([{ type: 'stackY' }]);
    expect(transform(null, [{ type: 'dodgeX' }])).toEqual([{ type: 'dodgeX' }]);

    expect(
      transform(
        {
          index: [0, 1, 2],
          value: {},
        },
        [],
      ),
    ).toEqual([]);
    expect(
      transform(
        {
          index: [0, 1, 2],
          value: {
            y: [[1], [2], [3]],
          },
        },
        [],
      ),
    ).toEqual([]);

    expect(
      transform(
        {
          index: [0, 1, 2],
          value: {
            x: [[1], [2], [3]],
            y: [[1], [2], [3]],
          },
        },
        [],
      ),
    ).toEqual([]);

    expect(
      transform(
        {
          index: [0, 1, 2, 3, 4, 5],
          value: {
            x: [[1], [2], [3], [1], [2], [3]],
            y: [[1], [2], [3], [1], [2], [3]],
          },
        },
        [],
      ),
    ).toEqual([{ type: 'stackY' }]);

    expect(
      transform(
        {
          index: [0, 1, 2, 3, 4, 5],
          value: {
            x: [[1], [2], [3], [1], [2], [3]],
            y: [[1], [2], [3], [1], [2], [3]],
          },
        },
        [{ type: 'splitPosition' }],
      ),
    ).toEqual([{ type: 'stackY' }, { type: 'splitPosition' }]);
  });

  it('MaybeSplitPosition returns a function inferring splitPosition function', () => {
    const infer = MaybeSplitPosition();

    const { transform } = infer({});

    expect(transform(null, [{ type: 'splitPosition' }])).toEqual([
      { type: 'splitPosition' },
    ]);

    expect(
      transform(
        {
          index: [0, 1, 2],
          value: {
            x: [[1], [2], [3]],
            y: [[1], [2], [3]],
          },
        },
        [],
      ),
    ).toEqual([]);

    expect(
      transform(
        {
          index: [0, 1, 2],
          value: {
            position: [[1], [2], [3]],
          },
        },
        [],
      ),
    ).toEqual([{ type: 'splitPosition' }]);

    expect(
      transform(
        {
          index: [0, 1, 2],
          value: {
            position: [[1], [2], [3]],
          },
        },
        [{ type: 'stackY' }],
      ),
    ).toEqual([{ type: 'splitPosition' }, { type: 'stackY' }]);
  });

  it('MaybeKey returns a function inferring key function', () => {
    const infer = MaybeKey();
    const { transform } = infer({ transform: () => [] });

    expect(transform(null, [{ type: 'key' }])).toEqual([{ type: 'key' }]);

    expect(
      transform({ index: [0, 1, 2], value: { key: [0, 1, 2] } }, []),
    ).toEqual([]);

    expect(
      transform({ index: [0, 1, 2], value: {} }, [{ type: 'stackY' }]),
    ).toEqual([{ type: 'key' }, { type: 'stackY' }]);
  });
});
