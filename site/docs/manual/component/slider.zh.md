---
title: 缩略轴（Slider）
order: 7.4
---

## 概述

G2 中**缩略轴（Slider）** 可以用于过滤数据，让用户在数据量较大的情况下一次只用关注局部的数据，是一种辅助看数据的组件。它将大量数据浓缩到一个轴上，既可以缩小宏观看数据全貌，又可以放大微观看数据的片段，同时还可以拖拽观察数据在一定区间内的演变。缩略轴可以和 x 或者 y 通道绑定，用于显示不同方向的缩略轴，缩略轴默认都是关闭的。

```js | ob
(() => {
  const chart = new G2.Chart();

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

  return chart.getContainer();
})();
```

### 配置层级

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

| 属性                   | 描述                   | 类型            | 默认值    | 必选 |
| ---------------------- | ---------------------- | --------------- | --------- | ---- |
| selectionFill          | 缩略轴选区填充颜色     | string          | `#1783FF` |      |
| selectionFillOpacity   | 缩略轴选区填充透明度   | number          | `0.15`    |      |
| selectionStroke        | 缩略轴选区描边颜色     | string          | -         |      |
| selectionStrokeOpacity | 缩略轴选区描边透明度   | number          | -         |      |
| selectionLineWidth     | 缩略轴选区描边宽度     | number          | -         |      |
| selectionLineDash      | 缩略轴选区描边虚线配置 | [number,number] | -         |      |
| selectionOpacity       | 缩略轴选区整体透明度   | number          | -         |      |
| selectionShadowColor   | 缩略轴选区阴影颜色     | string          | -         |      |
| selectionShadowBlur    | 缩略轴选区阴影模糊系数 | number          | -         |      |
| selectionShadowOffsetX | 缩略轴选区阴影水平偏移 | number          | -         |      |
| selectionShadowOffsetY | 缩略轴选区阴影垂直偏移 | number          | -         |      |
| selectionCursor        | 缩略轴选区鼠标样式     | string          | `default` |      |

在 Slider 组件中配置选区样式的时候，不是以对象的形式来配置，而是以 `selection`前缀加属性的方式来配置。

```js
({
  slider: {
    x: {
      // 不写在style里也行，G2内部做了兼容
      style: {
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
  },
});
```

#### track

配置缩略轴滑轨的样式 。

| 属性               | 描述                   | 类型            | 默认值    | 必选 |
| ------------------ | ---------------------- | --------------- | --------- | ---- |
| trackLength        | 缩略轴滑轨长度         | number          | -         |      |
| trackSize          | 缩略轴滑轨尺寸         | number          | `16`      |      |
| trackFill          | 缩略轴滑轨填充颜色     | string          | `#416180` |      |
| trackFillOpacity   | 缩略轴滑轨填充透明度   | number          | `1`       |      |
| trackStroke        | 缩略轴滑轨描边颜色     | string          | -         |      |
| trackStrokeOpacity | 缩略轴滑轨描边透明度   | number          | -         |      |
| trackLineWidth     | 缩略轴滑轨描边宽度     | number          | -         |      |
| trackLineDash      | 缩略轴滑轨描边虚线配置 | [number,number] | -         |      |
| trackOpacity       | 缩略轴滑轨整体透明度   | number          | -         |      |
| trackShadowColor   | 缩略轴滑轨阴影颜色     | string          | -         |      |
| trackShadowBlur    | 缩略轴滑轨阴影模糊系数 | number          | -         |      |
| trackShadowOffsetX | 缩略轴滑轨阴影水平偏移 | number          | -         |      |
| trackShadowOffsetY | 缩略轴滑轨阴影垂直偏移 | number          | -         |      |
| trackCursor        | 缩略轴滑轨鼠标样式     | string          | `default` |      |

在 Slider 组件中配置选区样式的时候，不是以对象的形式来配置，而是以 `track`前缀加属性的方式来配置。

```js
({
  slider: {
    x: {
      // 不写在style里也行，G2内部做了兼容
      style: {
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
  },
});
```

#### handle

配置缩略轴手柄的样式。

