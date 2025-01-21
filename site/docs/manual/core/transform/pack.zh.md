---
title: pack
order: 1
---

让元素在空间中紧凑排列，常常有用于单元可视化。

## 开始使用

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*jgf0Ro2YZTsAAAAAAAAAAAAADmJ7AQ/original" width=640 />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const facetRect = chart
  .facetRect()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/titanic.json',
    transform: [
      {
        type: 'sortBy',
        fields: ['survived'],
      },
      {
        type: 'map',
        callback: ({ survived, ...d }) => ({
          ...d,
          survived: survived + '',
        }),
      },
    ],
  })
  .encode('x', 'pclass');

facetRect
  .point()
  .transform({ type: 'pack' }) // 指定 pack transform
  .legend('color', { labelFormatter: (d) => (d === '1' ? 'Yes' : 'No') })
  .encode('color', 'survived')
  .encode('shape', 'point')
  .encode('size', 3)
  .tooltip({
    title: '',
    items: ['pclass', 'survived'],
  });

chart.render();
```

## 选项

| 属性               | 描述                                           | 类型                 | 默认值                 |
|-------------------|------------------------------------------------|---------------------|-----------------------|
| padding           | 每个元素之间的间距，单位为px                           | `number`            | `0`                   |  
| direction         | 元素的堆叠方向                                    | `'row' \| 'col'`      | `col`         |