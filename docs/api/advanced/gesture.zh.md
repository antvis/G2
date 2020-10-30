---
title: 手势事件支持
order: 8
---

为了更好地支持移动端对于图表交互的需求，G2 提供了手势事件的解决方案。

## 引入手势支持

G2 默认没有将手势功能打包至发布包中，需要用户手动引入：

```ts
import { registerComponentController } from '@antv/g2';
import Gestrue from '@antv/g2/lib/chart/controller/gesture';

registerComponentController('gesture', Gestrue);
```

引入之后，我们就可以**在 View 上监听**相应的手势事件。

## 手势事件

### `press`

press 点击事件。

```ts
// 点击开始
chart.on('pressstart', (ev) => {
  const { points } = ev;
});
// 点击
chart.on('press', (ev) => {
  const { points } = ev;
});
// 点击结束
chart.on('pressend', (ev) => {
  const { points } = ev;
});
```

### `pan`

pan 滑动事件。

```ts
// 滑动开始
chart.on('panstart', (ev) => {
  const { points, direction, deltaX, deltaY } = ev;
});
// 滑动
chart.on('pan', (ev) => {
  const { points, direction, deltaX, deltaY } = ev;
});
// 滑动结束
chart.on('panend', (ev) => {
  const { points, direction, deltaX, deltaY } = ev;
});
```

- `direction`: 滑动方向，'left', 'right', 'up', 'down'
- `deltaX`: x 方向的位移
- `deltaY`: y 方向的位移

### `pinch`

pinch 双指缩放事件。

```ts
// 缩放开始
chart.on('pinchstart', (ev) => {
  const { points, zoom, center } = ev;
});
// 缩放
chart.on('pinch', (ev) => {
  const { points, zoom, center } = ev;
});
// 缩放结束
chart.on('pinchend', (ev) => {
  const { points, zoom, center } = ev;
});
```

- `zoom`: 缩放倍数
- `center`: 中心点

### `swipe`

swipe 快扫事件。

```ts
// 快扫开始
chart.on('swipestart', (ev) => {
  const { points, direction, deltaX, deltaY, velocity } = ev;
});
// 快扫
chart.on('swipe', (ev) => {
  const { points, direction, deltaX, deltaY, velocity } = ev;
});
// 快扫结束
chart.on('swipeend', (ev) => {
  const { points, direction, deltaX, deltaY, velocity } = ev;
});
```

- `direction`: 滑动方向，'left', 'right', 'up', 'down'
- `deltaX`: x 方向的位移
- `deltaY`: y 方向的位移
- `velocity`: 滑动速率
