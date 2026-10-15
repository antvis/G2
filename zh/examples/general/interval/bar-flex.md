---
title: "弹性条形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/interval/bar-flex/"
version: "5.4.8"
---

# 弹性条形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/interval/bar-flex/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://www.highcharts.com.cn/demo/highcharts/variwide
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 1000,
});

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/90873879-09d7-4842-a493-03fb560267bc.csv',
  },
  transform: [{ type: 'flexX', field: 'gdp' }],
  encode: { x: 'country', y: 'value', color: 'country' },
  axis: { y: { labelFormatter: '~s' } },
  tooltip: { items: ['value', 'gdp'] },
});

chart.render();
```
