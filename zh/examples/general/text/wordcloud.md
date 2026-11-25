---
title: "词云图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/text/wordcloud/"
version: "5.4.8"
---

# 词云图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/text/wordcloud/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingTop: 40,
});

chart.options({
  type: 'wordCloud',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/philosophy-word.json',
  },
  layout: {
    spiral: 'rectangular',
    fontSize: [20, 100],
  },
  encode: { color: 'text' },
});

chart.render();
```
