import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('Brush', () => {
  it('render({...} renders chart with brushHighlight interaction', () => {
    const chart = render<G2Spec>({
      title: 'BrushHighlight',
      type: 'interval',
      data: [
        { genre: 'Sports', sold: 275, type: 'A' },
        { genre: 'Sports', sold: 115, type: 'B' },
        { genre: 'Strategy', sold: 115, type: 'A' },
        { genre: 'Strategy', sold: 95, type: 'B' },
        { genre: 'Action', sold: 120, type: 'A' },
        { genre: 'Action', sold: 190, type: 'B' },
        { genre: 'Shooter', sold: 350, type: 'A' },
        { genre: 'Shooter', sold: 250, type: 'B' },
      ],
      scale: {
        x: { flex: [1, 2, 3, 4] },
        color: { guide: { title: null } },
      },
      encode: {
        x: 'genre',
        y: 'sold',
        color: 'type',
      },
      interaction: [{ type: 'brushHighlight' }],
    });
    mount(createDiv(), chart);
  });

  it('render({...} renders chart with brushHighlight-x interaction', () => {
    const chart = render<G2Spec>({
      title: 'BrushHighlightX interaction',
      type: 'interval',
      data: [
        { genre: 'Sports', sold: 275, type: 'A' },
        { genre: 'Sports', sold: 115, type: 'B' },
        { genre: 'Strategy', sold: 115, type: 'A' },
        { genre: 'Strategy', sold: 95, type: 'B' },
        { genre: 'Action', sold: 120, type: 'A' },
        { genre: 'Action', sold: 190, type: 'B' },
        { genre: 'Shooter', sold: 350, type: 'A' },
        { genre: 'Shooter', sold: 250, type: 'B' },
      ],
      scale: {
        x: { flex: [1, 2, 3, 4] },
        color: { guide: { title: null } },
      },
      encode: {
        x: 'genre',
        y: 'sold',
        color: 'type',
      },
      interaction: [{ type: 'brushHighlight', brushType: 'rectX' }],
    });
    mount(createDiv(), chart);
  });

  it('render({...} renders chart with brushHighlight-y interaction', () => {
    const chart = render<G2Spec>({
      title: 'BrushHighlightY interaction',
      type: 'interval',
      data: [
        { genre: 'Sports', sold: 275, type: 'A' },
        { genre: 'Sports', sold: 115, type: 'B' },
        { genre: 'Strategy', sold: 115, type: 'A' },
        { genre: 'Strategy', sold: 95, type: 'B' },
        { genre: 'Action', sold: 120, type: 'A' },
        { genre: 'Action', sold: 190, type: 'B' },
        { genre: 'Shooter', sold: 350, type: 'A' },
        { genre: 'Shooter', sold: 250, type: 'B' },
      ],
      scale: {
        x: { flex: [1, 2, 3, 4] },
        color: { guide: { title: null } },
      },
      encode: {
        x: 'genre',
        y: 'sold',
        color: 'type',
      },
      interaction: [{ type: 'brushHighlight', brushType: 'rectY' }],
    });
    mount(createDiv(), chart);
  });

  it('render({...} renders chart with brush interaction', () => {
    const chart = render<G2Spec>({
      title: 'Brush',
      type: 'interval',
      data: [
        { genre: 'Sports', sold: 275, type: 'A' },
        { genre: 'Sports', sold: 115, type: 'B' },
        { genre: 'Strategy', sold: 115, type: 'A' },
        { genre: 'Strategy', sold: 95, type: 'B' },
        { genre: 'Action', sold: 120, type: 'A' },
        { genre: 'Action', sold: 190, type: 'B' },
        { genre: 'Shooter', sold: 350, type: 'A' },
        { genre: 'Shooter', sold: 250, type: 'B' },
      ],
      scale: {
        x: { flex: [1, 2, 3, 4] },
        color: { guide: { title: null } },
      },
      encode: {
        x: 'genre',
        y: 'sold',
        color: 'type',
      },
      interaction: [{ type: 'brush' }],
    });
    mount(createDiv(), chart);
  });

  it('render({...} renders chart with brush-x interaction', () => {
    const chart = render<G2Spec>({
      title: 'BrushX interaction',
      type: 'interval',
      data: [
        { genre: 'Sports', sold: 275, type: 'A' },
        { genre: 'Sports', sold: 115, type: 'B' },
        { genre: 'Strategy', sold: 115, type: 'A' },
        { genre: 'Strategy', sold: 95, type: 'B' },
        { genre: 'Action', sold: 120, type: 'A' },
        { genre: 'Action', sold: 190, type: 'B' },
        { genre: 'Shooter', sold: 350, type: 'A' },
        { genre: 'Shooter', sold: 250, type: 'B' },
      ],
      scale: {
        x: { flex: [1, 2, 3, 4] },
        color: { guide: { title: null } },
      },
      encode: {
        x: 'genre',
        y: 'sold',
        color: 'type',
      },
      interaction: [{ type: 'brush', brushType: 'rectX' }],
    });
    mount(createDiv(), chart);
  });

  it('render({...} renders scatter with polygon brush interaction', () => {
    const chart = render<G2Spec>({
      title: 'Polygon brush',
      type: 'point',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
        },
      ],
      encode: {
        x: 'height',
        y: 'weight',
        color: 'gender',
      },
      interaction: [{ type: 'brush', brushType: 'polygon' }],
    });

    mount(createDiv(), chart);
  });

  it('render({...} renders scatter with brushVisible interaction', () => {
    const chart = render<G2Spec>({
      type: 'point',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
        },
      ],
      encode: {
        x: 'height',
        y: 'weight',
        color: 'gender',
      },
      interaction: [{ type: 'brushVisible' }],
    });

    mount(createDiv(), chart);
  });
});
