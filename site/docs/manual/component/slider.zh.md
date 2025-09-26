---
title: 缩略轴（Slider）
order: 7.4
---

## 概述

G2 中**缩略轴（Slider）** 可以用于过滤数据，让用户在数据量较大的情况下一次只用关注局部的数据，是一种辅助看数据的组件。它将大量数据浓缩到一个轴上，既可以缩小宏观看数据全貌，又可以放大微观看数据的片段，同时还可以拖拽观察数据在一定区间内的演变。缩略轴可以和 x 或者 y 通道绑定，用于显示不同方向的缩略轴，缩略轴默认都是关闭的。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const formatter = (dateTimeString) => {
  return new Date(dateTimeString).toLocaleString();
};

chart.options({
  type: 'line',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
  slider: {
    x: {
      labelFormatter: (d) => `${formatter(d)}`,
    },
  },
});

chart.render();
```

### 配置层级

缩略轴支持在不同层级进行配置，不同层级的配置具有不同的作用域和特性。

#### Mark 层级配置

缩略轴可以在 Mark 层级配置。在 G2 中，每个标记（Mark）都有自己的缩略轴。如果标记对应的比例尺是同步的，那么缩略轴也会合并。

```js
({
  type: 'interval',
  slider: {
    x: {},
    y: {},
  },
});
```

**特点：**

- 仅影响当前 Mark
- 适用于需要对特定标记进行独立过滤的场景
- 当多个 Mark 共享同一比例尺时，缩略轴会自动合并

#### View 层级配置

缩略轴也可以在 View 层级配置。缩略轴具有传递性。视图上声明的缩略轴会传递给 `children` 声明的标记，如果该标记有对应通道的缩略轴，就合并；否则不影响。

```js
({
  type: 'view',
  slider: {
    x: {},
    y: {},
  },
});
```

**特点：**

- 影响整个 View 及其子元素
- 适用于需要统一控制多个 Mark 的场景
- 具有传递性，会影响所有子 Mark
- 优先级高于 Mark 层级配置

### 何时使用

缩略轴是值域数据的浓缩，它跟位置通道 `x`, `y` 对应的比例尺的类型息息相关。一般来说时间类型上使用缩略轴的频率高，连续轴使用缩略轴频次低、分类轴几乎不会使用到缩略轴。

<img alt="slider" src="https://user-images.githubusercontent.com/15646325/205075894-09f6b3a7-8cec-4953-af1a-2c466999f598.png" width="600" />

- 时间轴，数据跨度非常大，【高频使用】，比如一组时序数据跨度 10 年，需观察这期间数据变化趋势时，建议开启缩略轴；
- 时间轴，数据密度很高，【高频使用】，比如分钟级更新的实时数据，当需要查看一天内的数据走势时，建议开启缩略轴；
- 连续轴，数据密度很高，【低频使用】比如查看 1-100 岁平均身高分布，开启缩略轴可以全局查看身高分布；
- 分类轴【不建议使用】。

### 使用方式

<img alt="slider" src="https://user-images.githubusercontent.com/15646325/205065555-8ef69242-ae35-4a9b-b7db-f380e82fd544.png" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
  slider: { y: {} }, // 开启 Y 方向缩略轴
});

chart.render();
```

## 配置项

