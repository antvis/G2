---
title: 图表宽高和视图模型
order: 3
---

## 默认宽高

在声明图表选项的时候没有指定宽高的时候，G2 会使用 **640px** 作为宽，**480px** 作为高。

```js
const chart = new Chart();
```

## 指定宽高

同样也可以通过 `options.width` 和 `options.height` 去指定宽高。

```js
const chart = new Chart({
  width: 500,
  height: 300,
});
```

## 容器宽高

如果希望图表的宽高和容器保持一致，那么可以将 `options.autoFit` 设置为 `true`，其优先级比指定宽高高。

```js
const chart = new Chart({
  container: 'chart',
  autoFit: true,
});
```

## 视图模型

G2 中的视图模型定义了一个视图的划分方式，划分得到的不同区域会绘制不同的东西，也通过不同的选项去设置。现在可以简单的把视图理解为一个图表。G2 的视图模型如下：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*IOiTQ47rrzwAAAAAAAAAAAAADmJ7AQ/original" alt="view-model" width="100%">

- **视图区域（View Area）**：下图中蓝色 + 橙色 + 红色 + 青色部分，其中蓝色部分被称为**外边距区域**，主要用于固定组件（坐标轴、图例等）到边界的距离。
- **绘制区域（Plot Area）**：下图中橙色 + 红色 + 青色部分，橙色部分被称为**内边距区域**，该区域用于绘制组件。
- **主区域（Main Area）**：下图中红色 + 青色部分，其中红色部分被称为**呼吸区域**，用于制造组件和标识（图形元素）的间距，从而防止重叠，对于散点图尤其有用。
- **内容区域（Content Area）**：下图中青色部分，主要用于绘制标识（图形元素）。

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

下面是一个例子：

```js
const chart = new Chart({
  height: 300,
  // 橙色部分大小
  paddingLeft: 50,
  paddingBottom: 40,
  paddingRight: 30,
  paddingTop: 20,
  // 蓝色部分大小
  marginLeft: 40,
  marginTop: 30,
  marginRight: 20,
  marginBottom: 10,
  // 红色部分大小
  insetLeft: 10,
  insetTop: 20,
  insetRight: 30,
  insetBottom: 40,
});
```

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

而各个区域的样式可以通过 `${name}${Style}` 的形式去设置，其中 `Style` 是 G 的矩形支持的所有样式，比如 `fill`，`stroke` 等，注意首字母要大写，变成驼峰形式。

- **view${Style}** - 设置视图区域的样式
- **plot${Style}** - 设置绘制区域的样式
- **main${Style}** - 设置主区域的样式
- **content${Style}** - 设置内容区域的样式

设置各个区域填充颜色的方法如下：

```js
chart
  .style('viewFill', '#4e79a7') // 设置视图区域样式
  .style('plotFill', '#f28e2c') // 绘制区域样式
  .style('mainFill', '#e15759') // 主区域样式
  .style('contentFill', '#76b7b2'); // 内容区域样式
```
