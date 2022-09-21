import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('Interaction', () => {
  it('render({...} renders chart with tooltip', () => {
    const chart = render<G2Spec>({
      type: 'interval',
      data: [
        { genre: 'Sports', sold: 275, type: 'A' },
        { genre: 'Strategy', sold: 115, type: 'B' },
        { genre: 'Action', sold: 120, type: 'C' },
        { genre: 'Shooter', sold: 350, type: 'D' },
        { genre: 'Other', sold: 150, type: 'E' },
      ],
      encode: {
        x: 'genre',
        y: 'sold',
      },
    });
    mount(createDiv(), chart);
  });

  it('render({...} renders chart with custom tooltip', () => {
    const chart = render<G2Spec>({
      type: 'interval',
      data: [
        { genre: 'Sports', sold: 275, type: 'A' },
        { genre: 'Strategy', sold: 115, type: 'B' },
        { genre: 'Action', sold: 120, type: 'C' },
        { genre: 'Shooter', sold: 350, type: 'D' },
        { genre: 'Other', sold: 150, type: 'E' },
      ],
      scale: { tooltip: { field: ['x', 'y'] } },
      encode: {
        x: 'genre',
        y: 'sold',
        color: 'genre',
        tooltip: ['genre', 'sold'],
        title: 'type',
      },
    });
    mount(createDiv(), chart);
  });

  it('render({...} renders chart with object tooltip', () => {
    const chart = render<G2Spec>({
      type: 'interval',
      data: [
        { genre: 'Sports', sold: 275, type: 'A' },
        { genre: 'Strategy', sold: 115, type: 'B' },
        { genre: 'Action', sold: 120, type: 'C' },
        { genre: 'Shooter', sold: 350, type: 'D' },
        { genre: 'Other', sold: 150, type: 'E' },
      ],
      scale: { tooltip: { field: ['x', 'y'] } },
      encode: {
        x: 'genre',
        y: 'sold',
        color: 'genre',
        tooltip: (d) => ({
          value: `${d.genre}, ${d.sold}`,
        }),
      },
    });
    mount(createDiv(), chart);
  });

  it('render({...}) renders chart with multi-value tooltip', () => {
    const chart = render({
      type: 'line',
      width: 720,
      paddingLeft: 80,
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/96cd81b5-54a4-4fe8-b778-502b2114df58.json',
        callback: ({ Year, ...rest }) => ({
          Year: new Date(Year),
          ...rest,
        }),
        transform: [
          {
            type: 'filterBy',
            fields: ['Horsepower', 'Miles_per_Gallon'],
          },
        ],
      },
      coordinate: [{ type: 'parallel' }],
      scale: {
        position: { nice: true, guide: { zIndex: 1 } },
        position1: { nice: true, guide: { zIndex: 1 } },
        position2: { nice: true, guide: { zIndex: 1 } },
        position3: { nice: true, guide: { zIndex: 1 } },
        position4: { nice: true, guide: { zIndex: 1 } },
        position5: { nice: true, guide: { zIndex: 1 } },
      },
      encode: {
        position: [
          'Cylinders',
          'Displacement',
          'Weight_in_lbs',
          'Horsepower',
          'Acceleration',
          'Miles_per_Gallon',
          'Year',
        ],
        color: 'Origin',
        size: 1.01,
      },
      interaction: [{ type: 'elementActive', color: 'red' }],
      style: {
        strokeOpacity: 0.3,
      },
    });
    mount(createDiv(), chart);
  });

  it('render({...} renders chart with elementActive', () => {
    const chart = render<G2Spec>({
      type: 'interval',
      data: [
        { genre: 'Sports', sold: 275, type: 'A' },
        { genre: 'Strategy', sold: 115, type: 'B' },
        { genre: 'Action', sold: 120, type: 'C' },
        { genre: 'Shooter', sold: 350, type: 'D' },
        { genre: 'Other', sold: 150, type: 'E' },
      ],
      encode: {
        x: 'genre',
        y: 'sold',
        color: 'genre',
      },
      interaction: [{ type: 'elementActive' }],
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render with elementActive', () => {
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
      interaction: [{ type: 'elementActive' }],
    });

    mount(createDiv(), chart);
  });

  it('render({...}) renders bubble chart with fisheye', () => {
    const chart = render({
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
      interaction: [{ type: 'fisheye' }],
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render bar chart with fisheye', () => {
    const chart = render<G2Spec>({
      type: 'interval',
      data: [
        { genre: 'Sports', sold: 275, type: 'A' },
        { genre: 'Strategy', sold: 115, type: 'B' },
        { genre: 'Action', sold: 120, type: 'C' },
        { genre: 'Shooter', sold: 350, type: 'D' },
        { genre: 'Other', sold: 150, type: 'E' },
      ],
      encode: {
        x: 'genre',
        y: 'sold',
      },
      interaction: [{ type: 'fisheye' }],
    });
    mount(createDiv(), chart);
  });
});
