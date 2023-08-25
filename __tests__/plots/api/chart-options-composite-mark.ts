import { deepMix } from '@antv/util';
import { Chart } from '../../../src';

function Pie(options, context) {
  const { encode = {}, ...rest } = options;
  const { value, ...restEncode } = encode;
  return deepMix(rest, {
    type: 'interval',
    transform: [{ type: 'stackY' }],
    coordinate: { type: 'theta' },
    encode: {
      ...restEncode,
      y: value,
    },
  });
}

export function chartOptionsCompositeMark(context) {
  const { container, canvas } = context;

  const chart = new Chart({ container, canvas });

  chart.options({
    type: Pie,
    data: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
    // @ts-ignore
    encode: { value: 'sold', color: 'genre' },
  });

  const finished = chart.render();

  return { finished };
}
