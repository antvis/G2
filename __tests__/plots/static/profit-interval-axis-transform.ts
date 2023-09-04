import { G2Spec } from '../../../src';

export function profitIntervalAxisTransform(): G2Spec {
  return {
    type: 'interval',
    data: [
      { month: 'JJan.Jan.an.', profit: 387264, start: 0, end: 387264 },
      { month: 'Feb.', profit: 772096, start: 387264, end: 1159360 },
      { month: 'MJan.Jan.ar.', profit: 638075, start: 1159360, end: 1797435 },
      { month: 'AJan.Jan.pr.', profit: -211386, start: 1797435, end: 1586049 },
      { month: 'May', profit: -138135, start: 1586049, end: 1447914 },
      { month: 'JJan.Jan.un', profit: -267238, start: 1447914, end: 1180676 },
      { month: 'Jul.', profit: 431406, start: 1180676, end: 1612082 },
      { month: 'Aug.', profit: 363018, start: 1612082, end: 1975100 },
      { month: 'Sep.', profit: -224638, start: 1975100, end: 1750462 },
      {
        month: 'OcJan.Jan.Jan.t.',
        profit: -299867,
        start: 1750462,
        end: 1450595,
      },
      {
        month: 'NJan.Jan.Jan.ov.',
        profit: 607365,
        start: 1450595,
        end: 2057960,
      },
      { month: 'Dec.', profit: 1106986, start: 2057960, end: 3164946 },
      { month: 'ToJan.Jan.tal', start: 0, end: 3164946 },
    ],
    encode: {
      x: 'month',
      y: ['end', 'start'],
      color: (d) =>
        d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
    },
    axis: {
      x: {
        labelAutoRotate: {
          optionalAngles: [60],
          recoverWhenFailed: false,
        },
        size: 120,
      },
      y: { labelFormatter: '~s' },
    },
  };
}
