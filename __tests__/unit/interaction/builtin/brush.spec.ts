import { createDiv, mount } from '../../../utils/dom';
import { render } from '@/runtime';
import type { G2Spec } from '@/spec';

describe('Interactions of brush', () => {
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
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
      },
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
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
      },
      encode: {
        x: 'height',
        y: 'weight',
        color: 'gender',
      },
      interaction: [{ type: 'brushVisible' }],
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render bubble chart with brush interaction', async () => {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
    );
    const data = await response.json();
    const chart = render<G2Spec>({
      type: 'point',
      data,
      scale: { size: { type: 'log', range: [4, 20] }, y: { field: 'Life' } },
      encode: {
        x: 'GDP',
        y: 'LifeExpectancy',
        size: 'Population',
        color: 'continent',
      },
      style: {
        fillOpacity: 0.3,
        lineWidth: 1,
      },
      interaction: [{ type: 'brush' }],
    });

    mount(createDiv(), chart);
  });
});
