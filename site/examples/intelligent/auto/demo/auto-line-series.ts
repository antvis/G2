import { Runtime, corelib, extend } from '@antv/g2';
import { autolib } from '@antv/g2-extension-ava';

const Chart = extend(Runtime, {
  ...corelib(),
  ...autolib(),
});

const chart = new Chart({
  container: 'container',
});

chart.auto().data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/indices.json',
});

chart.render();