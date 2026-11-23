import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'box',
  data: [
    { Species: 'I. setosa', type: 'SepalLength', bin: [4.3, 4.8, 5, 5.2, 5.8] },
    {
      Species: 'I. setosa',
      type: 'SepalWidth',
      bin: [2.3, 3.2, 3.4, 3.7, 4.4],
    },
    { Species: 'I. setosa', type: 'PetalLength', bin: [1, 1.4, 1.5, 1.6, 1.9] },
    {
      Species: 'I. setosa',
      type: 'PetalWidth',
      bin: [0.1, 0.2, 0.2, 0.3, 0.6],
    },
    {
      Species: 'I. versicolor',
      type: 'SepalLength',
      bin: [4.9, 5.6, 5.9, 6.3, 7],
    },
    {
      Species: 'I. versicolor',
      type: 'SepalWidth',
      bin: [2, 2.5, 2.8, 3, 3.4],
    },
    {
      Species: 'I. versicolor',
      type: 'PetalLength',
      bin: [3, 4, 4.35, 4.6, 5.1],
    },
    {
      Species: 'I. versicolor',
      type: 'PetalWidth',
      bin: [1, 1.2, 1.3, 1.5, 1.8],
    },
    {
      Species: 'I. virginica',
      type: 'SepalLength',
      bin: [4.9, 6.2, 6.5, 6.9, 7.9],
    },
    {
      Species: 'I. virginica',
      type: 'SepalWidth',
      bin: [2.2, 2.8, 3, 3.2, 3.8],
    },
    {
      Species: 'I. virginica',
      type: 'PetalLength',
      bin: [4.5, 5.1, 5.55, 5.9, 6.9],
    },
    {
      Species: 'I. virginica',
      type: 'PetalWidth',
      bin: [1.4, 1.8, 2, 2.3, 2.5],
    },
  ],
  encode: {
    x: 'type',
    y: 'bin',
    series: 'Species',
    color: 'Species',
  },
  scale: {
    x: { paddingInner: 0.2, paddingOuter: 0.1 },
    y: { zero: true },
    series: { paddingInner: 0.3, paddingOuter: 0.1 },
  },
  style: {
    stroke: 'black',
  },
  tooltip: [
    { name: 'min', channel: 'y' },
    { name: 'q1', channel: 'y1' },
    { name: 'q2', channel: 'y2' },
    { name: 'q3', channel: 'y3' },
    { name: 'max', channel: 'y4' },
  ],
});

chart.render();