| 属性                   | 描述                                                           | 类型                    | 默认值               | 必选 |
| ---------------------- | -------------------------------------------------------------- | ----------------------- | -------------------- | ---- |
| padding                | 缩略轴内边距                                                   | number \| number[]      | -                    |      |
| values                 | 缩略轴初始选区范围，位于 0 ～ 1 区间                           | [number, number]        | -                    |      |
| slidable               | 是否允许拖动选取和手柄                                         | boolean                 | true                 |      |
| brushable              | 是否启用刷选                                                   | boolean                 | true                 |      |
| labelFormatter         | 缩略轴拖动手柄标签格式化                                       | (value: number)=>string | -                    |      |
| showHandle             | 是否显示拖动手柄                                               | boolean                 | true                 |      |
| showLabel              | 是否显示拖动手柄文本                                           | boolean                 | true                 |      |
| showLabelOnInteraction | 在调整手柄或刷选时才显示手柄文本，在 showLabel 为 false 时生效 | boolean                 | false                |      |
| autoFitLabel           | 是否自动调整拖动手柄文本位置                                   | boolean                 | true                 |      |
| style                  | 配置缩略轴组件的样式                                           | [style](#style)         | 详见 [style](#style) |      |

### style

配置缩略轴组件的样式。

| 属性      | 描述                   | 类型                    | 默认值                       | 必选 |
| --------- | ---------------------- | ----------------------- | ---------------------------- | ---- |
| selection | 配置缩略轴选区的样式   | [selection](#selection) | 详见 [selection](#selection) |      |
| track     | 配置缩略轴滑轨的样式   | [track](#track)         | 详见 [track](#track)         |      |
| handle    | 配置缩略轴手柄的样式   | [handle](#handle)       | 详见 [handle](#handle)       |      |
| sparkline | 配置缩略轴迷你图的样式 | [sparkline](#sparkline) | 详见 [sparkline](#sparkline) |      |

#### selection

配置缩略轴选区的样式 。

| 属性                   | 描述                           | 类型            | 默认值    | 必选 |
| ---------------------- | ------------------------------ | --------------- | --------- | ---- |
| selectionFill          | 缩略轴选区的填充色             | string          | `#1783FF` |      |
| selectionFillOpacity   | 缩略轴选区的填充透明度         | number          | `0.15`    |      |
| selectionStroke        | 缩略轴选区的描边               | string          | -         |      |
| selectionStrokeOpacity | 缩略轴选区的描边透明度         | number          | -         |      |
| selectionLineWidth     | 缩略轴选区的描边宽度           | number          | -         |      |
| selectionLineDash      | 缩略轴选区描边的虚线配置       | [number,number] | -         |      |
| selectionOpacity       | 缩略轴选区的整体透明度         | number          | -         |      |
| selectionShadowColor   | 缩略轴选区的阴影颜色           | string          | -         |      |
| selectionShadowBlur    | 缩略轴选区阴影的高斯模糊系数   | number          | -         |      |
| selectionShadowOffsetX | 设置阴影距缩略轴选区的水平距离 | number          | -         |      |
| selectionShadowOffsetY | 设置阴影距缩略轴选区的垂直距离 | number          | -         |      |
| selectionCursor        | 缩略轴选区的鼠标样式           | string          | `default` |      |

在 Slider 组件中配置选区样式的时候，不是以对象的形式来配置，而是以 `selection`前缀加属性的方式来配置。

```js
({
  slider: {
    x: {
      selectionFill: '#000',
      selectionFillOpacity: 0.9,
      selectionStroke: '#DAF5EC',
      selectionStrokeOpacity: 0.9,
      selectionLineWidth: 2,
      selectionLineDash: [4, 8],
      selectionOpacity: 1,
      selectionShadowColor: '#d3d3d3',
      selectionShadowBlur: 10,
      selectionShadowOffsetX: 10,
      selectionShadowOffsetY: 10,
      selectionCursor: 'pointer',
    },
  },
});
```

#### track

配置缩略轴滑轨的样式 。

| 属性               | 描述                           | 类型            | 默认值    | 必选 |
| ------------------ | ------------------------------ | --------------- | --------- | ---- |
| trackLength        | 缩略轴滑轨的长度               | number          | -         |      |
| trackSize          | 缩略轴滑轨的尺寸               | number          | `16`      |      |
| trackFill          | 缩略轴滑轨的填充色             | string          | `#416180` |      |
| trackFillOpacity   | 缩略轴滑轨的填充透明度         | number          | `1`       |      |
| trackStroke        | 缩略轴滑轨的描边               | string          | -         |      |
| trackStrokeOpacity | 缩略轴滑轨的描边透明度         | number          | -         |      |
| trackLineWidth     | 缩略轴滑轨的描边宽度           | number          | -         |      |
| trackLineDash      | 缩略轴滑轨描边的虚线配置       | [number,number] | -         |      |
| trackOpacity       | 缩略轴滑轨的整体透明度         | number          | -         |      |
| trackShadowColor   | 缩略轴滑轨的阴影颜色           | string          | -         |      |
| trackShadowBlur    | 缩略轴滑轨阴影的高斯模糊系数   | number          | -         |      |
| trackShadowOffsetX | 设置阴影距缩略轴滑轨的水平距离 | number          | -         |      |
| trackShadowOffsetY | 设置阴影距缩略轴滑轨的垂直距离 | number          | -         |      |
| trackCursor        | 缩略轴滑轨的鼠标样式           | string          | `default` |      |

在 Slider 组件中配置选区样式的时候，不是以对象的形式来配置，而是以 `track`前缀加属性的方式来配置。

```js
({
  slider: {
    x: {
      trackSize: 20,
      trackFill: '#000',
      trackFillOpacity: 0.9,
      trackStroke: '#DAF5EC',
      trackStrokeOpacity: 0.9,
      trackLineWidth: 2,
      trackLineDash: [4, 8],
      trackOpacity: 1,
      trackShadowColor: '#d3d3d3',
      trackShadowBlur: 10,
      trackShadowOffsetX: 10,
      trackShadowOffsetY: 10,
      trackCursor: 'pointer',
    },
  },
});
```

#### handle

配置缩略轴手柄的样式。

| 属性                     | 描述                                                                                                                     | 类型                                                       | 默认值    | 必选 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | --------- | ---- |
| handleLabelFontSize      | 手柄标签的文字大小                                                                                                       | number                                                     | `12`      |      |
| handleLabelFontFamily    | 手柄标签的文字字体                                                                                                       | string                                                     | -         |      |
| handleLabelFontWeight    | 手柄标签的字体粗细                                                                                                       | number                                                     | `normal`  |      |
| handleLabelLineHeight    | 手柄标签文字的行高                                                                                                       | number                                                     | -         |      |
| handleLabelTextAlign     | 设置手柄标签文字的水平对齐方式                                                                                           | `center` \| `end` \| `left` \| `right` \| `start`          | `start`   |      |
| handleLabelTextBaseline  | 设置手柄标签文字的垂直基线                                                                                               | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging` | `bottom`  |      |
| handleLabelFill          | 手柄标签的文字填充色                                                                                                     | string                                                     | `#1D2129` |      |
| handleLabelFillOpacity   | 手柄标签的文字填充透明度                                                                                                 | number                                                     | `0.45`    |      |
| handleLabelStroke        | 手柄标签的文字描边                                                                                                       | string                                                     | -         |      |
| handleLabelStrokeOpacity | 手柄标签的文字描边透明度                                                                                                 | number                                                     | -         |      |
| handleLabelLineWidth     | 手柄标签文字的描边宽度                                                                                                   | number                                                     | -         |      |
| handleLabelLineDash      | 手柄标签文字描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number , number]                                          | -         |      |
| handleLabelOpacity       | 手柄标签文字的整体透明度                                                                                                 | number                                                     | -         |      |
| handleLabelShadowColor   | 手柄标签的文字阴影颜色                                                                                                   | string                                                     | -         |      |
| handleLabelShadowBlur    | 手柄标签文字阴影的高斯模糊系数                                                                                           | number                                                     | -         |      |
| handleLabelShadowOffsetX | 设置阴影距手柄标签文字的水平距离                                                                                         | number                                                     | -         |      |
| handleLabelShadowOffsetY | 设置阴影距手柄标签文字的垂直距离                                                                                         | number                                                     | -         |      |
| handleLabelCursor        | 手柄标签的鼠标样式                                                                                                       | string                                                     | `default` |      |
| handleLabelDx            | 手柄标签文字在水平方向的偏移量                                                                                           | number                                                     | 0         |      |
| handleLabelDy            | 手柄标签文字在垂直方向的偏移量                                                                                           | number                                                     | 0         |      |
| handleIconRadius         | 手柄图标的圆角                                                                                                           | number                                                     | `2`       |      |
| handleIconSize           | 手柄图标的尺寸                                                                                                           | number                                                     | `10`      |      |
| handleIconFill           | 手柄图标的填充色                                                                                                         | string                                                     | `#f7f7f7` |      |
| handleIconFillOpacity    | 手柄图标的填充透明度                                                                                                     | number                                                     | `1`       |      |
| handleIconStroke         | 手柄图标的描边                                                                                                           | string                                                     | `#1D2129` |      |
| handleIconStrokeOpacity  | 手柄图标的描边透明度                                                                                                     | number                                                     | `0.25`    |      |
| handleIconLineWidth      | 手柄图标的描边宽度                                                                                                       | number                                                     | `1`       |      |
| handleIconLineDash       | 手柄图标描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。     | [number , number]                                          | -         |      |
| handleIconOpacity        | 手柄图标的整体透明度                                                                                                     | number                                                     | -         |      |
| handleIconShadowColor    | 手柄图标的阴影颜色                                                                                                       | string                                                     | -         |      |
| handleIconShadowBlur     | 手柄图标阴影的高斯模糊系数                                                                                               | number                                                     | -         |      |
| handleIconShadowOffsetX  | 设置阴影距手柄图标的水平距离                                                                                             | number                                                     | -         |      |
| handleIconShadowOffsetY  | 设置阴影距手柄图标的垂直距离                                                                                             | number                                                     | -         |      |
| handleIconCursor         | 手柄图标的鼠标样式                                                                                                       | string                                                     | `default` |      |

在 Slider 组件中配置滑动手柄属性的时候，不是以对象的形式来配置，而是以 `handle`前缀加属性的方式来配置。

```js
({
  slider: {
    x: {
      //配置handleLabel的绘图属性
      handleLabelFontSize: 16,
      handleLabelFontFamily: 'sans-serif',
      handleLabelFontWeight: 500,
      handleLabelLineHeight: 20,
      handleLabelTextAlign: 'center',
      handleLabelTextBaseline: 'middle',
      handleLabelFill: '#000',
      handleLabelFillOpacity: 0.9,
      handleLabelStroke: '#DAF5EC',
      handleLabelStrokeOpacity: 0.9,
      handleLabelLineWidth: 2,
      handleLabelLineDash: [4, 8],
      handleLabelOpacity: 1,
      handleLabelShadowColor: '#d3d3d3',
      handleLabelShadowBlur: 10,
      handleLabelShadowOffsetX: 10,
      handleLabelShadowOffsetY: 10,
      handleLabelCursor: 'pointer',

      handleIconSize: 50,
      // 配置handleIcon的绘图属性
      handleIconFill: '#000',
      handleIconFillOpacity: 0.9,
      handleIconStroke: '#DAF5EC',
      handleIconStrokeOpacity: 0.9,
      handleIconLineWidth: 2,
      handleIconLineDash: [4, 8],
      handleIconOpacity: 1,
      handleIconShadowColor: '#d3d3d3',
      handleIconShadowBlur: 10,
      handleIconShadowOffsetX: 10,
      handleIconShadowOffsetY: 10,
      handleIconCursor: 'pointer',
    },
  },
});
```

#### sparkline

配置缩略轴迷你图的样式。

| 属性                       | 描述                                                                                                                      | 类型                                          | 默认值 | 必选 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------ | ---- |
| sparklineType              | 迷你图类型：折线图、直方图                                                                                                | `line` \| `column`                            | `line` |      |
| sparklineIsStack           | 是否对数据进行堆叠                                                                                                        | boolean                                       | false  |      |
| sparklineRange             | 指定值范围，未指定时将使用 data 的最小值和最大值                                                                          | [number, number]                              | -      |      |
| sparklineColor             | 指定颜色                                                                                                                  | string \| string[] \| (index: number)=>string | -      |      |
| sparklineSmooth            | 适用于折线图，平滑曲线                                                                                                    | boolean                                       | false  |      |
| sparklineLineStroke        | 适用于折线图，线的颜色                                                                                                    | string                                        | -      |      |
| sparklineLineStrokeOpacity | 适用于折线图，线的透明度                                                                                                  | number                                        | -      |      |
| sparklineLineLineDash      | 适用于折线图，线的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | [number,number]                               | -      |      |
| sparklineAreaFill          | 适用于折线图，填充区域的颜色                                                                                              | string                                        | -      |      |
| sparklineAreaFillOpacity   | 适用于折线图，填充区域的透明度                                                                                            | number                                        | -      |      |
| sparklineColumnFill        | 适用于直方图，条形的颜色                                                                                                  | string                                        | -      |      |
| sparklineColumnFillOpacity | 适用于直方图，条形的透明度                                                                                                | number                                        | -      |      |
| sparklineIsGroup           | 适用于直方图，是否分组显示                                                                                                | boolean                                       | false  |      |
| sparklineSpacing           | 适用于直方图，分组直方的间距                                                                                              | number                                        | `0`    |      |

在 Slider 组件中配置迷你图属性的时候，不是以对象的形式来配置，而是以 `sparkline`前缀加属性的方式来配置。

```js
({
  slider: {
    x: {
      sparklineType: 'line',
      sparklineColor: 'red',
    },
  },
});
```

### 事件

| 属性        | 描述                             | 类型                                  |
| ----------- | -------------------------------- | ------------------------------------- |
| valuechange | 选区发生变化时触发，通过事件监听 | `({detail: { value: any; }}) => void` |

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .line()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  })
  .encode('x', 'date')
  .encode('y', 'close')
  // 开启 X 轴缩略轴
  .slider('x', {});

chart.on('afterrender', () => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  document.querySelector('.slider').addEventListener('valuechange', (evt) => {
    console.info(evt.detail);
  });
});

chart.render();
```

## 自适应过滤

缩略轴不仅可以用于数据过滤，还支持自适应过滤功能。当拖拽缩略轴时，根据当前选择的数据范围自动调整其他轴的显示范围，提供更好的数据探索体验。

### 重要说明

**自适应策略需要在 `sliderFilter` 交互中配置，而不是在 `slider` 组件中配置。** 从 G2 5.4.1 开始，当你配置 `slider` 组件时，会自动启用自适应过滤功能，如果不需要自适应，需要手动关闭。

### 配置方式

#### 1. 默认自适应（推荐）

配置 slider 组件时，默认启用自适应过滤：

```javascript
// 默认情况下会自动启用自适应过滤
chart.options(
  slider:{
    x:{}
  }
);
```

#### 2. 手动配置 sliderFilter

如需自定义自适应策略，在 `sliderFilter` 交互中配置：

```javascript
chart.options(
  slider:{
    x:{}
  },
  interaction:{
    sliderFilter:{
      adaptiveMode: 'filter', // 启用自适应
    }
  }
);
```

#### 3. 手动关闭自适应

如果不需要自适应功能，需要显式关闭：

```javascript
chart.options(
  slider:{
    x:{}
  },
  interaction:{
    sliderFilter:{
      adaptiveMode: false  // 手动关闭自适应
    }
  }
);
```

### 自适应模式参数

通过 `sliderFilter` 交互中的 `adaptiveMode` 配置项可以控制自适应过滤的行为：

```js
{
  slider: {
    x: { values: [0.1, 0.8] }
  },
  interaction: {
    sliderFilter: {
      adaptiveMode: 'filter'  // 启用自适应过滤（默认值）
      // adaptiveMode: false   // 禁用自适应过滤
    }
  }
}
```

**可选值：**

- `'filter'`：启用自适应过滤，根据选定数据范围动态调整其他轴的域值（**默认值**）
- `false` 或 `null`：禁用自适应过滤
- 更多的自适应策略会在后续版本推出，敬请期待。

### 具体场景

系统会根据不同的配置场景采用不同的自适应策略。在单轴的情况下，slider 配置在 View 层 或 Mark 层效果一样。但在多轴图中，会有不同的自适应策略：

- **多轴自适应**：当图表中存在独立的坐标轴（通过 `scale: { y: { independent: true }}` 配置）时，会启用多轴自适应策略。根据 slider 配置的层级，会有不同的自适应策略。

  - **View 层级配置**：影响整个视图中的所有 Mark，适用于需要统一控制多个图表的场景
  - **Mark 层级配置**：仅影响特定的 Mark，适用于需要对某个特定标记进行独立过滤的场景

- **自适应计算逻辑**：通过收集所有 marks 的通道数据，调用指定的过滤逻辑进行自适应过滤计算，根据当前筛选范围动态计算 Y 轴的 domain 范围，确保显示的数据范围始终合理。

#### 单轴自适应

当只有 X 轴或只有 Y 轴配置了缩略轴时，会启用单轴自适应过滤。拖拽缩略轴时，会根据当前选择的数据范围自动调整另一个轴的显示范围。

#### 单 Mark 场景

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [];
for (let i = 0; i < 150; i++) {
  data.push({
    x: i,
    y: Math.sin(i / 15) * 60 + 80 + Math.random() * 25,
    category: i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C',
  });
}

chart.options({
  type: 'point',
  data,
  encode: { x: 'x', y: 'y', color: 'category' },
  slider: {
    x: {
      values: [0.1, 0.8],
      labelFormatter: (d) => `X: ${Math.round(d)}`,
    },
  },
  style: {
    fillOpacity: 0.8,
  },
});

chart.render();
```

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', autoFit: true });

chart.options({
  type: 'view',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/stocks.json',
    transform: [{ type: 'filter', callback: (d) => d.symbol === 'GOOG' }],
  },
  slider: {
    x: {},
  },
  children: [
    {
      type: 'area',
      encode: { x: (d) => new Date(d.date), y: 'price' },
      style: { fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)' },
    },
    {
      type: 'line',
      encode: { x: (d) => new Date(d.date), y: 'price' },
      style: { stroke: 'darkgreen', lineWidth: 2 },
    },
  ],
});

