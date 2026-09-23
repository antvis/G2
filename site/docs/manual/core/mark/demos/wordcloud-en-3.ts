import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'wordCloud',
  layout: {
    imageMask:
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LKU4TYEiB-4AAAAAAAAAAAAADmJ7AQ/original',
    fontSize: 12,
  },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json',
  },
  encode: { color: 'name', text: 'name' },
  legend: false,
});

chart.render();
