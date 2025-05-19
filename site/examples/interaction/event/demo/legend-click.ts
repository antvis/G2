import { Chart } from '@antv/g2';

const data = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.coordinate({ type: 'theta', outerRadius: 0.8 });

chart
  .interval()
  .data(data)
  .transform({ type: 'stackY' })
  .encode('y', 'percent')
  .encode('color', 'item')
  .label({
    position: 'outside',
    text: (data) => `${data.item}: ${data.percent * 100}%`,
  })
  .tooltip((data) => ({
    name: data.item,
    value: `${data.percent * 100}%`,
  }));

chart.on('afterrender', () => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  // https://github.com/antvis/G2/blob/v5/src/interaction/legendFilter.ts
  const items = document.getElementsByClassName('items-item');
  const datum = items.map((item) => item.__data__);
  items.forEach((item, index) => {
    item.addEventListener('click', (ev) => {
      console.log(datum[index]);
    });
  });
  // 简单点击事件
  // document
  //   .getElementsByClassName('legend-category')[0]
  //   .addEventListener('click', (ev) => {
  //     console.log('click legend');
  //   });
});

chart.render();
