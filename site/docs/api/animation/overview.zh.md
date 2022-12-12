---
title: 概览
order: 1
---

动画的过程本质是视觉属性在时间上的变化，带来视觉上的动画效果。在 G2 中，提供了三种动画场景类型：

- `enter` - 元素第一次出现的出场动画；
- `update` - 数据更新的时候，元素更新的动画；
- `exit` - 数据更新的时候，元素被销毁退出画布的动画；

利用这 3 种动画场景，结合 G2 动画语法使用数据驱动动画的方式，可以配制出各种各样需要的动画效果。

## 开始使用

```ts
chart
  .interval()
  /* ... */
  .animate({
    /* options */
  });
```

## 选项

关于 `animate` API 的参数，有以下，主要 3 种动画场景（enter、update、exit）和 动画 5 个属性（type、duration、delay、easing、fill）的组合。

| 属性 | 描述 | 类型 | 默认值|
| -------------| ----------------------------------------------------------- | -----------------| ----------|
| enterType         | 动画类型                                                     | `Type`         |           |
| enterDuration     | 动画持续时间 (ms)                                             | `number`         |           |
| enterDelay        | 延迟执行时间 (ms)                                             | `number`         |           |
| enterEasing       | 动画的缓动函数                                                | `Easing`           |          |
| enterFill         | 动画处于非运行状态时的展示效果                                   | `Fill`           |           |
| updateType        | 动画类型                                                     | `Type`         |           |
| updateDuration    | 动画持续时间 (ms)                                             | `number`         |           |
| updateDelay       | 延迟执行时间 (ms)                                             | `number`         |           |
| updateEasing      | 动画的缓动函数                                                | `Easing`           |          |
| updateFill        | 动画处于非运行状态时的展示效果                                   | `Fill`           |           |
| exitType          | 动画类型                                                     | `Type`         |           |
| exitDuration      | 动画持续时间 (ms)                                             | `number`         |           |
| exitDelay         | 延迟执行时间 (ms)                                             | `number`         |           |
| exitEasing        | 动画的缓动函数                                                | `Easing`           |          |
| exitFill          | 动画处于非运行状态时的展示效果                                   | `Fill`           |           |

### 动画类型 Type

动画类型 `Type` 本质是设置动画的方式，会影响的视觉属性。

| 属性 | 预览 | 描述 |
| -------------| ----------------------------------------------------------- | -----------------|
| fadeIn         | ![fade-in.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*LTRRRL8JwfQAAAAAAAAAAABkARQnAQ)             | 渐现动画。                                                       |
| fadeOut        | ![fade-out.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*s4Y4S5JJ6WEAAAAAAAAAAABkARQnAQ)            | 渐隐动画。                                                       |
| growInX        | ![grow-in-x.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*vhRVSLxDqU8AAAAAAAAAAABkARQnAQ)           | 容器沿着 x 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。          |
| growInY        | ![grow-in-y.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*L6mkQa3aG64AAAAAAAAAAABkARQnAQ)           | 容器沿着 y 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。          |
| scaleInX       | ![scale-in-x.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*oiaGTLx-dNcAAAAAAAAAAABkARQnAQ)          | 单个图形沿着 x 方向的生长动画。                                     |
| scaleOutX      | ![scale-in-y.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*T6mLTY3o9OoAAAAAAAAAAABkARQnAQ)          | 单个图形沿着 x 方向的消退动画。                                     |
| scaleInY       |  同上                                                                                                              | 单个图形沿着 y 方向的生长动画。                                     |
| scaleOutY      |  同上                                                                                                              | 单个图形沿着 y 方向的消退动画。                                     |
| waveIn         | ![wave-in-p.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*W5CdQIWw-M4AAAAAAAAAAABkARQnAQ)![wave-in-r.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*z9jjQY-lHcwAAAAAAAAAAABkARQnAQ) | 划入入场动画效果，不同坐标系下效果不同。                         |
| zoomIn         | ![zoom-in.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*wc4dQp4E6vkAAAAAAAAAAABkARQnAQ)             | 沿着图形中心点的放大动画。                                          |
| zoomOut        | ![zoom-out.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*PZ2gTrkV29YAAAAAAAAAAABkARQnAQ)            | 沿着图形中心点的缩小动画。                                          |
| pathIn         | ![path-in.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*gxZ1RIIMtdIAAAAAAAAAAABkARQnAQ)             | path 路径入场动画。                                               |
| morphing       | ![morphing.gif](https://gw.alipayobjects.com/zos/raptor/1670815385405/animation.gif)                              | 图形之间的形变动画                                                 |
| null / undefined / false   |                                                                                                           | 关闭动画                                                         |

### 缓动函数 Easing

缓动函数指定的是动画过程中，视觉属性变化的插值函数。支持以下内置缓动函数，来自 [easings](https://easings.net/)，也可以上这个网站预览动画缓动的效果。

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

### 动画填充 Fill

该属性规定了图形在动画处于非运行状态（例如动画开始前，结束后）时的展示效果，可以参考 [WebAPI](https://developer.mozilla.org/en-US/docs/Web/API/EffectTiming/fill) 规范。支持以下值：

- `auto/none` - 默认值，这意味着动画在第一帧开始前和最后一帧结束后都不会影响到图形的展示效果。例如在动画完成后图形会恢复到动画前状态，如果设置了 delay 在延迟期间也不会应用第一帧的效果。
- `forwards` - 动画完成后停住，不恢复到初始状态
- `backwards` - 动画开始前应用第一帧效果
- `both` - 为 forwards 和 backwards 的组合效果
