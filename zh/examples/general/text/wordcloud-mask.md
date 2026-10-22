---
title: "带图片遮罩的词云图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/text/wordcloud-mask/"
version: "5.4.8"
---

# 带图片遮罩的词云图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/text/wordcloud-mask/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 800,
  height: 400,
});

chart.options({
  type: 'wordCloud',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json',
  },
  layout: {
    imageMask:
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LKU4TYEiB-4AAAAAAAAAAAAADmJ7AQ/original',
    fontSize: 12,
  },
  encode: { color: 'name', text: 'name' },
  legend: false,
});

chart.render();
```
