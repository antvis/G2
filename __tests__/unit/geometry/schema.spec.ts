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
        [120, 400],
        [420, 400],
        [270, 400],
        [270, 320],
        [120, 320],
        [420, 320],
        [420, 120],
        [120, 120],
        [120, 200],
        [420, 200],
        [270, 120],
        [270, 40],
        [120, 40],
        [420, 40],
      ],
      [
        [480, 280],
        [780, 280],
        [630, 280],
        [630, 200],
        [480, 200],
        [780, 200],
        [780, 80],
        [480, 80],
        [480, 160],
        [780, 160],
        [630, 80],
        [630, 40],
        [480, 40],
        [780, 40],
      ],
    ]);
  });
});
