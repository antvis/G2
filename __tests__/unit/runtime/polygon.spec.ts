import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('polygon', () => {
  it('render({...}) should render basic polygon', () => {
    const chart = render<G2Spec>({
      type: 'polygon',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/voronoi.json',
        },
        {
          type: 'voronoi',
          fields: ['x', 'y'],
          as: ['ax', 'ay'],
          extend: [
            [0, 0],
            [800, 600],
          ],
        },
      ],
      encode: {
        x: 'ax',
        y: 'ay',
        color: 'value',
      },
      scale: {
        color: {
          type: 'quantile',
          range: [
            '#5B8FF9',
            '#5AD8A6',
            '#5D7092',
            '#F6BD16',
            '#6F5EF9',
            '#6DC8EC',
            '#945FB9',
            '#FF9845',
            '#1E9493',
            '#FF99C3',
          ],
        },
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render basic polygon in polar', () => {
    const chart = render<G2Spec>({
      type: 'polygon',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/voronoi.json',
        },
        {
          type: 'voronoi',
          fields: ['x', 'y'],
          as: ['ax', 'ay'],
          extend: [
            [0, 0],
            [800, 600],
          ],
        },
      ],
      encode: {
        x: 'ax',
        y: 'ay',
        color: 'value',
      },
      scale: {
        color: {
          type: 'quantile',
          range: [
            '#5B8FF9',
            '#5AD8A6',
            '#5D7092',
            '#F6BD16',
            '#6F5EF9',
            '#6DC8EC',
            '#945FB9',
            '#FF9845',
            '#1E9493',
            '#FF99C3',
          ],
        },
      },
      coordinate: [{ type: 'polar' }],
    });

    mount(createDiv(), chart);
  });
});
