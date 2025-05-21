---
title: 概览
order: 1
---


动画作为可视化的重要组成部分，能显著提高数据可视化的表现力。G2 提供了完善的动画系统，支持图形在进入（enter）、更新（update）和退出（exit）三个阶段的动画效果设置，并且能根据数据特性进行动画编码，实现丰富的交互与过渡效果。

G2 动画系统的核心特性：

- **状态驱动**：基于图形的三种状态（进入、更新、退出）设置不同的动画效果
- **数据驱动**：可以将数据值映射到动画属性上，如持续时间、延迟时间等
- **过渡效果**：支持形变（morphing）、渐变、缩放等多种过渡效果
- **时序控制**：支持设置动画的顺序、缓动函数、延迟、持续时间等参数

动画属性可通过 `animate` 配置项设置，既可在图表整体配置中定义，也可针对具体标记设置。

## 动画配置

动画可在图表配置中通过 `animate` 属性进行设置：


```js | ob 
(() => {
  const chart = new G2.Chart();

chart.options({
  type: "line",
  autoFit: true,
  data: {
    type: "fetch",
    value:
      "https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv",
  },
  encode: { x: "date", y: "close" },
  animate: { enter: { type: "pathIn", duration: 1000 } },
});
chart.render();


  return chart.getContainer();
})();
```

## 动画属性

G2 的动画系统支持三个主要的阶段：

- **enter** - 新增图形的入场动画
- **update** - 已有图形的更新动画
- **exit** - 移除图形的退出动画

每个阶段可以设置以下属性：

| 属性 | 描述 | 类型 | 默认值 | 必选 |
| --- | --- | --- | --- | --- |
| type | 动画类型 | `string` | `fadeIn`(enter)/`morphing`(update)/`fadeOut`(exit) |  |
| duration | 动画持续时间（毫秒） | `number` | `300` |  |
| delay | 动画延迟执行时间（毫秒） | `number` | `0` |  |
| easing | 动画缓动函数 | `string` | `ease` |  |
| fill | 动画非运行状态的展示效果 | `string` | `both` |  |


```js | ob 
(() => {
  const chart = new G2.Chart();

chart.options({
  type: "interval",
  autoFit: true,
  data: [
    { genre: "Sports", sold: 275 },
    { genre: "Strategy", sold: 115 },
    { genre: "Action", sold: 120 },
    { genre: "Shooter", sold: 350 },
    { genre: "Other", sold: 150 },
  ],
  encode: { x: "genre", y: "sold", color: "genre" },
  animate: { enter: { type: "scaleInY", duration: 1000 } },
});

chart.render();


  return chart.getContainer();
})();
```

## 动画编码

G2 支持将数据值映射到动画属性上，使动画也具备数据可视化的意义。通过 `encode` 可以将数据字段映射到动画属性，如 `enterDuration`、`enterDelay` 等。


```js | ob 
(() => {
  const chart = new G2.Chart();

chart.options({
  type: "interval",
  autoFit: true,
  data: [
    { name: "event planning", startTime: 1, endTime: 4 },
    { name: "layout logistics", startTime: 3, endTime: 13 },
    { name: "select vendors", startTime: 5, endTime: 8 },
    { name: "hire venue", startTime: 9, endTime: 13 },
    { name: "hire caterer", startTime: 10, endTime: 14 },
    { name: "hire event decorators", startTime: 12, endTime: 17 },
    { name: "rehearsal", startTime: 14, endTime: 16 },
    { name: "event celebration", startTime: 17, endTime: 18 },
  ],
  encode: {
    x: "name",
    y: ["endTime", "startTime"],
    color: "name",
    enterDuration: (d) => (d.endTime - d.startTime) * 300,
    enterDelay: (d) => d.startTime * 100,
  },
  coordinate: { transform: [{ type: "transpose" }] },
});

chart.render();


  return chart.getContainer();
})();
```

## 分组动画

G2 提供了 `stackEnter` 标记转换来实现分组动画，使图形按照特定规则依次出现。该转换会先对图形进行分组，然后将它们的出现时间和持续时间在空间上进行堆叠。


```js | ob 
(() => {
  const chart = new G2.Chart();

chart.options({
  type: "view",
  autoFit: true,
  data: {
    type: "fetch",
    value: "https://assets.antv.antgroup.com/g2/doughnut-purchases.json",
  },
  children: [
    {
      type: "line",
      encode: { x: "year", y: "count", color: "year", shape: "smooth" },
      scale: { y: { zero: true, nice: true } },
      style: { gradient: "x", gradientColor: "start" },
      animate: { enter: { type: "pathIn", duration: 3000 } },
      axis: { y: { labelFormatter: "~s" } },
    },
    {
      type: "point",
      encode: { x: "year", y: "count", color: "year", shape: "point" },
      transform: [{ type: "stackEnter" }],
      animate: { enter: { duration: 300 } },
    },
    {
      type: "text",
      encode: { x: "year", y: "count", text: "year" },
      transform: [{ type: "stackEnter" }],
      style: { lineWidth: 5, stroke: "#fff", textAlign: "center", dy: -8 },
      animate: { enter: { duration: 300 } },
    },
  ],
});

chart.render();


  return chart.getContainer();
})();
```

## 关键帧动画

G2 提供了制作关键帧动画的能力，可以在不同视图间平滑过渡，展示数据变化。通过 `timingKeyframe` 创建时间容器，使用 `key` 和 `groupKey` 通道指定元素之间的对应关系。


