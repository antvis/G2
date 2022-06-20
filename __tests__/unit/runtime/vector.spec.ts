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
        rotate: ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI,
        size: ({ u, v }) => Math.hypot(v, u),
        color: ({ u, v }) => Math.hypot(v, u),
      },
      scale: {
        color: { guide: null },
        size: { range: [6, 20] },
      },
      style: {
        arrow: { size: '40%' },
      },
    });

    mount(createDiv(), chart);
  });
});
