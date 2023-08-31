---
title: 大小（Size）
order: 3
---

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

## 默认宽高

在声明选项的时候没有指定宽高的时候，G2 会使用 **640px** 作为宽，**480px** 作为高。

```js
({ type: 'view' });
```

## 指定宽高

同样也可以通过 `options.width` 和 `options.height` 去指定宽高。

```js
({ type: 'view', width: 600, height: 400 });
```

## 容器宽高

如果希望图表的宽高和容器保持一致，那么可以将 `options.autoFit` 设置为 `true`，其优先级比指定宽高高。

```js
({ type: 'view', autoFit: true });
```

## 视图模型

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
