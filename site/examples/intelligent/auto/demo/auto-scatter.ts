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
  value:
    'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
});

chart.render();