chart.render();
```

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';
import { randomPoisson } from 'd3-random';

const random = randomPoisson(Math.pow(10, 2.6));
const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'rect',
  data: new Array(5000).fill(0).map(random),
  encode: { x: (d) => d },
  transform: [{ type: 'binX', y: 'count' }],
  style: { stroke: 'white' },
  slider: { x: {} },
  tooltip: {
    title: (d, i, data, column) => ({
      value: `${column.x.value[i]} ~ ${column.x1.value[i]}`,
    }),
  },
});

chart.render();
```

##### 多 Mark 场景

单轴场景下，slider 配置在 View 层 或 Mark 层效果一样。

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  inset: 3, // 设置内边距，防止自适应过程中 point被截断
});

const data = [
  { time: 0, sales: 200, profit: 150, revenue: 600 }, // 起始高值
  { time: 1, sales: 195, profit: 145, revenue: 580 },
  { time: 2, sales: 190, profit: 140, revenue: 560 },
  { time: 3, sales: 185, profit: 135, revenue: 540 },
  { time: 4, sales: 180, profit: 130, revenue: 520 },
  { time: 5, sales: 175, profit: 125, revenue: 500 },
  { time: 6, sales: 170, profit: 120, revenue: 480 },
  { time: 7, sales: 165, profit: 115, revenue: 460 },
  { time: 8, sales: 160, profit: 110, revenue: 440 },
  { time: 9, sales: 155, profit: 105, revenue: 420 },
  { time: 10, sales: 150, profit: 100, revenue: 400 },
  { time: 11, sales: 145, profit: 95, revenue: 380 },
  { time: 12, sales: 140, profit: 90, revenue: 360 },
  { time: 13, sales: 135, profit: 85, revenue: 340 },
  { time: 14, sales: 130, profit: 80, revenue: 320 },
  { time: 15, sales: 125, profit: 75, revenue: 300 },
  { time: 16, sales: 120, profit: 70, revenue: 280 },
  { time: 17, sales: 115, profit: 65, revenue: 260 },
  { time: 18, sales: 110, profit: 60, revenue: 240 },
  { time: 19, sales: 105, profit: 55, revenue: 220 },
  { time: 20, sales: 100, profit: 50, revenue: 200 },
  { time: 21, sales: 95, profit: 45, revenue: 180 },
  { time: 22, sales: 90, profit: 40, revenue: 160 },
  { time: 23, sales: 85, profit: 35, revenue: 140 },
  { time: 24, sales: 80, profit: 30, revenue: 120 },
];

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'line',
      encode: { x: 'time', y: 'sales' },
      style: { stroke: '#1890ff', lineWidth: 2 },
    },
    {
      type: 'line',
      encode: { x: 'time', y: 'profit' },
      style: { stroke: '#52c41a', lineWidth: 2 },
    },
    {
      type: 'point',
      encode: { x: 'time', y: 'revenue', size: 3 },
      style: { fill: '#ff4d4f' },
    },
  ],
  slider: {
    x: {
      labelFormatter: (d) => `时间: ${Math.round(d)}`,
    },
  },
});

