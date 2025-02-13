---
title: G2 图表组成
order: 1
---

为了更好地使用 G2 进行数据可视化，我们需要了解 G2 图表的组成以及相关概念。

## 图表组件

下面是一个基本的 G2 图表，图表由 **组件（Component）** 和 **标记（Mark）** 组成。

需要特别注意的是，G2 5.0 中不再需要单独配置标注（Annotation） ，标注也是一种标记，或者说某些标记也也可以用来做标注，比如 Text，Image， Line 等标记。

<img alt="chart-component" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-8XRSYHZ8S8AAAAAAAAAAAAAemJ7AQ/original"/>

### 标题 title

用于一句话概要说明图表要展示的数据，图表的标题是比较常用的组件，支持标题和副标题，以及他们的样式和位置设置。

查看 [Title](/manual/component/title) 教程获取更多信息。

### 坐标轴 axis

绘制坐标轴，目前支持直角坐标系坐标轴与极坐标系坐标轴。

每个坐标轴由坐标轴线（line）、刻度（tick）、刻度文本（label）、标题（title）以及网格线（grid）组成。

查看 [Axis](/manual/component/axis) 教程获取更多信息。

### 图例 legend

绘制图例，G2 提供了两种图例类型：分类图例（Category Legend）和连续图例（Continuous Legend），分别用于展示分类数据和连续数据。

查看 [Legend](/manual/component/legend) 教程获取更多信息。

### 滚动条 scrollbar

滚动条（scrollbar）是一个交互组件，当显示区域大小不足以容纳全部信息时，可以将超出部分隐藏，并通过滚动条的垂直或横向滑动来显示出被隐藏部分。

内容是否超出显示区域取决于内容的多少以及显示区域的尺寸，当需要显示的内容在纵向方向上超过显示区域的大小时，应当使用垂直滚动条以控制显示的部分，横向滚动条同理。

查看 [Scrollbar](/manual/component/scrollbar) 教程获取更多信息。

### 滑动条 slider

缩略轴（slider）是一种辅助看数据的组件，它将大量数据浓缩到一个轴上，既可以缩小宏观看数据全貌，又可以放大微观看数据的片段，同时还可以拖拽观察数据在一定区间内的演变。

缩略轴是值域数据的浓缩，它跟位置通道 x, y 对应的比例尺的类型息息相关。一般来说时间类型上使用缩略轴的频率高，连续轴使用缩略轴频次低、分类轴几乎不会使用到缩略轴。

查看 [Slider](/manual/component/slider) 教程获取更多信息。

### 提示信息 tooltip

当鼠标悬停在某个点上时，会以提示框的形式显示当前点对应的数据的信息，比如该点的值，数据单位等。数据提示框内提示的信息还可以通过格式化函数动态指定。

查看 [Tooltip](/manual/component/tooltip) 教程获取更多信息。

### 数据标签 label

G2 中数据标签（Label） 是给图表添加标注的手段之一。

查看 [Label](/manual/component/label) 教程获取更多信息。

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
