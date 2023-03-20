---
title: 数据标签
order: 10
---

数据标签也是给图表添加标注的手段。在 G2 中调用 `mark.label` 可以给标记产生的每个图形元素都添加数据标签。

## 多个标签

每个标记可以有多个数据标签。

<img alt="label" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*VHwCRK8P2I0AAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart
  .interval()
  .data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold')
  // 声明第一个 label
  .label({
    text: 'genre', // 指定绑定的字段
    style: {
      dy: -15, // 指定样式
    },
  })
  // 声明第二个 label
  .label({
    text: 'sold', // 指定绑定的字段
    style: {
      fill: '#fff', // 指定样式
      dy: 5,
    },
  });
```

## 选择器

对于一个图形对应多个数据项的标记来说，我们可以通过 `selector` 去选择需要保留的标记。目前支持的值如下：

- **first** - 第一个
- **last** - 最后一个
- `function` - 自定义选择器

<img alt="line" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*VavRQ5qR3i8AAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart
  .line()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/indices.json',
  })
  .transform({ type: 'normalizeY', basis: 'first', groupBy: 'color' })
  .encode('x', (d) => new Date(d.Date))
  .encode('y', 'Close')
  .encode('color', 'Symbol')
  .axis('y', { title: '↑ Change in price (%)' })
  .label({
    text: 'Symbol',
    selector: 'last', // 选择最后一个
    style: {
      fontSize: 10,
    },
  });
```

## 标签转换

当标签的展示不符合预期的时候，比如重叠、颜色不明显，我们可以使用**标签转换（Label Transform）** 来优化标签的展示。

可以发现在下面的例子中，部分红圈框出来的数据标签已经重叠了。

<img alt="label-transform-unset" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*hedISpW2ZncAAAAAAAAAAAAADmJ7AQ/original" width=640>

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart
  .line()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
  })
  .transform({ type: 'groupX', y: 'mean' })
  .encode('x', (d) => new Date(d.date).getFullYear())
  .encode('y', 'price')
  .encode('color', 'symbol')
  .label({
    text: 'price',
    style: { fontSize: 10 },
  })
  .tooltip({ channel: 'y', valueFormatter: '.1f' });

chart.render();
```

这个时候我们就可以给对应的标签设置标签转换：overlapDodgeY，用于防止标签的 y 方向重叠。

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart
  .line()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
  })
  .transform({ type: 'groupX', y: 'mean' })
  .encode('x', (d) => new Date(d.date).getFullYear())
  .encode('y', 'price')
  .encode('color', 'symbol')
  .label({
    text: 'price',
    transform: [{ type: 'overlapDodgeY' }], // 指定 labelTransform
    style: {
      fontSize: 10,
    },
  })
  .tooltip({ channel: 'y', valueFormatter: '.1f' });

chart.render();
```

最后效果如下：

<img alt="label-transform-unset" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*XCr1Q48tMmwAAAAAAAAAAAAADmJ7AQ/original" width=640>
