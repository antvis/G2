---
title: "WordCloud"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/general/text/wordcloud/"
version: "5.4.8"
---

# WordCloud

[Live example](https://g2.antv.antgroup.com/en/examples/general/text/wordcloud/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

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
