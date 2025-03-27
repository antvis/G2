---
title: G2 图表组成
order: 1
---

为了更好地使用 G2 进行数据可视化，我们需要了解 G2 图表的组成以及相关概念。

## 图表组件

下面是一个基本的 G2 图表，图表由 **组件（Component）** 和 **标记（Mark）** 组成。

需要特别注意的是，G2 5.0 中不再需要单独配置标注（Annotation） ，标注也是一种标记，或者说某些标记也也可以用来做标注，比如 Text，Image， Line 等标记。

<img alt="chart-component" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-8XRSYHZ8S8AAAAAAAAAAAAAemJ7AQ/original" width=900/>

### 标题 title

用于一句话概要说明图表要展示的数据，图表的标题是比较常用的组件，支持标题和副标题，以及他们的样式和位置设置。

查看 [Title](/manual/component/title) 教程获取更多信息。

### 坐标轴 axis

绘制坐标轴，目前支持直角坐标系坐标轴与极坐标系坐标轴。

每个坐标轴由坐标轴线（line）、刻度（tick）、刻度值（label）、标题（title）以及网格线（grid）组成。

查看 [Axis](/manual/component/axis) 教程获取更多信息。

### 图例 legend

绘制图例，G2 提供了两种图例类型：分类图例（Category Legend）和连续图例（Continuous Legend），分别用于展示分类数据和连续数据。

查看 [Legend](/manual/component/legend) 教程获取更多信息。

### 滚动条 scrollbar

滚动条（scrollbar）是一个交互组件，当显示区域大小不足以容纳全部信息时，可以将超出部分隐藏，并通过滚动条的垂直或横向滑动来显示出被隐藏部分。

内容是否超出显示区域取决于内容的多少以及显示区域的尺寸，当需要显示的内容在纵向方向上超过显示区域的大小时，应当使用垂直滚动条以控制显示的部分，横向滚动条同理。

查看 [Scrollbar](/manual/component/scrollbar) 教程获取更多信息。

### 缩略轴 slider

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

### 使用方式

不管是单视图图表还是多视图图表，布局信息（图表宽高等）都可以在选项顶层进行指定。

```js
// 标记层级
const markLevel = {
  type: 'interval',
  width: 640,
  height: 180,
  margin: 10,
};
// 视图层级
const viewLevel = {
  type: 'view',
  width: 640,
  height: 180,
  margin: 10,
  // ...
};
// 多视图图表
const compositionLevel = {
  type: 'spaceFlex',
  width: 640,
  height: 180,
  margin: 10,
};
```

同时，也可以在初始化 `Chart` 对象的时候指定：

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

### 视图模型

<img alt="chart-component" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tFaaTbBg-_cAAAAAAAAAAAAAemJ7AQ/original" width=900/>

在 G2 中，**视图模型** 用于定义图表视图的划分方式，根据划分生成的不同区域可以绘制不同的内容，并通过相应选项进行配置。可以将视图简单理解为一个独立的图表。G2 的视图模型结构如下：

- **视图区域（View Area）**：表示图表的整体视图区域。在设置图表的宽度和高度时，生效的范围即为视图区域的宽度和高度。视图区域与绘制区域之间的部分称为 **外边距范围**，该区域的大小可通过配置 margin 属性进行调整，通常用于设置固定组件（如坐标轴、图例等）与边界的距离。

- **绘制区域（Plot Area）**：表示图表的绘制区域。绘制区域与主区域之间的部分称为 **内边距范围**，该区域的大小可通过配置 padding 属性进行调整，通常用于绘制图表组件，例如`title`、`legend`、`axis`等。

- **主区域（Main Area）**：表示图表内容绘制的主要区域。主区域与内容区域之间的部分称为 **呼吸范围**，该区域的大小可通过配置 inset 属性进行调整，用于制造组件和标记（图形元素）的间距，从而防止重叠，对于散点图尤其有用。

- **内容区域（Content Area）**：表示标记绘制的内容区域。主要用于绘制标记（图形元素）。

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

### 布局算法

