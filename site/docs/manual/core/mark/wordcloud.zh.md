---
title: wordCloud
order: 27
---

## 概述

`wordCloud` 是一种专门用于生成词云图的工具。词云图是一种直观展示文本数据中关键词频次的可视化形式，通过不同大小、颜色和位置的文字来反映词语的重要性或权重。

使用 `wordCloud` 组件时，用户可以轻松地将文本数据转化为视觉化的词云图。支持高度自定义的配置选项，包括文字大小范围、颜色映射、旋转角度以及布局算法等，从而满足多样化的可视化需求。此外，`wordCloud` 还能够与 G2 的其他功能无缝集成，例如数据筛选、交互事件绑定等，进一步增强用户体验。

无论是用于展示社交媒体热点话题、分析用户评论情感，还是呈现关键词分布，`wordCloud` 都能以优雅的方式帮助用户快速洞察数据背后的趋势和模式。`wordCloud` 不仅简单易用，还具备出色的性能表现，是数据可视化领域的理想选择之一。

## 开始使用

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'wordCloud', // 指定图表类型为词云图
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/philosophy-word.json',
    },
    layout: {
      spiral: 'rectangular', // 词云布局模式：矩形螺旋布局
    },
    encode: { color: 'text' }, // 将数据字段 `text` 映射到词云图的颜色
    legend: false,
    axis: false,
    tooltip: false,
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例 - 文本](/examples#general-text)页面。

## 配置项

| 属性    | 描述                                                                                                   | 类型              | 默认值 | 必选 |
| ------- | ------------------------------------------------------------------------------------------------------ | ----------------- | ------ | ---- |
| encode  | 配置 `wordCloud` 标记的视觉通道，包括`x`、`y`、`color`、`size`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode) | -      | ✓    |
| labels  | 配置 `wordCloud` 自定义节点数据标签                                                                    | label[]           | `[]`   |
| layout  | 配置 `wordCloud` 布局，包括 `padding`、`rotate` 等                                                     | [layout](#style)  | -      |
| padding | 配置 `wordCloud` 容器的边距                                                                            | number            | `0`    |      |
| scale   | 配置 `wordCloud` 标记的图形缩放，包括`x`、`y`、`series`、`size`等                                      | [scale](#scale)   | -      |      |
| style   | 配置 `wordCloud` 图形样式                                                                              | [style](#style)   | -      |      |

### encode

配置 `wordCloud` 标记的视觉通道，定义数据字段与视觉属性之间映射关系的重要配置，它决定了数据如何转化为视觉表现。

| 属性     | 描述                                                                                | 类型                          | 默认值   | 必选 |
| -------- | ----------------------------------------------------------------------------------- | ----------------------------- | -------- | ---- |
| text     | 绑定 `wordCloud` 标记的 `text` 属性通道                                             | [encode](/manual/core/encode) | 'text'   |      |
| rotate   | 绑定 `wordCloud` 标记的 `rotate` 属性通道, 用于将数据字段映射为图形元素的字体旋转   | [encode](/manual/core/encode) | 'rotate' |      |
| fontSize | 绑定 `wordCloud` 标记的 `fontSize` 属性通道, 用于将数据字段映射为图形元素的字体大小 | [encode](/manual/core/encode) | 'size'   |      |
| color    | 绑定 `wordCloud` 标记的 `color` 属性通道，将数据字段映射到颜色通道                  | [encode](/manual/core/encode) | -        |

更多的`encode`配置，可以查查看 [encode](/manual/core/encode) 介绍页面。

### scale

`scale`用于定义数据如何映射到视觉属性（如颜色、大小、形状等）。在`cell`的使用场景，scale 的常见作用就是为每个视觉通道（如颜色、大小、位置等）提供映射规则，使数据点能够准确地呈现。

| 属性 | 描述                                  | 类型                                        | 默认值              | 必选 |
| ---- | ------------------------------------- | ------------------------------------------- | ------------------- | ---- |
| x    | 定义数据字段到 X 轴视觉位置的映射规则 | Record<string, [scale](/manual/core/scale/overview)> | `{ range: [0, 1] }` |      |
| y    | 定义数据字段到 X 轴视觉位置的映射规则 | Record<string, [scale](/manual/core/scale/overview)> | `{ range: [0, 1] }` |      |

更多的`scale`配置，可以查查看 [scale](/manual/core/scale/overview) 介绍页面。

### padding

配置 `wordCloud` 容器的边，可以通过`padding{Position}`配置不同方向的边距

```
type Position = 'Top' | 'Bottom' | 'left' | 'right';
```

与layout中的 `padding` 配置项对比

| 属性                  | 描述                                                   | 类型                            | 示例                                                                                                             |
| --------------------- | ------------------------------------------------------ | ------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| option.padding        | 配置 `wordCloud` 容器的边距                            | number                          | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qunnQK7EIGUAAAAAAAAAAAAAemJ7AQ/original"></img> |
| option.layout.padding | 设置单词之间的间距，单位为像素，可以是具体值或动态函数 | number \| (word: any) => number | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-tAsSJGr0ngAAAAAAAAAAAAAemJ7AQ/original"></img> |

### layout

| 属性         | 描述                                                                                               | 类型                                                                                                               | 默认值                                   |
| ------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| font         | 设置字体样式，可以是字符串或函数，函数根据单词返回字体，修改d3词云配置                             | string \| (word: any) => string                                                                                    | 'Impact'                                 |
| fontSize     | 设置字体大小，可以是具体值、范围 [min, max] 或函数，修改d3词云配置                                 | number \| [number, number] \| (word: any) => number                                                                | -                                        |
| imageMask    | 设置图像作为单词布局的遮罩，可以是 HTML 图像元素或图像路径字符串                                   | 'HTMLImageElement \| string                                                                                        | -                                        |
| on           | 配置事件监听器函数，可以监听布局完成 (end) 或单词更新 (word)                                       | ((type: 'end', details?: { cloud; words; bounds }) => void) \| ((type: 'word', details?: { cloud; word }) => void) | -                                        |
| padding      | 设置单词之间的间距，单位为像素，可以是具体值或动态函数                                             | number \| (word: any) => number                                                                                    | `2`                                      |
| rotate       | 设置单词的旋转角度，可以是具体值或动态函数                                                         | number \| word => number                                                                                           | `() => (~~(Math.random() * 6) - 3) * 30` |
| random       | 设置随机数生成器，可以是具体数值或函数                                                             | number \| (word => number)                                                                                         | -                                        |
| size         | 设置布局的矩形宽度和高度，格式为 [width, height]                                                   | [number, number]                                                                                                   | `[20, 60]`                               |
| spiral       | 设置单词的排布模式，可以选择 "archimedean" 或 "rectangular" 内置螺旋类型，也可以通过函数实现自定义 | 'archimedean' \| 'rectangular'                                                                                     | -                                        |
| text         | 设置单词的文本访问器函数，用来根据单词数据返回单词文本                                             | (word: any) => string                                                                                              | `(d) => d.text`                          |
| timeInterval | 设置布局算法的时间间隔，控制运行时间                                                               | number                                                                                                             | -                                        |

**spiral**

`spiral` 是一个控制词云布局算法的参数，它决定了词语在画布上的排列方式和路径模式。通过调整 spiral，可以优化词云的视觉效果、布局密度和性能。

| 参数值      | 说明                                                                 | 适用场景                     |
| ----------- | -------------------------------------------------------------------- | ---------------------------- |
| archimedean | 阿基米德螺旋线（默认值），词语从中心向外按螺旋路径排列，布局较紧凑。 | 通用场景，追求自然紧凑的布局 |
| rectangular | 矩形螺旋，词语按矩形路径排列，计算速度更快，但布局相对松散。         | 数据量大时优化性能           |

```js | ob { pin: false }
(() => {
  const spiralMap = [
    {
      label: '阿基米德螺旋',
      spiral: 'archimedean',
    },
    {
      label: '矩形螺旋',
      spiral: 'rectangular',
    },
  ];

  const chart = new G2.Chart();

  chart.options({
    type: 'wordCloud',
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/philosophy-word.json',
    },
    layout: {
      spiral: 'rectangular',
    },
    encode: { color: 'text' },
  });

  const handleSetSpiral = (spiral) => {
    // 设置选中的坐标系
    chart.options({
      layout: { spiral },
    });
    chart.render(); // 重新渲染图表
  };

  // layout-spiral 选择器
  const selectorContainer = document.createElement('div');
  selectorContainer.textContent = '选择spiral ';
  const selector = document.createElement('select');
  selector.innerHTML = spiralMap.map(
    (spiral, index) =>
      `<option value="${spiral.spiral}" ${index === 0 ? 'selected' : ''}>${
        spiral.label
      }</option>`,
  );
  selector.onchange = (e) => {
    handleSetSpiral(e.target.value);
  };
  selectorContainer.appendChild(selector);
  const node = chart.getContainer();
  node.insertBefore(selectorContainer, node.childNodes[0]);

  chart.render();

  return chart.getContainer();
})();
```

**imageMask**

`imageMask` 是一个用于控制词云形状的关键配置项，它的作用是通过指定一张图片的遮罩（Mask），将词云的布局限制在该图片的轮廓范围内，从而生成与图片形状匹配的词云效果。

`imageMask` 接收一个遮罩图片，WordCloud 布局算法会解析 imageMask 图片的像素信息，将图片的非透明区域视为允许放置词语的区域，而透明区域则禁止放置词语。词语会根据权重（如词频）在非透明区域内动态调整大小和位置。

注意事项：

- 图片质量：遮罩图片通常应是单色（黑白）图像。一般来说，词云会基于非白色区域定义形状。
- 图像加载：在使用图片遮罩时，确保图像资源已经完全加载，否则可能会出现渲染问题。
- 性能影响：复杂形状（例如高分辨率图片）可能会影响词云的构造速度。

```js | ob {pin: false}
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'wordCloud',
    layout: {
      imageMask:
        'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LKU4TYEiB-4AAAAAAAAAAAAADmJ7AQ/original',
      fontSize: 12,
    },
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json',
    },
    encode: { color: 'name', text: 'name' },
    legend: false,
  });

  chart.render();

  return chart.getContainer();
})();
```

### style

复合图形标记需要通过不同的前缀来区分图形的配置。

| 属性          | 描述                                                                                                          | 类型                                                                        | 默认值    |
| ------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------- |
| fontStyle     | 设置文本的样式，调用G绘图进行绘制                                                                             | FontStyle \| (datum, index, data, column) => FontStyle                      | 'normal'  |
| fontSize      | 设置文本的字体大小，调用G绘图进行绘制                                                                         | number \| (datum, index, data, column) => number                            | -         |
| fontWeight    | 设置文本的字体粗细，调用G绘图进行绘制                                                                         | FontWeight \| number \| (datum, index, data, column) => number \|FontWeight | 'normal'  |
| fill          | 图形的填充色                                                                                                  | number \| (datum, index, data, column) => string                            | -         |
| fillOpacity   | 图形的填充透明度                                                                                              | number \| (datum, index, data, column) => number                            | -         |
| stroke        | 图形的描边                                                                                                    | number \| (datum, index, data, column) => string                            | -         |
| strokeOpacity | 描边透明度                                                                                                    | number \| (datum, index, data, column) => number                            | -         |
| text          | 文本内容                                                                                                      | number \| (datum, index, data, column) => string                            | -         |
| textAlign     | 设置文本的对齐方式                                                                                            | TextAlign \| (datum, index, data, column) => TextAlign                      | 'center'  |
| textBaseline  | 设置文本的基线位置                                                                                            | TextBaseline \| (datum, index, data, column) => TextBaseline                | 'middle'  |
| lineWidth     | 图形描边的宽度                                                                                                | number \| (datum, index, data, column) => number                            | -         |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | [number,number] \|(datum, index, data, column) => [number, number]          | -         |
| opacity       | 图形的整体透明度                                                                                              | number \| (datum, index, data, column) => number                            | -         |
| shadowColor   | 图形阴影颜色                                                                                                  | number \| (datum, index, data, column) => string                            | -         |
| shadowBlur    | 图形阴影的高斯模糊系数                                                                                        | number \| (datum, index, data, column) => number                            | -         |
| shadowOffsetX | 设置阴影距图形的水平距离                                                                                      | number \| (datum, index, data, column) => number                            | -         |
| shadowOffsetY | 设置阴影距图形的垂直距离                                                                                      | number \| (datum, index, data, column) => number                            | -         |
| cursor        | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | number \| (datum, index, data, column) => string                            | 'default' |

```js
type FontStyle = 'normal' | 'italic' | 'oblique';

type FontWeight = 'normal' | 'bold' | 'lighter';

type TextAlign = 'left' | 'center' | 'right';

type TextBaseline = 'top' | 'middle' | 'bottom';
```

尝试一下：

<Playground path="style/general/text/demo/wordCloud.ts" rid="text-wordCloud"></playground>
