import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('node', () => {
  it('render({...}) should render basic tree', () => {
    const chart = render<G2Spec>({
      type: 'view',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/antfincdn/FouG0KJrBc/flare.json',
        },
        {
          type: 'tree',
        },
      ],
      coordinate: [{ type: 'transpose' }],
      children: [
        {
          type: 'node',
          transform: [
            {
              type: 'connector',
              callback: (v) => v.nodes,
            },
          ],
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
          type: 'edge',
          transform: [
            {
              type: 'connector',
              callback: (v) => v.edges,
            },
          ],
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

      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/antfincdn/FouG0KJrBc/flare.json',
        },
        {
          type: 'cluster',
        },
      ],
      coordinate: [{ type: 'polar' }],
      children: [
        {
          type: 'node',
          transform: [
            {
              type: 'connector',
              callback: (v) => v.nodes,
            },
          ],
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
          type: 'edge',
          transform: [
            {
              type: 'connector',
              callback: (v) => v.edges,
            },
          ],
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

      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/antfincdn/FouG0KJrBc/flare.json',
        },
        {
          type: 'cluster',
        },
      ],
      coordinate: [{ type: 'polar' }],
      children: [
        {
          type: 'node',
          transform: [
            {
              type: 'connector',
              callback: (v) => v.nodes,
            },
          ],
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
          type: 'edge',
          transform: [
            {
              type: 'connector',
              callback: (v) => v.edges,
            },
          ],
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
});
