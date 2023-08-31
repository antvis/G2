---
title: brushFilter
---

框选筛选元素。

## 开始使用

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*indVQalzZEQAAAAAAAAAAAAADmJ7AQ/original" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .point()
  .data({
    type: 'fetch',
    value: 'data/penguins.csv',
  })
  .encode('x', 'culmen_length_mm')
  .encode('y', 'culmen_depth_mm')
  .encode('color', 'species')
  .state('inactive', { stroke: 'gray' });

chart.interaction('brushFilter', true);

chart.render();
```

## 选项

| 属性                | 描述           | 类型                           | 默认值 |
| ------------------- | -------------- | ------------------------------ | ------ |
| reverse             | brush 是否反转 | `boolean`                      | false  |
| `mask${StyleAttrs}` | brush 的样式   | `number             \| string` | -      |

## 案例

获得当前筛选数据，会在每次筛选和重置的时候触发以下事件：

```js
chart.on('brush:filter', (event) => {
  const { selection } = event.data;
  const [domainX, domainY] = selection;
  const [minX, maxX] = domainX;
  const [minY, maxY] = domainY;
  console.log(minX, maxX, minY, maxY);
});
```
