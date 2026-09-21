import { table } from '@antv/astro-theme-antv/table';

await table(
  {
    url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  document.getElementById('container')!,
);
