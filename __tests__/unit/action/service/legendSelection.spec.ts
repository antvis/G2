import { G2Spec, render } from '../../../../src';
import { createDiv, mount } from '../../../utils/dom';

describe('LegendSelection in LegendActive interaction', () => {
  it('render({...} renders chart with elementActive and legendActive', () => {
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
      scale: {
        x: { flex: [1, 2, 3, 4] },
      },
      children: [
        // {
        //   type: 'line',
        //   encode: {
        //     x: 'genre',
        //     y: 'sold',
        //     color: 'type',
        //   },
        //   style: { strokeOpacity: 0 },
        //   scale: { color: { field: 'hello' } },
        // },
        {
          type: 'point',
          // data: [{ genre: 'Action', sold: 234, type: 'a' }],
          encode: {
            x: 'genre',
            y: 'sold',
            // color: 'type',
            shape: 'genre',
          },
          scale: {
            color: { field: 'hello' },
            shape: {
              field: 'hello',
              range: ['point', 'hollowPoint', 'bowtie', 'cross'],
            },
          },
        },
      ],
      interaction: [{ type: 'elementActive' }, { type: 'legendActive' }],
    });
    mount(createDiv(), chart);
  });

  it('render({...}) renders bubble chart with fisheye', () => {
    const chart = render({
      type: 'point',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
        },
      ],
      scale: { size: { type: 'log', range: [4, 20] }, y: { field: 'Life' } },
      encode: {
        x: 'GDP',
        y: 'LifeExpectancy',
        size: 'Population',
        shape: 'continent',
      },
      style: {
        fillOpacity: 0.3,
        lineWidth: 1,
      },
      interaction: [{ type: 'elementActive' }, { type: 'legendActive' }],
    });
    mount(createDiv(), chart);
  });
});
