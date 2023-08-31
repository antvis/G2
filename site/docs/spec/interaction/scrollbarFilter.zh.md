---
title: scrollbarFilter
order: 1
---

滚动条筛选是一个默认交互，当设置了 scrollbar 默认就会有这个交互。关于 scrollbar 组件的配置，见文档 [component/scrollbar](/spec/component/scrollbar)。

## 开始使用

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .line()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  })
  .encode('x', 'date')
  .encode('y', 'close')
  .scrollbar('y', { ratio: 0.3 }) // y domain 的比例
  .scrollbar('x', { ratio: 0.5 }); // x domain 的比例

chart.render();
```

## 案例

### 触发事件

```js
chart.emit('scrollbarX:filter', {
  data: { selection: [['2001-03'], undefined] },
});

chart.emit('scrollbarY:filter', {
  data: { selection: [undefined, [50, 550]] },
});
```

### 监听数据

```js
chart.on('scrollbarX:filter', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('scrollbarX:filter', data.selection);
});

chart.on('scrollbarY:filter', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('scrollbarY:filter', data.selection);
});
```