G2 在内部自己实现了一套布局算法，负责协调外边距（ `margin` ）、内边距（ `padding` ）、呼吸范围宽度（ `inset` ）等布局参数的计算，确保坐标轴、图例等组件在图表容器中合理布局。

#### 动态计算

也许你曾经有过疑惑，为什么在配置里手动声明 `padding` 为 `0`， 图表的 x 轴显示不全了。要回答这个问题，需要深入探究 G2 布局算法里动态计算的部分。

在 G2 的布局算法中，首先会获取所有传入的 `padding`、`margin`、`inset`属性，如果没有设置，`padding`（包括 `paddingTop`、`paddingLeft` 等）会被默认赋值为 `auto`，`margin` 会被默认赋值为 `16`，而 `inset` 会被默认赋值为 `0`。接下来将图表组件按照位置进行分组，方便后续布局计算。

以 `position = 'top'` 为例，如果配置了明确的 `paddingTop` 时，不会触发动态计算 `paddingTop` 的逻辑，此时对于未定义 `size` 的组件，使用内部定义的默认尺寸 `defaultSize`；对于分组（group）组件，递归执行上述操作，然后取最大的子组件尺寸作为父组件的尺寸；如果组件中包括坐标轴（axis）组件且未显式设置 `labelAutoHide`，设置 `labelAutoHide` 为 true，自动隐藏坐标轴标签以避免溢出。

如果没有配置 `paddingTop`，则会触发动态计算的逻辑，根据组件的实际尺寸累加边距（`crossPadding` 默认为 `12`），得出最后的实际`paddingTop` 大小。

要回答最初的问题：在 G2 中，内边距范围（ `padding` ）用于为图表组件预留展示空间。如果手动将 `padding` 设置为 `0` ，会关闭内部的自适应计算逻辑，从而可能导致图表组件显示不完整。因此，当需要个性化配置时，应确保为组件预留足够的空间；否则，建议使用默认的自适应逻辑来避免显示问题。

#### 防挤压机制

G2 内部对于图表显示区域设置了一个兜底机制，当视图中存在标记元素（如`line`、`interval`等），触发防挤压机制，来确保图表的主区域（Main Area）最小占比 **1/4** 。以水平方向为例，假设绘制区域的大小为 `plotWidth`，如果 `plotWidth` 减去动态计算后的左内边距 `pl0` 和 右内边距 `pr0` 后小于 `plotWidth * 1/4` 时，会优先保证主区域大小为 `plotWidth * 1/4`，将内边距等比例缩小，当用户指定 `paddingLeft` 时会动态计算 `paddingRight` 的大小，按比例分配剩余空间，尽量避免左右外边距同时设置为固定值，可能会导致自适应算法失效。垂直方向的计算规则同理。

### 配置项