chart.render();
```

#### 多轴自适应（独立坐标轴）

当图表中存在独立的坐标轴（通过 `scale: { independent: true }` 配置）时，系统会采用多轴自适应策略。根据 slider 的配置层级，会有不同的自适应策略。

##### 1. View 层级 slider

影响整个视图中的所有 Mark，适用于需要统一控制多个图表的场景

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [];
for (let i = 0; i < 60; i++) {
  data.push({
    date: `Day-${i + 1}`,
    sales: Math.sin(i / 10) * 300 + 800 + Math.random() * 200,
    profit: Math.cos(i / 8) * 50 + 75 + Math.random() * 25,
    revenue: Math.sin(i / 12) * 800 + 1500 + Math.random() * 300,
  });
}

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'interval',
      encode: { x: 'date', y: 'sales' },
      scale: { y: { nice: true } },
      style: { fill: '#1890ff', fillOpacity: 0.6 },
    },
    {
      type: 'line',
      encode: { x: 'date', y: 'profit' },
      scale: {
        y: {
          key: 'y1',
          independent: true,
          nice: true,
        },
      },
      style: { stroke: '#ff4d4f', lineWidth: 3 },
    },
    {
      type: 'area',
      encode: { x: 'date', y: 'revenue' },
      scale: {
        y: {
          key: 'y2',
          independent: true,
          nice: true,
        },
      },
      style: { fill: '#52c41a', fillOpacity: 0.4 },
    },
  ],
  // View 层级配置缩略轴，自适应同时影响所有轴
  slider: {
    x: {
      labelFormatter: (d) => d,
    },
  },
});

chart.render();
```

