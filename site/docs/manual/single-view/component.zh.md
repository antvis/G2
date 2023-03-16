---
title: 辅助组件
order: 7
---

**辅助组件（Guide）** 是也属于一种标记，更严格的来说是一种非数据驱动的静态标记（Static Mark）。辅助组件用来帮助用户更好的理解图表。

## 坐标轴

**坐标轴（Axis）** 可以理解为是空间通道对应比例尺的可视化，其中 G2 中的空间通道主要为：x，y 和 position 。在 G2 中每个标记都有自己的坐标轴，通过 `mark.axis` 去设置。如果标记对应比例尺是同步的，那么坐标轴也会合并。

```js
// 设置 x 方向的坐标轴
interval.axis('x', {
  tickCount: 5, // 指定坐标刻度数量
  title: 'hello', // 指定坐标标题
  labelFormatter: (d) => d.toFixed(2), // 指定 label 格式化函数
});

// 隐藏 y 方向坐标轴
interval.axis('y', false);

// 隐藏所有坐标轴
interval.axis(false);
```

每个空间通道也可以和多条坐标轴绑定。

```js
// 设置多条 x 方向的坐标轴
interval.axis('y', [
  // 一条 x 轴放在上面
  {
    tickCount: 5,
    position: 'top',
  },
  // 一条 x 轴放在下面
  {
    title: 'hello',
    position: 'bottom',
  },
]);
```

## 图例

**图例（Legend）** 可以理解为是非空间通道对应比例尺的可视化，其中 G2 中的非空间通道是 color，opacity，size，shape。在 G2 中，每个标记都有自己的图例由 `mark.legend` 去设置。如果标记对应的比例尺是同步的，那么图例也会合并。

```js
// 设置 color 的图例
interval.legend('color', {});

// 设置 size 的图例
interval.size('size', {});

// 隐藏 size 的图例
interval.size('size', false);

// 隐藏所有比例尺
interval.legend(false);
```

## 传递性

比例尺和图例都拥有传递性。chart 实例的比例尺和图例都会传递给所用的标记。

```js
chart
  .interval()
  .axis('x', { tickCount: 5 })
  .legend('color', { type: 'ordinal' });
```

等价于：

```js
chart.axis('x', { tickCount: 5 }).legend('color', { type: 'ordinal' });
chart.interval();
```

## 其他组件

G2 中还有其他组件，可以通过如下的方式声明：

- chart.**title** - 绘制标题
- chart.**scrollbar** - 绘制滚动条
- chart.**slider** - 绘制拖拽轴
