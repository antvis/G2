---
title: 图表（Chart）
order: 1
---

G2 的大部分能力通过 `Chart` 对象暴露给用户，比如绘制一个简单的条形图：

```js | ob
(() => {
  const chart = new G2.Chart();

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
    .encode('y', 'sold');

  chart.render();

  return chart.getContainer();
})();
```

接下来我们就来看看 `Chart` 的核心使用方式。

## 使用方式

### 图表实例

每个 G2 的可视化都是通过实例化 `Chart` 对象创建一个新的**图表实例**：

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  /* 图表选项 */
});
```

### 全局选项

可以通 `new Chart(options)` 指定一些全局选项：比如挂载的容器，宽度，高度等。所有的选项都是**可选的**。

```js
// 按需指定选项
const chart = new Chart({
  width: 800, // 图表高度
  height: 400, // 图表宽度
  container: 'chart', // 挂载容器的 ID
});
```

### 挂载图表

图表实例只有挂载了之后才能被渲染到屏幕上，其中有两种挂载的方式。

```html
<div id="chart"></div>
```

第一种，自动挂载。

```js
const chart = new Chart({
  container: 'chart', // 指定挂载容器 id
});

// 或者
const chart = new Chart({
  container: document.getElementById('chart'), // 指定挂载容器
});
```

第二种，手动挂载。

```js
const chart = new Chart();

// 声明可视化
// ...

const container = chart.getContainer(); // 获得挂载的容器
document.getElementById('chart').appendChild(container);
```

### 渲染图表

当然，在能看见图表之前，还需要调用 `chart.render`。

```js
// 创建图表实例
const chart = new Chart({
  container: 'chart',
});

// 声明可视化
// ...

// 渲染
chart
  .render()
  .then(() => {
    // 渲染成功
  })
  .catch((error) => {
    // 渲染失败
  });
```

### 更新图表

当通过图表实例提供的 API 修改了声明的可视化之后，只用再次调用 `chart.render` 就可以更新图表了。

```js
// 第一次渲染
chart.render();

// 更新声明
// ...

// 更新图表
chart.render();
```

### 清空图表

清空画布和取消事件监听，同时会清空图表配置，常常用于绘制新的图表。

```js
chart.clear();
```

### 销毁图表

销毁画布和取消事件监听，常常用于销毁组件和页面的时候。

```js
chart.destroy();
```

## 视图

G2 中**视图（View）** 用来绘制多个标记。一个视图拥有一个坐标系，也是应用交互的最小单位。

```js
({
  type: 'view',
  children: [{ type: 'interval' }],
});
```

顶层 Chart 默认就是一个视图：

```js
// 添加一个 Interval 到该视图
chart.interval();
```

当顶层 Chart 添加了复合节点，可以通过 `chart.view` 声明视图：

```js
const spaceFlex = chart.spaceFlex();

const view = spaceFlex.view();

view.line();
view.point();
```

## 核心概念

- [**data**](/manual/core/data) - 可视化的数据
- [**encode**](/manual/core/encode) - 编码信息
- [**scale**](/manual/core/encode) - 映射规则
- [**transform**](/manual/core/transform) - 转化通道值
- [**layout**](/manual/core/layout) - 布局算法配置
- [**coordinate**](/manual/core/coordinate) - 坐标系变换
- [**style**](/manual/core/style) - 视觉样式
- [**labelTransform**](/manual/core/label) - 数据标签转换
- [**title**](/manual/core/title) - 图表标题
- [**axis**](/manual/core/axis) - 坐标轴
- [**legend**](/manual/core/legend) - 图例
- [**scrollbar**](/manual/core/scrollbar) - 滚动条
- [**slider**](/manual/core/slider) - 拖拽轴
- [**interaction**](/manual/core/interaction) - 交互
- [**theme**](/manual/core/theme) - 主题

```js
({
  type: 'view',
  data: [],
  encode: {},
  scale: {},
  transform: [],
  coordinate: {},
  style: {},
  labelTransform: {},
  title: {},
  axis: {},
  legend: {},
  tooltip: {},
  scrollbar: {},
  slider: {},
  interaction: {},
  theme: {},
});
```

## 图表布局

不管是单视图图表还是多视图图表，布局信息（图表宽高等）是在选项顶层指定的。

```js
const markLevel = {
  type: 'interval',
  width: 640,
  height: 180,
  margin: 10,
};

