---
title: spaceFlex
order: 2
---

使用类似 css flex 的布局方式来划分空间区域，常用于多图表对比的视图。

## 开始使用

提供一个两层 flex 容器布局的画布。

<img alt="spaceFlex" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*lLecQJkdPbIAAAAAAAAAAAAADmJ7AQ" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 900,
});

const flex = chart
  .spaceFlex()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  })
  .attr('direction', 'col')
  .attr('ratio', [1, 2]);

flex
  .interval()
  .attr('paddingBottom', 0)
  .attr('paddingRight', 300)
  .transform({ type: 'groupX', y: 'max' })
  .axis('x', false)
  .encode('x', (d) => new Date(d.date).getUTCDate())
  .encode('y', 'temp_max')
  .encode('color', 'steelblue');

flex
  .spaceFlex()
  .attr('ratio', [2, 1])
  .call((node) =>
    node
      .cell()
      .attr('paddingRight', 0)
      .attr('paddingBottom', 50)
      .transform({ type: 'group', color: 'max' })
      .encode('x', (d) => new Date(d.date).getUTCDate())
      .encode('y', (d) => new Date(d.date).getUTCMonth())
      .encode('color', 'temp_max')
      .style('inset', 0.5)
      .axis('x', { title: 'Date' })
      .axis('y', { title: 'Month' })
      .legend({ color: false })
      .scale('color', {
        type: 'sequential',
        palette: 'gnBu',
      }),
  )
  .call((node) =>
    node
      .interval()
      .attr('paddingBottom', 50)
      .transform({ type: 'groupX', y: 'max' })
      .coordinate({ transform: [{ type: 'transpose' }] });
      .axis('x', false)
      .encode('x', (d) => new Date(d.date).getUTCMonth())
      .encode('y', 'temp_max')
      .encode('color', 'steelblue'),
  );

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

当前 flex 主要提供了最核心的两个配置，便于空间分片。

| 属性      | 描述                                   | 类型           | 默认值 |
| --------- | -------------------------------------- | -------------- | ------ |
| ratio     | 设置 flex 容器中的子元素占用空间的比例 | `number[]`     | 均分   |
| direction | 设置 flex 划分空间的方向               | `col` \| `row` | `row`  |
| data      | flex 容器的数据                        | `Data`         |        |

`spaceFlex` 对应的配置都可以使用 API 进行设置，例如：

```ts
chart.spaceFlex().attr('ratio', [1, 2, 3]).attr('direction', 'col');
```

## FAQ

- 怎么使用 spaceFlex 定义复杂的图表布局？

spaceFlex 提供了按照比例横向纵向划分空间，对于复杂的布局，理论上都可以通过不断拆分容器层级结构实现。
