---
title: 创建图表
order: 1
---

本节主要讲解如何创建以及配置 Chart 图表对象，主要内容包括图表容器全局样式配置、绘图区、图表宽度自适应等相关内容。

## 图表容器

```html
<div id="c1"></div>
```

实例化 Chart 对象时，绑定 dom 容器的方式有两种：

__1. 传入 dom 容器的 id__

```js
const chart = new G2.Chart({
  container: 'c1',
  width: 1000,
  height: 500
});
```

__2. 传入 dom 容器的 html 节点对象__

```js
const chart = new G2.Chart({
  container: document.getElementById('c1'),
  width: 1000,
  height: 500
});
```

> 注：为了兼容 G2 3.0 之前的版本，也可使用 `id` 属性代替 `container`，用法相同。

## 图表样式

__1. 图表的宽高__

创建 chart 对象时，需要指定图表的宽高，通过如下方式指定：

```js
const chart = new G2.Chart({
  container: 'c1',
  width: 1000,
  height: 500
});
```

__2. 图表的样式__

图表样式包括画布背景、绘图区域背景以及内边框，分别对应如下属性：

* `background`：用于设置整个 chart 的图表背景样式，包括边框，背景色，透明度，圆角等；
* `plotBackground`：用于设置 chart 绘图区域的背景样式，包括边框，背景色，透明度，圆角等；
* `padding`：用于设置边距，用法同 CSS 中的 padding 属性相同，【上，右，下，左】；

用法如下，具体详见 [API 文档](/zh/docs/api/g2):

```js
const chart = new G2.Chart({
  container: 'c1',
  width: 1000,
  height: 500,
  padding: [ 20, 20, 95, 80 ] // 上，右，下，左
});
```

下图展示了 G2 的图表布局：

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*nVAkR5592PUAAAAAAAAAAABkARQnAQ)

## 其他配置

### 图表宽度自适应

默认情况下，G2 图表的宽度需要用户手动设置 `width` 参数，当需要图表跟随图表容器宽度变化时，则需要开启 `forceFit` 属性，默认其值为  false，开启方式如下：

```js
const chart = new G2.Chart({
  container: 'c1',
  forceFit: true,
  height : 400
});
```

此时，不需要设置 `width` 属性，即使设置了也不会生效。

另外还可以手动得调用自适应函数 `chart.forceFit()` 来响应页面变化。

```js
chart.forceFit(); // 手动调用自适应函数
```

`注意`：
* G2 的图表是根据父容器的宽度来计算宽度，如果父容器隐藏，则会将宽度计算成 0，显示父容器时，需要调用一下 chart.forceFit()。
* 仅当浏览器的窗口变化时，图表会重新计算宽度，其他情况下不进行宽度的计算和自适应。

### 图表动画

默认情况下，G2 的图表动画处于开启状态，可以通过如下两种方式关闭图表动画：

```js
// 方式一： 设置 animate 属性
const chart = new G2.Chart({
  container: 'c1',
  width: 800,
  height : 400,
  animate: false // 关闭图表动画
});

// 方式二： 手动调用 animate 函数
chart.animate(false); // 关闭动画
```

单个几何标记（折线、面积图）的动画可以在 [Geometry](/zh/docs/manual/tutorial/geometry) 上设置
