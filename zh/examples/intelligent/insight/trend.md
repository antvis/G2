---
title: "趋势"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/intelligent/insight/trend/"
version: "5.4.8"
---

# 趋势

[运行示例](https://g2.antv.antgroup.com/zh/examples/intelligent/insight/trend/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * AVA: https://github.com/antvis/AVA
 * g2-extension-ava: https://github.com/antvis/g2-extensions/tree/master/ava
 */
import { Chart } from '@antv/g2';
import { Trend } from '@antv/g2-extension-ava';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
  children: [{ type: 'line' }, { type: Trend }],
});

chart.render();
```
