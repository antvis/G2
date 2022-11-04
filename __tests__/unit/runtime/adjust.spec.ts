import { createDiv, mount } from '../../utils/dom';
import { render } from '@/runtime';
import type { G2Spec } from '@/spec';

describe('adjust', () => {
  it('Pack() should pack points with specified x and y channel uniformly', () => {
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
      adjust: { type: 'pack' },
    });

    mount(createDiv(), chart);
  });

  it('Pack() should pack points without specified x and y channel uniformly', () => {
    const chart = render<G2Spec>({
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
      },
      encode: {
        color: 'gender',
        tooltip: ['height', 'weight'],
      },
      adjust: { type: 'pack' },
    });

    mount(createDiv(), chart);
  });
});
