import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('facet', () => {
  it('render({...} should render row facet', (done) => {
    const chart = render<G2Spec>(
      {
        transform: [
          {
            type: 'fetch',
            url: 'https://gw.alipayobjects.com/os/bmw-prod/a0f96c54-d1fa-46c8-b6ef-548e2f700a6d.json',
          },
        ],
        type: 'rect',
        width: 928,
        height: 240,
        paddingLeft: 50,
        paddingBottom: 50,
        title: {
          text: 'Facet',
          subtitle: 'Description of chart.',
        },
        encode: {
          x: 'series',
        },
        scale: {
          x: { guide: { size: 30 } },
        },
        children: [
          {
            type: 'point',
            encode: {
              x: 'x',
              y: 'y',
              shape: 'hollowPoint',
            },
          },
        ],
      },
      {},
      done,
    );
    mount(createDiv(), chart);
  });

  it('render({...} should render col facet', (done) => {
    const chart = render<G2Spec>(
      {
        transform: [
          {
            type: 'fetch',
            url: 'https://gw.alipayobjects.com/os/bmw-prod/90ec29b1-c939-434e-8bbb-ce5fa27c62a7.json',
          },
        ],
        type: 'rect',
        height: 800,
        encode: {
          y: 'site',
        },
        paddingLeft: 130,
        paddingRight: 120,
        paddingBottom: 60,
        children: [
          {
            type: 'point',
            scale: {
              color: { type: 'ordinal' },
            },
            encode: {
              x: 'yield',
              y: 'variety',
              color: 'year',
              shape: 'hollowPoint',
            },
          },
        ],
      },
      {},
      done,
    );
    mount(createDiv(), chart);
  });

  it('render({...} should render rect facet', (done) => {
    const chart = render<G2Spec>(
      {
        transform: [
          {
            type: 'fetch',
            url: 'https://gw.alipayobjects.com/os/bmw-prod/3346929c-d7f4-4a81-8edc-c4c6d028ab96.json',
          },
        ],
        type: 'rect',
        paddingRight: 80,
        paddingBottom: 50,
        paddingLeft: 50,
        height: 600,
        encode: {
          x: 'sex',
          y: 'species',
        },
        children: [
          {
            type: 'point',
            facet: false,
            frame: false,
            encode: {
              x: 'culmen_depth_mm',
              y: 'culmen_length_mm',
              size: 2,
            },
            style: {
              fill: '#ddd',
            },
          },
          {
            type: 'point',
            encode: {
              x: 'culmen_depth_mm',
              y: 'culmen_length_mm',
              shape: 'hollowPoint',
              color: 'island',
            },
          },
        ],
      },
      {},
      done,
    );
    mount(createDiv(), chart);
  });

  it('render({...} should render rect facet with callback', (done) => {
    const chart = render<G2Spec>(
      {
        transform: [
          {
            type: 'fetch',
            url: 'https://gw.alipayobjects.com/os/bmw-prod/3346929c-d7f4-4a81-8edc-c4c6d028ab96.json',
          },
        ],
        type: 'rect',
        paddingRight: 80,
        paddingBottom: 50,
        paddingLeft: 50,
        height: 600,
        encode: {
          x: 'sex',
          y: 'species',
        },
        children: (facet) => {
          const { columnIndex, rowIndex } = facet;
          return columnIndex !== rowIndex
            ? {
                type: 'point',
                encode: {
                  x: 'culmen_depth_mm',
                  y: 'culmen_length_mm',
                  shape: 'hollowPoint',
                },
              }
            : {
                type: 'point',
                encode: {
                  x: 'culmen_depth_mm',
                  y: 'culmen_length_mm',
                  shape: 'hollowPoint',
                  color: 'red',
                },
              };
        },
      },
      {},
      done,
    );
    mount(createDiv(), chart);
  });

  it('render({...}) should render matrix facet with position channel', () => {
    const chart = render<G2Spec>({
      type: 'matrix',
      width: 800,
      height: 800,
      paddingLeft: 60,
      paddingBottom: 60,
      transform: [
        {
          type: 'fetch',
          url: 'https://vega.github.io/editor/data/penguins.json',
        },
      ],
      encode: {
        position: [
          'Beak Length (mm)',
          'Beak Depth (mm)',
          'Flipper Length (mm)',
          'Body Mass (g)',
        ],
      },
      children: [
        {
          type: 'point',
          encode: {
            color: 'Species',
            shape: 'hollowPoint',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render matrix facet with x and y channel', () => {
    const chart = render<G2Spec>({
      type: 'matrix',
      width: 800,
      paddingLeft: 50,
      paddingBottom: 60,
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/48eb9b33-9d2b-40a2-864b-6522f92ba3b9.json',
          // @todo Remove this with scale.transform
          callback: (d) => ({
            ...d,
            temp_max: +d.temp_max,
            precipitation: +d.precipitation,
            wind: +d.wind,
            date: new Date(d.date),
          }),
        },
        {
          type: 'rename',
          map: {
            temp_max: 'Temp Max',
            precipitation: 'Precipitation',
            wind: 'Wind',
            date: 'Date',
            location: 'Location',
          },
        },
      ],
      encode: {
        y: ['Temp Max', 'Precipitation', 'Wind'],
        x: 'Date',
      },
      children: [
        {
          type: 'line',
          scale: {
            x: { tickCount: 10 },
          },
          encode: {
            color: 'Location',
          },
        },
      ],
    });
    mount(createDiv(), chart);
  });
});
