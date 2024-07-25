---
title: 自定义
order: 8
---

G2 有很强的扩展性：所有的可视化组件都可以自定义的。这里展示一些常见的可视化组件的自定义方式。

## 自定义形状（Shape）

每一个标记都可以自定义形状，形状决定了标记最后的展现形式。自定义形状主要分为三步：

- 定义形状组件。
- 注册形状。
- 使用形状。

首先我们来看看如何定义形状组件。一个形状组件是一个函数，该函数接受图形的样式 _style_ 和上下文 _context_，返回一个绘制函数 _render_ 。其中 _style_ 是通过 `mark.style` 指定的经过处理的选项，_context_ 包含了 [@antv/g](https://g.antv.antgroup.com/) 创建图形的 _document_ 。

返回的 _render_ 函数接受图形的控制点 _P_，映射值 _value_ 和默认值 _defaults_，返回 @antv/g 的图形。其中 _P_ 是一系列画布坐标构成的数组，_value_ 是通过 `mark.encode` 处理后的值，_defaults_ 是主题中 `theme.mark.shape` 指定的值。一个形状组件的定义大概如下：

```js
function ShapeTriangle(style, context) {
  const { document } = context;
  return (P, value, defaults) => {
    return document.createElement('rect', {
      //...
    });
  };
}
```

接下来就是注册形状，通过调用 `G2.register('shape.${mark}.${shape}', Shape)` 来完成注册该形状。其中 _mark_ 是标记的名字，_shape_ 是形状的名字，_Shape_ 是定义好的形状组件。比如给 Interval 标记注册一个三角形的形状：

```js
import { register } from '@antv/g2';

register('shape.interval.triangle', ShapeTriangle);
```

最后就是使用该形状了，可以通过 `mark.encode` 指定，也可以通过 `mark.style` 指定.

```js
({
  type: 'interval',
  encode: { shape: 'triangle' },
  // 或者
  style: { shape: 'triangle' },
});
```

```js
// API
chart.interval().encode('shape', 'triangle');

// 或者
chart.interval().style('shape', 'triangle');
```

下面是一个完整的例子，展示了如何自定义形状。

```js | ob
(() => {
  // 定义图形组件
  function ShapeTriangle(style, context) {
    const { document } = context;
    return (P, value, defaults) => {
      const { color: defaultColor } = defaults;
      const [p0, p1, p2, p3] = P;
      const pm = [(p0[0] + p1[0]) / 2, p0[1]];
      const { color = defaultColor } = value;
      return document.createElement('polygon', {
        style: {
          ...style,
          fill: color,
          points: [pm, p2, p3],
        },
      });
    };
  }

  // 注册该三角形
  G2.register('shape.interval.triangle', ShapeTriangle);

  // 初始化图表
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
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('shape', 'triangle'); // 使用这个形状

  chart.render();

  return chart.getContainer();
})();
```

## 自定义符号（Symbol）

每一个符号都可以自定义，主要分为三步：

- 定义符号路径。
- 注册符号。
- 使用符号。

首先我们来看看如何定义符号路径。一个符号路径是一个函数，该函数接受起始点的横向坐标 x、纵向坐标 y 和绘制半径，返回一个路径。

```js
import { type SymbolFactor } from '@antv/g2';

const triangle: SymbolFactor = (x, y, r) => {
  const diffY = r * Math.sin((1 / 3) * Math.PI);
  return [
    ['M', x - r, y + diffY],
    ['L', x, y - diffY],
    ['L', x + r, y + diffY],
    ['Z'],
  ];
};
triangle.style = ['fill'];
```

接下来就是注册符号，通过调用 `G2.register('symbol.${symbol}', Symbol)` 来完成注册。其中 `symbol` 是符号的名字，`Symbol` 是定义好的符号路径。比如注册一个三角形的符号：

```js
import { register } from '@antv/g2';

register('symbol.customTriangle', triangle);
```

最后就是使用该符号了

```js
legend: { 
  color: {
    itemMarker: 'customTriangle'
  } 
}
```

## 自定义提示（Tooltip）

有时候内置的 Tooltip 无法满足需求，这时候可以通过 `mark.interaction.tooltip.render` 或者 `view.interaction.tooltip.render` 的 _render_ 函数来渲染自定义的提示。

该 _render_ 函数接受事件对象 _event_ 和提示数据 _tooltipData_，返回一个 string 或者 DOM 对象。其中 _event_ 是 [@antv/g](https://g.antv.antgroup.com/) 抛出的鼠标对象，_tooltipData_ 是通过 `mark.tooltip` 声明的 title 和 items 数据。如果返回值是一个 string，那么会作为 tooltip 容器的 innerHTML，否则会挂载该返回值。一个提示的 render 函数的定义大概如下：

```js
function render(event, tooltipData) {
  const { title, items } = tooltipData;
  return `<div></div>`;
}
```

下面是一个简单的例子：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .transform([{ type: 'sortX', by: 'y', reverse: true }])
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .interaction('tooltip', {
      // render 回调方法返回一个innerHTML 或者 DOM
      render: (event, { title, items }) => `<div>
      <h3 style="padding:0;margin:0">${title}</h3>
      <ul>${items.map(
        (d) =>
          `<li><span style="color: ${d.color}">${d.name}</span> ${d.value}</li>`,
      )}</ul>
      </div>`,
    });

  chart.render();

  return chart.getContainer();
})();
```

## 自定义图例（Legend）

G2 内置的图例是用 canvas 或者 svg 绘制的，如果希望能用 HTML 渲染图例，就可以按照如下几步自定义图例：

- 关闭内置图例并且渲染图表。
- 等待图表渲染完成，根据 scale 数据渲染 HTML 图例。
- 添加交互（如果需要）。

首先是关闭内置图例，同时渲染图表。

```js
chart.options({ legend: false });
```

然后是等待图表渲染完成，并且调用 `legendColor` 渲染 HTML 图例：

```js
chart.render().then(legendColor);
```

在 `legendColor` 里我们首先需要把图例画出来，下面这个例子把图例画出来后，添加到了画布前面：

```js
function legendColor(chart) {
  const node = chart.getContainer();
  const legend = document.createElement('div');
  node.insertBefore(legend, node.childNodes[0]);

  // ...
}
```

画出了图例之后，我们需要绘制图例项，这个数据从对应通道的比例尺获得：`chart.getScale().color`，并且通过 scale 的 domain 和 range 获得对应的名字和值。

```js
function legendColor(chart) {
  // ...
  const scale = chart.getScale().color;
  const { domain } = scale.getOptions();
  const items = domain.map(() => {});
  // ...
}
```

绘制完图例项之后我们就应该给每个图例项通过 `item.onclick` 添加交互，收集当前选中的值，并且根据这个值去给图表的声明添加 Filter 转换，最后重新渲染图表。最后完整的实现如下：

```js | ob
(() => {
  // 添加图例
  function legendColor(chart) {
    // 创建 Legend 并且挂在图例
    const node = chart.getContainer();
    const legend = document.createElement('div');
    legend.style.display = 'flex';
    node.insertBefore(legend, node.childNodes[0]);

    // 创建并挂载 Items
    const { color: scale } = chart.getScale();
    const { domain } = scale.getOptions();
    const items = domain.map((value) => {
      const item = document.createElement('div');
      const color = scale.map(value);
      item.style.marginLeft = '1em';
      item.innerHTML = `
      <span style="
        background-color:${color};
        display:inline-block;
        width:10px;
        height:10px;"
      ></span>
      <span>${value}</span>
      `;
      return item;
    });
    items.forEach((d) => legend.append(d));

    // 监听事件
    const selectedValues = [...domain];
    const options = chart.options();
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const value = domain[i];
      item.style.cursor = 'pointer';
      item.onclick = () => {
        const index = selectedValues.indexOf(value);
        if (index !== -1) {
          selectedValues.splice(index, 1);
          item.style.opacity = 0.5;
        } else {
          selectedValues.push(value);
          item.style.opacity = 1;
        }
        changeColor(selectedValues);
      };
    }

    // 重新渲染视图
    function changeColor(value) {
      const { transform = [] } = options;
      const newTransform = [{ type: 'filter', color: { value } }, ...transform];
      chart.options({
        ...options,
        transform: newTransform, // 指定新的 transform
        scale: { color: { domain } },
      });
      chart.render(); // 重新渲染图表
    }
  }

  // 绘制图表
  const container = document.createElement('div');

  const chart = new G2.Chart({
    
    container,
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
    encode: { x: 'genre', y: 'sold', color: 'genre' },
    legend: false,
  });

  chart.render().then(legendColor);

  return chart.getContainer();
})();
```

## 自定义拖动轴（Slider）

如果不希望使用 G2 默认的坐标轴，就可以按照以下几步自定义拖拽轴：

- 在渲染结束后渲染 slider。
- 监听 slider 事件。

第一步的的关键是通过 `chart.getCoordinate` 获得的 coordinate 对象确定 slider 的位置和长度。第二步的关键是通过 `chart.getScale` 获得 scale 对选择的范围进行 invert，最后获得选择的数据范围，然后更新 scale 的定义域。

```js | ob
(() => {
  function sliderX(chart) {
    // 创建并且挂载 range
    const container = chart.getContainer();
    const range = document.createElement('input');
    container.append(range);

    // 根据 coordinate 设置 range 的宽度等属性
    const coordinate = chart.getCoordinate();
    const { paddingLeft, width } = coordinate.getOptions();
    range.type = 'range';
    range.min = 0;
    range.max = width;
    range.value = width;
    range.style.display = 'block';
    range.style.width = width + 'px';
    range.style.marginLeft = paddingLeft + 'px';

    // 监听 change 事件，通过 scale 获得筛选得到的 domain
    // 更新 domain 并且渲染
    const scale = chart.getScaleByChannel('x');
    const options = chart.options();
    range.onchange = (event) => {
      const value = event.target.value;
      const range = [0, value / width];
      const domain = range.map((d) => scale.invert(d));
      chart.options({
        ...options,
        scale: { x: { domain } },
      });
      chart.render();
    };
  }

  // 渲染图表
  const container = document.createElement('div');
  const chart = new G2.Chart({ container });

  chart.options({
    type: 'line',
      data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
    },
    encode: { x: 'date', y: 'close' },
  });

  chart.render().then(sliderX);

  return chart.getContainer();
})();
```
