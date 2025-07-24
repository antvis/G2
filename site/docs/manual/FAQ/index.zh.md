---
title: '常见问题 FAQ'
order: 7
---

## 手动设置 Padding 后标题无法渲染

**问题描述**

在使用 AntV G2 绘制图表时，手动设置 `padding` 可能会导致图表标题或者其他图表组件无法正常显示或完全消失。

相关问题：[设置完 title 不显示](https://github.com/antvis/G2/issues/6549)

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  padding: 20,
  title: {
    align: 'center',
    title: 'This is a chart title.',
    subtitle: 'Displayed are sampled values.',
  },
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
  },
});

chart.render();
```

**原因分析**

G2 默认会动态计算所有组件所需的间距，但一旦指定了固定的 `padding` 值，这个自动调整的逻辑就会被跳过，可能导致组件显示不完整。

**解决方案**

有两种方式可以解决这个问题：

1. **使用默认布局（推荐）**

不手动设置 `padding`，让 G2 自动计算最佳间距，确保所有组件正常显示：

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  title: {
    align: 'center',
    title: 'This is a chart title.',
    subtitle: 'Displayed are sampled values.',
  },
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
  },
});

chart.render();
```

2. 正确设置 Padding

如果确实需要手动设置 `padding`，请确保为动态生成的组件预留足够空间：

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  paddingTop: 100,
  title: {
    align: 'center',
    title: 'This is a chart title.',
    subtitle: 'Displayed are sampled values.',
  },
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
  },
});

chart.render();
```

也可以在创建 `Chart` 实例的时候传入 `paddingTop`，效果完全一样。

```javascript
const chart = new Chart({
  container: 'container',
  paddingTop: 100,
});
```

**注意事项**

- 手动设置 `padding` 时，建议通过调试确定合适的数值
- 需要考虑标题、图例等组件的空间需求
- 在不需要特定布局时，优先使用 G2 的自动布局功能

查看[图表布局](/manual/core/chart/chart-component#图表布局)的详细文档。

## 怎么配置堆叠面积图的描边为不同的颜色

**问题描述**

在绘制堆叠面积图、多折线图的时候，需要配置图表的样式，但是在 style 里直接指定描边颜色或者描边透明度等样式的时候，所有的区域或者面积都会应用，怎么区分不同分类的样式。

**解决方案**

在配置标记的样式 style 时，不仅支持 `string`、`number` 等直接配置，还支持类似于 `string | (datum, index, data, column) => string` 的回调函数，我们可以根据回调函数里的参数去自定义不同筛选条件下的特殊样式。注意，这里的 `datum`是标记对应的数据项，取决于标记的特性[图形模板](https://g2.antv.antgroup.com/manual/core/mark/overview#图形模版)，每个图形对应一个或者多个数据项（Data Item）。比如散点图每个图形都对应一个数据项，而面积图一个图形对应多个数据项，`datum`里也会返回多条数据。

**示例**

- 描边颜色变化的堆叠面积图

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

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
```

- 区分样式的多折线图

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

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
```

- 多形状散点图

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

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

```js | ob { pin: false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

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

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

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
```

## 怎么反转图表的 y 轴，使得从上到下对应的值从小到大

**问题描述**

业务场景中可能需要 y 轴值域和正常的坐标轴显示相反，使得从上到下对应的值从小到大，换句话说，对应 y 通道值更小的应该出现在图表的更上方，适用于某些数字越小代表权重越大的场景，例如名次等。

**解决方案**

- 调整 y 通道比例尺的值域，默认为`[1,0]`，如果需要反转，则调整为`[0,1]`。为了显示更美观，同时也可以对应地调整 x 轴的位置。

以下是一个自上而下的柱状图的例子，当需要绘制自右向左的条形图时同理。（此处要注意条形图是坐标轴转置后的柱状图，左右对应的是 x 轴）

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

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
```

- 对于有些标记，例如面积图，当我们使用上面的方式反转后，面积图的填充部分也会到图表上半区域，在某些业务场景下是不符合预期的，例如排名趋势图，此时需要结合 `encode.y`、`axis.y.labelFormatter`等属性做更定制化的处理。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

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
```

## 如何调整折线图两端的间隔

下面是一个简单的折线图，可以看出 x 轴有明显的 `paddingOuter`，默认值为 `0.5`。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  viewStyle: {
    contentFill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
  },
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  labels: [{ text: 'value', style: { dx: -10, dy: -12 } }],
  encode: { x: 'year', y: 'value' },
  scale: { y: { domainMin: 0, nice: true } },
});

chart.render();
```

point 比例尺是 bandWidth 恒为 0 的 band 比例尺，内部固定了以下属性：

```js
padding: 0.5, // 内部赋值
paddingInner: 1, // 不可修改
paddingOuter: 0.5 // // 内部赋值
```

如果想自定义 `paddingOuter` 的值，可以通过修改 `padding` 实现。例如：

```js
(scale: {
  x: {
    type: 'point',
    padding: 0, // 只会对 paddingOuter 生效，paddingInner 恒为 1
  },
});
```

通过配置，可以使得折线图两端的间隔为 `0` 。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  viewStyle: {
    contentFill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
  },
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  labels: [{ text: 'value', style: { dx: -10, dy: -12 } }],
  encode: { x: 'year', y: 'value' },
  scale: {
    y: { domainMin: 0, nice: true },
    x: {
      padding: 0,
    },
  },
});

