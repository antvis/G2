import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('adjust', () => {
  it('Pack() should pack points with specified x and y channel uniformly', async () => {
    const chart = render<G2Spec>({
      type: 'rect',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/97d0b32e-97f7-49dc-b8a1-9e41fa8597a7.json',
        },
        {
          type: 'sortBy',
          fields: ['survived'],
          order: 'DESC',
        },
      ],
      paddingRight: 50,
      encode: {
        x: 'pclass',
      },
      children: [
        {
          type: 'point',
          scale: {
            color: { guide: { formatter: (d) => (d === '1' ? 'Yes' : 'No') } },
          },
          encode: {
            color: 'survived',
          },
          adjust: { type: 'pack' },
        },
      ],
    });

    mount(createDiv(), chart);
  });

  it('Pack() should pack points with specified x and y channel uniformly', async () => {
    const chart = render<G2Spec>({
      type: 'rect',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/97d0b32e-97f7-49dc-b8a1-9e41fa8597a7.json',
        },
        {
          type: 'sortBy',
          fields: ['survived'],
          order: 'DESC',
        },
      ],
      paddingRight: 50,
      shareData: true,
      encode: {
        x: 'pclass',
      },
      children: [
        {
          type: 'point',
          scale: {
            color: { guide: { formatter: (d) => (d === '1' ? 'Yes' : 'No') } },
          },
          encode: {
            color: 'survived',
          },
          adjust: { type: 'pack' },
        },
      ],
    });

    mount(createDiv(), chart);
  });

  it('Pack() should pack points with specified x and y channel uniformly', async () => {
    const chart = render<G2Spec>({
      type: 'rect',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/97d0b32e-97f7-49dc-b8a1-9e41fa8597a7.json',
        },
        {
          type: 'sortBy',
          fields: ['survived'],
          order: 'DESC',
        },
      ],
      paddingRight: 50,
      encode: {
        x: 'pclass',
      },
      shareSize: true,
      children: [
        {
          type: 'point',
          scale: {
            color: { guide: { formatter: (d) => (d === '1' ? 'Yes' : 'No') } },
          },
          encode: {
            color: 'survived',
          },
          adjust: { type: 'pack' },
        },
      ],
    });

    mount(createDiv(), chart);
  });

  it('Pack() should pack points with specified x and y channel uniformly', () => {
    const chart = render<G2Spec>({
      type: 'rect',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/1f3410d2-5048-4d87-a1c2-4abb39da8915.json',
        },
        {
          type: 'sortBy',
          fields: ['Survived'],
          order: 'DESC',
        },
      ],
      paddingRight: 70,
      encode: {
        x: 'Class',
        y: 'Sex',
      },
      children: [
        {
          type: 'point',
          encode: {
            color: 'Survived',
          },
          adjust: { type: 'pack' },
        },
      ],
    });

    mount(createDiv(), chart);
  });

  it('Pack() should pack points with specified x and y channel uniformly', () => {
    const chart = render<G2Spec>({
      type: 'rect',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/1f3410d2-5048-4d87-a1c2-4abb39da8915.json',
        },
        {
          type: 'sortBy',
          fields: ['Survived'],
          order: 'DESC',
        },
      ],
      paddingRight: 70,
      shareData: true,
      encode: {
        x: 'Class',
        y: 'Sex',
      },
      children: [
        {
          type: 'point',
          encode: {
            color: 'Survived',
          },
          adjust: { type: 'pack' },
        },
      ],
    });

    mount(createDiv(), chart);
  });

  it.only('Pack() should pack points with specified x and y channel uniformly', () => {
    const chart = render<G2Spec>({
      type: 'rect',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/97d0b32e-97f7-49dc-b8a1-9e41fa8597a7.json',
        },
        {
          type: 'sortBy',
          fields: ['survived', 'sex'],
        },
      ],
      paddingRight: 50,
      paddingBottom: 50,
      paddingLeft: 80,
      encode: {
        y: 'pclass',
      },
      shareSize: true,
      children: [
        {
          type: 'rect',
          encode: { x: 'survived' },
          scale: {
            x: {
              guide: {
                formatter: (d) => (d === '1' ? 'Yes' : 'No'),
                position: 'bottom',
              },
            },
            y: { guide: null },
          },
          shareSize: true,
          children: [
            {
              type: 'rect',
              encode: { y: 'sex' },
              shareSize: true,
              scale: {
                y: { guide: { position: 'left' } },
                x: { guide: null },
              },
              children: [
                {
                  type: 'view',
                  children: [
                    {
                      type: 'point',
                      scale: {
                        color: {
                          guide: {
                            formatter: (d) => (d === '1' ? 'Yes' : 'No'),
                          },
                        },
                      },
                      encode: {
                        color: 'survived',
                      },
                      adjust: { type: 'pack' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    mount(createDiv(), chart);
  });
});
