---
title: 交互（Interaction)
order: 8
---

G2 中**交互（Interaction）** 提供了按需探索数据的能力。

交互可以设置在视图层级：

```js
({
  type: 'view',
  interaction: {
    tooltip: {},
    brushHighlight: {},
  },
});
```

```js
// API
// 第一种方式
chart.interaction('tooltip', {}).interaction('brushHighlight', {});

// 第二种方式
chart.interaction({
  tooltip: {},
  brushHighlight: {},
});
```

交互也可以设置在标记层级：

```js
({
  type: 'interval',
  interaction: {
    tooltip: {},
    brushHighlight: {},
  },
});
```

```js
// API
// 第一种方式
chart.interval().interaction('tooltip', {}).interaction('brushHighlight', {});

// 第二种方式
chart.interval().interaction({
  tooltip: {},
  brushHighlight: {},
});
```

## 视图层级的交互

G2 的交互都是对每一个视图生效，如果希望关掉交互，可以如下：

```js
({
  type: 'view',
  interaction: {
    tooltip: false,
    brushHighlight: false,
  },
});
```

## 标记层级的交互

交互拥有冒泡性，视图交互会被它的标记所设置交互覆盖，并且最后一个标记所对应的坐标系优先级最高。

```js
chart.interaction('elementHighlight', { link: true, background: true });
chart.line().interaction('elementHighlight', { link: false });
chart.area().interaction('elementHighlight', { background: false });
```

和下面的情况等价：

```js
chart.interaction('elementHighlight', { link: false, background: false });
chart.line();
chart.area():
```

## 交互状态

在 G2 中可以通过 `mark.state` 去设置标记的交互状态，比如如下设置 select 和 unselect 的状态，当使用 elementSelect 的时候会消费这两个状态。

```js | ob
(() => {
  const chart = new G2.Chart({ padding: 'auto', theme: 'classic' });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .transform({ type: 'sortX', by: 'y', reverse: true })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .axis('y', { labelFormatter: '.0%' })
    .state({
      selected: { fill: '#f4bb51' }, // 设置选中状态
      unselected: { opacity: 0.6 }, // 设置非选中状态
    })
    .interaction('elementSelect', true);

  chart.render();

  return chart.getContainer();
})();
```

除了 selected 和 unselected 之外，还有如下的内置状态类型：

- active
- inactive

## 自定义交互

如果内置的交互不能满足你的需求，也可以通过自定义交互的方式去实现一些交互。下面自定义一个高亮交互。

```js | ob
(() => {
  const chart = new G2.Chart({ padding: 'auto', theme: 'classic' });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .transform({ type: 'sortX', by: 'y', reverse: true })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .axis('y', { labelFormatter: '.0%' })
    .state({
      selected: { fill: '#f4bb51' }, // 设置选中状态
      unselected: { opacity: 0.6 }, // 设置非选中状态
    })
    .interaction('elementSelect', true);

  // 渲染完成之后绑定交互
  chart.render().then((chart) => {
    // 获得 G Canvas 实例
    const { canvas } = chart.getContext();

    // 找到图形元素
    const elements = canvas.document.getElementsByClassName(
      G2.ELEMENT_CLASS_NAME,
    );

    // 高亮
    for (const element of elements) {
      element.addEventListener('mouseenter', () => {
        element.style._fill = element.style.fill;
        element.style.fill = 'red';
      });

      element.addEventListener('mouseleave', () => {
        element.style.fill = element.style._fill;
      });
    }
  });

  return chart.getContainer();
})();
```

## 交互语法

> 交互语法还在设计中...
