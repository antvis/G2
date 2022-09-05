import { G2Spec, render } from '../../../../src';
import { createDiv, mount } from '../../../utils/dom';

describe('Interaction of legend', () => {
  it('render({...} renders chart with legendActive interaction.', () => {
    const chart = render<G2Spec>({
      type: 'view',
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
      title: 'LegendActive',
      scale: {
        x: { flex: [1, 2, 3, 4] },
      },
      children: [
        {
          type: 'interval',
          encode: {
            x: 'genre',
            y: 'sold',
            series: 'type',
            color: 'type',
          },
          scale: {
            color: { guide: { title: null } },
          },
        },
      ],
      interaction: [{ type: 'legendActive' }, { type: 'elementHighlight' }],
    });
    mount(createDiv(), chart);
  });

  it('render({...} renders chart with legendActive interaction', () => {
    const chart = render<G2Spec>({
      type: 'view',
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
      title: 'LegendHighlight',
      scale: {
        x: { flex: [1, 2, 3, 4] },
      },
      children: [
        {
          type: 'interval',
          encode: {
            x: 'genre',
            y: 'sold',
            series: 'type',
            color: 'type',
          },
          scale: {
            color: { guide: { title: null } },
          },
        },
      ],
      interaction: [{ type: 'legendHighlight' }, { type: 'elementHighlight' }],
    });
    mount(createDiv(), chart);
  });

  it.only('', () => {
    const chart = render<G2Spec>({
      type: 'interval',
      data: [
        { company: 'Apple', type: '整体', value: 30 },
        { company: 'Facebook', type: '整体', value: 35 },
        { company: 'Google', type: '整体', value: 28 },
        { company: 'Apple', type: '非技术岗', value: 40 },
        { company: 'Facebook', type: '非技术岗', value: 65 },
        { company: 'Google', type: '非技术岗', value: 47 },
        { company: 'Apple', type: '技术岗', value: 23 },
        { company: 'Facebook', type: '技术岗', value: 18 },
        { company: 'Google', type: '技术岗', value: 20 },
      ],
      encode: {
        x: 'type',
        y: 'value',
        color: 'company',
        series: 'company',
      },
      interaction: [{ type: 'legendFilter' }],
    });
    mount(createDiv(), chart);
  });
});
