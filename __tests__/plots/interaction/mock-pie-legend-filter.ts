import { G2Spec } from '../../../src';
import { LEGEND_ITEMS_CLASS_NAME } from '../../../src/interaction/legendFilter';
import { step } from './utils';

export function mockPieLegendFilter(): G2Spec {
  return {
    type: 'facetRect',
    data: {
      type: 'inline',
      value: [
        {
          D2022010400161505000009920363_sum: 22828922,
          dd2baf8827554249bd380cd0371f85b4: '2024-07-02',
          '8abf74ed1ebe45408af4676486cb8fb6': 4549244.58,
        },
        {
          D2022010400161505000009920363_sum: 24710705.71,
          dd2baf8827554249bd380cd0371f85b4: '2024-07-01',
          '8abf74ed1ebe45408af4676486cb8fb6': 5174241.6,
        },
        {
          D2022010400161505000009920363_sum: 27181856.29,
          dd2baf8827554249bd380cd0371f85b4: '2024-06-30',
          '8abf74ed1ebe45408af4676486cb8fb6': 5564121.4,
        },
        {
          D2022010400161505000009920363_sum: 25462071.48,
          dd2baf8827554249bd380cd0371f85b4: '2024-06-29',
          '8abf74ed1ebe45408af4676486cb8fb6': 5509570.71,
        },
        {
          D2022010400161505000009920363_sum: 27109916.98,
          dd2baf8827554249bd380cd0371f85b4: '2024-06-28',
          '8abf74ed1ebe45408af4676486cb8fb6': 6320245.72,
        },
        {
          D2022010400161505000009920363_sum: 27554918.99,
          dd2baf8827554249bd380cd0371f85b4: '2024-06-27',
          '8abf74ed1ebe45408af4676486cb8fb6': 6582401.59,
        },
        {
          D2022010400161505000009920363_sum: 28621357.6,
          dd2baf8827554249bd380cd0371f85b4: '2024-06-26',
          '8abf74ed1ebe45408af4676486cb8fb6': 6744951.36,
        },
      ],
      transform: [
        {
          type: 'rename',
          D2022010400161505000009920363_sum: '单价求和',
          '8abf74ed1ebe45408af4676486cb8fb6': '单位成本求和',
        },
        {
          type: 'fold',
          fields: ['单价求和', '单位成本求和'],
          key: 'folded_key',
          value: 'folded_value',
        },
      ],
    },
    encode: {
      x: 'folded_key',
    },
    axis: {
      x: {
        title: false,
      },
    },
    children: [
      {
        type: 'view',
        coordinate: { type: 'theta' },
        frame: false,
        children: [
          {
            type: 'interval',
            encode: {
              color: 'dd2baf8827554249bd380cd0371f85b4',
              y: 'folded_value',
            },
            transform: [{ type: 'stackY' }],
            scale: { y: { facet: false } },
            animate: false,
          },
        ],
      },
    ],
  };
}

mockPieLegendFilter.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(LEGEND_ITEMS_CLASS_NAME);
  const [e0] = elements;
  return [step(e0, 'click')];
};
