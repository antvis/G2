import { G2Spec } from '../../../src';

export function aaplLineIllegalDataSlider(): G2Spec {
  return {
    type: 'line',
    data: [
      {
        area: '东北',
        province: '长春',
        value: 10000,
      },
      {
        area: '东北',
        province: '辽宁',
        value: 10000,
      },
      {
        area: '',
        province: '辽宁',
        value: null,
      },
      {
        area: '华东',
        province: '上海',
        value: 10000,
      },
      {
        area: '华东',
        province: '山东',
        value: 40000,
      },
      {
        area: '华东',
        province: '江苏',
        value: 10000,
      },
      {
        area: '华东',
        province: '江西',
        value: 10000,
      },
    ],
    encode: {
      x: (x) => `(${x.area}, ${x.province})`,
      y: 'value',
      color: 'value',
    },
    scale: {
      color: { type: 'linear', unknown: '#fff' },
    },
    style: { gradient: 'y', lineWidth: 2 },
    slider: { x: true },
  };
}
