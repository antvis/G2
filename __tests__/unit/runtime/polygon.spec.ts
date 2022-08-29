import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('polygon', () => {
  it.skip('render({...}) should render basic polygon', () => {
    // const chart = render<G2Spec>({
    //   type: 'polygon',
    //   transform: [
    //     {
    //       type: 'fetch',
    //       url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/voronoi.json',
    //     },
    //     {
    //       type: 'voronoi',
    //       fields: ['x', 'y'],
    //       as: ['ax', 'ay'],
    //       extend: [
    //         [0, 0],
    //         [800, 600],
    //       ],
    //     },
    //   ],
    //   encode: {
    //     x: 'ax',
    //     y: 'ay',
    //     color: 'value',
    //   },
    //   scale: {
    //     color: {
    //       type: 'ordinal',
    //     },
    //   },
    // });
    // mount(createDiv(), chart);
  });

  it.skip('render({...}) should render basic polygon in polar', () => {
    // const chart = render<G2Spec>({
    //   type: 'polygon',
    //   transform: [
    //     {
    //       type: 'fetch',
    //       url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/voronoi.json',
    //     },
    //     {
    //       type: 'voronoi',
    //       fields: ['x', 'y'],
    //       as: ['ax', 'ay'],
    //       extend: [
    //         [0, 0],
    //         [800, 600],
    //       ],
    //     },
    //   ],
    //   encode: {
    //     x: 'ax',
    //     y: 'ay',
    //     color: 'value',
    //   },
    //   scale: {
    //     color: {
    //       type: 'ordinal',
    //     },
    //   },
    //   coordinate: [{ type: 'polar' }],
    // });
    // mount(createDiv(), chart);
  });
});
