---
title: 快速上手
order: 2
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
<div id="chart"></div>
```

然后输入如下代码：

```js
import { Chart } from '@antv/g2';

// 将要可视化的表格数据
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

// 实例化图表并且指定容器的 id
const chart = new Chart({
  container: 'chart',
});

// 声明可视化
chart
  .interval() // 创建一个 Interval 的视觉元素，并且添加到图表中
  .data(data) // 给这个视觉元素绑定数据
  .encode('x', 'genre') // 将 genre 对应的列数据和 x 位置通道绑定
  .encode('y', 'sold'); // 将 sold 对应的列数据和 y 位置通道绑定

// 将可视化渲染进指定的容器
chart.render();
```

## CDN

G2 也提供了 UMD 版本，可以直接通过 CDN 加载，然后直接使用。这个时候的 `Chart` 对象可以通过命名空间 `G2` 去访问。

```html
<script src="https://cdn.jsdelivr.net/npm/@antv/g2@5"></script>
<script>
  // 将要可视化的表格数据
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];

  // 实例化图表并且指定容器的 id
  const chart = new G2.Chart({
    container: 'chart',
  });

  // 声明可视化
  chart
    .interval() // 创建一个 Interval 的视觉元素，并且添加到图表中
    .data(data) // 给这个视觉元素绑定数据
    .encode('x', 'genre') // 将 genre 对应的列数据和 x 位置通道绑定
    .encode('y', 'sold'); // 将 sold 对应的列数据和 y 位置通道绑定

  // 将可视化渲染进指定的容器
  chart.render();
</script>
```

## 旅途开始

不管使用哪种方式，如果你绘制出了如下的条形图，那么表示一切顺利，探索可视化和 G2 的旅程正式开始。

<img alt="preview" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*lYi_Q68dG_EAAAAAAAAAAAAADmJ7AQ/original" width="640px"/>