##### 1. Mark 层级 slider

当缩略轴配置在特定 Mark 上时，系统会识别该 Mark 对应的轴，并对共享相同轴的所有 Mark 进行联动自适应。

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [];
for (let i = 0; i < 60; i++) {
  data.push({
    date: `Day-${i + 1}`,
    sales: Math.sin(i / 10) * 300 + 800 + Math.random() * 200,
    profit: Math.cos(i / 8) * 50 + 75 + Math.random() * 25,
    revenue: Math.sin(i / 12) * 800 + 1500 + Math.random() * 300,
  });
}

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'interval',
      encode: { x: 'date', y: 'sales' },
      scale: { y: { nice: true } },
      style: { fill: '#1890ff', fillOpacity: 0.6 },
      // Mark 层级 slider，自适应只作用于当前 mark 对应的轴
      slider: {
        x: {
          labelFormatter: (d) => d,
        },
      },
    },
    {
      type: 'line',
      encode: { x: 'date', y: 'profit' },
      scale: {
        y: {
          key: 'y1',
          independent: true,
          nice: true,
        },
      },
      style: { stroke: '#ff4d4f', lineWidth: 3 },
    },
    {
      type: 'area',
      encode: { x: 'date', y: 'revenue' },
      scale: {
        y: {
          key: 'y2',
          independent: true,
          nice: true,
        },
      },
      style: { fill: '#52c41a', fillOpacity: 0.4 },
    },
  ],
});

