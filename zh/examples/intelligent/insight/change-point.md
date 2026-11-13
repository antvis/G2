---
title: "突变点"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/intelligent/insight/change-point/"
version: "5.4.8"
---

# 突变点

[运行示例](https://g2.antv.antgroup.com/zh/examples/intelligent/insight/change-point/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * AVA: https://github.com/antvis/AVA
 * g2-extension-ava: https://github.com/antvis/g2-extensions/tree/master/ava
 */
import { Chart } from '@antv/g2';
import { ChangePoint } from '@antv/g2-extension-ava';

const data = [
  {
    date: '2000',
    discount_price: 43.37,
  },
  {
    date: '2001',
    discount_price: 29.34,
  },
  {
    date: '2002',
    discount_price: 49.12,
  },
  {
    date: '2003',
    discount_price: 56.99,
  },
  {
    date: '2004',
    discount_price: 61.23,
  },
  {
    date: '2005',
    discount_price: 781.99,
  },
  {
    date: '2006',
    discount_price: 895.71,
  },
  {
    date: '2007',
    discount_price: 789.24,
  },
  {
    date: '2008',
    discount_price: 793.51,
  },
  {
    date: '2009',
    discount_price: 783.98,
  },
  {
    date: '2010',
    discount_price: 782.78,
  },
  {
    date: '2011',
    discount_price: 797.05,
  },
  {
    date: '2012',
    discount_price: 785.12,
  },
  {
    date: '2013',
    discount_price: 798.85,
  },
  {
    date: '2014',
    discount_price: 734.49,
  },
  {
    date: '2015',
    discount_price: 708.74,
  },
  {
    date: '2016',
    discount_price: 730.55,
  },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: data,
  encode: { x: 'date', y: 'discount_price' },
  children: [{ type: 'line' }, { type: ChangePoint }],
});

chart.render();
```
