import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('vector', () => {
  it('render({...}) should render basic wind vector', () => {
    const chart = render<G2Spec>({
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
        rotate: ({ u, v }) => (Math.atan2(u, v) * 180) / Math.PI,
        size: ({ u, v }) => Math.hypot(u, v),
        color: ({ u, v }) => Math.hypot(u, v),
      },
      scale: {
        color: { guide: null },
        rotate: { range: [0, 360] },
      },
    });

    mount(createDiv(), chart);
  });
});
