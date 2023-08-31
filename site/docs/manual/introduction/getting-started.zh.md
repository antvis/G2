---
title: 开始使用
order: 3
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

// 初始化图表实例
const chart = new Chart({
  container: 'container',
});

// 声明可视化
chart
  .interval() // 创建一个 Interval 标记
  .data(data) // 绑定数据
  .encode('x', 'genre') // 编码 x 通道
  .encode('y', 'sold'); // 编码 y 通道

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

  // 初始化图表实例
  const chart = new G2.Chart({
    container: 'container',
  });

  // 声明可视化
  chart
    .interval() // 创建一个 Interval 标记
    .data(data) // 绑定数据
    .encode('x', 'genre') // 编码 x 通道
    .encode('y', 'sold'); // 编码 y 通道

  // 渲染可视化
  chart.render();
</script>
```

## 旅途开始

不管使用哪种方式，如果你绘制出了如下的条形图，那么表示一切顺利，探索可视化和 G2 的旅程正式开始。

```js | ob {pin:false}
(() => {
  // 初始化图表实例
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold');

  chart.render();

  return chart.getContainer();
})();
```