chart.render();
```

## 首次渲染图表时默认只显示部分图例

目前暂时还没有内置 API，需要通过手动触发一下 legendFilter 来实现。

```js | ob { inject: true }
import { Chart, ChartEvent } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 100 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
});

chart.render();

chart.on(ChartEvent.AFTER_RENDER, () => {
  chart.emit('legend:filter', {
    data: { channel: 'color', values: ['Sports', 'Strategy', 'Action'] },
  });
});
```

可以通过设置 `animate: false` 避免触发更新动画，但还是会有闪动，后续会通过配置项在内部处理，实现更好的筛选效果。

## 怎么判断鼠标有没有移出图表容器

**问题描述**

在某些交互场景中，需要监听鼠标是否移出了图表容器的边界，以便执行相应的业务逻辑，比如隐藏提示框、重置高亮状态等。

**解决方案**

可以通过监听图表容器的 DOM 事件来判断鼠标的进入和离开状态。

```js | ob { inject: true }
import { Chart, ChartEvent } from '@antv/g2';

const chart = new Chart({ container: 'container', autoFit: true });

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 100 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  viewStyle: {
    viewFill: 'blue',
    viewFillOpacity: 0.3,
  },
});

chart.render();

let containerMouseEntered = false;

chart.on('afterrender', () => {
  // 获取图表容器DOM元素
  const container = chart.getContainer();

  // 创建状态显示面板
  const statusPanel = document.createElement('div');
  statusPanel.id = 'mouse-status-panel';
  statusPanel.style.cssText = `
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px;
    border-radius: 6px;
    font-family: monospace;
    font-size: 12px;
    line-height: 1.4;
    z-index: 1000;
    min-width: 220px;
  `;

  // 更新状态显示
  const updateStatus = (isInside, eventInfo = {}) => {
    const status = isInside ? '✅ 鼠标在容器内' : '❌ 鼠标在容器外';
    const containerRect = container.getBoundingClientRect();

    statusPanel.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 8px;">${status}</div>
      <div>容器尺寸: ${container.offsetWidth} × ${container.offsetHeight}</div>
      <div>容器位置: (${Math.round(containerRect.left)}, ${Math.round(
      containerRect.top,
    )})</div>
      ${
        eventInfo.clientX !== undefined
          ? `<div>鼠标坐标: (${eventInfo.clientX}, ${eventInfo.clientY})</div>`
          : ''
      }
      ${eventInfo.type ? `<div>事件类型: ${eventInfo.type}</div>` : ''}
      <div style="margin-top: 8px; font-size: 11px; opacity: 0.8;">
        移动鼠标到图表上试试看！
      </div>
    `;
  };

  if (container) {
    // 将状态面板添加到容器的父元素
    container.parentElement.style.position = 'relative';
    container.parentElement.appendChild(statusPanel);

    // 初始化显示
    updateStatus(false);

    // 监听鼠标进入容器
    container.addEventListener('mouseenter', (e) => {
      containerMouseEntered = true;
      updateStatus(true, {
        type: e.type,
        clientX: e.clientX,
        clientY: e.clientY,
      });
    });

    // 监听鼠标在容器内移动
    container.addEventListener('mousemove', (e) => {
      if (containerMouseEntered) {
        updateStatus(true, {
          type: e.type,
          clientX: e.clientX,
          clientY: e.clientY,
        });
      }
    });

    // 监听鼠标离开容器
    container.addEventListener('mouseleave', (e) => {
      if (containerMouseEntered) {
        containerMouseEntered = false;
        updateStatus(false, {
          type: e.type,
          clientX: e.clientX,
          clientY: e.clientY,
        });
      }
    });
  }
});
```

**完整示例**

下面是一个完整的示例，展示了如何通过事件触发控制 tooltip 的显示和隐藏，当点击 element 的时候显示 tooltip，当点击空白区域或者当鼠标离开容器时手动触发 tooltip 隐藏事件。

```js | ob { inject: true }
import { Chart, ChartEvent } from '@antv/g2';

const chart = new Chart({ container: 'container', autoFit: true });

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 100 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  viewStyle: {
    viewFill: 'blue',
    viewFillOpacity: 0.3,
  },
  interaction: {
    tooltip: {
      disableNative: true, // Disable pointerover and pointerout events.
    },
  },
});

chart.render();

let containerMouseEntered = false;

chart.on('afterrender', () => {
  // 获取图表容器DOM元素
  const container = chart.getContainer();

  if (container) {
    // 监听鼠标进入容器
    container.addEventListener('mouseenter', (e) => {
      containerMouseEntered = true;
    });

    // 监听鼠标离开容器
    container.addEventListener('mouseleave', (e) => {
      if (containerMouseEntered) {
        containerMouseEntered = false;
        chart.emit('tooltip:hide');
      }
    });
  }
});

chart.on('element:click', ({ data }) => chart.emit('tooltip:show', { data }));
chart.on('plot:click', () => chart.emit('tooltip:hide'));
```

## 怎么调整图例组件整体的大小和布局

**问题描述**

在使用 G2 绘制图表时，默认的图例位置和大小可能无法满足业务需求，需要对图例的位置、对齐方式、尺寸以及与图表的间距进行精确控制。

**解决方案**

G2 提供了多个配置项来精确控制图例的大小和布局：

**基础位置配置**

使用 `position` 设置图例的基础位置：

```js
legend: {
  color: {
    position: 'top', // 'top' | 'right' | 'left' | 'bottom'
  }
}
```

**精确对齐配置**

使用 `layout` 配置图例的精确对齐方式，采用 Flexbox 布局模型：

```js
legend: {
  color: {
    position: 'top',
    layout: {
      justifyContent: 'center',    // 主轴对齐: 'flex-start' | 'center' | 'flex-end'
      alignItems: 'flex-start',    // 交叉轴对齐: 'flex-start' | 'center' | 'flex-end'
      flexDirection: 'row',        // 主轴方向: 'row' | 'column'
    }
  }
}
```

**尺寸控制配置**

- **size**: 控制图例在交叉轴上的尺寸（水平布局时控制高度，垂直布局时控制宽度）
- **length**: 控制图例在主轴上的尺寸（水平布局时控制宽度，垂直布局时控制高度）
- **crossPadding**: 控制图例与图表区域的距离

```js
legend: {
  color: {
    size: 80,         // 图例交叉轴尺寸
    length: 300,      // 图例主轴长度
    crossPadding: 20, // 与图表的距离
  }
}
```

**完整示例**

以下是几种常见的图例布局场景：

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 400,
  width: 600,
});
const container = chart.getContainer();

const data = [
  { genre: 'Sports', sold: 50 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

chart.options({
  type: 'interval',
  data,
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  legend: {
    color: {
      position: 'top',
      layout: {
        justifyContent: 'center', // 水平居中
        alignItems: 'flex-start',
      },
      size: 60, // 控制图例交叉轴尺寸
      length: 250, // 控制图例主轴长度
      crossPadding: 20, // 与图表的距离
    },
  },
});

// 创建布局选择器
const controlPanel = document.createElement('div');
controlPanel.style.cssText = `
  margin-bottom: 16px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

// 布局场景选择器
const sceneContainer = document.createElement('div');
sceneContainer.innerHTML = `
  <label style="display: block; margin-bottom: 8px; font-weight: bold;">
    选择布局场景:
  </label>
`;

const sceneSelect = document.createElement('select');
sceneSelect.style.cssText = 'width: 100%; padding: 4px;';
const scenes = [
  { label: '顶部居中（仪表板风格）', value: 'top-center' },
  { label: '右侧垂直居中（详细图表）', value: 'right-center' },
  { label: '底部左对齐（节省空间）', value: 'bottom-start' },
  { label: '左侧底部对齐', value: 'left-end' },
  { label: '右侧顶部对齐（紧凑）', value: 'right-start' },
];

sceneSelect.innerHTML = scenes
  .map(
    (scene, index) =>
      `<option value="${scene.value}" ${index === 0 ? 'selected' : ''}>${
        scene.label
      }</option>`,
  )
  .join('');

sceneContainer.appendChild(sceneSelect);

// 尺寸控制
const sizeContainer = document.createElement('div');
sizeContainer.innerHTML = `
  <label style="display: block; margin-bottom: 8px; font-weight: bold;">
    图例尺寸控制:
  </label>
  <div style="margin-bottom: 8px;">
    <label>crossPadding (与图表距离): </label>
    <input type="range" id="crossPadding" min="5" max="50" value="20" style="width: 100%;">
    <span id="crossPaddingValue">20</span>
  </div>
  <div style="margin-bottom: 8px;">
    <label>size (交叉轴尺寸): </label>
    <input type="range" id="size" min="40" max="200" value="60" style="width: 100%;">
    <span id="sizeValue">60</span>
  </div>
  <div>
    <label>length (主轴长度): </label>
    <input type="range" id="length" min="40" max="400" value="250" style="width: 100%;">
    <span id="lengthValue">250</span>
  </div>
`;

controlPanel.appendChild(sceneContainer);
controlPanel.appendChild(sizeContainer);

const updateChart = () => {
  const selectedScene = sceneSelect.value;
  const crossPadding = parseInt(document.getElementById('crossPadding').value);
  const size = parseInt(document.getElementById('size').value);
  const length = parseInt(document.getElementById('length').value);

  let position, justifyContent;

  switch (selectedScene) {
    case 'top-center':
      position = 'top';
      justifyContent = 'center';
      break;
    case 'right-center':
      position = 'right';
      justifyContent = 'center';
      break;
    case 'bottom-start':
      position = 'bottom';
      justifyContent = 'flex-start';
      break;
    case 'left-end':
      position = 'left';
      justifyContent = 'flex-end';
      break;
    case 'right-start':
      position = 'right';
      justifyContent = 'flex-start';
      break;
  }

  chart.options({
    legend: {
      color: {
        position,
        layout: {
          justifyContent,
          alignItems: 'flex-start',
        },
        size,
        length,
        crossPadding,
      },
    },
  });
  chart.render();
};

// 绑定事件
sceneSelect.addEventListener('change', updateChart);

document.addEventListener('DOMContentLoaded', () => {
  const crossPaddingSlider = document.getElementById('crossPadding');
  const crossPaddingValue = document.getElementById('crossPaddingValue');
  const sizeSlider = document.getElementById('size');
  const sizeValue = document.getElementById('sizeValue');
  const lengthSlider = document.getElementById('length');
  const lengthValue = document.getElementById('lengthValue');

  if (crossPaddingSlider && crossPaddingValue) {
    crossPaddingSlider.addEventListener('input', (e) => {
      crossPaddingValue.textContent = e.target.value;
      updateChart();
    });
  }

  if (sizeSlider && sizeValue) {
    sizeSlider.addEventListener('input', (e) => {
      sizeValue.textContent = e.target.value;
      updateChart();
    });
  }

  if (lengthSlider && lengthValue) {
    lengthSlider.addEventListener('input', (e) => {
      lengthValue.textContent = e.target.value;
      updateChart();
    });
  }
});

// 插入控制面板
container.insertBefore(controlPanel, container.firstChild);

// 初始渲染
chart.render();

// 确保滑块事件正确绑定
setTimeout(() => {
  const crossPaddingSlider = document.getElementById('crossPadding');
  const crossPaddingValue = document.getElementById('crossPaddingValue');
  const sizeSlider = document.getElementById('size');
  const sizeValue = document.getElementById('sizeValue');
  const lengthSlider = document.getElementById('length');
  const lengthValue = document.getElementById('lengthValue');

  if (crossPaddingSlider && crossPaddingValue) {
    crossPaddingSlider.addEventListener('input', (e) => {
      crossPaddingValue.textContent = e.target.value;
      updateChart();
    });
  }

  if (sizeSlider && sizeValue) {
    sizeSlider.addEventListener('input', (e) => {
      sizeValue.textContent = e.target.value;
      updateChart();
    });
  }

  if (lengthSlider && lengthValue) {
    lengthSlider.addEventListener('input', (e) => {
      lengthValue.textContent = e.target.value;
      updateChart();
    });
  }
}, 100);
```

查看[图例组件](/manual/component/legend)的完整文档了解更多配置选项。

## 怎么实现一个有预测数据的折线图

**问题描述**

在数据可视化中，经常需要绘制包含实际值和预测值的折线图，其中实际值部分用实线表示，预测值部分用虚线表示，以便用户清晰地区分历史数据和预测数据。

**解决方案**

G2 中一条线对应一个图形（Mark），无法在同一条线内设置不同的样式。要实现实线和虚线的混合效果，需要：

**核心思路**：将数据按照类型（实际/预测）进行分组，使用 `series` 编码创建多条线段，然后通过 `style` 回调函数为不同类型的线段设置不同的样式。

**关键配置**：

1. **数据分组**：确保连接点处的数据在两个分组中都存在，保证线段的连续性
2. **encode 配置**：
   - `color`：用于图例分组，不同分组显示不同颜色
   - `series`：用于创建多条线段，相同 series 值的数据点会连成一条线
3. **样式回调**：通过 `style.lineDash` 回调函数根据数据类型设置实线或虚线

**示例代码**

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    // 产品A的实际数据
    {
      year: '2018',
      value: 80,
      product: '产品A',
      type: '实际',
      series: '产品A-实际',
    },
    {
      year: '2019',
      value: 95,
      product: '产品A',
      type: '实际',
      series: '产品A-实际',
    },
    {
      year: '2020',
      value: 100,
      product: '产品A',
      type: '实际',
      series: '产品A-实际',
    },
    {
      year: '2021',
      value: 120,
      product: '产品A',
      type: '实际',
      series: '产品A-实际',
    },
    {
      year: '2022',
      value: 110,
      product: '产品A',
      type: '实际',
      series: '产品A-实际',
    },
    // 产品A的预测数据（注意2022年的连接点重复）
    {
      year: '2022',
      value: 110,
      product: '产品A',
      type: '预测',
      series: '产品A-预测',
    },
    {
      year: '2023',
      value: 125,
      product: '产品A',
      type: '预测',
      series: '产品A-预测',
    },
    {
      year: '2024',
      value: 140,
      product: '产品A',
      type: '预测',
      series: '产品A-预测',
    },
    {
      year: '2025',
      value: 160,
      product: '产品A',
      type: '预测',
      series: '产品A-预测',
    },
    {
      year: '2026',
      value: 180,
      product: '产品A',
      type: '预测',
      series: '产品A-预测',
    },

    // 产品B的实际数据
    {
      year: '2018',
      value: 60,
      product: '产品B',
      type: '实际',
      series: '产品B-实际',
    },
    {
      year: '2019',
      value: 70,
      product: '产品B',
      type: '实际',
      series: '产品B-实际',
    },
    {
      year: '2020',
      value: 80,
      product: '产品B',
      type: '实际',
      series: '产品B-实际',
    },
    {
      year: '2021',
      value: 90,
      product: '产品B',
      type: '实际',
      series: '产品B-实际',
    },
    {
      year: '2022',
      value: 95,
      product: '产品B',
      type: '实际',
      series: '产品B-实际',
    },
    // 产品B的预测数据
    {
      year: '2022',
      value: 95,
      product: '产品B',
      type: '预测',
      series: '产品B-预测',
    },
    {
      year: '2023',
      value: 100,
      product: '产品B',
      type: '预测',
      series: '产品B-预测',
    },
    {
      year: '2024',
      value: 110,
      product: '产品B',
      type: '预测',
      series: '产品B-预测',
    },
    {
      year: '2025',
      value: 125,
      product: '产品B',
      type: '预测',
      series: '产品B-预测',
    },
    {
      year: '2026',
      value: 145,
      product: '产品B',
      type: '预测',
      series: '产品B-预测',
    },
  ],
  encode: {
    x: 'year',
    y: 'value',
    color: 'product', // 用于图例分组（产品维度）
    series: 'series', // 用于创建线段（product-type 组合）
  },
  scale: {
    x: { range: [0, 1] },
    y: { nice: true },
  },
  axis: {
    x: { title: '年份' },
    y: { title: '销售额（万元）' },
  },
  children: [
    {
      type: 'line',
      encode: { shape: 'smooth' },
      style: {
        lineWidth: 2,
        lineDash: (d) => {
          // 根据数据类型设置线型：预测数据用虚线，实际数据用实线
          return d[0].type === '预测' ? [4, 4] : null;
        },
      },
    },
    {
      type: 'point',
      encode: { shape: 'circle' },
      style: { size: 3 },
    },
  ],
});

