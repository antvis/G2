---
title: legendHighlight
order: 18
---

## 开始使用

`legendHighlight` 交互的对象是图表组件 legend 。

- 触发：鼠标悬停在图例项。
- 结束：鼠标离开图例项。
- 影响状态：

框选范围的元素变为 `active` 状态。

框选范围以外的元素变为 `inactive` 状态。

交互内置状态：

```js
({
  // 定义 inactive 状态下的元素透明度为0.5

  state: { inactive: { opacity: 0.5 } },
});
```

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

## 使用方式

传入 `boolean` 设置是否开启交互。

```js
({
  type: 'interval',

  interaction: { legendHighlight: true }, // 采用默认配置
});
```

## 配置层级

图例高亮交互可以配置在 View 层级：

```js
chart.interaction('legendHighlight', true);
```

## 配置项

当前版本的 LegendHighlgiht 交互无可配置参数。

需要设置 state 的 inactive 状态，可以参照[元素状态 state](https://g6.antv.antgroup.com/manual/element/state)

### legend 组件配置

具体文档看[图例 legend](http://https://g2.antv.antgroup.com/manual/component/legend)

## 事件

### 获得数据

- legend:highlight - 当鼠标悬停在图例项上触发
- legend:unhighlight - 当鼠标离开图例时触发

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

- legend:highlight - 高亮对应于图例值的数据
- legend:unhighlight - 取消高亮状态

```js
chart.emit('legend:highlight', {
  data: { channel: 'color', value: 'Increase' },
});

chart.emit('legend:unhighlight', {});
```

## 示例

下面的示例展示了一个`legendHighlight`的基本交互功能。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  height: 300,
  data: [
    { name: 'London', month: 'Jan.', value: 18.9 },
    { name: 'London', month: 'Feb.', value: 28.8 },
    { name: 'London', month: 'Mar.', value: 39.3 },
    { name: 'London', month: 'Apr.', value: 81.4 },
    { name: 'London', month: 'May', value: 47 },
    { name: 'London', month: 'Jun.', value: 20.3 },
    { name: 'London', month: 'Jul.', value: 24 },
    { name: 'London', month: 'Aug.', value: 35.6 },
    { name: 'Berlin', month: 'Jan.', value: 12.4 },
    { name: 'Berlin', month: 'Feb.', value: 23.2 },
    { name: 'Berlin', month: 'Mar.', value: 34.5 },
    { name: 'Berlin', month: 'Apr.', value: 99.7 },
    { name: 'Berlin', month: 'May', value: 52.6 },
    { name: 'Berlin', month: 'Jun.', value: 35.5 },
    { name: 'Berlin', month: 'Jul.', value: 37.4 },
    { name: 'Berlin', month: 'Aug.', value: 42.4 },
  ],
  encode: {
    x: 'month',
    y: 'value',
    color: 'name',
  },
  transform: [
    {
      type: 'dodgeX',
      groupBy: 'x',
      orderBy: 'value',
      padding: 0.1,
    },
  ],
  interaction: {
    legendHighlight: {
      series: true,
    },
  },
  state: { inactive: { opacity: 0.5 } },
});

chart.render();
```
