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
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  })
  .encode('value', 'sum')
  .style({
    fill: (v) => {
      if (v['path'] === '类别 3') return 'red';
      if (v['name'] === '类别 2.1.1') return 'red';
    },
  });

chart.render();