chart.render();
```

**关键要点**

1. **数据结构设计**：每条数据包含 `product`（产品）、`type`（实际/预测）、`series`（线段标识）字段

2. **连接点处理**：2022 年的数据在实际和预测两个分组中都存在，确保线段连续

3. **编码配置**：

   - `color: 'product'`：按产品分组，生成图例
   - `series: 'series'`：按组合字段分组，创建独立线段

4. **样式回调**：
   ```js
   style: {
     lineDash: (d) => (d[0].type === '预测' ? [4, 4] : null);
   }
   ```

**注意事项**

- `series` 编码决定了哪些数据点会连成一条线
- `color` 编码影响图例显示和颜色映射
- 样式回调函数中的 `d[0]` 表示当前线段对应的第一个数据点
- 连接点（如示例中的 2022 年）必须在两个分组中都存在

## 怎么实现按颜色分组的条形图

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  { category: '前端开发', type: 'HTML结构', score: 3.48 },
  { category: '前端开发', type: 'CSS样式', score: 3.52 },
  { category: '前端开发', type: 'JavaScript编程', score: 3.31 },
  { category: '前端开发', type: 'React框架', score: 3.28 },
  { category: '后端开发', type: 'Java编程', score: 3.35 },
  { category: '后端开发', type: '数据库设计', score: 3.58 },
  { category: '后端开发', type: 'API开发', score: 3.12 },
  { category: '后端开发', type: '微服务架构', score: 3.45 },
  { category: '数据分析', type: 'Python数据处理', score: 3.42 },
  { category: '数据分析', type: 'SQL查询优化', score: 3.33 },
  { category: '数据分析', type: '机器学习建模', score: 3.56 },
  { category: '数据分析', type: '数据可视化', score: 3.39 },
  { category: '产品设计', type: '用户体验设计', score: 3.47 },
  { category: '产品设计', type: '交互原型制作', score: 3.24 },
  { category: '产品设计', type: '需求分析梳理', score: 3.51 },
  { category: '产品设计', type: '竞品调研分析', score: 3.38 },
  { category: '测试质量', type: '自动化测试脚本', score: 3.44 },
  { category: '测试质量', type: '性能测试评估', score: 3.29 },
  { category: '测试质量', type: '安全漏洞扫描', score: 3.36 },
  { category: '测试质量', type: '兼容性验证', score: 3.18 },
  { category: '运维部署', type: 'Docker容器化', score: 3.41 },
  { category: '运维部署', type: 'Kubernetes编排', score: 3.33 },
  { category: '运维部署', type: '监控告警配置', score: 3.27 },
  { category: '运维部署', type: '持续集成部署', score: 3.49 },
];

chart.options({
  type: 'interval',
  autoFit: true,
  data,
  encode: {
    x: 'type',
    y: 'score',
    color: (d) => d.category,
  },
  coordinate: {
    transform: [
      {
        type: 'transpose',
      },
    ],
  },
  axis: {
    x: { title: false }, // 隐藏x轴标题
  },
  scale: {
    color: {
      range: ['#BAE7FF', '#80C9FE', '#70E3E3', '#ABF5F5', '#FFB3BA', '#FFDFBA'], // 在这里自定义颜色
    },
  },
});

chart.render();
```

