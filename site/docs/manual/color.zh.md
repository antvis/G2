---
title: 颜色
order: 6
---

颜色在可视化中起着非常重要的作用。它可以帮助我们更好地理解数据、突出显示关键信息、增强视觉吸引力和提高可读性。在可视化中颜色通常具有以下作用：

- **区分数据类别**：区分不同的数据类别。例如，在柱状图中，我们可以使用不同的颜色表示不同的产品类别，以便更容易地识别和比较它们。
- **表示数据的数量**：表示数据的数量。例如，在热力图中，我们可以使用颜色的深浅来表示数据的大小，深色表示较大的值，浅色表示较小的值。
- **突出显示关键信息**：突出显示关键信息。例如，在折线图中，我们可以使用鲜艳的颜色表示关注的数据点，以便更容易地找到它们。
- **增强视觉吸引力**：使可视化更具吸引力。使用鲜艳的颜色和有趣的配色方案可以让可视化更加生动和有趣。
- **提高可读性**：提高可视化的可读性。例如，在地图上，我们可以使用不同的颜色表示不同的地理区域，以便更容易地识别和理解它们。

在 G2 中，你可以使用以下方式来设置颜色：

## 通过样式设置

通过 `mark.style` 来设置颜色，可以设置单个图形元素的颜色，也可以设置整个图表的颜色。

<img alt="color style" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cqBPTZIjPEgAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```js
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
```

## 通过比例尺设置

**设置比例尺的值域**

<img alt="color scale range" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*8WJ6TYRCuksAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```js
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
```

**设置比例尺的色板**

<img alt="color scale palette" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TP9-R48U2EIAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```js
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
```

> 支持的色板: [palette](/api/palette)

**设置连续的颜色值**

<img alt="color scale palette" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*3stcRor0juEAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```js
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
  .scale('color', {
    palette: 'rainbow',
  });
```
