import { deepMix } from '@antv/util';
import { G2Spec } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { step } from './utils';

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

export function mockPieInteraction(): G2Spec {
  return {
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
    animate: false,
  };
}

mockPieInteraction.steps = ({ canvas }) => {
  const { document } = canvas;
  const [e] = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  return [step(e, 'click')];
};
