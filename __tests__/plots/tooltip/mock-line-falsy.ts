import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export function mockLineFalsy(): G2Spec {
  return {
    type: 'line',
    data: [
      {
        city: '杭州',
        value: 400,
      },
      {
        city: '上海',
        value: 300,
      },
      {
        city: '北京',
        value: null,
      },
      {
        city: '河北',
        value: 0,
      },
      {
        city: '苏州',
        value: 500,
      },
      {
        city: '海南',
        value: undefined,
      },
      {
        city: '成都',
        value: 400,
      },
      {
        city: '重庆',
        value: 200,
      },
    ],
    encode: {
      x: 'city',
      y: 'value',
    },
  };
}

mockLineFalsy.steps = seriesTooltipSteps([200, 300], [275, 300], [420, 300]);
