import { Chart } from '@antv/g2';

const data = [
  { State: 'WY', 小于5岁: 25635, '5至13岁': 1890, '14至17岁': 9314 },
  { State: 'DC', 小于5岁: 30352, '5至13岁': 20439, '14至17岁': 10225 },
  { State: 'VT', 小于5岁: 38253, '5至13岁': 42538, '14至17岁': 15757 },
  { State: 'ND', 小于5岁: 51896, '5至13岁': 67358, '14至17岁': 18794 },
  { State: 'AK', 小于5岁: 72083, '5至13岁': 85640, '14至17岁': 22153 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.coordinate({ type: 'radial' });

chart
  .interval()
  .data({
    value: data,
    transform: [
      {
        type: 'fold',
        fields: ['小于5岁', '5至13岁', '14至17岁'],
        key: '年龄段',
        value: '人口数量',
        retains: ['State'],
      },
    ],
  })
  .encode('x', 'State')
  .encode('y', '人口数量')
  .encode('color', '年龄段')
  .scale('y', { domainMax: 200000 })
  .scale('color', { range: ['#6395FA', '#62DAAB', '#657798'] })
  .transform({ type: 'stackY' })
  .axis({
    x: {
      title: false,
      line: true,
    },
    y: {
      line: true,
      grid: true,
      gridLineDash: [4, 4],
      tickCount: 10,
      tickFilter: (datum) => datum != 200000,
    },
  })
  .legend({
    color: {
      position: 'bottom',
      layout: { justifyContent: 'center' },
    },
  })
  .interaction('elementHighlightByX')
  .interaction('tooltip', {
    shared: true,
  });

chart.render();
