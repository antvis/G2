---
title: "旭日图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/sunburst/sunburst-default/"
version: "5.4.8"
---

# 旭日图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/sunburst/sunburst-default/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antfincdn/ryp44nvUYZ/coffee.json',
  },
  animate: { enter: { type: 'waveIn' } },
  coordinate: { type: 'polar', innerRadius: 0 },
});

chart.render();
```
