---
title: 概览
order: 1
---

动画的过程本质是视觉属性在时间上的变化，带来视觉上的动画效果。G2 内置有多种常规的动画类型。一个动画分成几个组成部分：

- `duration` - 动画持续时间
- `delay` - 动画延迟执行的时间
- `easing` - 动画的缓动函数
- `fill` - 

## 开始使用

```ts
chart
  .interval()
  /* ... */
  .animation({
    /* options */
  });
```

## 配置

| 属性 | 描述 | 类型 | 默认值|
| -------------| ----------------------------------------------------------- | -----------------| ----------|
| duration     | 动画持续时间 (ms)                                             | `number`         |           |
| delay        | 延迟执行时间 (ms)                                             | `number`         |           |
| easing       | 动画的缓动函数                                                | `Easing`           |          |
| fill         | 动画处于非运行状态时的展示效果                                   | `Fill`           |           |


### 缓动函数 Easing

支持以下内置缓动函数，来自 [easings](https://easings.net/)，也可以上这个网站预览动画缓动的效果。

| constant   | accelerate         | decelerate     | accelerate-decelerate | decelerate-accelerate |
| ---------- | ------------------ | -------------- | --------------------- | --------------------- |
| linear     | ease-in / in       | ease-out / out | ease-in-out / in-out  | ease-out-in / out-in  |
| ease       | in-sine            | out-sine       | in-out-sine           | out-in-sine           |
| steps      | in-quad            | out-quad       | in-out-quad           | out-in-quad           |
| step-start | in-cubic           | out-cubic      | in-out-cubic          | out-in-cubic          |
| step-end   | in-quart           | out-quart      | in-out-quart          | out-in-quart          |
|            | in-quint           | out-quint      | in-out-quint          | out-in-quint          |
|            | in-expo            | out-expo       | in-out-expo           | out-in-expo           |
|            | in-circ            | out-circ       | in-out-circ           | out-in-circ           |
|            | in-back            | out-back       | in-out-back           | out-in-back           |
|            | in-bounce          | out-bounce     | in-out-bounce         | out-in-bounce         |
|            | in-elastic         | out-elastic    | in-out-elastic        | out-in-elastic        |
|            | spring / spring-in | spring-out     | spring-in-out         | spring-out-in         |

除此之外，还可以通过 `cubic-bezier(<number>, <number>, <number>, <number>)` 自定义形如三次贝塞尔曲线的函数。以上部分内置函数也是通过它定义完成的，例如 `ease-in-sine = cubic-bezier(0.47, 0, 0.745, 0.715)`。


### Fill

该属性规定了图形在动画处于非运行状态（例如动画开始前，结束后）时的展示效果，可以参考 [WebAPI](https://developer.mozilla.org/en-US/docs/Web/API/EffectTiming/fill) 规范。支持以下值：

- `auto/none` - 默认值，这意味着动画在第一帧开始前和最后一帧结束后都不会影响到图形的展示效果。例如在动画完成后图形会恢复到动画前状态，如果设置了 delay 在延迟期间也不会应用第一帧的效果。
- `forwards` - 动画完成后停住，不恢复到初始状态
- `backwards` - 动画开始前应用第一帧效果
- `both` - 为 forwards 和 backwards 的组合效果
