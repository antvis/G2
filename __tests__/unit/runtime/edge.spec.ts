import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('edge', () => {
  it('render({...}) should render basic edge', () => {
    const chart = render<G2Spec>({
      type: 'edge',
      data: [
        { x1: 100, y1: 100, x2: 200, y2: 200 },
        { x1: 50, y1: 400, x2: 200, y2: 30 },
      ],
      encode: {
        x: ['x1', 'x2'],
        y: ['y1', 'y2'],
      },
      scale: {
        x: { type: 'linear', domain: [0, 300] },
        y: { type: 'linear', domain: [0, 500] },
      },
      style: {
        lineDash: [6, 3],
        lineWidth: 3,
      },
    });

    mount(createDiv(), chart);
  });
});
