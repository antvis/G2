---
title: 图表（Chart）
order: 1
---

G2 的大部分能力通过 `Chart` 对象暴露给用户，比如绘制一个简单的条形图：

```js | ob
(() => {
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

接下来我们就来看看 `Chart` 的核心使用方式。

## 图表实例

每个 G2 的可视化都是通过实例化 `Chart` 对象创建一个新的**图表实例**：

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  /* 图表选项 */
});
```

## 全局选项

可以通 `new Chart(options)` 指定一些全局选项：比如挂载的容器，宽度，高度等。所有的选项都是**可选的**。

```js
// 按需指定选项
const chart = new Chart({
  width: 800, // 图表高度
  height: 400, // 图表宽度
  container: 'chart', // 挂载容器的 ID
});
```

## 挂载图表

图表实例只有挂载了之后才能被渲染到屏幕上，其中有两种挂载的方式。

```html
<div id="chart"></div>
```

第一种，自动挂载。

```js
const chart = new Chart({
  container: 'chart', // 指定挂载容器 id
});

// 或者
const chart = new Chart({
  container: document.getElementById('chart'), // 指定挂载容器
});
```

第二种，手动挂载。

```js
const chart = new Chart();

// 声明可视化
// ...

const container = chart.getContainer(); // 获得挂载的容器
document.getElementById('chart').appendChild(container);
```

## 渲染图表

当然，在能看见图表之前，还需要调用 `chart.render`。

```js
// 创建图表实例
const chart = new Chart({
  container: 'chart',
});

// 声明可视化
// ...

// 渲染
chart
  .render()
  .then(() => {
    // 渲染成功
  })
  .catch((error) => {
    // 渲染失败
  });
```

## 更新图表

当通过图表实例提供的 API 修改了声明的可视化之后，只用再次调用 `chart.render` 就可以更新图表了。

```js
// 第一次渲染
chart.render();

// 更新声明
// ...

// 更新图表
chart.render();
```

## 清空图表

清空画布和取消事件监听，同时会清空图表配置，常常用于绘制新的图表。

```js
chart.clear();
```

## 销毁图表

销毁画布和取消事件监听，常常用于销毁组件和页面的时候。

```js
chart.destroy();
```
