---
title: "Detailed Parameters of Insight Mark"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/intelligent/insight/insight/"
version: "5.4.8"
---

# Detailed Parameters of Insight Mark

[Live example](https://g2.antv.antgroup.com/en/examples/intelligent/insight/insight/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
/**
 * AVA: https://github.com/antvis/AVA
 * g2-extension-ava: https://github.com/antvis/g2-extensions/tree/master/ava
 */
import { Chart } from '@antv/g2';
import { Insight } from '@antv/g2-extension-ava';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const dataSource = {
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
};

chart.options({
  children: [
    {
      type: 'line',
      data: dataSource,
      encode: {
        x: 'date',
        y: 'close',
      },
    },
    // insight mark
    {
      type: Insight,
      data: dataSource,
      // Specify to add marks of type 'trend'
      insightType: 'trend',
      // If the value of dimensions or measures is not specified, it will be obtained from the encode information by default.
      dimensions: [{ fieldName: 'date' }],
      measures: [{ fieldName: 'close', method: 'SUM' }],
      options: {
        // Filter out not significant insights
        filterInsight: true,
        // Verify whether the input meets the algorithm requirements
        dataValidation: true,
        // Adjust the significance test threshold
        algorithmParameter: {
          // Parameter for trend mark
          trend: {
            threshold: 0.05,
          },
        },
        // Generate Chinese spec
        visualizationOptions: {
          lang: 'zh-CN',
        },
      },
    },
  ],
});

chart.render();
```
