import { G2Spec } from '../../../src';

export function aaplAreaAxisXLabelAdapts(): G2Spec {
  return {
    type: 'area',
    height: 300,
    axis: {
      x: {
        title: false,
        size: 20,
        labelAutoRotate: true,
        labelAutoWrap: true,
      },
    },
    encode: {
      x: 'date',
      y: 'value',
    },
    data: [
      {
        date: '2024-01-01',
        value: 0.3,
        name: '访问用户占比',
        smooth: true,
      },
      {
        date: '2024-01-02',
        value: 0.35,
        name: '访问用户占比',
        smooth: true,
      },
      {
        date: '2024-01-03',
        value: 0.4,
        name: '访问用户占比',
        smooth: true,
      },
      {
        date: '2024-01-04',
        value: 0.38,
        name: '访问用户占比',
        smooth: true,
      },
      {
        date: '2024-01-05',
        value: 0.42,
        name: '访问用户占比',
        smooth: true,
      },
    ],
  };
}
