---
title: legendHighlight
order: 18
---

图例高亮元素。

## 开始使用

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*M4eVSKTMPs4AAAAAAAAAAAAADmJ7AQ/original" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data(profit)
  .axis('y', { labelFormatter: '~s' })
  .encode('x', 'month')
  .encode('y', ['end', 'start'])
  .encode(
    'color',
    d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
  )
  .state('inactive', { opacity: 0.5 })
  .legend('color', {
    state: { inactive: { labelOpacity: 0.5, markerOpacity: 0.5 } },
  });

chart.interaction('legendHighlight', true);

chart.render();
```

## 案例

### 获得数据

```js
chart.on('legend:highlight', (e) => {
  const { nativeEvent, data } = e;
  if (!nativeEvent) return;
  console.log(data);
});

chart.on('legend:unhighlight', (e) => {
  const { nativeEvent } = e;
  if (!nativeEvent) return;
  console.log('unhighlight');
});
```

### 触发交互

```js
chart.emit('legend:highlight', {
  data: { channel: 'color', value: 'Increase' },
});

chart.emit('legend:unhighlight', {});
```
