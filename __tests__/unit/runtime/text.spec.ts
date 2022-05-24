import { G2Context, G2Spec, render, TransformComponent } from '../../../src';
import { createDiv, mount } from '../../utils/dom';
import { delay } from '../../utils/delay';

describe('text', () => {
  it('render({...}) should render basic wordCloud', () => {
    const context: G2Context = {};
    const Flat: TransformComponent = () => {
      return ({ data, ...rest }) => {
        const newData = data.flatMap((d) =>
          d.words.map(({ weight, word }) => ({
            value: weight,
            text: word,
            name: d.name,
          })),
        );
        return {
          ...rest,
          data: newData,
          I: newData.map((_, i) => i),
        };
      };
    };

    Flat.props = {
      category: 'preprocessor',
    };

    const chart = render<G2Spec>(
      {
        type: 'text',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        transform: [
          {
            type: 'fetch',
            url: 'https://gw.alipayobjects.com/os/bmw-prod/d345d2d7-a35d-4d27-af92-4982b3e6b213.json',
          },
          {
            type: Flat,
          },
          {
            type: 'wordCloud',
            // todo, no need to specify size
            size: [640, 480],
            timeInterval: 5000,
            padding: 0,
            rotate: () => ~~(Math.random() * 2) * 90,
            fontSize: (d) => d.value * 2,
            on: async (type, { words }) => {
              if (type === 'end') {
                await delay(50);
                expect(words.length).toBeGreaterThan(0);
                const renderCount = context.canvas
                  .getRoot()
                  .querySelectorAll('.element').length;
                const diff = Math.abs(renderCount - words.length);
                expect(diff).toBeLessThan(5);
              }
            },
          },
        ],
        scale: {
          x: { guide: null },
          y: { guide: null, range: [0, 1] },
          color: { guide: null },
          fontSize: { type: 'identity' },
          rotate: { type: 'identity' },
        },
        encode: {
          x: 'x',
          y: 'y',
          text: 'text',
          color: '#122c6a',
          rotate: 'rotate',
          fontSize: 'size',
        },
        style: {
          textAlign: 'center',
          textBaseline: 'alphabetic',
          fontFamily: 'Verdana',
          fontWeight: 'normal',
        },
      },
      context,
    );

    mount(createDiv(), chart);
  });

  it('render wordCloud with color encode', () => {
    const chart = render<G2Spec>({
      type: 'text',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json',
        },
        {
          type: 'wordCloud',
          // todo, no need to specify size
          size: [640, 480],
          timeInterval: 5000,
          padding: 0,
          text: (d) => d.name,
          fontSize: [8, 32],
          spiral: 'rectangular',
          font: 'Verdana',
          imageMask:
            'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ',
        },
      ],
      scale: {
        x: { guide: null },
        y: { guide: null, range: [0, 1] },
        color: { guide: null },
        fontSize: { type: 'identity' },
        rotate: { type: 'identity' },
      },
      encode: {
        x: 'x',
        y: 'y',
        text: 'text',
        color: 'name',
        rotate: 'rotate',
        fontSize: 'size',
      },
      style: {
        textAlign: 'center',
        textBaseline: 'alphabetic',
        // todo, support `style` as a channel to enable bind fontFamily to `font` field
        fontFamily: 'Verdana',
        fontWeight: 'normal',
      },
    });

    mount(createDiv(), chart);
  });
});
