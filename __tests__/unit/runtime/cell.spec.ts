import { createDiv, mount } from '../../utils/dom';
import { render } from '@/runtime';
import type { G2Spec } from '@/spec';

describe('cell', () => {
  it('render({...} should render basic cell', () => {
    const chart = render<G2Spec>({
      type: 'cell',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json',
        transform: [
          {
            type: 'sortBy',
            fields: ['y'],
          },
        ],
      },
      height: 640,
      encode: {
        x: 'x',
        y: 'y',
        color: (d) => `${d.index}`,
      },
      style: {
        stroke: 'black',
        lineWidth: 1,
      },
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render cell with threshold', () => {
    const chart = render<G2Spec>({
      type: 'cell',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
        callback: (d) => ({ salary: d }),
      },
      width: 900,
      height: 280,
      scale: {
        color: {
          type: 'threshold',
          domain: [10000, 100000],
          range: ['#eee', 'pink', 'red'],
        },
      },
      encode: {
        y: (_, i) => (i % 5) + 1,
        x: (_, i) => ((i / 5) | 0) + 1,
        color: 'salary',
      },
      style: {
        stroke: 'black',
        lineWidth: 1,
      },
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render cell with quantile', () => {
    const chart = render<G2Spec>({
      type: 'cell',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
        callback: (d) => ({ salary: d }),
      },
      width: 900,
      height: 280,
      scale: {
        color: {
          type: 'quantile',
          range: ['#eee', 'pink', 'red'],
        },
      },
      encode: {
        y: (_, i) => (i % 5) + 1,
        x: (_, i) => ((i / 5) | 0) + 1,
        color: 'salary',
      },
      style: {
        stroke: 'black',
        lineWidth: 1,
      },
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render cell with quantize', () => {
    const chart = render<G2Spec>({
      type: 'cell',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
        callback: (d) => ({ salary: d }),
      },
      width: 900,
      height: 280,
      scale: {
        color: {
          type: 'quantize',
          domain: [10000, 100000],
          range: ['#eee', 'pink', 'red'],
        },
      },
      encode: {
        y: (_, i) => (i % 5) + 1,
        x: (_, i) => ((i / 5) | 0) + 1,
        color: 'salary',
      },
      style: {
        stroke: 'black',
        lineWidth: 1,
      },
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render cell with flex band', () => {
    const chart = render<G2Spec>({
      type: 'cell',
      data: [
        { name: 'A', course: 'a' },
        { name: 'A', course: 'b' },
        { name: 'B', course: 'a' },
        { name: 'B', course: 'b' },
      ],
      scale: {
        x: { flex: [2, 1] },
        y: { flex: [1, 2] },
      },
      encode: {
        y: 'name',
        x: 'course',
      },
      style: {
        stroke: 'black',
        lineWidth: 1,
      },
    });
    mount(createDiv(), chart);
  });
});
