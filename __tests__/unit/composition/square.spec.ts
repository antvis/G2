import { Square } from '../../../src/composition';
import { G2ViewTree } from '../../../src/runtime';

describe('composition', () => {
  it('Square({...}) should accept x and y encode', () => {
    const composition = Square();
    const options = {
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/a0f96c54-d1fa-46c8-b6ef-548e2f700a6d.json',
        },
      ],
      data: [
        { x: 0, y: 0, series: 1 },
        { x: 0, y: 0, series: 1 },
        { x: 0, y: 0, series: 1 },
      ],
      filter: (i) => i >= 1,
      type: 'rect',
      width: 928,
      height: 240,
      paddingLeft: 50,
      paddingBottom: 50,
      encode: {
        x: 'series',
      },
      children: [
        {
          type: 'point',
          encode: {
            x: 'x',
            y: 'y',
            color: 'x',
            shape: 'hollowPoint',
          },
        },
      ],
    };
    const [{ statistic, children, ...rest }] = composition(
      options,
    ) as G2ViewTree[];
    expect(rest).toEqual({
      scale: {
        x: { paddingOuter: 0, guide: { position: 'top' } },
        y: { paddingOuter: 0, guide: null, paddingInner: 0, range: [0, 1] },
        color: { domain: [0] },
      },
      data: [
        { x: 0, y: 0, series: 1 },
        { x: 0, y: 0, series: 1 },
      ],
      filter: null,
      encode: { shape: 'hollowRect', x: 'series', color: 'x' },
      style: { lineWidth: 0 },
      animate: { enter: { type: 'fadeIn' } },
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/a0f96c54-d1fa-46c8-b6ef-548e2f700a6d.json',
        },
      ],
      frame: false,
      type: 'grid',
      width: 928,
      height: 240,
      paddingLeft: 50,
      paddingBottom: 50,
    });
  });
});