| 属性          | 描述                                           | 类型                    | 默认值                       | 必选 |
| ------------- | ---------------------------------------------- | ----------------------- | ---------------------------- | ---- |
| autoFit       | 开启后图表的宽高和容器保持一致                 | boolean                 | false                        |      |
| width         | 设置图表的宽度                                 | number                  | `640`                        |      |
| height        | 设置图表的高度                                 | number                  | `480`                        |      |
| viewStyle     | 设置图表的视图样式                             | [viewStyle](#viewstyle) | 详见 [viewStyle](#viewstyle) |      |
| margin        | 设置外边距四个方向的值，优先级别比分别设置低   | number                  | `16`                         |      |
| marginLeft    | 设置左外边距值                                 | number                  | `16`                         |      |
| marginTop     | 设置上外边距值                                 | number                  | `16`                         |      |
| marginRight   | 设置右外边距值                                 | number                  | `16`                         |      |
| marginBottom  | 设置下外边距值                                 | number                  | `16`                         |      |
| padding       | 设置内边距四个方向的值，优先级别比分别设置低   | number                  | `auto`                          |      |
| paddingLeft   | 设置左内边距值                                 | number                  | `auto`                          |      |
| paddingTop    | 设置上内边距值                                 | number                  | `auto`                          |      |
| paddingRight  | 设置右内边距值                                 | number                  | `auto`                          |      |
| paddingBottom | 设置下内边距值                                 | number                  | `auto`                          |      |
| inset         | 设置呼吸范围四个方向的值，优先级别比分别设置低 | number                  | `0`                          |      |
| insetLeft     | 设置左呼吸范围宽度                             | number                  | `0`                          |      |
| insetTop      | 设置上呼吸范围宽度                             | number                  | `0`                          |      |
| insetRight    | 设置右呼吸范围宽度                             | number                  | `0`                          |      |
| insetBottom   | 设置下呼吸范围宽度                             | number                  | `0`                          |      |

尝试一下：

<Playground path="layout/layout/demo/chart-layout.ts" rid="chart-layout"></playground>

#### autoFit

如果希望图表的宽高和容器保持一致，那么可以将 `options.autoFit` 设置为 `true`，其优先级比指定宽高高。

```js
({ type: 'view', autoFit: true });
```

#### viewStyle

配置图表的视图样式。

| 属性    | 描述               | 类型                | 默认值                   | 必选 |
| ------- | ------------------ | ------------------- | ------------------------ | ---- |
| view    | 配置视图区域的样式 | [view](#view)       | 详见 [view](#view)       |      |
| plot    | 配置绘制区域的样式 | [plot](#plot)       | 详见 [plot](#plot)       |      |
| main    | 配置主区域的样式   | [main](#main)       | 详见 [main](#main)       |      |
| content | 配置内容区域的样式 | [content](#content) | 详见 [content](#content) |      |

##### view

配置图表的视图区域的样式。

| 属性              | 描述                             | 类型            | 默认值    | 必选 |
| ----------------- | -------------------------------- | --------------- | --------- | ---- |
| viewRadius        | 图表的视图区域的四个圆角半径大小 | number          | `0`       |      |
| viewFill          | 图表的视图区域填充颜色           | string          | -         |      |
| viewFillOpacity   | 图表的视图区域填充透明度         | number          | -         |      |
| viewStroke        | 图表的视图区域描边颜色           | string          | -         |      |
| viewStrokeOpacity | 图表的视图区域描边透明度         | number          | -         |      |
| viewLineWidth     | 图表的视图区域描边宽度           | number          | -         |      |
| viewLineDash      | 图表的视图区域描边虚线配置       | [number,number] | -         |      |
| viewOpacity       | 图表的视图区域整体透明度         | number          | -         |      |
| viewShadowColor   | 图表的视图区域阴影颜色           | string          | -         |      |
| viewShadowBlur    | 图表的视图区域阴影模糊系数       | number          | -         |      |
| viewShadowOffsetX | 图表的视图区域阴影水平偏移       | number          | -         |      |
| viewShadowOffsetY | 图表的视图区域阴影垂直偏移       | number          | -         |      |
| viewCursor        | 图表的视图区域鼠标样式           | string          | `default` |      |

##### plot

配置图表的绘制区域的样式。

| 属性              | 描述                             | 类型            | 默认值    | 必选 |
| ----------------- | -------------------------------- | --------------- | --------- | ---- |
| plotRadius        | 图表的绘制区域的四个圆角半径大小 | number          | `0`       |      |
| plotFill          | 图表的绘制区域填充颜色           | string          | -         |      |
| plotFillOpacity   | 图表的绘制区域填充透明度         | number          | -         |      |
| plotStroke        | 图表的绘制区域描边颜色           | string          | -         |      |
| plotStrokeOpacity | 图表的绘制区域描边透明度         | number          | -         |      |
| plotLineWidth     | 图表的绘制区域描边宽度           | number          | -         |      |
| plotLineDash      | 图表的绘制区域描边虚线配置       | [number,number] | -         |      |
| plotOpacity       | 图表的绘制区域整体透明度         | number          | -         |      |
| plotShadowColor   | 图表的绘制区域阴影颜色           | string          | -         |      |
| plotShadowBlur    | 图表的绘制区域阴影模糊系数       | number          | -         |      |
| plotShadowOffsetX | 图表的绘制区域阴影水平偏移       | number          | -         |      |
| plotShadowOffsetY | 图表的绘制区域阴影垂直偏移       | number          | -         |      |
| plotCursor        | 图表的绘制区域鼠标样式           | string          | `default` |      |

##### main

配置图表的主区域的样式。

| 属性              | 描述                           | 类型            | 默认值    | 必选 |
| ----------------- | ------------------------------ | --------------- | --------- | ---- |
| mainRadius        | 图表的主区域的四个圆角半径大小 | number          | `0`       |      |
| mainFill          | 图表的主区域填充颜色           | string          | -         |      |
| mainFillOpacity   | 图表的主区域填充透明度         | number          | -         |      |
| mainStroke        | 图表的主区域描边颜色           | string          | -         |      |
| mainStrokeOpacity | 图表的主区域描边透明度         | number          | -         |      |
| mainLineWidth     | 图表的主区域描边宽度           | number          | -         |      |
| mainLineDash      | 图表的主区域描边虚线配置       | [number,number] | -         |      |
| mainOpacity       | 图表的主区域整体透明度         | number          | -         |      |
| mainShadowColor   | 图表的主区域阴影颜色           | string          | -         |      |
| mainShadowBlur    | 图表的主区域阴影模糊系数       | number          | -         |      |
| mainShadowOffsetX | 图表的主区域阴影水平偏移       | number          | -         |      |
| mainShadowOffsetY | 图表的主区域阴影垂直偏移       | number          | -         |      |
| mainCursor        | 图表的主区域鼠标样式           | string          | `default` |      |

##### content

配置图表的内容区域的样式。

| 属性                 | 描述                             | 类型            | 默认值    | 必选 |
| -------------------- | -------------------------------- | --------------- | --------- | ---- |
| contentRadius        | 图表的内容区域的四个圆角半径大小 | number          | `0`       |      |
| contentFill          | 图表的内容区域填充颜色           | string          | -         |      |
| contentFillOpacity   | 图表的内容区域填充透明度         | number          | -         |      |
| contentStroke        | 图表的内容区域描边颜色           | string          | -         |      |
| contentStrokeOpacity | 图表的内容区域描边透明度         | number          | -         |      |
| contentLineWidth     | 图表的内容区域描边宽度           | number          | -         |      |
| contentLineDash      | 图表的内容区域描边虚线配置       | [number,number] | -         |      |
| contentOpacity       | 图表的内容区域整体透明度         | number          | -         |      |
| contentShadowColor   | 图表的内容区域阴影颜色           | string          | -         |      |
| contentShadowBlur    | 图表的内容区域阴影模糊系数       | number          | -         |      |
| contentShadowOffsetX | 图表的内容区域阴影水平偏移       | number          | -         |      |
| contentShadowOffsetY | 图表的内容区域阴影垂直偏移       | number          | -         |      |
| contentCursor        | 图表的内容区域鼠标样式           | string          | `default` |      |

在配置视图样式的时候，不是以对象的形式来配置，而是以 `view`、`plot`、`main`、`content`前缀加属性的方式来配置。

```js
({
  viewStyle: {
    // 配置图表的视图区域的样式
    viewFill: '#DCEEFE',
    viewRadius: 50,

    // 配置图表的绘制区域的样式
    plotFill: '#fff',
    plotFillOpacity: 0.45,
    plotStroke: 'yellow',
    plotLineWidth: 4,

    // 配置图表的主区域的样式
    mainFill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
    mainFillOpacity: 0.75,

    // 配置图表的内容区域的样式
    contentFill: 'l(90) 0:#ffadad 0.5:#ffd6a5 1:#fdffb6',
    contentShadowColor: '#5d5d5d',
    contentShadowBlur: 40,
    contentShadowOffsetX: 5,
    contentShadowOffsetY: 5,
  },
});
```

尝试一下：

<Playground path="layout/style/demo/chart-view-style.ts" rid="chart-view-style"></playground>
