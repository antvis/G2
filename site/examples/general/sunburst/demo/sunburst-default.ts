import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .sunburst()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antfincdn/ryp44nvUYZ/coffee.json',
  })
  .animate('enter', { type: 'waveIn' })
  .coordinate({ type: 'polar', innerRadius: 0 });

chart.render();
