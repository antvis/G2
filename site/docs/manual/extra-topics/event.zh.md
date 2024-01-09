---
title: 监听和抛出事件
order: 9
---

G2 对外暴露了一些事件，用于获取图表的生命周期，以及交互信息。G2 导出了一个 `ChartEvent` 类型，用于定义事件的类型。

<img alt="click event" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z61ZQ5DM5IUAAAAAAAAAAAAADmJ7AQ/original" width="800" />

```js
import { Chart, ChartEvent } from '@antv/g2';

const chart = new Chart({
  container,
  canvas,
});

chart.data([
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]);

chart
  .interval()
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'genre')
  .axis({ x: { animate: false }, y: { animate: false } });

chart.on('interval:click', (e) => {
  console.log(e.data.data); // 展示点击的数据
});

chart.on('element:click', (e) => {
  console.log(e.data.data); // 展示点击的数据
});

chart.render();
```

## 生命周期事件

如果想要获取图表的生命周期信息，可以通过下面的方式：

```js
chart.on(ChartEvent.AFTER_RENDER, (ev) => {
  console.log(ev);
});
```

G2 目前提供了以下生命周期事件：

| 事件名                          | 说明           |
| ------------------------------- | -------------- |
| `ChartEvent.`BEFORE_RENDER      | 渲染前         |
| `ChartEvent.`BEFORE_PAINT       | 绘制前         |
| `ChartEvent.`AFTER_PAINT        | 绘制后         |
| `ChartEvent.`AFTER_RENDER       | 渲染后         |
| `ChartEvent.`BEFORE_CHANGE_DATA | 更改数据前     |
| `ChartEvent.`AFTER_CHANGE_DATA  | 更改数据后     |
| `ChartEvent.`BEFORE_CLEAR       | 清理画布前     |
| `ChartEvent.`AFTER_CLEAR        | 清理画布后     |
| `ChartEvent.`BEFORE_DESTROY     | 销毁画布前     |
| `ChartEvent.`AFTER_DESTROY      | 销毁画布后     |
| `ChartEvent.`BEFORE_CHANGE_SIZE | 更改画布尺寸前 |
| `ChartEvent.`AFTER_CHANGE_SIZE  | 更改画布尺寸后 |

- **渲染前**：指 G2 着手开始处理数据，进行布局，绘制图形等操作。
- **绘制前**： 指完成数据处理，布局，绘制图形等操作，但是还没有进行绘制。
- **绘制后**： 指 G2 完成所有的绘制操作，但可能存在动画，动画结束后，图表才算真正的渲染完成。
- **渲染后**： 指 G2 完成所有的绘制操作，包括动画。
- **清理画布后**： 容器中的图表已经被清理，但是 G2 实例还存在，可以继续使用。
- **销毁画布后**： G2 实例已经被销毁，无法再使用。

## 交互事件

如果你想要获取图表的交互信息，可以通过下面的方式：

- 监听全局 `element` 事件

```js
chart.on(`element:${ChartEvent.EventType}`, (ev) => {
  console.log(ev);
});
```

- 监听指定 `element` 事件

```js
chart.on(`${markType}:${ChartEvent.EventType}`, (ev) => {
  console.log(ev);
});

// 如，监听柱状图中的柱子的点击事件
chart.on(`interval:${ChartEvent.CLICK}`, (ev) => {
  console.log(ev);
});
```

- 监听 plot 区域事件

```js
chart.on('plot:click', (event) => console.log(event));
```


- 监听全局 component 事件

```js
chart.on('component:click', (event) => console.log(event));
```

- 监听全局 label 事件

```js
chart.on('label:click', (event) => console.log(event));
```

### 点击事件

| 事件名                | 说明 | 回调参数 |
| --------------------- | ---- | -------- |
| `ChartEvent.`CLICK    | 点击 | `Event`  |
| `ChartEvent.`DBLCLICK | 双击 | `Event`  |

### 指针事件

| 事件名                         | 说明                           | 回调参数 |
| ------------------------------ | ------------------------------ | -------- |
| `ChartEvent.`POINTER_TAP       |                                | `Event`  |
| `ChartEvent.`POINTER_DOWN      | 当指针按下时                   | `Event`  |
| `ChartEvent.`POINTER_UP        | 当指针松开时                   | `Event`  |
| `ChartEvent.`POINTER_OVER      | 当指针进入目标元素时           | `Event`  |
| `ChartEvent.`POINTER_OUT       | 当指针离开目标元素时           | `Event`  |
| `ChartEvent.`POINTER_MOVE      | 当指针改变坐标时               | `Event`  |
| `ChartEvent.`POINTER_ENTER     | 当指针进入目标元素或其子元素时 | `Event`  |
| `ChartEvent.`POINTER_LEAVE     | 当指针离开目标元素或其子元素时 | `Event`  |
| `ChartEvent.`POINTER_UPOUTSIDE |                                | `Event`  |

### 拖拽事件

如果希望监听拖拽事件，需要设置 draggable 和 droppable 属性

```js
chart.interval().style('draggable', true).style('droppable', true);
```

| 事件名                  | 说明                         | 回调参数 |
| ----------------------- | ---------------------------- | -------- |
| `ChartEvent.`DRAG_START | 开始拖拽时                   | `Event`  |
| `ChartEvent.`DRAG       | 拖拽过程中                   | `Event`  |
| `ChartEvent.`DRAG_END   | 拖拽完成时                   | `Event`  |
| `ChartEvent.`DRAG_ENTER | 元素被拖拽进入目标元素内时   | `Event`  |
| `ChartEvent.`DRAG_LEAVE | 元素被拖拽离开目标元素时     | `Event`  |
| `ChartEvent.`DRAG_OVER  | 元素被拖拽悬停在目标元素内时 | `Event`  |
| `ChartEvent.`DROP       | 元素被放置到目标元素内时     | `Event`  |
