---
title: "快速上手"
description: "通过 npm 或 CDN 安装 AntV G2，创建 Chart 实例，使用 Spec 配置数据和视觉编码并渲染第一个图表。"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/manual/quick-start/"
version: "5.4.8"
---

目前有两种使用 G2 的方式：

- 包管理器
- CDN

## 包管理器

如果使用了 Webpack，Rollup 等基于 Node 的打包工具，可以通过 NPM 或者 Yarn 等包管理器去安装 G2 。

```bash
# 通过 NPM 安装
npm install @antv/g2
```

```bash
# 通过 Yarn 安装
yarn add @antv/g2
```

安装成功之后给 G2 提供一个容器:

```html
<div id="container"></div>
```

然后输入如下代码：

```js
import { Chart } from '@antv/g2';

// 准备数据
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

// 初始化图表实例并声明可视化
const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'genre', y: 'sold' },
});

// 渲染可视化
chart.render();
```

## CDN

G2 也提供了 UMD 版本，可以直接通过 CDN 加载，然后直接使用。这个时候的 `Chart` 对象可以通过命名空间 `G2` 去访问。

```html
<script src="https://unpkg.com/@antv/g2/dist/g2.min.js"></script>
<script>
  // 准备数据
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];

  // 初始化图表实例并声明可视化
  const chart = new G2.Chart({
    container: 'container',
  });

  chart.options({
    type: 'interval',
    data,
    encode: { x: 'genre', y: 'sold' },
  });

  // 渲染可视化
  chart.render();
</script>
```

## 旅途开始

不管使用哪种方式，如果你绘制出了如下的条形图，那么表示一切顺利，探索可视化和 G2 的旅程正式开始。



```ts
import { Chart } from '@antv/g2';

// 初始化图表实例并声明可视化
const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold' },
});

chart.render();
```



## 在前端框架中使用



