---
title: liquid
order: 16
---

## 概述

`liquid` 图形标记可用于绘制各种 水波图（涟漪图或波形图）,通过模拟水面上波纹扩散的动态过程，从视觉上的波动传达信息或增强用户体验。常用于UI设计、数据可视化或动画效果中。

```js | ob
(() => {
  const chart = new G2.Chart();
  
  chart.options({
    height: 300,
    type: 'liquid',
    data: 0.3, // [0, 1]
    // 配置样式
    style: {
      outlineBorder: 4, // 外部边宽
      outlineDistance: 8, // 水波运动时间
      waveLength: 128, // 水波长度
    },
    // 配置坐标系
    coordinate: {},
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例 - 水波图](/examples#general-Liquid)页面。

## 配置项

| 属性       | 描述                                                                                               | 类型                      | 默认值                 | 必选 |
| ---------- | -------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------- | ---- |
| style      | 配置 `liquid` 标记的图形样式                                                                         | [style](#style)           | -                      |      |

### style

配置 `liquid` 标记的样式。

| 属性            | 描述     | 类型     | 默认值 | 必选  |
| --------------- | -------- | -------- | ------ |-------|
| shape           | 形状     | _number_ | `circle`      |       |
| stroke          | 边框颜色 | _string_ | -      |       |
| fill            | 水波颜色 | _string_ | -      |       |
| outlineBorder   | 边框宽度 | _number_ | `2`      |       |
| outlineDistance | 内间距   | _number_ | `0`     |       |
| waveLength      | 波长     | _number_ | `192`    |       |
| waveCount       | 波数     | _number_ | `3`      |       |
| backgroundFill  | 背景颜色 | _string_ | -      |       |
| contentText     | 文本内容 | _string_ | -      |       |
| contentFill     | 文本颜色 | _string_ | -      |       |
| contentFontSize | 文本大小 | _string_ | -      |       |

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'liquid',
    data: 0.75,
    style: {
      fill: 'pink', // 水波颜色
      stroke: 'red', // 描边颜色
      backgroundFill: '#f5f5f5', // 背景颜色
      // outline 为描边样式
      outlineBorder: 10, // 外部边宽
      outlineDistance: 10, // 水波运动时间
      // wave为水波配置
      waveLength: 188, // 水波长度
      waveCount: 6, // 波数 会自动 从 1 ~ 0.2 分配透明度
      // content 为中心文本配置
      contentText: 'center text',
      contentFill: '#000',
      contentStroke: '#fff',
      contentFontSize: 32,
      contentLineWidth: 3,
    },
    // 配置坐标系
    coordinate: {},
  });

  chart.render();

  return chart.getContainer();
})();
```

#### shape

`liquid` 标记内置支持的形状如下：

| 形状   | 描述                             | 示例                                                                                                             |
| ------ | -------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| rect     | 矩形 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yhm7SorCPUsAAAAAAAAAAAAAemJ7AQ/original"></img> |
| circle   | 圆形 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kMifQItNCRsAAAAAAAAAAAAAemJ7AQ/original"></img> |
| pin      | 水滴 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*bAhUQZX4aYQAAAAAAAAAAAAAemJ7AQ/original"></img> |
| triangle | 三角 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ApfoS7lBxv8AAAAAAAAAAAAAemJ7AQ/original"></img> |

如果需要自定义形状，可以通过自定义 shape 提供实现。 其中， 回调 `(x, y, r, w, h) => string`, 传入参数分别为 x y 中心点坐标， r 图表可画圆最大半径， w h 图表可画宽高，从而画出想要的形状，需要对 svg 或者 canvas 有一定理解。

尝试自己画一下：

<Playground path="style/general/Liquid/demo/liquid-custom-shape.ts" rid="liquid-shape"></playground>
