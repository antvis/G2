import { Band } from '../../../src/scale';
import { Schema } from '../../../src/mark/geometry';
import { plot } from './helper';

describe('Schema', () => {
  it('Schema has expected props', () => {
    expect(Schema.props).toEqual({
      defaultShape: 'box',
      channels: [
        { name: 'color' },
        { name: 'shape' },
        { name: 'enterType' },
        { name: 'enterDelay' },
        { name: 'enterDuration' },
        { name: 'enterEasing' },
        { name: 'key', scale: 'identity' },
        { name: 'title', scale: 'identity' },
        { name: 'tooltip', scale: 'identity' },
        { name: 'x', scale: 'band', required: true },
        { name: 'y', required: true },
        { name: 'series', scale: 'band' },
      ],
      infer: [
        { type: 'maybeTuple' },
        { type: 'maybeKey' },
        { type: 'maybeTitle' },
        { type: 'maybeTooltip' },
      ],
      shapes: ['box'],
    });
  });

  it('Schema should draw basic box', () => {
    const [I, P] = plot({
      mark: Schema({}),
      index: [0, 1],
      scale: {
        x: Band({
          domain: ['a', 'b'],
          range: [0, 1],
        }),
      },
      channel: {
        x: [[0.2], [0.8]],
        y: [
          [0.1, 0.3, 0.5, 0.8, 1],
          [0.1, 0.2, 0.4, 0.5, 0.7],
        ],
      },
    });

    expect(I).toEqual([0, 1]);
    expect(P).toEqual([
      [
        [120.00000000000003, 400],
        [320, 400],
        [220.00000000000003, 400],
        [220.00000000000003, 320],
        [120.00000000000003, 320],
        [320, 320],
        [320, 120],
        [120.00000000000003, 120],
        [120.00000000000003, 200],
        [320, 200],
        [220.00000000000003, 120],
        [220.00000000000003, 40],
        [120.00000000000003, 40],
        [320, 40],
      ],
      [
        [480, 280],
        [680, 280],
        [580, 280],
        [580, 200],
        [480, 200],
        [680, 200],
        [680, 80],
        [480, 80],
        [480, 160],
        [680, 160],
        [580, 80],
        [580, 40],
        [480, 40],
        [680, 40],
      ],
    ]);
  });
});
