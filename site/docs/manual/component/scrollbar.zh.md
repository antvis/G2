---
title: 滚动条（Scrollbar）
order: 7.3
---

## 概述

G2 中 **滚动条（Scrollbar）** 可以用于过滤数据，可以和 x 或者 y 通道绑定的，滚动条默认都是关闭的。解决图表信息过于密集而无法完全展示的问题。

何时使用：内容是否超出显示区域取决于内容的多少以及显示区域的尺寸，当需要显示的内容在纵向方向上超过显示区域的大小时，应当使用垂直滚动条以控制显示的部分，横向滚动条同理。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "interval",
    autoFit: true,
    height: 300,
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv",
    },
    encode: { x: "letter", y: "frequency", y1: 0.000001 },
    scale: { y: { type: "log" } },
    scrollbar: { 
      x: {
        ratio: 0.2,
        trackSize: 14,
        trackFill: "#000",
        trackFillOpacity: 1,
      },
      y: {
        ratio: 0.5,
        trackSize: 12,
        value: 0.1,
        trackFill: "#000",
        trackFillOpacity: 1,
      },
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

### 构成元素

<img alt="legend-overview" width=900 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vEWuTqp_4WoAAAAAAAAAAAAAemJ7AQ/original"/>

### 使用方式

滚动条可以在 Mark 层级配置。在 G2 中，每个标记（Mark）都有自己的滚动条。如果标记对应的比例尺是同步的，那么滚动条也会合并。

```js
({
  type: 'interval',
  scrollbar: {
    x: {}, // x轴滚动条
    y: {}, // y轴滚动条
  },
});
```

滚动条也可以在 View 层级配置。滚动条具有传递性。视图上声明的滚动条会传递给 `children` 声明的标记，如果该标记有对应通道的滚动条，就合并；否则不影响。

```js
({
  type: 'view',
  scrollbar: {
    x: {},
    y: {},
  },
});
```

## 配置项

| 属性                       | 描述                   | 类型                   | 默认值 | 必选  |
| -------------------------- | ---------------------- | ---------------------- | ------ |-------|
| ratio                      | 滚动条的比例，为单页显示数据在总数据量上单比例             | number               | `0.5`    |       |
| value                      | 滚动条的起始位置, x轴默认值为 `0`, y轴默认为 `1`     | [0, 1]               |       |       |
| slidable                   | 是否可以拖动           | boolean              | true   |       |
| scrollable                 | 是否支持滚轮滚动       | boolean              | true   |       |
| position                 | 滚动条相对图表方位       | string              | `bottom`   |       |
| isRound            | 滚动条样式是否为圆角   | boolean              | true  |       |
| style                 | 滚动条样式配置，样式都可以直接在配置项中配置       | [style](#style)              |    |       |

```js | ob
(() => {
  const chart = new G2.Chart();
  
  chart.options({
    type: "area",
    autoFit: true,
    height: 300,
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/unemployment-by-industry.json",
    },
    encode: {
      x: (d) => new Date(d.date),
      y: "unemployed",
      color: "industry",
      shape: "smooth",
    },
    transform: [{ type: "stackY" }],
    scrollbar: {
      x: {
        // 配置项
        ratio: 0.2,
        value: 0.1,
        scrollable: true,
        slidable: true,
        isRound: true,
        position: "top",

        // 滚动条滑快样式
        thumbFillOpacity: 0.2,
        thumbFill: "#000",
        thumbStroke: "#000",

        // 滚动条滑轨样式
        trackFill: "#fa0",
        trackStroke: "#f00",
        trackLineWidth: 2,
        trackFillOpacity: 1,
        trackSize: 14,
        trackLength: 300,
      },
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

### style

`style` 滚动条样式配置，内部做了处理，可以直接在配置项配置样式。具体样式配置，可参考 [滚动条滑块(thumb)](#滚动条滑块(thumb))、[滚动条滑轨(track)](#滚动条滑轨(track))。

#### 滚动条滑块(thumb)

| 属性                       | 描述                   | 类型                   | 默认值 | 必选  |
| -------------------------- | ---------------------- | ---------------------- | ------ |-------|
| thumbFill          | 滚动条滑块填充色       | string               | `#000`      |       |
| thumbFillOpacity   | 滚动条滑块填充色透明度 | number               | `0.15`      |       |
| thumbStroke        | 滚动条滑块描边色       | string               | –      |       |
| thumbLineWidth        | 滚动条滑块描边宽度       | number               | –      |       |
| thumbStrokeOpacity | 滚动条滑块描边色透明度 | number               | –      |       |

```js
({
  scrollbar: {
    x: {
      thumbFill: '#1173a1',
      thumbFillOpacity: 1,
      thumbStroke: 'red',
      thumbLineWidth: 2,
      thumbStrokeOpacity: 0.9,
    },
    y: {},
  },
});
```

#### 滚动条滑轨(track)

| 属性                       | 描述                   | 类型                   | 默认值 | 必选  |
| -------------------------- | ---------------------- | ---------------------- | ------ |-------|
| trackSize          | 滚动条的轨道宽度       | number               | `10`     |       |
| trackLength          | 滚动条的轨道长度       | number               |      |       |
| trackFill          | 滚动条轨道填充色       | string               | -      |       |
| trackFillOpacity   | 滚动条轨道填充色透明度 | number               | `0`      |       |
| trackLineWidth        | 滚动条轨道描边宽度       | number               | –      |       |
| trackStroke        | 滚动条轨道描边色       | string               | –      |       |
| trackStrokeOpacity | 滚动条轨道描边色透明度 | number               | –      |       |

```js
({
  scrollbar: {
    x: {
      trackSize: 20,
      trackLength: 300,
      trackFillOpacity: 1,
      trackFill: 'red',
      trackLineWidth: 2,
      trackStroke: 'red',
      trackStrokeOpacity: 0.4,
    },
    y: {},
  },
});
```

## 事件

| 属性        | 描述                             | 类型          |
| ----------- | -------------------------------- | ------------- |
| valuechange | 发生滚动变化时触发，通过事件监听 | `({detail: { oldValue: any; value: any }}) => void` |

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "interval",
    autoFit: true,
    height: 300,
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv",
    },
    encode: { x: "letter", y: "frequency", y1: 0.000001 },
    scale: { y: { type: "log" } },
    scrollbar: { x: true },
  });

  // render 渲染图表之后
  chart.on('afterrender', () => {
    const { canvas } = chart.getContext();
    const { document } = canvas;
    document.querySelector('.g2-scrollbar').addEventListener('valuechange', (evt) => {
      console.log(evt.detail.oldValue); // 滑动更新前对应数据
      console.log(evt.detail.value); // 更新后对应数据
    });
  });

  chart.render();

  return chart.getContainer();
})();
```
