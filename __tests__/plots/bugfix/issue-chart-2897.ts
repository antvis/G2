import { Chart, register } from '../../../src';

/**
 * Draw 2.5d column shape.
 */
function myColumn({ fill, stroke }, context) {
  return (points, ...rest) => {
    const x3 = points[1][0] - points[0][0];
    const x4 = x3 / 2 + points[0][0];
    const { document } = context;
    const g = document.createElement('g', {});

    const r = document.createElement('polygon', {
      style: {
        points: [
          [points[0][0], points[0][1]],
          [x4, points[1][1] + 8],
          [x4, points[3][1] + 8],
          [points[3][0], points[3][1]],
        ],
        fill: 'rgba(114, 177, 207, 0.5)',
        stroke: 'rgba(0,0,0,0.1)',
        strokeOpacity: 0.1,
        inset: 30,
      },
    });

    const p = document.createElement('polygon', {
      style: {
        points: [
          [x4, points[1][1] + 8],
          [points[1][0], points[1][1]],
          [points[2][0], points[2][1]],
          [x4, points[2][1] + 8],
        ],
        fill: 'rgba(126, 212, 236, 0.5)',
        stroke: 'rgba(0,0,0,0.3)',
        strokeOpacity: 0.1,
      },
    });

    const t = document.createElement('polygon', {
      style: {
        points: [
          [points[0][0], points[0][1]],
          [x4, points[1][1] - 8],
          [points[1][0], points[1][1]],
          [x4, points[1][1] + 8],
        ],
        fill: 'rgba(173, 240, 255, 0.65)',
      },
    });

    g.appendChild(r);
    g.appendChild(p);
    g.appendChild(t);

    return g;
  };
}
// @ts-ignore
register('shape.interval.column25d', myColumn);

export function issueChart2897(context) {
  const { container, canvas } = context;
  const chart = new Chart({
    container: container,
    canvas,
  });

  chart.options({
    type: 'interval',
    labels: [
      {
        text: 'sales',
        fontSize: 14,
      },
    ],
    data: [
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
      { year: '1963 年', sales: 65 },
      { year: '1964 年', sales: 122 },
      { year: '1967 年', sales: 132 },
      { year: '1968 年', sales: 144 },
    ],
    axis: false,
    legend: false,
    encode: {
      x: 'year',
      y: 'sales',
      shape: 'column25d',
    },
    scale: {
      x: { padding: 0.3 },
    },
    state: {
      selected: { fill: 'red' },
      unselected: { opacity: 0.6 },
    },
    interaction: {
      elementSelectByX: true,
    },
  });

  const finished = chart.render();

  return {
    chart,
    finished,
  };
}
