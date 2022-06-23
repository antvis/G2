import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('keyframe', () => {
  it('keyframe should apply transition from one path to one path', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];
    const chart = render<G2Spec>({
      type: 'keyframe',
      children: [
        {
          type: 'interval',
          data,
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
            key: 'genre',
          },
        },
        {
          type: 'interval',
          data,
          coordinate: [{ type: 'polar' }],
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
            key: 'genre',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });

  it('keyframe should accept number iterationCount', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];
    const chart = render<G2Spec>({
      type: 'keyframe',
      iterationCount: 2,
      children: [
        {
          type: 'interval',
          data,
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
            key: 'genre',
          },
        },
        {
          type: 'interval',
          data,
          coordinate: [{ type: 'polar' }],
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
            key: 'genre',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });

  it('keyframe should play in reverse direction', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];
    const chart = render<G2Spec>({
      type: 'keyframe',
      direction: 'reverse',
      children: [
        {
          type: 'interval',
          data,
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
            key: 'genre',
          },
        },
        {
          type: 'interval',
          data,
          coordinate: [{ type: 'polar' }],
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
            key: 'genre',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });

  it('keyframe should play in alternate direction', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];
    const chart = render<G2Spec>({
      type: 'keyframe',
      direction: 'alternate',
      iterationCount: 'infinite',
      children: [
        {
          type: 'interval',
          data,
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
            key: 'genre',
          },
        },
        {
          type: 'interval',
          data,
          coordinate: [{ type: 'polar' }],
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
            key: 'genre',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });

  it.only('keyframe should play in reverse-alternate direction', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];
    const chart = render<G2Spec>({
      type: 'keyframe',
      direction: 'reverse-alternate',
      iterationCount: 2,
      children: [
        {
          type: 'interval',
          data,
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
            key: 'genre',
          },
        },
        {
          type: 'interval',
          data,
          coordinate: [{ type: 'polar' }],
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
            key: 'genre',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });
});
