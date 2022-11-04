import { createDiv, mount } from '../../utils/dom';
import { render } from '@/runtime';
import type { G2Spec } from '@/spec';

describe('link', () => {
  it('render({...}) should render basic link', () => {
    const chart = render<G2Spec>({
      type: 'link',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/antfincdn/SM13%24lHuYH/metros.json',
      },
      encode: {
        x: ['POP_1980', 'POP_2015'],
        y: ['R90_10_1980', 'R90_10_2015'],
        color: (d) => d.R90_10_2015 - d.R90_10_1980,
      },
      scale: {
        x: { type: 'log' },
        color: { guide: null },
      },
      style: {
        arrow: { size: 6 },
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render smooth link', () => {
    const chart = render<G2Spec>({
      type: 'link',
      data: [
        { x1: 50, y1: 200, x2: 200, y2: 300 },
        { x1: 50, y1: 200, x2: 200, y2: 100 },
        { x1: 200, y1: 300, x2: 350, y2: 350 },
        { x1: 200, y1: 300, x2: 350, y2: 250 },
      ],
      encode: {
        x: ['x1', 'x2'],
        y: ['y1', 'y2'],
        shape: 'smooth',
      },
      scale: {
        x: { type: 'linear', domain: [0, 400] },
        y: { type: 'linear', domain: [0, 400] },
      },
      style: {
        lineDash: [1, 0],
        lineWidth: 1,
        stroke: 'grey',
      },
    });

    mount(createDiv(), chart);
  });
});
