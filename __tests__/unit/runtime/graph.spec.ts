import { G2Spec, render } from '../../../src';
import { SANKEY_DATA } from '../../data/sankey';
import { createDiv, mount } from '../../utils/dom';

describe('graph', () => {
  it('render({...}) should render basic tree', () => {
    const chart = render<G2Spec>({
      type: 'view',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/antfincdn/FouG0KJrBc/flare.json',
        transform: [{ type: 'tree' }],
      },
      coordinate: [{ type: 'transpose' }],
      children: [
        {
          type: 'point',
          data: {
            transform: [
              {
                type: 'connector',
                callback: (v) => v.nodes,
              },
            ],
          },
          encode: {
            x: ['x'],
            y: ['y'],
            size: 2,
          },
          // todo close guide for node, edge mark.
          scale: {
            x: { guide: null },
            y: { guide: null },
          },
        },
        {
          type: 'link',
          data: {
            transform: [
              {
                type: 'connector',
                callback: (v) => v.edges,
              },
            ],
          },
          encode: {
            x: ['x'],
            y: ['y'],
            shape: 'smoothEdge',
          },
          scale: {
            x: { guide: null },
            y: { guide: null },
          },
          style: {
            stroke: 'grey',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render basic cluster', () => {
    const chart = render<G2Spec>({
      type: 'view',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/antfincdn/FouG0KJrBc/flare.json',
        transform: [
          {
            type: 'cluster',
          },
        ],
      },
      coordinate: [{ type: 'polar' }],
      children: [
        {
          type: 'point',
          data: {
            transform: [
              {
                type: 'connector',
                callback: (v) => v.nodes,
              },
            ],
          },
          encode: {
            x: ['x'],
            y: ['y'],
            size: 2,
            color: 'name',
          },
          // todo close guide for node, edge mark.
          scale: {
            x: { guide: null },
            y: { guide: null },
          },
        },
        {
          type: 'link',
          data: {
            transform: [
              {
                type: 'connector',
                callback: (v) => v.edges,
              },
            ],
          },
          encode: {
            x: ['x'],
            y: ['y'],
            shape: 'smoothEdge',
          },
          scale: {
            x: { guide: null },
            y: { guide: null },
          },
          style: {
            stroke: 'grey',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render basic tree in polar', () => {
    const chart = render<G2Spec>({
      type: 'view',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/antfincdn/FouG0KJrBc/flare.json',
        transform: [
          {
            type: 'cluster',
          },
        ],
      },
      coordinate: [{ type: 'polar' }],
      children: [
        {
          type: 'point',
          data: {
            transform: [
              {
                type: 'connector',
                callback: (v) => v.nodes,
              },
            ],
          },
          encode: {
            x: ['x'],
            y: ['y'],
            size: 2,
            color: 'name',
          },
          // todo close guide for node, edge mark.
          scale: {
            x: { guide: null },
            y: { guide: null },
          },
        },
        {
          type: 'link',
          data: {
            transform: [
              {
                type: 'connector',
                callback: (v) => v.edges,
              },
            ],
          },
          encode: {
            x: ['x'],
            y: ['y'],
            shape: 'vhvEdge',
          },
          scale: {
            x: { guide: null },
            y: { guide: null },
          },
          style: {
            stroke: 'grey',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render sankey plot', () => {
    const chart = render<G2Spec>({
      type: 'view',
      data: {
        type: 'inline',
        value: SANKEY_DATA,
        transform: [{ type: 'sankey' }],
      },
      paddingBottom: 5,
      paddingTop: 5,
      paddingLeft: 5,
      paddingRight: 5,
      scale: {
        x: { guide: null },
        y: { guide: null },
        color: { guide: null },
      },
      children: [
        {
          type: 'polygon',
          data: {
            transform: [
              {
                type: 'connector',
                callback: (v) => v.links,
              },
            ],
          },
          encode: {
            x: 'x',
            y: 'y',
            color: (d) => d.source.name,
            shape: 'ribbon',
          },
          style: {
            fillOpacity: 0.5,
            stroke: null,
          },
        },
        {
          type: 'polygon',
          data: {
            transform: [
              {
                type: 'connector',
                callback: (v) => v.nodes,
              },
            ],
          },
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

  it('render({...}) should render arc diagram', () => {
    const chart = render<G2Spec>({
      type: 'view',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/antfincdn/agVao%26jU5l/miserables.json',
        transform: [{ type: 'arc', y: 0.3 }],
      },
      children: [
        {
          type: 'link',
          data: {
            transform: [
              {
                type: 'connector',
                callback: (v) => v.edges,
              },
            ],
          },
          encode: {
            x: 'x',
            y: 'y',
            color: 'source',
            shape: 'arc',
          },
          scale: {
            y: { domain: [0, 1], guide: null },
            x: { guide: null },
            color: { type: 'ordinal', guide: null },
          },
          style: {
            opacity: 0.5,
          },
        },
        {
          type: 'point',
          data: {
            transform: [
              {
                type: 'connector',
                callback: (v) => v.nodes,
              },
            ],
          },
          encode: {
            x: 'x',
            y: 'y',
            size: 'value',
            color: 'name',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render arc diagram in polar', () => {
    const chart = render<G2Spec>({
      type: 'view',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/antfincdn/agVao%26jU5l/miserables.json',
        transform: [{ type: 'arc', y: 1 }],
      },
      coordinate: [{ type: 'polar' }],
      children: [
        {
          type: 'link',
          data: {
            transform: [
              {
                type: 'connector',
                callback: (v) => v.edges,
              },
            ],
          },
          encode: {
            x: 'x',
            y: 'y',
            color: 'source',
            shape: 'arc',
          },
          scale: {
            y: { domain: [0, 1], guide: null },
            x: { domain: [0, 1], guide: null },
            color: { type: 'ordinal', guide: null },
          },
          style: {
            opacity: 0.5,
          },
        },
        {
          type: 'point',
          data: {
            transform: [
              {
                type: 'connector',
                callback: (v) => v.nodes,
              },
            ],
          },
          encode: {
            x: 'x',
            y: 'y',
            size: 'value',
            color: 'name',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render chord diagram', () => {
    const chart = render<G2Spec>({
      type: 'view',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/antfincdn/agVao%26jU5l/miserables.json',
        transform: [{ type: 'arc', y: 1, weight: true }],
      },
      coordinate: [{ type: 'polar' }],
      children: [
        {
          type: 'polygon',
          data: {
            transform: [
              {
                type: 'connector',
                callback: (v) => v.edges,
              },
            ],
          },
          encode: {
            x: 'x',
            y: 'y',
            color: 'source',
            shape: 'ribbon',
          },
          scale: {
            y: { domain: [0, 1], guide: null },
            x: { domain: [0, 1], guide: null },
            color: { type: 'ordinal', guide: null },
          },
          style: {
            opacity: 0.5,
          },
        },
        {
          type: 'polygon',
          data: {
            transform: [
              {
                type: 'connector',
                callback: (v) => v.nodes,
              },
            ],
          },
          scale: {
            y: { domain: [0, 1], guide: null },
            x: { domain: [0, 1], guide: null },
            color: { type: 'ordinal', guide: null },
          },
          encode: {
            x: 'x',
            y: 'y',
            size: 'value',
            color: 'name',
            shape: 'polygon',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });
});
