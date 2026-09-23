import { Chart } from '../../../src';

export function issue8520({ container, canvas, callback = (chart) => {} }) {
  const chart = new Chart({ container, canvas, width: 480, height: 300 });

  chart.options({
    type: 'line',
    animate: false,
    data: [
      { year: '1991', value: 3 },
      { year: '1992（数字很长很很长1）', value: 4 },
      { year: '1993（数字很长很很长2）', value: 3.5 },
      { year: '1994（数字很长很很长3）', value: 5 },
      { year: '1995（数字很长很很长4）', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ],
    encode: { x: 'year', y: 'value' },
    axis: {
      x: {
        size: 40,
        labelAutoEllipsis: {
          suffix: '..',
          minLength: 8,
          maxLength: 12,
        },
        labelAutoWrap: {
          wordWrapWidth: 80,
          maxLines: 2,
          recoverWhenFailed: true,
        },
        labelAutoRotate: {
          optionalAngles: [0, 15, 80],
          recoverWhenFailed: true,
        },
        labelAutoHide: {
          keepHeader: true,
          keepTail: true,
        },
      },
    },
    slider: {
      x: {
        values: [0.2, 0.6],
      },
    },
  });

  callback(chart);
  const finished = chart.render();
  return { chart, finished };
}
