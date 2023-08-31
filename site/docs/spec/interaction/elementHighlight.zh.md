---
title: elementHighlight
---

高亮鼠标悬浮的元素。

## 开始使用

<img alt="example" src="https://gw.alipayobjects.com/zos/raptor/1670296745624/element-highlight.gif" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .axis('y', { labelFormatter: '.0%' })
  .state('active', { fill: 'orange' })
  .state('inactive', { opacity: 0.5 });

chart.interaction('elementHighlight', true);

chart.render();
```

## 选项

| 属性                      | 描述           | 类型         | 默认值 |
| ------------------------- | -------------- | ------------ | ------ |
| background                | 是否高亮背景   | `boolean`    | false  |
| offset                    | 主方向的偏移量 | `number`     | 0      |
| `background${StyleAttrs}` | 背景的样式     | `StyleAttrs` | -      |

## 案例

### 触发事件

```js
chart.emit('element:highlight', {
  data: { data: { population: 5038433 } },
});

chart.emit('element:unhighlight', {});
```

### 获得数据

```js
chart.on('element:highlight', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('element:highlight', data);
});

chart.on('element:unhighlight', (event) => {
  const { nativeEvent } = event;
  if (nativeEvent) console.log('reset');
});
```