## 为什么配置了 State 不生效

**问题描述**

在使用 G2 配置状态管理（State）时，发现配置的 `active`、`selected` 等状态样式没有生效，图表的交互效果不符合预期。

**原因分析**

在语法正确的情况下，State 配置不生效通常有以下几种原因：

1. **配置层级错误**：State 配置的传播机制存在限制，特别是在多个 Mark 的情况下
2. **缺少交互插件**：State 需要配合相应的交互插件才能生效

**解决方案**

1. **检查配置层级（最常见原因）**

多个 Mark 时必须在每个 Mark 层级单独配置：

```js
// ❌ 错误：多个 mark 时，view 层级的 state 不会传播
chart.options({
  type: 'view',
  state: { active: { fill: 'red' } }, // 这个配置不会传播到子 mark
  children: [{ type: 'line' }, { type: 'point' }],
});

// ✅ 正确：在每个 mark 层级单独配置 state
chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      state: { active: { stroke: 'red', strokeWidth: 2 } },
    },
    {
      type: 'point',
      state: { active: { fill: 'red', r: 6 } },
    },
  ],
});
```

单个 Mark 时可以在 view 层级配置：

```js
// ✅ 单个 mark 时，view 层级的 state 配置会生效
chart.options({
  type: 'view',
  state: { active: { fill: 'red' } }, // 会传播到子 mark
  children: [
    { type: 'line' }, // 会继承 view 的 state 配置
  ],
});
```

