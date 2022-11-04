import { shuffle } from 'd3-array';
import { createDiv, mount } from '../../utils/dom';
import { render } from '@/runtime';
import type { G2Spec } from '@/spec';

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

  it.only('keyframe should apply transition from one to multiple and reverse', async () => {
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

  it('keyframe should apply transition among facets', async () => {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/7fbb7084-cf34-4e7c-91b3-09e4748dc5e9.json',
    );
    const data = await response.json();
    const chart = render<G2Spec>({
      type: 'keyframe',
      direction: 'alternate',
      iterationCount: 2,
      children: [
        {
          type: 'rect',
          paddingRight: 86,
          paddingLeft: 54,
          data,
          encode: {
            y: 'industry',
          },
          children: [
            {
              type: 'area',
              class: 'area',
              frame: false,
              scale: { y: { facet: false }, x: { utc: true } },
              encode: {
                shape: 'smooth',
                x: (d) => new Date(d.date),
                y: 'unemployed',
                color: 'industry',
                key: 'industry',
              },
              style: { fillOpacity: 1 },
              animate: { enter: { type: 'scaleInY' } },
            },
          ],
        },
        {
          type: 'area',
          class: 'area',
          paddingLeft: 54,
          paddingRight: 86,
          data,
          transform: [{ type: 'stackY', reverse: true }],
          scale: { x: { utc: true } },
          encode: {
            shape: 'smooth',
            x: (d) => new Date(d.date),
            y: 'unemployed',
            color: 'industry',
            key: 'industry',
          },
          style: { fillOpacity: 1 },
        },
        {
          type: 'area',
          class: 'area',
          paddingLeft: 54,
          paddingRight: 86,
          scale: { x: { utc: true } },
          data,
          encode: {
            shape: 'smooth',
            x: (d) => new Date(d.date),
            y: 'unemployed',
            color: 'industry',
            key: 'industry',
          },
          style: { fillOpacity: 0.8 },
        },
      ],
    });
    mount(createDiv(), chart);
  });

  it('keyframe should apply transition among unit visualization', async () => {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/fbe4a8c1-ce04-4ba3-912a-0b26d6965333.json',
    );
    const data = await response.json();
    const chart = render<G2Spec>({
      type: 'keyframe',
      direction: 'alternate',
      iterationCount: 2,
      children: [
        {
          type: 'rect',
          data,
          encode: {
            x: 'gender',
          },
          children: [
            {
              type: 'point',
              class: 'point',
              encode: {
                color: 'gender',
                key: (d) => `(${d.weight}, ${d.height})`,
              },
              adjust: { type: 'pack' },
            },
          ],
        },
        {
          type: 'point',
          class: 'point',
          data,
          encode: {
            x: 'height',
            y: 'weight',
            color: 'gender',
            key: (d) => `(${d.weight}, ${d.height})`,
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });
});