chart.render();
```

### 自适应特性

#### 离散轴与连续轴

- **连续轴**：自适应时会计算数据的最小值和最大值，形成新的域值范围
- **离散轴**：自适应时会收集所有在范围内的离散值，去重后作为新的域值
- **零基线保持**：对于原始域值包含 0 的连续轴，自适应时会保持零基线

#### 双向联动

如果 X 轴与 Y 轴都配置了缩略轴，即使配置了自适应策略，也不会生效。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [];
for (let i = 0; i < 300; i++) {
  const x = Math.random() * 100;
  const y = x * 0.7 + Math.random() * 30 + 10;
  data.push({
    x,
    y,
    size: Math.random() * 8 + 3,
    category: Math.random() > 0.5 ? 'A' : 'B',
  });
}

chart.options({
  type: 'point',
  data,
  encode: {
    x: 'x',
    y: 'y',
    size: 'size',
    color: 'category',
  },
  // 同时配置 X 和 Y 轴缩略轴，此时自适应不会生效
  slider: {
    x: {
      values: [0.2, 0.8],
      labelFormatter: (d) => `X: ${Math.round(d)}`,
    },
    y: {
      values: [0.1, 0.9],
      labelFormatter: (d) => `Y: ${Math.round(d)}`,
    },
  },
  scale: {
    x: { nice: true },
    y: { nice: true },
  },
  style: {
    fillOpacity: 0.7,
  },
});

chart.render();
```

