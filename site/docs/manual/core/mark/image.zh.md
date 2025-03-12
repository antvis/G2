---
title: image
order: 10
---

## 概述

`image` 图片标记通常不会单独出现，主要在其他的标记基础上进行添加使用，可以增强数据的可视化效果，帮助更直观地传达信息。和[`point`](/manual/core/mark/point) 标记很类似都是以 `x`，`y` 数据通道作为位置居中定位，区别在于 `image` 提供一个特殊的 `src` 数据通道，来指定图片的远程地址或者 base64。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    width: 200,
    height: 60,
    type: 'image',
    data: [
      { x: '1', y: 1, url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TRZHTaTeWfEAAAAAAAAAAAAAemJ7AQ/original' },
      { x: '2', y: 1, url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TRZHTaTeWfEAAAAAAAAAAAAAemJ7AQ/original' },
      { x: '3', y: 1, url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TRZHTaTeWfEAAAAAAAAAAAAAemJ7AQ/original' },
      { x: '4', y: 1, url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qCegRabhuUIAAAAAAAAAAAAAemJ7AQ/original' },
      { x: '5', y: 1, url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*GNP1RLFfQV0AAAAAAAAAAAAAemJ7AQ/original' },

      { x: '1', y: 2, url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TRZHTaTeWfEAAAAAAAAAAAAAemJ7AQ/original' },
      { x: '2', y: 2, url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TRZHTaTeWfEAAAAAAAAAAAAAemJ7AQ/original' },
      { x: '3', y: 2, url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qCegRabhuUIAAAAAAAAAAAAAemJ7AQ/original' },
      { x: '4', y: 2, url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*GNP1RLFfQV0AAAAAAAAAAAAAemJ7AQ/original' },
      { x: '5', y: 2, url: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*GNP1RLFfQV0AAAAAAAAAAAAAemJ7AQ/original' },
    ],
    // 配置视觉通道
    encode: {
      x: 'x', // 配置x通道
      y: 'y', // 配置y通道
      src: 'url', // 配置 图片src 通道
    },
    axis: { x: false, y: false },  
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例 - 图片](/examples#general-image)页面。

## 配置项

| 属性       | 描述                                                                                               | 类型                      | 默认值                 | 必选 |
| ---------- | -------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------- | ---- |
| encode     | 配置 `image` 标记的视觉通道，包括`x`、`y`、`src`、`size`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode)         | -                      | ✓    |
| style      | 配置 `image` 标记的图形样式                                                                         | [style](#style)           | -                      |      |

### encode

配置 `image` 标记的视觉通道。

| 属性  | 描述                                                                                                                                        | 类型                          | 默认值 | 必选 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------ | ---- |
| x     | 绑定 `image` 标记的 `x` 属性通道，一般是 `data` 中的数值或字符，用于确定图片的 `x` 位置                                                   | [encode](/manual/core/encode) | -      | ✓    |
| y     | 绑定 `image` 标记的 `y` 属性通道，一般是 `data` 中的数值或字符，用于确定图片的 `y` 位置                                              | [encode](/manual/core/encode) | -      | ✓   |
| size  | 绑定 `image` 标记的 `size` 大小通道，用于控制图片展示的大小，一般图片中所存储的信息越多，越需要放大 | [encode](/manual/core/encode) | -      |      |
| src   | 绑定 `image` 标记的 `src` 图片通道 ，会更具对应的数据显示图片            |            | - |   ✓   |

#### src

最终的绘制都是调用 G 去渲染，所以支持的数据类型和 G 的原子 Image 图形保持一致，支持：

1. `远程地址`：网络地址
2. `file`：本地图片地址
3. `base64`：图表base64格式字符串
4. `blob`：图片请求返回的Blob对象

### style

| 属性            | 描述                                           | 类型                 | 默认值      | 必选  |
|----------------|------------------------------------------------|---------------------|------------|-------|
| width          | 图形的宽度, 如果没有配置 图片按照 自宽高 和 `size` 大小 默认显示          | _number_ \| _Function\<number\>_              |   -        |       |
| height         | 图形的高度, 如果没有配置 图片按照 自宽高 和 `size` 大小 默认显示          | _number_ \| _Function\<number\>_              |   -        |       |
| opacity        | 图形的整体透明度                                   | _number_ \| _Function\<number\>_              |   -        |       |
| shadowColor    | 图形阴影颜色                                      | _string_ \| _Function\<string\>_              |   -        |       |
| shadowBlur     | 图形阴影的高斯模糊系数                              | _number_ \| _Function\<number\>_              |   -        |       |
| shadowOffsetX  | 设置阴影距图形的水平距离                            | _number_ \| _Function\<number\>_              |   -        |       |
| shadowOffsetY  | 设置阴影距图形的垂直距离                            | _number_ \| _Function\<number\>_              |   -        |       |
| cursor         | 鼠标样式。同 css 的鼠标样式，默认 'default'。        | _string_ \| _Function\<string\>_              |   `default`|       |

尝试一下：

<Playground path="style/general/image/demo/contributor.ts" rid="image-style"></playground>
