import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('vector', () => {
  it('render({...}) should render basic wind vector', () => {
    const chart = render<G2Spec>({
      width: 800,
      height: 600,
      type: 'vector',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/antfincdn/F5VcgnqRku/wind.json',
        },
      ],
      encode: {
        x: 'longitude',
        y: 'latitude',
        rotate: ({ u, v }) => Math.atan2(u, v),
        size: ({ u, v }) => Math.hypot(u, v),
        color: ({ u, v }) => Math.hypot(u, v),
      },
      scale: {
        color: { guide: null },
        rotate: { range: [-Math.PI, Math.PI] },
        size: { range: [8, 20] },
      },
    });

    mount(createDiv(), chart);
  });
});
