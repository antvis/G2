---
title: "面积图动画"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/animation/group/area/"
version: "5.4.8"
---

# 面积图动画

[运行示例](https://g2.antv.antgroup.com/zh/examples/animation/group/area/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://canisjs.github.io/canis-editor/index.html?exmp=os_1
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'area',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/os.json',
  },
  encode: {
    x: 'Year',
    y: 'Share',
    color: 'OperatingSystem',
    shape: 'smooth',
  },
  transform: [
    { type: 'stackEnter', groupBy: 'color', duration: 5000 },
    { type: 'stackY', orderBy: 'value' },
  ],
  animate: { enter: { type: 'growInX' } },
});

chart.render();
```
