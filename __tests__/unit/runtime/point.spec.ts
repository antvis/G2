import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('point', () => {
  it('render({...}) should render basic scatter', () => {
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
        shape: 'hollow',
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render scatter with only one dimension', () => {
    const chart = render<G2Spec>({
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
      },
      height: 120,
      scale: { y: { guide: null } },
      encode: {
        x: 'height',
        shape: 'hollow',
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render bubble chart', () => {
    const chart = render<G2Spec>({
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
      },
      scale: { size: { type: 'log', range: [4, 20] }, y: { field: 'Life' } },
      encode: {
        x: 'GDP',
        y: 'LifeExpectancy',
        size: 'Population',
        color: 'continent',
      },
      style: {
        fillOpacity: 0.3,
        lineWidth: 1,
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render scatter with only one dimension with line shape', () => {
    const chart = render<G2Spec>({
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
      },
      height: 120,
      scale: { y: { guide: null } },
      encode: {
        x: 'height',
        shape: 'line',
        size: 40,
      },
      style: {
        strokeOpacity: 0.2,
        lineWidth: 1,
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render chart with shapes', () => {
    const chart = render<G2Spec>({
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
      },
      encode: {
        x: 'clarity',
        y: 'carat',
        color: 'clarity',
        shape: 'clarity',
        size: 'price',
      },
      scale: {
        x: { padding: 0.2 },
      },
    });

    mount(createDiv(), chart);
  });
});