| 属性                     | 描述                                                                                                                     | 类型                                                       | 默认值    | 必选 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | --------- | ---- |
| handleLabelFontSize      | 手柄标签文字大小                                                                                                         | number                                                     | `12`      |      |
| handleLabelFontFamily    | 手柄标签文字字体                                                                                                         | string                                                     | -         |      |
| handleLabelFontWeight    | 手柄标签字体粗细                                                                                                         | number                                                     | `normal`  |      |
| handleLabelLineHeight    | 手柄标签文字的行高                                                                                                       | number                                                     | -         |      |
| handleLabelTextAlign     | 设置手柄标签文本内容的当前对齐方式                                                                                       | `center` \| `end` \| `left` \| `right` \| `start`          | `start`   |      |
| handleLabelTextBaseline  | 设置在绘制手柄标签文本时使用的当前文本基线                                                                               | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging` | `bottom`  |      |
| handleLabelFill          | 手柄标签字体颜色                                                                                                         | string                                                     | `#1D2129` |      |
| handleLabelFillOpacity   | 手柄标签字体颜色透明度                                                                                                   | number                                                     | `0.45`    |      |
| handleLabelStroke        | 手柄标签字体描边颜色                                                                                                     | string                                                     | -         |      |
| handleLabelStrokeOpacity | 手柄标签字体描边颜色透明度                                                                                               | number                                                     | -         |      |
| handleLabelLineWidth     | 手柄标签字体描边的宽度                                                                                                   | number                                                     | -         |      |
| handleLabelLineDash      | 手柄标签字体描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number , number]                                          | -         |      |
| handleLabelOpacity       | 手柄标签文字的整体透明度                                                                                                 | number                                                     | -         |      |
| handleLabelShadowColor   | 手柄标签文字阴影颜色                                                                                                     | string                                                     | -         |      |
| handleLabelShadowBlur    | 手柄标签文字阴影的高斯模糊系数                                                                                           | number                                                     | -         |      |
| handleLabelShadowOffsetX | 设置阴影距手柄标签文字的水平距离                                                                                         | number                                                     | -         |      |
| handleLabelShadowOffsetY | 设置阴影距手柄标签文字的垂直距离                                                                                         | number                                                     | -         |      |
| handleLabelCursor        | 手柄标签鼠标样式。同 css 的鼠标样式                                                                                      | string                                                     | `default` |      |
| handleIconRadius         | 手柄图标尺圆角                                                                                                           | number                                                     | `2`       |      |
| handleIconSize           | 手柄图标尺寸                                                                                                             | number                                                     | `10`      |      |
| handleIconFill           | 手柄图标填充色                                                                                                           | string                                                     | `#f7f7f7` |      |
| handleIconFillOpacity    | 手柄图标填充透明度                                                                                                       | number                                                     | `1`       |      |
| handleIconStroke         | 手柄图标的描边                                                                                                           | string                                                     | `#1D2129` |      |
| handleIconStrokeOpacity  | 手柄图标描边透明度                                                                                                       | number                                                     | `0.25`    |      |
| handleIconLineWidth      | 手柄图标描边的宽度                                                                                                       | number                                                     | `1`       |      |
| handleIconLineDash       | 手柄图标描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。     | [number , number]                                          | -         |      |
| handleIconOpacity        | 手柄图标的整体透明度                                                                                                     | number                                                     | -         |      |
| handleIconShadowColor    | 手柄图标阴影颜色                                                                                                         | string                                                     | -         |      |
| handleIconShadowBlur     | 手柄图标阴影的高斯模糊系数                                                                                               | number                                                     | -         |      |
| handleIconShadowOffsetX  | 设置阴影距手柄图标的水平距离                                                                                             | number                                                     | -         |      |
| handleIconShadowOffsetY  | 设置阴影距手柄图标的垂直距离                                                                                             | number                                                     | -         |      |
| handleIconCursor         | 手柄图标鼠标样式。同 css 的鼠标样式。                                                                                    | string                                                     | `default` |      |

在 Slider 组件中配置滑动手柄属性的时候，不是以对象的形式来配置，而是以 `handle`前缀加属性的方式来配置。

```js
({
  slider: {
    x: {
      // 不写在style里也行，G2内部做了兼容
      style: {
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
  },
});
```

#### sparkline

配置缩略轴迷你图的样式。

| 属性                       | 描述                                                                                                                        | 类型                                          | 默认值 | 必选 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------ | ---- |
| sparklineType              | 迷你图类型：折线图、直方图                                                                                                  | `line` \| `column`                            | `line` |      |
| sparklineIsStack           | 是否对数据进行堆叠                                                                                                          | boolean                                       | false  |      |
| sparklineRange             | 指定值范围，未指定时将使用 data 的最小值和最大值                                                                            | [number, number]                              | -      |      |
| sparklineColor             | 指定颜色                                                                                                                    | string \| string[] \| (index: number)=>string | -      |      |
| sparklineSmooth            | 适用于折线图，平滑曲线                                                                                                      | boolean                                       | false  |      |
| sparklineLineStroke        | 适用于折线图，线条颜色                                                                                                      | string                                        | -      |      |
| sparklineLineStrokeOpacity | 适用于折线图，线条透明度                                                                                                    | number                                        | -      |      |
| sparklineLineLineDash      | 适用于折线图，线条的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | [number,number]                               | -      |      |
| sparklineAreaFill          | 适用于折线图，填充区域颜色                                                                                                  | string                                        | -      |      |
| sparklineAreaFillOpacity   | 适用于折线图，填充区域透明度                                                                                                | number                                        | -      |      |
| sparklineColumnFill        | 适用于直方图，条形颜色                                                                                                      | string                                        | -      |      |
| sparklineColumnFillOpacity | 适用于直方图，条形透明度                                                                                                    | number                                        | -      |      |
| sparklineIsGroup           | 适用于直方图，是否分组显示                                                                                                  | boolean                                       | false  |      |
| sparklineSpacing           | 适用于直方图，分组直方的间距                                                                                                | number                                        | `0`    |      |

在 Slider 组件中配置迷你图属性的时候，不是以对象的形式来配置，而是以 `sparkline`前缀加属性的方式来配置。

```js
({
  slider: {
    x: {
      // 不写在style里也行，G2内部做了兼容
      style: {
        sparklineType: 'line',
        sparklineColor: 'red',
      },
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

## 示例

### 自定义缩略轴（Slider）

如果不希望使用 G2 默认的坐标轴，就可以按照以下几步自定义拖拽轴：

- 在渲染结束后渲染 slider。
- 监听 slider 事件。

第一步的的关键是通过 `chart.getCoordinate` 获得的 coordinate 对象确定 slider 的位置和长度。第二步的关键是通过 `chart.getScale` 获得 scale 对选择的范围进行 invert，最后获得选择的数据范围，然后更新 scale 的定义域。

```js | ob
(() => {
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
  const container = document.createElement('div');
  const chart = new G2.Chart({ container });

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

  return chart.getContainer();
})();
```
