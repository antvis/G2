import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export function issue6710(): G2Spec {
  return {
    autoFit: true,
    data: [
      {
        time: '10:10',
        call: 10,
        value: 2,
        name: 'people',
      },
      {
        time: '10:20',
        call: 10,
        value: 7,
        name: 'people',
      },
      {
        time: '10:20',
        call: 10,
        value: 5,
        name: 'mock',
      },
      {
        time: '10:10',
        call: 10,
        value: 10,
        name: 'call',
      },
      {
        time: '10:20',
        call: 10,
        value: 10,
        name: 'call',
      },
    ],
    type: 'view',
    children: [
      {
        encode: {
          x: 'time',
          y: 'value',
          color: 'name',
        },
        scale: {
          y: {
            independent: true,
            nice: true,
            domainMin: 0,
          },
        },
        axis: {
          x: {
            title: null,
            tick: false,
            labelAutoHide: true,
            labelAlign: 'horizontal',
            labelAutoEllipsis: true,
            labelAutoWrap: false,
            labelAutoRotate: false,
          },
        },
        type: 'line',
      },
    ],
  };
}

issue6710.steps = seriesTooltipSteps([200, 200], [300, 200], [400, 200]);
