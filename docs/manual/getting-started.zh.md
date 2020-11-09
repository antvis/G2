---
title: 快速上手
order: 1
---

## 安装

### 通过 npm 安装

[![](https://img.shields.io/npm/v/@antv/g2.svg?style=flat-square#align=left&display=inline&height=20&originHeight=20&originWidth=80&search=&status=done&width=80#align=left&display=inline&height=20&originHeight=20&originWidth=88&status=done&style=none&width=88)](https://www.npmjs.com/package/@antv/g2)

```bash
npm install @antv/g2 --save
```

成功安装完成之后，即可使用 `import` 或 `require` 进行引用。

```typescript
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'c1',
  width: 600,
  height: 300,
});
```

### 浏览器引入

既可以通过将脚本下载到本地也可以直接引入在线资源：

```html
<!-- 引入在线资源，选择你需要的 g2 版本以替换 version 变量 -->
<script src="https://gw.alipayobjects.com/os/lib/antv/g2/{{version}}/dist/g2.min.js"></script>
```

```html
<!-- 引入本地脚本 -->
<script src="./g2.js"></script>
```

<!-- 请求链接 404 先注释掉 -->
<!-- 你也可以直接通过  [unpkg](https://unpkg.com/@antv/g2)  下载。 -->

## 开始使用

在 G2 引入页面后，我们就已经做好了创建第一个图表的准备了。

下面是以一个基础的柱状图为例开始我们的第一个图表创建。

### 1. 创建 `div` 图表容器

在绘图前我们需要为 G2 准备一个 DOM 容器：

```html
<div id="container"></div>
```

### 2. 编写图表绘制代码

创建 `div` 容器后，我们就可以进行简单的图表绘制：

1. `new Chart()` 创建 Chart 图表对象，指定图表所在的容器 id、图表的宽高、边距等信息；
2. `chart.data()` 载入图表数据源；
3. 使用图形语法进行图表的绘制；
4. `chart.render()` 渲染图表。

<!-- 先放这里，等 gatsby 版本升级后即可看到效果 -->

<playground path='column/basic/demo/basic.ts'></playground>

你也可以进入 [G2 图表示例](zh/examples/gallery)页面查看更多例子。

## 在 React / Vue / Angular 中使用 G2

基于 AntV 技术栈还有许多优秀的项目，在 React 环境下使用 G2，我们推荐使用 Ant Design Charts，BizCharts 和 Viser。这三个产品都是基于 G2 的 React 版本封装，使用体验更符合 React 技术栈的习惯，他们都与 AntV 有着紧密的协同，他们很快也将同步开源和发布基于 G2 4.0 的版本。Viser 除了 React 外，还提供了 Vue 和 Angular 不同的分发版本。

- Ant Design Charts 地址：[https://charts.ant.design](https://charts.ant.design)
- BizCharts 地址：[https://bizcharts.net](https://bizcharts.net)
- Viser 地址：[https://viserjs.github.io/](https://viserjs.github.io/)
