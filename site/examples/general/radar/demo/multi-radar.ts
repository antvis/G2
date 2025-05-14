import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const position = ['Points', 'Rebounds', 'Assists', 'Steals', 'Blocks'];

const data = [
  {
    name: 'Jordan',
    Points: 30.1,
    Rebounds: 6.2,
    Assists: 5.3,
    Steals: 2.3,
    Blocks: 0.8,
  },
  {
    name: 'LeBron James',
    Points: 27.0,
    Rebounds: 7.4,
    Assists: 7.4,
    Steals: 1.6,
    Blocks: 0.8,
  },
];

chart.options({
  type: 'line',
  title: 'Jordan vs LeBron James NBA Stats Comparison',
  data,
  coordinate: { type: 'radar' },
  encode: {
    position: ['Points', 'Rebounds', 'Assists', 'Steals', 'Blocks'],
    color: 'name',
  },
  style: {
    lineWidth: 1.5,
    strokeOpacity: 0.4,
  },
  scale: Object.fromEntries(
    Array.from({ length: position.length }, (_, i) => [
      `position${i === 0 ? '' : i}`,
      {
        domainMin: 0,
        nice: true,
      },
    ]),
  ),
  interaction: { tooltip: { series: false } },
  axis: Object.fromEntries(
    Array.from({ length: position.length }, (_, i) => [
      `position${i === 0 ? '' : i}`,
      {
        zIndex: 1,
        titleFontSize: 10,
        titleSpacing: 8,
        label: true,
        labelFill: '#000',
        labelOpacity: 0.45,
        labelFontSize: 10,
        line: true,
        lineFill: '#000',
        lineOpacity: 0.25,
      },
    ]),
  ),
});

chart.render();
