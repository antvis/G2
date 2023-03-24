---
title: 概览
order: 1
---

G2 支持多种数据来源和数据变换，以应对不同的数据源来源。一个完整的数据由两部分构成：

- connector - 获得数据的方式
- transform - 预处理数据

## 开始使用

```js
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

chart.data({
  type: 'inline',
  value: data,
  transform: [{ type: 'sort', callback: (a, b) => a.sold - b.sold }],
});
```
