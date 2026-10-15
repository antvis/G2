---
title: "大小分箱"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/analysis/bin/bin-size/"
version: "5.4.8"
---

# 大小分箱

[运行示例](https://g2.antv.antgroup.com/zh/examples/analysis/bin/bin-size/)

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
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/movies.json',
  },
  encode: { x: 'IMDB Rating', y: 'Rotten Tomatoes Rating', shape: 'point' },
  transform: [{ type: 'bin', size: 'count', thresholdsX: 10, thresholdsY: 10 }],
  tooltip: {
    title: { channel: 'size' },
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
  },
});

chart.render();
```
