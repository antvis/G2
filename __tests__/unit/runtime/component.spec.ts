import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('render', () => {
  it('render({}) returns chart with color and shape combined legend.', () => {
    const context: any = {};
    const chart = render<G2Spec>(
      {
        type: 'interval',
        data: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 },
        ],
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          shape: 'genre',
        },
        scale: {
          color: {
            range: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#6F5EF9'],
          },
        },
      },
      context,
      () => {
        const legend =
          context.canvas.document.querySelector('.category-legend');
        const items = legend.style.items;
        expect(items[0].symbol).toBe('square');
        expect(items[1].symbol).toBe('hollowsquare');
        expect(items[0].color).toBe('#5B8FF9');
        expect(items[1].color).toBe('#5AD8A6');
      },
    );
    mount(createDiv(), chart);
  });

  it('render({}) returns chart has combined legend with different scales.', () => {
    const context: any = {};
    const chart = render<G2Spec>(
      {
        type: 'interval',
        data: [
          { genre: 'Sports', sold: 275, type: 'A' },
          { genre: 'Strategy', sold: 115, type: 'A' },
          { genre: 'Action', sold: 120, type: 'A' },
          { genre: 'Shooter', sold: 350, type: 'B' },
          { genre: 'Other', sold: 150, type: 'B' },
        ],
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          shape: 'type',
        },
        scale: {
          color: {
            range: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#6F5EF9'],
          },
        },
      },
      context,
      () => {
        const legend =
          context.canvas.document.querySelector('.category-legend');
        const items = legend.style.items;
        expect(items.length).toBe(7);
        expect(items[5].symbol).toBe('square');
        expect(items[6].symbol).toBe('hollowsquare');
        expect(items[0].color).toBe('#5B8FF9');
        expect(items[1].color).toBe('#5AD8A6');
      },
    );
    mount(createDiv(), chart);
  });
});