[在 React 中使用 G2](</zh/manual/introduction/use-in-framework/#react>) — G2 提供了在 React 中使用的完整指南，包括组件封装、数据绑定、状态管理等最佳实践和示例代码




[在 Vue 中使用 G2](</zh/manual/introduction/use-in-framework/#vue>) — G2 提供了在 Vue2、Vue3 中使用的方法指南，支持选项式 API 和组合式 API，附带完整的示例代码参考



## 在线体验 G2



[图表示例](</zh/examples/>) — 浏览超过 100+ 图表示例，涵盖柱状图、折线图、饼图、散点图等多种类型，无需任何环境配置即可在线体验 G2 的强大功能




[图表介绍](</zh/charts/overview/>) — 涵盖 40+ 种图表类型的详细介绍，包含图表基础知识和适用场景分析，帮助您快速找到最适合的图表类型，是新手入门的最佳指南



## 常见问题



[常见问题 FAQ](</zh/manual/FAQ/>) — 遇到问题？查看我们整理的常见问题和解决方案，包括安装、配置、API 使用等方面的疑难解答，快速解决开发中的问题



## 上手开发

### 基础知识



[G2 配置项总览](</zh/manual/core/configuration/>) — 详细展示 G2 的完整配置体系，涵盖图表初始化配置、API 链式调用、options 方法配置等所有可用的配置选项和层级关系




[G2 图表组成](</zh/manual/core/chart/chart-component/>) — 为了更好地使用 G2 进行数据可视化，我们需要了解 G2 图表的组成以及相关概念，以及图表布局的知识




[图表生命周期](</zh/manual/core/chart/chart-lifecycle/>) — Chart 对象的基础使用和生命周期管理，包括创建图表实例、配置全局选项、挂载图表、渲染图表、更新图表以及图表的清空和销毁 




[图表 API](</zh/manual/api/>) — 完整的 API 参考文档，轻松完成创建可视化、渲染图表、获取实例、触发事件等操作，还可以通过链式调用 API 来配置图表



### 绘制图形



[图形标记（Mark）](</zh/manual/core/mark/overview/>) — G2 绘图的基础单元，包括点、线、面、文字等 30+ 种标记类型，任何图表都可以由一个或多个标记组合而成




[数据配置和数据转换（Data）](</zh/manual/core/data/overview/>) — 支持内联数组、远程 URL、JSON/CSV 格式便捷配置数据源，并且支持 filter、join、kde等多种数据转换，在绘图前轻松进行数据预处理




[编码映射（Encode）](</zh/manual/core/encode/>) — 将数据属性映射到视觉通道（位置、颜色、大小、形状等），是连接数据和图形的关键桥梁





[视图（View）](</zh/manual/core/view/>) — 图表的核心组成单元，用于承载和组织多个标记，统一管理数据、坐标系、交互、样式等配置




[比例尺（Scale）](</zh/manual/core/scale/overview/>) — 将抽象数据映射为视觉数据的桥梁，提供线性、对数、时间等多种类型，决定数据如何被可视化呈现




[标记转换（Transform）](</zh/manual/core/transform/overview/>) — 和数据预处理不同，标记转换提供绘制中转换，包括堆叠、筛选、聚合、排序、分组、扰动等多种变换方式，支持复杂的数据分析和图形优化



### 配置图表组件



[坐标轴（Axis）](</zh/manual/component/axis/>) — 图表的尺子，建立数据与视觉位置的映射关系，通过刻度、刻度值标签、网格线等元素帮助用户把数据数字和图表位置对应起来，可以通过配置格式化刻度值，调整刻度值标签位置等




[图例（Legend）](</zh/manual/component/legend/>) — 图表的辅助元素，使用颜色、大小、形状区分不同数据类型，是非空间通道（color、opacity、size、shape）对应比例尺的可视化，支持数据筛选和交互




[标题（Title）](</zh/manual/component/title/>) — 指定图表的标题内容，一句话展示图表概要信息，由主标题和副标题两部分组成，可通过调整文本样式进行定制，默认无标题





[滚动条（Scrollbar）](</zh/manual/component/scrollbar/>) — 解决图表信息过于密集无法完全展示的问题，当内容超出显示区域时使用，可与 x 或 y 通道绑定，控制显示的部分内容，默认关闭




[缩略轴（Slider）](</zh/manual/component/slider/>) — 辅助看数据的组件，将大量数据浓缩到一个轴上，既可宏观看数据全貌又可微观看片段，支持拖拽观察数据在一定区间内的演变，适用于大数据量场景




[提示信息（Tooltip）](</zh/manual/component/tooltip/>) — 图表交互的核心组件之一，动态展示数据点详细信息（数值、百分比等），支持鼠标悬停、点击、触摸等多种触发方式，增强图表的交互性和可读性





[数据标签（Label）](</zh/manual/component/label/>) — 给图表添加标注的手段，包含数据点、连接线、文本数值等元素，通过简洁文字说明减少误解，强调关键数据或趋势，引导用户关注重要信息



### 布局交互



[坐标系（Coordinate）](</zh/manual/core/coordinate/overview/>) — 管理空间位置映射，支持直角坐标、极坐标、3D 坐标等多种类型，实现不同的可视化布局




[交互（Interaction）](</zh/manual/core/interaction/overview/>) — 提供 20+ 种交互方式，包括悬停提示、刷选高亮、缩放平移等，增强数据探索体验




[复合视图（Composition）](</zh/manual/core/composition/overview/>) — 支持分面、重复、图层等多种组合方式，轻松构建仪表盘、小倍数等复杂布局



### 样式美化



[样式（Style）](</zh/manual/core/style/>) — 精细控制标记和视图的视觉样式，支持填充色、描边、透明度、字体等丰富的样式属性




[颜色映射（Color）](</zh/manual/core/color/>) — 提供多种颜色编码方式和内置色板，支持分类颜色、连续颜色、自定义色板等多种配色方案




[主题（Theme）](</zh/manual/core/theme/overview/>) — 内置 Classic、Academy 等多种主题风格，支持主题定制和扩展，快速统一图表视觉风格



### 高级特性



[状态管理（State）](</zh/manual/core/state/>) — 为图表元素配置 hover、select 等不同状态下的样式，实现丰富的交互反馈效果




[事件处理（Event）](</zh/manual/core/event/>) — 监听图表生命周期和用户交互事件，获取点击数据、渲染状态等信息，实现自定义交互逻辑




[动画（Animate）](</zh/manual/core/animate/overview/>) — 内置 fadeIn、scaleIn、morphing 等多种动画类型，支持入场、更新、退场动画的精细控制
