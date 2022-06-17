import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('link', () => {
  it('render({...}) should render basic link', () => {
    const chart = render<G2Spec>({
      type: 'link',
      data: [
        { x1: 100, y1: 100, x2: 200, y2: 200 },
        { x1: 50, y1: 400, x2: 200, y2: 30 },
      ],
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/antfincdn/SM13%24lHuYH/metros.json',
        },
      ],
      encode: {
        x: ['POP_1980', 'POP_2015'],
        y: ['R90_10_1980', 'R90_10_2015'],
        color: (d) => d.R90_10_2015 - d.R90_10_1980,
      },
      scale: {
        x: { type: 'log' },
        color: { guide: null },
      },
    });

    mount(createDiv(), chart);
  });
});
