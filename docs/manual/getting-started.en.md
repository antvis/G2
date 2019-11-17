---
title: 快速上手
order: 0
redirect_from:
  - /en/docs/manual
---

## G2

G2 是一套基于可视化编码的图形语法，以数据驱动，具有高度的易用性和扩展性，用户无需关注各种繁琐的实现细节，一条语句即可构建出各种各样的可交互的统计图表。

## 特性

- 简单、易用

- 完备的可视化编码

- 强大的扩展能力

## 安装

### 浏览器引入

既可以通过将脚本下载到本地也可以直接引入在线资源；

```html
<!-- 引入在线资源 选择你需要的 g2 版本以替换 version 变量 -->
<script src="https://gw.alipayobjects.com/os/lib/antv/g2/{{version}}/dist/g2.min.js"></script>
```

```html
<!-- 引入本地脚本 -->
<script src="./g2.js"></script>
```

### 通过 npm 安装

[![](https://img.shields.io/npm/v/@antv/g2.svg?style=flat-square#align=left&display=inline&height=20&originHeight=20&originWidth=80&search=&status=done&width=80)](https://www.npmjs.com/package/@antv/g2)

我们提供了 G2 npm 包，通过下面的命令即可完成安装

```bash
npm install @antv/g2 --save
```

成功安装完成之后，即可使用 `import` 或 `require` 进行引用。

```javascript
import G2 from '@antv/g2';

const chart = new G2.Chart({
  container: 'c1',
  width: 600,
  height: 300
});
```

## 开始使用

在 G2 引入页面后，我们就已经做好了创建第一个图表的准备了。

下面是以一个基础的柱状图为例开始我们的第一个图表创建。

### 浏览器引入方式

#### 1. 创建 `div` 图表容器

在页面的 `body` 部分创建一个 div，并制定必须的属性 `id`：

```html
<div id="c1"></div>
```

#### 2. 编写图表绘制代码

创建 `div` 容器后，我们就可以进行简单的图表绘制：

1. 创建 Chart 图表对象，指定图表所在的容器 ID、指定图表的宽高、边距等信息；

2. 载入图表数据源；

3. 使用图形语法进行图表的绘制；

4. 渲染图表。

这部分代码用 `<script></script>`，可以放在页面代码的任意位置（最好的做法是放在 `</body>` 之前）。

```javascript
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
// Step 1: 创建 Chart 对象
const chart = new G2.Chart({
  container: 'c1', // 指定图表容器 ID
  width : 600, // 指定图表宽度
  height : 300 // 指定图表高度
});
// Step 2: 载入数据源
chart.source(data);
// Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
chart.interval().position('genre*sold').color('genre')
// Step 4: 渲染图表
chart.render();
```

完成上述两步之后，保存文件并用浏览器打开，一张柱状图就绘制成功了：

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*fAinSZKwHWEAAAAAAAAAAABkARQnAQ)

```javascript
var data = [
    {genre: 'Sports', sold: 275},
    {genre: 'Strategy', sold: 115},
    {genre: 'Action', sold: 120},
    {genre: 'Shooter', sold: 350},
    {genre: 'Other', sold: 150},
  ];
  var chart = new G2.Chart({
    container: 'c1',
    forceFit: true,
    height : 400
  });
  chart.source(data);
  chart.interval().position('genre*sold').color('genre')
  chart.render();
```

完整的代码如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>柱状图</title>
    <!-- 引入 G2 文件 -->
    <script src="{{ url.g2 }}"></script>
  </head>
  <body>
    <!-- 创建图表容器 -->
    <div id="c1"></div>
    <script>
      const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 }
      ]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
      // Step 1: 创建 Chart 对象
      const chart = new G2.Chart({
        container: 'c1', // 指定图表容器 ID
        width : 600, // 指定图表宽度
        height : 300 // 指定图表高度
      });
      // Step 2: 载入数据源
      chart.source(data);
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart.interval().position('genre*sold').color('genre')
      // Step 4: 渲染图表
      chart.render();
    </script>
  </body>
</html>
```

### 在 React / Vue / Angular 中使用 G2

基于 AntV 技术栈还有许多优秀的项目，在 React 环境下使用 G2，我们推荐可以尝试使用 BizCharts 和 Viser-react！这两个产品都是基于 G2 的 React 版本封装，使用体验更符合 React 技术栈的习惯，他们都与 AntV 有着紧密的协同，他们很快也将同步开源和发布基于 G2 3.0 的版本。

此外，Viser 并不是针对 React 做的适配，它是对 G2 3.0 通用的抽象。通过基于 Viser 封装，现在已经支持对 React、 Angular 和 Vue 三个常用框架的深度整合，对应的是 viser-react、viser-ng 和 viser-vue。对，你都有机会用到一样的使用体验。当然，你甚至可以自己动手来封装针对任何库的版本，如果需要的话。Viser 提供了这种自定义的扩展能力，而且成本非常低。

[BizCharts](https://bizcharts.net) 地址：[https://bizcharts.net](https://bizcharts.net)<br />[Viser](https://viserjs.github.io/) 地址：[https://viserjs.github.io/](https://viserjs.github.io/)

## ~~体验改进计划说明~~

~~为了更好服务用户，G2 会将 URL 和版本信息发送回 AntV 服务器：~~

```html
https://kcart.alipay.com/web/bi.do
```

~~除了 URL 与 G2 版本信息外，不会收集任何其他信息，一切为了能对 G2 的运行情况有更多了解，以更好服务于用户。如有担心，可以通过下面的代码关闭：~~

```javascript
// 关闭 G2 的体验改进计划打点请求
G2.track(false)
```

更新：

**我们已决定终止体验改进计划**

**从 `@antv/g2@3.4.7` 版本开始，所有打点代码已被移除。后续版本的 G2 不会再发送任何远程请求**