```js | ob 
(() => {
  const chart = new G2.Chart();

chart.options({
  type: "timingKeyframe",
  autoFit: true,
  direction: "alternate",
  iterationCount: 2,
  children: [
    {
      type: "interval",
      data: [
        { gender: "female", height: 161.2, weight: 51.6 },
        { gender: "female", height: 167.5, weight: 59 },
        { gender: "female", height: 159.5, weight: 49.2 },
        { gender: "female", height: 157, weight: 63 },
        { gender: "female", height: 155.8, weight: 53.6 },
        { gender: "female", height: 170, weight: 59 },
        { gender: "female", height: 159.1, weight: 47.6 },
        { gender: "female", height: 166, weight: 69.8 },
        { gender: "female", height: 176.2, weight: 66.8 },
        { gender: "female", height: 160.2, weight: 75.2 },
        { gender: "female", height: 172.5, weight: 55.2 },
      ],
      encode: { x: "gender", y: "weight", color: "gender", key: "gender" },
      transform: [{ type: "groupX", y: "mean" }],
    },
    {
      type: "point",
      data: [
        { gender: "female", height: 161.2, weight: 51.6 },
        { gender: "female", height: 167.5, weight: 59 },
        { gender: "female", height: 159.5, weight: 49.2 },
        { gender: "female", height: 157, weight: 63 },
        { gender: "female", height: 155.8, weight: 53.6 },
        { gender: "female", height: 170, weight: 59 },
        { gender: "female", height: 159.1, weight: 47.6 },
        { gender: "female", height: 166, weight: 69.8 },
        { gender: "female", height: 176.2, weight: 66.8 },
        { gender: "female", height: 160.2, weight: 75.2 },
        { gender: "female", height: 172.5, weight: 55.2 },
      ],
      encode: {
        x: "height",
        y: "weight",
        color: "gender",
        shape: "point",
        groupKey: "gender",
      },
    },
  ],
  duration: 1000,
});

chart.render();


  return chart.getContainer();
})();
```  
## Lottie动画


```js | ob 
(() => {
  const chart = new G2.Chart();

chart.options({
  type: "interval",
  autoFit: true,
  data: [
    { genre: "Sports", sold: 275 },
    { genre: "Strategy", sold: 115 },
    { genre: "Action", sold: 120 },
    { genre: "Shooter", sold: 350 },
    { genre: "Other", sold: 150 },
  ],
  encode: { x: "genre", y: "sold", color: "genre" },
  animate: {
    enter: { type: "fadeIn", duration: 1000 },
    exit: { type: "fadeOut", duration: 2000 },
  },
});


chart.render();


  return chart.getContainer();
})();
```
## 时序动画

时序动画（timingSequence）还在开发中，敬请期待。

## 配置选项

### 动画配置完整选项

| 属性 | 描述 | 类型 | 默认值 | 必选 |
| --- | --- | --- | --- | --- |
| enter | 入场动画配置 | `EnterAnimateOptions` | - |  |
| update | 更新动画配置 | `UpdateAnimateOptions` | - |  |
| exit | 退出动画配置 | `ExitAnimateOptions` | - |  |
| enterType | 入场动画类型 | `string` | `fadeIn` |  |
| enterDuration | 入场动画持续时间（毫秒） | `number` | `300` |  |
| enterDelay | 入场动画延迟时间（毫秒） | `number` | `0` |  |
| enterEasing | 入场动画缓动函数 | `string` | `ease` |  |
| enterFill | 入场动画非运行状态的展示效果 | `Fill` | `both` |  |
| updateType | 更新动画类型 | `string` | `morphing` |  |
| updateDuration | 更新动画持续时间（毫秒） | `number` | `300` |  |
| updateDelay | 更新动画延迟时间（毫秒） | `number` | `0` |  |
| updateEasing | 更新动画缓动函数 | `string` | `ease` |  |
| updateFill | 更新动画非运行状态的展示效果 | `Fill` | `both` |  |
| exitType | 退出动画类型 | `string` | `fadeOut` |  |
| exitDuration | 退出动画持续时间（毫秒） | `number` | `300` |  |
| exitDelay | 退出动画延迟时间（毫秒） | `number` | `0` |  |
| exitEasing | 退出动画缓动函数 | `string` | `ease` |  |
| exitFill | 退出动画非运行状态的展示效果 | `Fill` | `both` |  |

> 复杂类型说明：
> - `EnterAnimateOptions`：入场动画配置对象，包含 type、duration、delay、easing、fill 属性
> - `UpdateAnimateOptions`：更新动画配置对象，包含 type、duration、delay、easing、fill 属性
> - `ExitAnimateOptions`：退出动画配置对象，包含 type、duration、delay、easing、fill 属性
> - `Fill`：动画填充模式，可选值为 `'auto'`、`'none'`、`'forwards'`、`'backwards'`、`'both'`

### 动画类型 Type

动画类型 `Type` 决定了动画的视觉效果。G2 提供了多种内置动画类型，也可设置为 `null`、`undefined` 或 `false` 来关闭动画。常见的动画类型包括：

- **进场动画**：`fadeIn`、`scaleInX`、`scaleInY`、`zoomIn`、`waveIn` 等
- **更新动画**：`morphing`（形变）、`fadeIn` 等
- **退场动画**：`fadeOut`、`scaleOutX`、`scaleOutY`、`zoomOut` 等

完整的动画列表详见 [Animation API](/api/overview#animation)。

### 缓动函数 Easing

缓动函数控制动画过程中视觉属性变化的插值方式。G2 支持以下内置缓动函数（来自 [easings.net](https://easings.net/)）：

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



### 动画填充 Fill

动画填充属性规定了图形在动画非运行状态（如开始前、结束后）时的展示效果：

- `auto`/`none` - 默认值，动画在第一帧开始前和最后一帧结束后不影响图形展示效果
- `forwards` - 动画完成后停住，不恢复到初始状态
- `backwards` - 动画开始前应用第一帧效果
- `both` - 同时应用 `forwards` 和 `backwards` 的效果

