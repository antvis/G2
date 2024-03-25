import { Chart } from '../../../src';

export function chartAxisLabelFormatter(context) {
  const { container, canvas } = context;

  const chart = new Chart({ container, canvas });

  chart.data([
    {
      pos: 1,
      no: 1,
      driver: 'Max Verstappen',
      car: 'RED BULL RACING HONDA RBPT',
      laps: 57,
      time: '1:33:56.736',
      pts: 25,
    },
    {
      pos: 2,
      no: 11,
      driver: 'Sergio Perez',
      car: 'RED BULL RACING HONDA RBPT',
      laps: 57,
      time: '+11.987s',
      pts: 18,
    },
    {
      pos: 3,
      no: 14,
      driver: 'Fernando Alonso',
      car: 'ASTON MARTIN ARAMCO MERCEDES',
      laps: 57,
      time: '+38.637s',
      pts: 15,
    },
    {
      pos: 4,
      no: 55,
      driver: 'Carlos Sainz',
      car: 'FERRARI',
      laps: 57,
      time: '+48.052s',
      pts: 12,
    },
    {
      pos: 5,
      no: 44,
      driver: 'Lewis Hamilton',
      car: 'MERCEDES',
      laps: 57,
      time: '+50.977s',
      pts: 10,
    },
  ]);

  function medal(ranking) {
    if (ranking > 2) return `第${ranking + 1}名`;
    const { document } = chart.getContext().canvas!;
    const group = document.createElement('g', {});
    const size = ranking === 0 ? 20 : 15;
    const icon = document.createElement('image', {
      style: {
        src: 'data/gold.png',
        width: size,
        height: size,
        transform: `translate(-${size / 2}, -${size / 2})`,
      },
    });
    const text = ['冠军🏆', '亚军🥈', '季军🥉'][ranking];
    const label = document.createElement('text', {
      style: {
        text,
        fill: 'gray',
        textAlign: 'center',
        transform: `translate(0, 25)`,
      },
    });

    group.appendChild(icon);
    group.appendChild(label);
    return group;
  }

  chart
    .interval()
    .encode('x', 'pos')
    .encode('y', 'pts')
    .encode('color', 'pts')
    .axis({
      x: {
        animate: false,
        title: 'FORMULA 1 GULF AIR BAHRAIN GRAND PRIX 2023 - RACE RESULT',
        size: 80,
        labelFormatter: (datum, index) => medal(index),
      },
      y: false,
    })
    .label({
      text: 'driver',
      transform: [{ type: 'contrastReverse' }],
    })
    .label({
      text: 'time',
      transform: [{ type: 'contrastReverse' }],
      dy: 20,
      fontStyle: 'italic',
    })
    .tooltip({
      title: 'car',
    })
    .legend(false);
  const finished = chart.render();

  return { chart, finished };
}
