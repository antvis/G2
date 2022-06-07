import { G2Spec, render } from '../../../src';
import { SANKEY_DATA } from '../../data/sankey';
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
          type: 'ordinal',
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
          type: 'ordinal',
        },
      },
      coordinate: [{ type: 'polar' }],
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render sankey plot', () => {
    const chart = render<G2Spec>({
      type: 'view',
      data: SANKEY_DATA,
      paddingBottom: 5,
      paddingTop: 5,
      paddingLeft: 5,
      paddingRight: 5,
      transform: [
        {
          type: 'sankey',
        },
      ],
      scale: {
        x: { guide: null },
        y: { guide: null },
        color: { guide: null },
      },
      children: [
        {
          type: 'polygon',
          transform: [
            {
              type: 'connector',
              callback: (v) => v.links,
            },
            {
              type: 'pick',
              fields: ['x', 'y', 'source.name'],
            },
          ],
          encode: {
            x: 'x',
            y: 'y',
            color: 'source.name',
            shape: 'ribbon',
          },
          style: {
            fillOpacity: 0.5,
          },
        },
        {
          type: 'polygon',
          transform: [
            {
              type: 'connector',
              callback: (v) => v.nodes,
            },
            {
              type: 'pick',
              fields: ['x', 'y', 'name'],
            },
          ],
          encode: {
            x: 'x',
            y: 'y',
            color: 'name',
            shape: 'polygon',
          },
        },
      ],
    });

    mount(createDiv(), chart);
  });
});
