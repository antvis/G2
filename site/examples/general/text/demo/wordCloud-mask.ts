import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  // autoFit: true,
  width: 1000,
  height: 400,
  padding: 0,
});

chart
  .wordCloud()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json',
  })
  .layout({
    imageMask:
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LKU4TYEiB-4AAAAAAAAAAAAADmJ7AQ/original',
    fontSize: 10,
  })
  .encode('color', 'name')
  .encode('text', 'name');

chart.render();
