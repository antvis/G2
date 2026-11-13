---
title: "面积图-百分比堆叠-数形交互"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/interaction/data/area-normalizey-element-point-move/"
version: "5.4.8"
---

# 面积图-百分比堆叠-数形交互

[运行示例](https://g2.antv.antgroup.com/zh/examples/interaction/data/area-normalizey-element-point-move/)

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
  type: 'area',
  data: [
    { year: '1991', value: 3, type: 'type1' },
    { year: '1992', value: 4, type: 'type1' },
    { year: '1993', value: 3.5, type: 'type1' },
    { year: '1994', value: 5, type: 'type1' },
    { year: '1995', value: 4.9, type: 'type1' },
    { year: '1996', value: 2, type: 'type1' },
    { year: '1997', value: 7, type: 'type1' },
    { year: '1998', value: 11, type: 'type1' },
    { year: '1999', value: 13, type: 'type1' },
    { year: '1991', value: 6, type: 'type2' },
    { year: '1992', value: 1, type: 'type2' },
    { year: '1993', value: 4, type: 'type2' },
    { year: '1994', value: 9, type: 'type2' },
    { year: '1995', value: 1.9, type: 'type2' },
    { year: '1996', value: 5, type: 'type2' },
    { year: '1997', value: 4, type: 'type2' },
    { year: '1998', value: 6, type: 'type2' },
    { year: '1999', value: 15, type: 'type2' },
    { year: '1991', value: 6, type: 'type3' },
    { year: '1992', value: 1, type: 'type3' },
    { year: '1993', value: 4, type: 'type3' },
    { year: '1994', value: 9, type: 'type3' },
    { year: '1995', value: 1.9, type: 'type3' },
    { year: '1996', value: 5, type: 'type3' },
    { year: '1997', value: 4, type: 'type3' },
    { year: '1998', value: 6, type: 'type3' },
    { year: '1999', value: 15, type: 'type3' },
  ],
  interaction: {
    legendFilter: false,
    elementPointMove: true,
  },
  transform: [{ type: 'stackY' }, { type: 'normalizeY' }],
  encode: { x: 'year', y: 'value', key: 'type', color: 'type' },
});

chart.render();
```
