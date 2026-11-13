---
title: "WordCloud with image mask"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/text/wordcloud-mask/"
version: "5.4.8"
---

# WordCloud with image mask

[Live example](https://g2.antv.antgroup.com/en/examples/general/text/wordcloud-mask/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

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
