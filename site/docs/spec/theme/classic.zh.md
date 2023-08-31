---
title: classic
---

经典主题。

## 开始使用

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*dR5uQ5VtpeoAAAAAAAAAAAAADmJ7AQ/original" width=640 alt="classic">

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingLeft: 80,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  })
  .transform({ type: 'sortX', by: 'y', reverse: true, slice: 6 })
  .transform({ type: 'dodgeX' })
  .encode('x', 'state')
  .encode('y', 'population')
  .encode('color', 'age')
  .axis('y', { labelFormatter: '~s' })
  .axis('x', { zIndex: 1 });

chart
  .interaction('tooltip', { shared: true })
  .interaction('elementHighlight', { background: true });

chart.render();
```
