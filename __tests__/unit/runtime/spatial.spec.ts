import { createDiv, mount } from '../../utils/dom';
import { render } from '@/runtime';
import type { G2Spec } from '@/spec';

describe('spatial', () => {
  it('render({...}) should render layered view', () => {
    const chart = render<G2Spec>({
      type: 'layer',
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
      children: [
        {
          type: 'interval',
          data: {
            transform: [{ type: 'sortBy', fields: ['sold'], order: 'DESC' }],
          },
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
          },
        },
        {
          type: 'interval',
          paddingBottom: 200,
          paddingLeft: 400,
          transform: [{ type: 'stackY' }],
          coordinate: [{ type: 'transpose' }, { type: 'polar' }],
          encode: {
            y: 'sold',
            color: 'genre',
          },
        },
      ],
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render row flex view', () => {
    const chart = render<G2Spec>({
      type: 'flex',
      width: 800,
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
      children: [
        {
          type: 'interval',
          data: {
            transform: [{ type: 'sortBy', fields: ['sold'], order: 'DESC' }],
          },
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
          },
        },
        {
          type: 'interval',
          coordinate: [{ type: 'transpose' }],
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render col flex view', () => {
    const chart = render<G2Spec>({
      type: 'flex',
      direction: 'col',
      height: 600,
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
      children: [
        {
          type: 'interval',
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
          },
        },
        {
          type: 'interval',
          coordinate: [{ type: 'transpose' }],
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render nested flex view', () => {
    const chart = render<G2Spec>({
      type: 'flex',
      direction: 'row',
      width: 840,
      height: 600,
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
      children: [
        {
          type: 'interval',
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
          },
        },
        {
          type: 'flex',
          direction: 'col',
          children: [
            {
              type: 'interval',
              coordinate: [{ type: 'transpose' }],
              encode: {
                x: 'genre',
                y: 'sold',
                color: 'genre',
              },
            },
            {
              type: 'interval',
              coordinate: [{ type: 'polar' }],
              encode: {
                x: 'genre',
                y: 'sold',
                color: 'genre',
              },
            },
          ],
        },
      ],
    });
    mount(createDiv(), chart);
  });
});
