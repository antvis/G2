---
title: '常见问题 FAQ'
order: 7
---

## 手动设置 Padding 后标题无法渲染

**问题描述**

在使用 AntV G2 绘制图表时，手动设置 `padding` 可能会导致图表标题无法正常显示或完全消失。

相关问题：[设置完 title 不显示](https://github.com/antvis/G2/issues/6549)

**原因分析**

G2 默认会动态计算所有组件所需的间距，但一旦指定了固定的 `padding` 值，这个自动调整的逻辑就会被跳过，可能导致组件显示不完整。

**解决方案**

有两种方式可以解决这个问题：

1. **使用默认布局（推荐）**

让 G2 自动计算最佳间距，确保所有组件正常显示：

```javascript
chart
  .interval()
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'type');
```

2. 正确设置 Padding

如果确实需要手动设置 `padding`，请确保为动态生成的组件预留足够空间：

```javascript
chart
  .padding(50)
  .interval()
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'type');
```

**注意事项**

- 手动设置 `padding` 时，建议通过调试确定合适的数值
- 需要考虑标题、图例等组件的空间需求
- 在不需要特定布局时，优先使用 G2 的自动布局功能

## 怎么配置堆叠面积图的描边为不同的颜色

**问题描述**

在绘制堆叠面积图、多折线图的时候，需要配置图表的样式，但是在 style 里直接指定描边颜色或者描边透明度等样式的时候，所有的区域或者面积都会应用，怎么区分不同分类的样式。

**解决方案**

在配置标记的样式 style 时，不仅支持 `string`、`number` 等直接配置，还支持类似于 `string | (datum, index, data, column) => string` 的回调函数，我们可以根据回调函数里的参数去自定义不同筛选条件下的特殊样式。注意，这里的 `datum`是标记对应的数据项，取决于标记的特性[图形模板](https://g2.antv.antgroup.com/manual/core/mark/overview#图形模版)，每个图形对应一个或者多个数据项（Data Item）。比如散点图每个图形都对应一个数据项，而面积图一个图形对应多个数据项，`datum`里也会返回多条数据。

**示例**

- 描边颜色变化的堆叠面积图

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'area',
    data: [
      { country: 'Asia', year: '1750', value: 502 },
      { country: 'Asia', year: '1800', value: 635 },
      { country: 'Asia', year: '1850', value: 809 },
      { country: 'Asia', year: '1900', value: 947 },
      { country: 'Asia', year: '1950', value: 1402 },
      { country: 'Asia', year: '1999', value: 3634 },
      { country: 'Asia', year: '2050', value: 5268 },
      { country: 'Africa', year: '1750', value: 106 },
      { country: 'Africa', year: '1800', value: 107 },
      { country: 'Africa', year: '1850', value: 111 },
      { country: 'Africa', year: '1900', value: 133 },
      { country: 'Africa', year: '1950', value: 221 },
      { country: 'Africa', year: '1999', value: 767 },
      { country: 'Africa', year: '2050', value: 1766 },
      { country: 'Europe', year: '1750', value: 163 },
      { country: 'Europe', year: '1800', value: 203 },
      { country: 'Europe', year: '1850', value: 276 },
      { country: 'Europe', year: '1900', value: 408 },
      { country: 'Europe', year: '1950', value: 547 },
      { country: 'Europe', year: '1999', value: 729 },
      { country: 'Europe', year: '2050', value: 628 },
    ],
    encode: {
      x: 'year',
      y: 'value',
      color: 'country',
    },
    transform: [{ type: 'stackY' }],
    style: {
      fillOpacity: 0.3,
      lineWidth: (datum, index, data, column) =>
        datum[0].country === 'Asia' ? 2 : 0, // area标记默认的描边宽度为0，要显示描边需要显式传入lineWidth
      stroke: (datum, index, data, column) =>
        datum[0].country === 'Asia' ? 'red' : null,
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

- 区分样式的多折线图

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'line',
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/c48dbbb1-fccf-4a46-b68f-a3ddb4908b68.json',
    },
    encode: {
      x: 'date',
      y: 'value',
      color: 'type',
    },
    axis: {
      y: {
        labelFormatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    scale: { color: { range: ['#30BF78', '#F4664A', '#FAAD14'] } }, // 自定义color通道的颜色值域
    style: {
      lineDash: (datum, index, data, column) => {
        if (datum[0].type === 'register') return [4, 4];
      },
      lineWidth: (datum, index, data, column) => {
        if (datum[0].type !== 'register') return 2;
      },
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

- 多形状散点图

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'point',
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/bd73a175-4417-4749-8b88-bc04d955e899.csv',
    },
    encode: {
      x: 'x',
      y: 'y',
      shape: 'category',
      color: 'category',
      size: () => 1,
    },
    legend: {
      size: false,
    },
    scale: {
      shape: { range: ['circle', 'plus', 'diamond'] },
      size: { rangeMin: 5 }, // 设置size通道的比例尺的最小值域为5
    }, // 定义shape通道的形状值域
    transform: [{ type: 'groupX', size: 'sum' }], // 对离散的 x 通道进行分组，并且进行求和后映射到size通道
    style: {
      fillOpacity: (datum, index, data, column) =>
        datum.category !== 'setosa' ? 0.8 : 0,
      stroke: (datum, index, data, column) => {
        if (datum.category !== 'setosa') {
          return '#FADC7C';
        }
      },
      lineWidth: (datum, index, data, column) =>
        datum.category !== 'setosa' ? 1 : 2,
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

## 提示信息 Tooltip 展示信息较多，移动鼠标后 Tooltip 不会消失

**问题描述**

业务场景中 tooltip 需要展示非常多的信息，所以配置了 `enterable: true`，在移入鼠标的时候支持滚动条滚动，但是在移动鼠标的时候，tooltip 有时不会正常关闭，对图表造成遮挡和卡顿效果。

**原因分析及解决方案**

- 遮挡问题

G2 内部算法会尝试将 tooltip 限制在图表内部，但如果图表高度太小，就算自动计算 tooltip 位置，依然会溢出图表。

- 卡死问题

图表区域太小，从 tooltip 内部直接移动到了图表外部，tooltip 消失事件是绑定在图表上的，直接从 tooltip 移动到外部不会触发。

- 解决方案

两个问题都是因为图表区域太小，tooltip 面积占比太大（大于一半），建议减少 tooltip 面积（已有滚动条）或增大图表面积。

## 怎么避免图形标记超出刻度最大值或最小值

```js | ob {pin: false}
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view',
    autoFit: true,
    data: [
      { year: '1991', value: 15468 },
      { year: '1992', value: 16100 },
      { year: '1993', value: 15900 },
      { year: '1994', value: 17409 },
      { year: '1995', value: 17000 },
      { year: '1996', value: 31056 },
      { year: '1997', value: 31982 },
      { year: '1998', value: 32040 },
      { year: '1999', value: 33233 },
    ],
    children: [
      {
        type: 'area',
        encode: { x: (d) => d.year, y: 'value', shape: 'area' },
        style: { opacity: 0.2 },
        axis: { y: { labelFormatter: '~s', title: false } },
      },
      { type: 'line', encode: { x: 'year', y: 'value', shape: 'line' } },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

**解决方案**

配置需要调整的比例尺的 `nice` 属性为 true ，扩展 domain 范围，让输出的 tick 展示得更加友好。

```js
({
  scale: {
    y: {
      nice: true,
    },
  },
});
```

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view',
    autoFit: true,
    data: [
      { year: '1991', value: 15468 },
      { year: '1992', value: 16100 },
      { year: '1993', value: 15900 },
      { year: '1994', value: 17409 },
      { year: '1995', value: 17000 },
      { year: '1996', value: 31056 },
      { year: '1997', value: 31982 },
      { year: '1998', value: 32040 },
      { year: '1999', value: 33233 },
    ],
    scale: {
      y: {
        nice: true, // 扩展y通道的比例尺的domain 范围，让输出的 tick 展示得更加友好
      },
    },
    children: [
      {
        type: 'area',
        encode: { x: (d) => d.year, y: 'value', shape: 'area' },
        style: { opacity: 0.2 },
        axis: { y: { labelFormatter: '~s', title: false } },
      },
      { type: 'line', encode: { x: 'year', y: 'value', shape: 'line' } },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

## 怎么反转图表的 y 轴，使得从上到下对应的值从小到大

**问题描述**

业务场景中可能需要 y 轴值域和正常的坐标轴显示相反，使得从上到下对应的值从小到大，换句话说，对应 y 通道值更小的应该出现在图表的更上方，适用于某些数字越小代表权重越大的场景，例如名次等。

**解决方案**

- 调整 y 通道比例尺的值域，默认为`[1,0]`，如果需要反转，则调整为`[0,1]`。为了显示更美观，同时也可以对应地调整 x 轴的位置。

以下是一个自上而下的柱状图的例子，当需要绘制自右向左的条形图时同理。（此处要注意条形图是坐标轴转置后的柱状图，左右对应的是 x 轴）

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    autoFit: true,
    data: [
      { letter: 'A', frequency: 0.08167 },
      { letter: 'B', frequency: 0.01492 },
      { letter: 'C', frequency: 0.02782 },
      { letter: 'D', frequency: 0.04253 },
      { letter: 'E', frequency: 0.12702 },
    ],
    encode: { x: 'letter', y: 'frequency' },
    scale: { y: { range: [0, 1] } },
    axis: { x: { position: 'top' } },
  });

  chart.render();

  return chart.getContainer();
})();
```

- 对于有些标记，例如面积图，当我们使用上面的方式反转后，面积图的填充部分也会到图表上半区域，在某些业务场景下是不符合预期的，例如排名趋势图，此时需要结合 `encode.y`、`axis.y.labelFormatter`等属性做更定制化的处理。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view',
    autoFit: true,
    paddingRight: 10,
    data: [
      { month: '一月', rank: 200 },
      { month: '二月', rank: 160 },
      { month: '三月', rank: 100 },
      { month: '四月', rank: 80 },
      { month: '五月', rank: 99 },
      { month: '六月', rank: 36 },
      { month: '七月', rank: 40 },
      { month: '八月', rank: 20 },
      { month: '九月', rank: 12 },
      { month: '十月', rank: 15 },
      { month: '十一月', rank: 6 },
      { month: '十二月', rank: 1 },
    ],
    scale: {
      y: {
        nice: true,
        tickMethod: () => [0, 50, 100, 170, 199],
      },
    },
    axis: {
      y: {
        labelFormatter: (d) => `第${200 - d}名`,
      },
    },
    children: [
      {
        type: 'area',
        encode: { x: (d) => d.month, y: (d) => 200 - d.rank, shape: 'smooth' },
        style: { opacity: 0.2 },
        axis: { y: { labelFormatter: '~s', title: false } },
        style: {
          fill: 'l(270) 0:#ffffff 0.9:#7ec2f3 1:#1890ff',
          fillOpacity: 0.2,
        },
        tooltip: false,
      },
      {
        type: 'line',
        encode: { x: (d) => d.month, y: (d) => 200 - d.rank, shape: 'smooth' },
        interaction: {
          tooltip: {
            render: (event, { title, items }) => `
<div style="display: flex; align-items: center;">
  <span>${title}：第</span>
  <h2
    style="
        margin-left: 8px; 
        margin-right: 8px; 
        margin-top:4px;
        font-size: 18px; 
        line-height: 36px; 
        font-weight: 500px"
  >
    ${200 - items[0].value}
  </h2>
  <span>名</span>
</div>
          `,
          },
        },
        style: {
          lineWidth: 2,
        },
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```