## 示例

### 自定义缩略轴（Slider）

如果不希望使用 G2 默认的缩略轴，就可以按照以下几步自定义：

- 在渲染结束后渲染 slider。
- 监听 slider 事件。

第一步的的关键是通过 `chart.getCoordinate` 获得的 coordinate 对象确定 slider 的位置和长度。第二步的关键是通过 `chart.getScale` 获得 scale 对选择的范围进行 invert，最后获得选择的数据范围，然后更新 scale 的定义域。

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
const container = chart.getContainer();

function sliderX(chart) {
  // 创建并且挂载 range
  const container = chart.getContainer();
  const range = document.createElement('input');
  container.append(range);

  // 根据 coordinate 设置 range 的宽度等属性
  const coordinate = chart.getCoordinate();
  const { paddingLeft, width } = coordinate.getOptions();
  range.type = 'range';
  range.min = 0;
  range.max = width;
  range.value = width;
  range.style.display = 'block';
  range.style.width = width + 'px';
  range.style.marginLeft = paddingLeft + 'px';

  // 监听 change 事件，通过 scale 获得筛选得到的 domain
  // 更新 domain 并且渲染
  const scale = chart.getScaleByChannel('x');
  const options = chart.options();
  range.onchange = (event) => {
    const value = event.target.value;
    const range = [0, value / width];
    const domain = range.map((d) => scale.invert(d));
    chart.options({
      ...options,
      scale: { x: { domain } },
    });
    chart.render();
  };
}

// 渲染图表
chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
});

