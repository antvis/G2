import { G2Spec } from '../../../src';
import { tooltipStepsByClassName } from './utils';

export async function flareTreeCustom(): Promise<G2Spec> {
  return {
    type: 'view',
    width: 800,
    height: 1500,
    coordinate: { transform: [{ type: 'transpose' }] },
    children: [
      {
        type: 'tree',
        layout: {
          sortBy: (a, b) => a.value - b.value,
        },
        data: {
          type: 'fetch',
          value: 'data/flare.json',
        },
        encode: {
          linkShape: 'vhv',
        },
        style: {
          // node style.
          nodeFill: (d) => (d.height === 0 ? '#999' : '#000'),
          // link style.
          linkStroke: '#999',
          // label style.
          labelText: (d) => d.data.name || '-',
          labelFontSize: (d) => (d.height === 0 ? 7 : 12),
          labelTextAlign: (d) => (d.height === 0 ? 'start' : 'end'),
          labelPosition: (d) => (d.height !== 0 ? 'left' : 'right'),
          labelDx: (d) => (d.height === 0 ? 5 : -5),
          labelBackground: true,
          labelBackgroundFill: '#fff',
        },
      },
    ],
  };
}

flareTreeCustom.steps = ({ canvas }) => {
  const point = tooltipStepsByClassName('point', 0);
  const link = tooltipStepsByClassName('link', 0);
  return [...point({ canvas }), ...link({ canvas })];
};
