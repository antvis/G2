---
title: 滑动条（Slider）
order: 7.4
---

G2 中**滑动条（Slider）** 可以用于过滤数据，可以和 x 或者 y 通道绑定的，滑动条默认都是关闭的。

## 配置方式

滑动条可以在 Mark 层级配置。在 G2 中，每个标记（Mark）都有自己的滑动条。如果标记对应的比例尺是同步的，那么滑动条也会合并。

```js
// Functional API
// 第一种方式
chart.interval().slider('x', {}).slider('y', {});

// Spec API
// 第二种方式
({
  type: 'interval',
  slider: {
    x: {},
    y: {},
  },
});
```

滑动条也可以在 View 层级配置。滑动条具有传递性。视图上声明的滑动条会传递给 `children` 声明的标记，如果该标记有对应通道的滑动条，就合并；否则不影响。

```js
// Functional API
// 第一种方式
chart.slider('x', {}).slider('y', {});

// Spec API
// 第二种方式
({
  type: 'view',
  slider: {
    x: {},
    y: {},
  },
});
```

缩略轴（slider）是一种辅助看数据的组件，它将大量数据浓缩到一个轴上，既可以缩小宏观看数据全貌，又可以放大微观看数据的片段，同时还可以拖拽观察数据在一定区间内的演变。

## 何时使用

缩略轴是值域数据的浓缩，它跟位置通道 `x`, `y` 对应的比例尺的类型息息相关。一般来说时间类型上使用缩略轴的频率高，连续轴使用缩略轴频次低、分类轴几乎不会使用到缩略轴。

<img alt="slider" src="https://user-images.githubusercontent.com/15646325/205075894-09f6b3a7-8cec-4953-af1a-2c466999f598.png" width="600" />

- 时间轴，数据跨度非常大，【高频使用】，比如一组时序数据跨度 10 年，需观察这期间数据变化趋势时，建议开启缩略轴；
- 时间轴，数据密度很高，【高频使用】，比如分钟级更新的实时数据，当需要查看一天内的数据走势时，建议开启缩略轴；
- 连续轴，数据密度很高，【低频使用】比如查看 1-100 岁平均身高分布，开启缩略轴可以全局查看身高分布；
- 分类轴【不建议使用】。

## 开始使用

<img alt="slider" src="https://user-images.githubusercontent.com/15646325/205065555-8ef69242-ae35-4a9b-b7db-f380e82fd544.png" width="600" />

```js
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
  // 开启 Y 方向缩略轴
  .slider('y', {});

chart.render();
```

## 自定义拖动轴（Slider）

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


## 选项

### 基本

| 属性                           | 描述                           | 类型                   | 默认值 |
| ------------------------------ | ------------------------------ | ---------------------- | ------ |
| values                         | 初始选区范围，位于 0 ～ 1 区间 | `[number, number]`     | -      |
| slidable                       | 是否允许拖动选取和手柄         | `boolean`              | true   |
| brushable                      | 是否启用刷选                   | `boolean`              | true   |
| `style.`padding                | 迷你图的内边距                 | `number` \| `number[]` | 0      |
| `style.`selectionFill          | 缩略轴选区填充色               | `string`               | -      |
| `style.`selectionFillOpacity   | 缩略轴选区填充色透明度         | `number`               | -      |
| `style.`selectionStroke        | 缩略轴选区描边色               | `string`               | –      |
| `style.`selectionStrokeOpacity | 缩略轴选区描边色透明度         | `number`               | –      |
| `style.`trackFill              | 缩略轴滑轨填充色               | `string`               | –      |
| `style.`trackFillOpacity       | 缩略轴滑轨填充色透明度         | `number`               | –      |
| `style.`trackStroke            | 缩略轴滑轨描边色               | `string`               | –      |
| `style.`trackStrokeOpacity     | 缩略轴滑轨描边色透明度         | `number`               | –      |

### 拖动手柄

| 属性                             | 描述                     | 类型                      | 默认值 |
| -------------------------------- | ------------------------ | ------------------------- | ------ |
| showHandle                           | 是否显示拖动手柄         | `boolean`                 | true   |
| showLabel                            | 是否显示拖动手柄文本     | `boolean`                 | true   |
| showLabelOnInteraction           | 在调整手柄或刷选时才显示手柄文本，在 showLabel 为 false 时生效 | `boolean` | false   |
| autoFitLabel                     | 是否自动调整拖动手柄文本位置   | `boolean`             | true   |
| formatter                        | 拖动手柄标签格式化       | `(value: number)=>string` | -      |
| `style.`handleIconSize           | 缩略轴手柄大小           | `number`                  | 10     |
| `style.`handleIconFill           | 缩略轴手柄填充色         | `string`                  | -      |
| `style.`handleIconFillOpacity    | 缩略轴手柄填充色透明度   | `number`                  | -      |
| `style.`handleIconStroke         | 缩略轴手柄描边色         | `string`                  | -      |
| `style.`handleIconStrokeOpacity  | 缩略轴手柄描边色透明度   | `number`                  | -      |
| `style.`handleLabelFontSize      | 缩略轴手柄标签字体大小   | `number`                  | -      |
| `style.`handleLabelFontWeight    | 缩略轴手柄标签字体权重高 | `number` \| `string`      | -      |
| `style.`handleLabelStroke        | 缩略轴手柄标签字体颜色   | `string`                  | -      |
| `style.`handleLabelStrokeOpacity | 缩略轴手柄标签字体透明度 | `number`                  | -      |

### 迷你图

<embed src="@/docs/spec/common/sparkline.zh.md"></embed>

### 事件

| 属性        | 描述                             | 类型          |
| ----------- | -------------------------------- | ------------- |
| valuechange | 选区发生变化时触发，通过事件监听 | `function(e)` |

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

