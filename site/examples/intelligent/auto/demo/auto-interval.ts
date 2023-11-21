import { Runtime, corelib, extend } from '@antv/g2';
import { autolib } from '@antv/g2-extension-ava';

const Chart = extend(Runtime, {
  ...corelib(),
  ...autolib(),
});

const chart = new Chart({
  container: 'container',
});

chart.auto().data([
  { price: 100, type: 'A' },
  { price: 120, type: 'B' },
  { price: 150, type: 'C' },
]);

chart.render();