const viewLevel = {
  type: 'view',
  width: 640,
  height: 180,
  margin: 10,
  // ...
};

const compositionLevel = {
  type: 'spaceFlex',
  width: 640,
  height: 180,
  margin: 10,
};
```

API 可以在初始化 Chart 对象的时候指定：

```js
const chart = new Chart({
  type: 'view',
  width: 640,
  height: 180,
  margin: 10,
  // ...
});
```

也可以通过 `node.attr` 指定：

```js
chart.interval().attr('padding', 10).attr('margin', 20);

chart.view().attr('padding', 10).attr('margin', 20);

chart.spaceFlex().attr('padding', 10).attr('margin', 20);
```

### 默认宽高

在声明选项的时候没有指定宽高的时候，G2 会使用 **640px** 作为宽，**480px** 作为高。

```js
({ type: 'view' });
```

### 指定宽高

同样也可以通过 `options.width` 和 `options.height` 去指定宽高。

```js
({ type: 'view', width: 600, height: 400 });
```

### 容器宽高

如果希望图表的宽高和容器保持一致，那么可以将 `options.autoFit` 设置为 `true`，其优先级比指定宽高高。

```js
({ type: 'view', autoFit: true });
```

### 视图模型

G2 中的视图模型定义了一个视图的划分方式，划分得到的不同区域会绘制不同的东西，也通过不同的选项去设置。现在可以简单的把视图理解为一个图表。G2 的视图模型如下：

```js | ob {pin:false}
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'point',
      height: 280,
    marginTop: 30,
    marginLeft: 40,
    marginBottom: 10,
    marginRight: 20,
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/commits.json',
    },
    encode: {
      x: (d) => new Date(d.time).getUTCHours(),
      y: (d) => new Date(d.time).getUTCDay(),
      size: 'count',
      shape: 'point',
    },
    transform: [{ type: 'group', size: 'sum' }, { type: 'sortY' }],
    scale: { y: { type: 'point' } },
    style: { shape: 'point', fill: '#59a14f' },
    axis: {
      x: { title: 'time (hours)', tickCount: 24 },
      y: { title: 'time (day)', grid: true },
    },
    legend: false,
    inset: 10,
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

- **视图区域（View Area）**：上图中蓝色 + 橙色 + 红色 + 青色部分，其中蓝色部分被称为**外边距区域**，主要用于固定组件（坐标轴、图例等）到边界的距离。
- **绘制区域（Plot Area）**：上图中橙色 + 红色 + 青色部分，橙色部分被称为**内边距区域**，该区域用于绘制组件。
- **主区域（Main Area）**：上图中红色 + 青色部分，其中红色部分被称为**呼吸区域**，用于制造组件和标记（图形元素）的间距，从而防止重叠，对于散点图尤其有用。
- **内容区域（Content Area）**：上图中青色部分，主要用于绘制标记（图形元素）。

可以通过如下的配置设置各个区域的大小：

- **margin** - 设置外边距四个方向的值，优先级别比分别设置低
- **marginLeft** - 设置左外边距
- **marginTop** - 设置上外边距
- **marginRight** - 设置右外边距值
- **marginBottom** - 设置下外边距值
- **padding** - 设置内边距四个方向的值，优先级别比分别设置低
- **paddingLeft** - 设置左内边距
- **paddingTop** - 设置上内边距
- **paddingRight** - 设置右内边距
- **paddingBottom** - 设置下内边距
- **inset** - 设置呼吸区域四个方向的值，优先级别比分别设置低
- **insetLeft** - 设置左呼吸区域
- **insetTop** - 设置上呼吸区域
- **insetRight** - 设置右呼吸区域
- **insetBottom** - 设置下呼吸区域

其中内容区域的大小由以下的公式得到：

```js
const contentWidth =
  width -
  paddingLeft -
  paddingRight -
  marginLeft -
  marginRight -
  insetLeft -
  insetRight;

const contentHeight =
  height -
  paddingTop -
  paddingBottom -
  marginTop -
  marginBottom -
  insetTop -
  insetBottom;
```
