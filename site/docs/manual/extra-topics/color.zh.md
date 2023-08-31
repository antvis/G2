---
title: 颜色映射
order: 6
---

颜色在可视化中起着非常重要的作用。它可以帮助我们更好地理解数据、突出显示关键信息、增强视觉吸引力和提高可读性。在可视化中颜色通常具有以下作用：

- **区分数据类别**：区分不同的数据类别。例如，在柱状图中，我们可以使用不同的颜色表示不同的产品类别，以便更容易地识别和比较它们。
- **表示数据的数量**：表示数据的数量。例如，在热力图中，我们可以使用颜色的深浅来表示数据的大小，深色表示较大的值，浅色表示较小的值。
- **突出显示关键信息**：突出显示关键信息。例如，在折线图中，我们可以使用鲜艳的颜色表示关注的数据点，以便更容易地找到它们。
- **增强视觉吸引力**：使可视化更具吸引力。使用鲜艳的颜色和有趣的配色方案可以让可视化更加生动和有趣。
- **提高可读性**：提高可视化的可读性。例如，在地图上，我们可以使用不同的颜色表示不同的地理区域，以便更容易地识别和理解它们。

设置数据无关的颜色，通过 `mark.style(fill, color)` 或者 `mark.style(stroke, color)` 即可，如果希望设置数据驱动的颜色，可以使用以下方式来设置颜色：

- 编码：`mark.encode`
- 样式：`mark.style`

## 编码

通过 `mark.encode` 去设置数据驱动的颜色是最常见的方式，同时通过颜色比例尺去配置最后的视觉展示。

- `scale.identity`：恒等映射
- `scale.range`：自定义色板
- `scale.palette`：内置的色板
- `scale.relations`：自定义映射关系

### Identity

当设置颜色比例尺为恒等比例尺（Identity）的时候，color 通道的数据会被作为视觉数据绘制到最后的可视化中，但是不会去生成比例尺。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275, color: 'red' },
      { genre: 'Strategy', sold: 115, color: 'blue' },
      { genre: 'Action', sold: 120, color: 'green' },
      { genre: 'Shooter', sold: 350, color: 'red' },
      { genre: 'Other', sold: 150, color: 'black' },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'color')
    .scale('color', { type: 'identity' }); // 设置该比例尺为恒等映射

  chart.render();

  return chart.getContainer();
})();
```

### Range

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .encode('color', 'letter')
    .axis('y', { labelFormatter: '.0%' })
    .scale('color', {
      type: 'ordinal',
      range: ['#7593ed', '#95e3b0', '#6c7893', '#e7c450', '#7460eb'],
    });

  chart.render();

  return chart.getContainer();
})();
```

### Palette

G2 中可以通过设置 `scale.palette` 去指定色板。这个色板可以是离散的：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .encode('color', 'letter')
    .axis('y', { labelFormatter: '.0%' })
    .scale('color', { palette: 'tableau10' });

  chart.render();

  return chart.getContainer();
})();
```

同时也可以是连续的：

```js | ob
(() => {
  const chart = new G2.Chart({
    
    height: 320,
  });

  chart
    .cell()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
    })
    .transform({ type: 'group', color: 'max' })
    .encode('x', (d) => new Date(d.date).getUTCDate())
    .encode('y', (d) => new Date(d.date).getUTCMonth())
    .encode('color', 'temp_max')
    .scale('color', { palette: 'rainbow' });

  chart.render();

  return chart.getContainer();
})();
```

目前内置的色板可以参考这个 [palette 文档](/spec/palette)。

### Relations

可以通过 `scale.relations` 去指定一系列映射规则，这个优先级别会高于 domain 到 range 的默认映射方式。比如对于 color 通道来讲，如果希望特定的值映射为特定的颜色，或者处理异常值，这个配置会很有用。

```js
chart.interval().scale('color', {
  relations: [
    ['dog', 'red'], // dog 恒等映射为红色
    [(d) => d === undefined, 'grey'], // 如果是值为 undefined，那么为灰色
  ],
});
```

## 样式

通过 `mark.style` 来设置颜色，这里设置的颜色比 `encode.color` 的优先级更高，同时不会生成图例。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .style('fill', (datum, index, data) => {
      const { frequency } = datum;
      if (frequency > 0.1) return '#3376cd';
      if (frequency > 0.05) return '#f4bb51';
      return '#b43a29';
    });

  chart.render();

  return chart.getContainer();
})();
```
