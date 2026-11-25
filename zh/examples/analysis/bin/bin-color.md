---
title: "颜色分箱"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/analysis/bin/bin-color/"
version: "5.4.8"
---

# 颜色分箱

[运行示例](https://g2.antv.antgroup.com/zh/examples/analysis/bin/bin-color/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'rect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/movies.json',
  },
  encode: { x: 'IMDB Rating', y: 'Rotten Tomatoes Rating' },
  transform: [
    { type: 'bin', color: 'count', thresholdsX: 30, thresholdsY: 20 },
  ],
  scale: { color: { palette: 'ylGnBu' } },
  tooltip: {
    title: { channel: 'color' },
    items: [
      (d, i, data, column) => ({
        name: 'IMDB Rating',
        value: `${column.x.value[i]}, ${column.x1.value[i]}`,
      }),
      (d, i, data, column) => ({
        name: 'Rotten Tomatoes Rating',
        value: `${column.y.value[i]}, ${column.y1.value[i]}`,
      }),
    ],
    render: () => '1',
  },
});

chart.render();
```
