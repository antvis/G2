---
title: "自定义形状水波图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/liquid/liquid-custom-shape/"
version: "5.4.8"
---

# 自定义形状水波图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/liquid/liquid-custom-shape/)

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
  type: 'liquid',
  data: 0.3,
  style: {
    shape: (x, y, r) => {
      const path = [];
      const w = r * 2;

      for (let i = 0; i < 5; i++) {
        path.push([
          i === 0 ? 'M' : 'L',
          (Math.cos(((18 + i * 72) * Math.PI) / 180) * w) / 2 + x,
          (-Math.sin(((18 + i * 72) * Math.PI) / 180) * w) / 2 + y,
        ]);
        path.push([
          'L',
          (Math.cos(((54 + i * 72) * Math.PI) / 180) * w) / 4 + x,
          (-Math.sin(((54 + i * 72) * Math.PI) / 180) * w) / 4 + y,
        ]);
      }
      path.push(['Z']);
      return path;
    },
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
  },
});

chart.render();
```
