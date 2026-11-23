import { table } from '@antv/astro-theme-antv/table';

await table(
  {
    url: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  document.getElementById('container')!,
);
