import { provinces } from '../../data/provinces';
import { seriesTooltipSteps } from './utils';

export function provincesLineGroupName() {
  return {
    type: 'line',
    data: provinces,
    encode: {
      x: (d) => d.idx + '',
      y: 'number',
      color: 'type',
    },
    scale: { y: { nice: true } },
    tooltip: {
      items: [
        { field: 'number', name: 'number' },
        { field: 'province', name: 'province' },
        { field: 'sub_type', name: 'sub_type' },
      ],
    },
  };
}

provincesLineGroupName.steps = seriesTooltipSteps([450, 300]);