直接在 Mark 层级配置：

```js
// ✅ 直接在 mark 层级配置
chart.options({
  type: 'line',
  state: { active: { stroke: 'red', strokeWidth: 2 } },
});
```

2. **确保配置了正确的交互**

State 需要配合交互才能生效：

```js
chart.options({
  type: 'interval',
  state: {
    active: { fill: 'red' },
    inactive: { fill: '#aaa' },
    selected: { fill: 'orange' },
    unselected: { fill: '#eee' },
  },
  // 必须配置相应的交互
  interaction: {
    elementHighlight: true, // 启用悬停高亮
    elementSelect: true, // 启用点击选中
  },
});
```

常用的交互与对应状态：

| 交互                    | 对应状态            | 说明         |
| ----------------------- | ------------------- | ------------ |
| elementHighlight        | active/inactive     | 悬停高亮     |
| elementSelect           | selected/unselected | 点击选中     |
| brushHighlight          | active/inactive     | 区域刷选高亮 |
| legendHighlight         | active/inactive     | 图例高亮     |
| elementHighlightByColor | active/inactive     | 按颜色高亮   |
| elementSelectByColor    | selected/unselected | 按颜色选中   |

3. **完整的配置示例**

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { letter: 'A', frequency: 0.08167 },
    { letter: 'B', frequency: 0.01492 },
    { letter: 'C', frequency: 0.02782 },
  ],
  encode: { x: 'letter', y: 'frequency' },
  state: {
    // 悬停时：绿色填充 + 黑色描边
    active: { fill: 'green', stroke: 'black', strokeWidth: 1 },
    // 选中时：红色填充（会覆盖 active 的 fill）+ 保留 active 的描边
    selected: { fill: 'red' },
  },
  interaction: { elementHighlight: true, elementSelect: true },
});

