import { shuffle } from 'd3-array';
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

  it('keyframe should play in reverse-alternate direction', () => {
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

  it('keyframe should apply transition from one to multiple and reverse', async () => {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/fbe4a8c1-ce04-4ba3-912a-0b26d6965333.json',
    );
    const data = await response.json();
    const chart = render<G2Spec>({
      type: 'keyframe',
      direction: 'alternate',
      duration: 1000,
      iterationCount: 3,
      children: [
        {
          type: 'interval',
          data,
          transform: [{ type: 'groupX', y: 'mean' }],
          encode: {
            x: 'gender',
            y: 'weight',
            color: 'gender',
            key: 'gender',
          },
        },
        {
          type: 'point',
          data,
          encode: {
            x: 'height',
            y: 'weight',
            color: 'gender',
            groupKey: 'gender',
          },
        },
      ],
    });

    mount(createDiv(), chart);
  });
});