chart.render().then(sliderX);
```

#### Mark 层级配置示例

Mark 层级配置仅影响特定的 Mark，适用于需要对某个特定标记进行独立过滤的场景：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart2 = new Chart({
  container: 'container',
  autoFit: true,
});

// 标准的G2数据结构 - 不同类型的数据，添加极高值展示自适应效果
const data2 = [
  { category: 'A', time: 0, value: 45, type: 'primary' },
  { category: 'A', time: 1, value: 52, type: 'primary' },
  { category: 'A', time: 2, value: 48, type: 'primary' },
  { category: 'A', time: 3, value: 10, type: 'primary' },
  { category: 'A', time: 4, value: 55, type: 'primary' },
  { category: 'A', time: 5, value: 67, type: 'primary' },
  { category: 'A', time: 6, value: 43, type: 'primary' },
  { category: 'A', time: 7, value: 66, type: 'primary' },
  { category: 'A', time: 8, value: 63, type: 'primary' },
  { category: 'A', time: 9, value: 71, type: 'primary' },
  { category: 'A', time: 10, value: 58, type: 'primary' },
  { category: 'A', time: 11, value: 44, type: 'primary' },
  { category: 'A', time: 12, value: 49, type: 'primary' },
  { category: 'A', time: 13, value: 66, type: 'primary' },
  { category: 'A', time: 14, value: 54, type: 'primary' },
  { category: 'B', time: 0, value: 32, type: 'secondary' },
  { category: 'B', time: 1, value: 38, type: 'secondary' },
  { category: 'B', time: 2, value: 29, type: 'secondary' },
  { category: 'B', time: 3, value: 44, type: 'secondary' },
  { category: 'B', time: 4, value: 41, type: 'secondary' },
  { category: 'B', time: 5, value: 20, type: 'secondary' },
  { category: 'B', time: 6, value: 28, type: 'secondary' },
  { category: 'B', time: 7, value: 39, type: 'secondary' },
  { category: 'B', time: 8, value: 35, type: 'secondary' },
  { category: 'B', time: 9, value: 48, type: 'secondary' },
  { category: 'B', time: 10, value: 35, type: 'secondary' },
  { category: 'B', time: 11, value: 42, type: 'secondary' },
  { category: 'B', time: 12, value: 31, type: 'secondary' },
  { category: 'B', time: 13, value: 45, type: 'secondary' },
  { category: 'B', time: 14, value: 37, type: 'secondary' },
  { category: 'C', time: 0, value: 28, type: 'tertiary' },
  { category: 'C', time: 1, value: 31, type: 'tertiary' },
  { category: 'C', time: 2, value: 25, type: 'tertiary' },
  { category: 'C', time: 3, value: 35, type: 'tertiary' },
  { category: 'C', time: 4, value: 185, type: 'tertiary' }, // 极高值
  { category: 'C', time: 5, value: 38, type: 'tertiary' },
  { category: 'C', time: 6, value: 22, type: 'tertiary' },
  { category: 'C', time: 7, value: 29, type: 'tertiary' },
  { category: 'C', time: 8, value: 45, type: 'tertiary' },
  { category: 'C', time: 9, value: 36, type: 'tertiary' },
  { category: 'C', time: 10, value: 31, type: 'tertiary' },
  { category: 'C', time: 11, value: 27, type: 'tertiary' },
  { category: 'C', time: 12, value: 105, type: 'tertiary' }, // 极高值
  { category: 'C', time: 13, value: 33, type: 'tertiary' },
  { category: 'C', time: 14, value: 29, type: 'tertiary' },
];

chart2.options({
  type: 'view',
  data: data2,
  children: [
    {
      type: 'interval',
      data: {
        value: data2,
        transform: [{ type: 'filter', callback: (d) => d.type === 'primary' }],
      },
      encode: { x: 'time', y: 'value' },
      style: { fill: '#1890ff', fillOpacity: 0.6 },
      // Mark 层级配置 - 仅控制柱状图的过滤
      slider: {
        x: {
          values: [0.2, 0.7],
          labelFormatter: (d) => `柱状图: ${Math.round(d)}`,
        },
      },
    },
    {
      type: 'line',
      data: {
        value: data2,
        transform: [
          { type: 'filter', callback: (d) => d.type === 'secondary' },
        ],
      },
      encode: { x: 'time', y: 'value' },
      style: { stroke: '#52c41a', lineWidth: 2 },
    },
    {
      type: 'point',
      data: {
        value: data2,
        transform: [{ type: 'filter', callback: (d) => d.type === 'tertiary' }],
      },
      encode: { x: 'time', y: 'value', size: 4 },
      style: { fill: '#ff4d4f', fillOpacity: 0.8 },
    },
  ],
  scale: {
    x: { nice: true },
    y: { nice: true },
  },
});

chart2.render();
```