chart.render();
```

## 多个状态同时生效时样式冲突怎么办

**问题描述**

在使用 G2 的状态管理时，当同时启用了 `elementHighlight` 和 `elementSelect` 交互，发现多个状态（如 `active` 和 `selected`）可能会同时生效，但样式表现不符合预期。

**原因分析**

G2 支持多个状态同时生效，当同一属性被多个状态配置时，会按照优先级选择最终生效的样式。不同状态的优先级如下：

```
selected:   3 (最高)
unselected: 3
active:     2
inactive:   2
default:    1 (最低)
```

**解决方案**

1. **理解状态优先级机制**

高优先级的状态会覆盖低优先级状态的同名属性：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { letter: 'A', frequency: 0.08167 },
    { letter: 'B', frequency: 0.01492 },
    { letter: 'C', frequency: 0.02782 },
  ],
  encode: { x: 'letter', y: 'frequency' },
  state: {
    // 悬停时：绿色填充 + 黑色描边
    active: { fill: 'green', stroke: 'black', strokeWidth: 1 },
    // 选中时：红色填充（会覆盖 active 的 fill）+ 保留 active 的描边
    selected: { fill: 'red' },
  },
  interaction: { elementHighlight: true, elementSelect: true },
});

chart.render();
```

**效果说明**：

- 仅悬停：显示绿色填充 + 黑色描边
- 仅选中：显示红色填充
- 悬停已选中的元素：红色填充（selected 优先级高）+ 黑色描边（active 提供）

2. **合理配置不同优先级的样式**

避免在不同优先级状态下配置相同的样式属性，或确保高优先级状态提供完整的样式配置：

```js
chart.options({
  state: {
    active: {
      stroke: 'blue',
      strokeWidth: 2,
      opacity: 0.8,
    },
    selected: {
      fill: 'orange',
      stroke: 'black',
      strokeWidth: 3,
      // 不配置 opacity，会保留 active 的 opacity 效果
    },
  },
});
```

3. **使用动态样式处理复杂场景**

对于复杂的状态组合，可以使用函数动态计算样式：

```js
chart.options({
  state: {
    active: {
      fill: (d) => (d.frequency > 0.05 ? 'lightblue' : 'lightgreen'),
    },
    selected: {
      fill: (d) => (d.frequency > 0.05 ? 'darkblue' : 'darkgreen'),
      strokeWidth: 3,
    },
  },
});
```

## 怎么让空值在 Tooltip 中不显示

**问题描述**

在具体业务场景中使用 G2 绘制图表时，数据中经常包含 `null`、`undefined` 或空字符串等无效值。默认情况下，这些空值也会在 tooltip 中显示，影响用户体验和数据的可读性。

**解决方案**

可以通过 `interaction.tooltip.filter` 配置来过滤掉这些无效数据，避免在 tooltip 中显示空值。

1. **基础过滤配置**

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  data: [
    { month: 'Jan', city: 'Tokyo', temperature: null },
    { month: 'Jan', city: 'London', temperature: 3.9 },
    { month: 'Feb', city: 'Tokyo', temperature: 8 },
    { month: 'Feb', city: 'London', temperature: 4.2 },
    { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
    { month: 'Mar', city: 'London', temperature: 5.7 },
  ],
  encode: { x: 'month', y: 'temperature', color: 'city' },
  // 过滤 null 和 undefined 值
  interaction: {
    tooltip: {
      filter: (d) => d.value !== null && d.value !== undefined,
    },
  },
  children: [
    {
      type: 'line',
      encode: { shape: 'smooth' },
      tooltip: {
        items: [{ channel: 'y' }],
      },
    },
    { type: 'point', encode: { shape: 'point' }, tooltip: false },
  ],
});

chart.render();
```

2. **针对特定数值范围的过滤**

除了过滤空值，还可以过滤特定数值范围的数据：

```js
// 过滤负值和空值
interaction: {
  tooltip: {
    filter: (d) => d.value !== null && d.value !== undefined && d.value >= 0,
  },
}

// 过滤异常值（如超出合理范围的数据）
interaction: {
  tooltip: {
    filter: (d) => {
      if (d.value === null || d.value === undefined) return false;
      return d.value >= 0 && d.value <= 1000; // 只显示 0-1000 范围内的值
    },
  },
}
```

## 图例文本过长如何显示省略号并支持悬浮显示完整内容

**问题描述**

在使用 G2 绘制图表时，图例项的文本内容可能很长，受限于布局空间无法完全显示。需要实现文本超长时显示省略号，同时支持鼠标悬浮显示完整内容的交互效果。

**解决方案**

G2 提供了 `poptip` 配置项来解决图例文本过长的问题。通过配置 `poptip`，可以在图例文本被截断时，鼠标悬浮显示完整的提示信息。

**关键配置**

- `itemWidth`: 限制图例项宽度，触发文本截断
- `poptip.render`: 自定义提示内容，支持字符串或者 `html`
- `poptip.domStyles`: 自定义提示框样式
- `poptip.position`: 设置提示框位置
- `poptip.offset`: 设置提示框偏移量，建议设置为[0, 正数]，避免触发 `poptip` 的时候闪烁

**完整示例**

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 300,
});

chart.options({
  type: 'interval',
  data: [
    { category: '这是一个非常长的类别名称A，超出显示范围', value: 40 },
    { category: '这是一个非常长的类别名称B，超出显示范围', value: 32 },
    { category: '这是一个非常长的类别名称C，超出显示范围', value: 28 },
  ],
  encode: { x: 'category', y: 'value', color: 'category' },
  coordinate: {
    transform: [
      {
        type: 'transpose',
      },
    ],
  },
  legend: {
    color: {
      itemWidth: 120, // 限制宽度以触发poptip
      poptip: {
        render: (item) => `完整名称：${item.label}`,
        position: 'top',
        offset: [0, 20],
        domStyles: {
          '.component-poptip': {
            background: 'rgb(114, 128, 191)',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)',
            fontSize: '14px',
            lineHeight: '1.5',
            maxWidth: '280px',
            zIndex: '1000',
          },
          '.component-poptip-arrow': {
            display: 'block',
            borderTopColor: '#667eea',
          },
          '.component-poptip-text': {
            color: '#fff',
            lineHeight: '1.5',
          },
        },
      },
    },
  },
});

chart.render();
```

查看[图例组件](/manual/component/legend#poptip)的详细文档了解更多配置选项。
