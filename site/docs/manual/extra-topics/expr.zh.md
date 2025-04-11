---
title: Spec 函数表达式支持 (5.3.0 支持)
order: 13
---

## 背景

G2 在 5.0 版本中引入了 spec 配置方式，这将成为未来主流的使用方式。然而，当前 spec 存在一个关键问题：

为了提供更灵活的图形样式配置能力，G2 支持了大量 function callback 方式让用户自定义样式，但这带来了一个隐患 —— **spec 中的函数配置无法序列化**。在 SSR 场景下，用户期望能够将 spec 配置持久化存储，这就需要一种字符串表达式来描述函数行为。

```js
const spec = {
  style: {
    // 使用回调函数灵活自定义，但无法持久化存储
    fill: (d) => (d.value > 100 ? 'red' : 'green'),
  },
};
```

为解决这个问题，我们设计并开源了 [expr](https://github.com/antvis/expr)。上述函数写法可等效转换为字符串表达式：`{d.value > 100 ? 'red' : 'green'}`。

## 使用 expr 表达式

要在 G2 中使用表达式，您需要用 `{` 和 `}` 包裹表达式内容，以便 G2 能够识别这是一个需要解析的表达式而非普通字符串。例如：`{d.value > 100 ? "red" : "green"}`。

## expr 表达式语法

作为开发者，我们最关心的是表达式语法。我们设计了一套简洁直观的模板语法，完整细节请参考 [expr 文档](https://github.com/antvis/expr#readme)，本文不再赘述。

## 参数命名规范

目前，G2 在所有支持函数回调的地方都支持 expr 表达式，系统会在渲染前将表达式解析为渲染器可理解的函数。

这里面临一个挑战：不同函数有不同参数，参数语义各异，如何统一支持表达式？

expr 设计要求模板语法中的参数与 context 中的 key 严格对应。但在 G2 中，回调函数的参数多种多样，若简单设置为 datum、i、data、options 等，语义上会不够清晰，且难以适应各种场景。

经过综合考量，我们采用了无语义变量命名方案 —— 使用 a, b, c, d 等字母变量名表示函数参数的位置顺序。

### 参数映射示例

在不同的回调函数中，参数 `a`, `b`, `c`, `d` 代表的实际含义会有所不同：

1. 在大多数的回调中，比如 `style` 的 `fill`，`labels` 的 `text` 中，`a` 代表数据项，`b` 代表索引，`c` 代表整个数据集，`d` 代表 options：

   ```js
   labels: [
     {
       // 函数方式
       text: (datum, index, data, options) => `${datum.name}: ${datum.value}`,
       // 表达式方式 - a 对应 datum，b 对应 index，c 对应 data
       text: "{ a.name + ': ' + a.value }",
     },
   ];
   ```

2. 在 `labels` 的 `selector` 中，`a` 代表整个数据集：

   ```js
   labels: [
     {
       // 函数方式
       selector: (data) => data,
       // 表达式方式
       selector: '{a}',
     },
   ];
   ```

通过这种统一的参数命名约定，我们可以在不同场景下一致地使用表达式，而不必担心参数名称的语义差异。

## 函数式写法与表达式写法对比

为了帮助开发者更好地理解如何使用表达式，下面提供了一些常见场景下函数式写法与表达式写法的对比示例：

### 样式配置 (style)

```js
// 函数式写法
style: {
  fill: (datum) => (datum.value > 1000 ? 'red' : 'blue'),
  opacity: (datum) => datum.value / 2000,
  stroke: (datum) => (datum.category === 'A' ? 'black' : 'gray'),
  lineWidth: (datum) => (datum.important ? 2 : 1),
}

// 表达式写法
style: {
  fill: '{a.value > 1000 ? "red" : "blue"}',
  opacity: '{a.value / 2000}',
  stroke: '{a.category === "A" ? "black" : "gray"}',
  lineWidth: '{a.important ? 2 : 1}',
}
```

### 编码映射 (encode)

```js
// 函数式写法
encode: {
  x: 'category',
  y: 'value',
  color: (datum) => (datum.value > 500 ? 'category1' : 'category2'),
  opacity: (datum, index) => 1 - index * 0.1,
}

// 表达式写法
encode: {
  x: 'category',
  y: 'value',
  color: '{a.value > 500 ? "category1" : "category2"}',
  opacity: '{1 - b * 0.1}',
}
```

### 标签配置 (labels)

```js
// 函数式写法
labels: [
  {
    text: (datum) => `${datum.name}: ${datum.value}`,
    position: (datum) => (datum.value > 1000 ? 'top' : 'bottom'),
    style: {
      fontSize: (datum) => 10 + datum.value / 200,
    },
    transform: [{ type: 'contrastReverse' }],
  },
];

// 表达式写法
labels: [
  {
    text: '{a.name + ": " + a.value}',
    position: '{a.value > 1000 ? "top" : "bottom"}',
    style: {
      fontSize: '{10 + a.value / 200}',
    },
    transform: [{ type: 'contrastReverse' }],
  },
];
```

## ⚠️ 使用限制

目前，G2 仅支持以下 API 中回调函数的 expr 表达式写法：

- `style`
- `encode`
- `labels`
- `children`

如果您需要在其他 API 中使用表达式，欢迎提交 issue 反馈。

## 完整示例

以下是一个完整的示例，展示了表达式在实际应用中的强大能力：

```js | ob
(() => {
  const chart = new G2.Chart();

  const spec = {
    type: 'spaceLayer',
    height: 840,
    width: 640,
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
      format: 'csv',
    },
    children: [
      {
        type: 'interval',
        height: 360,
        width: 360,
        legend: false,
        x: 280,
        transform: [{ type: 'stackY' }],
        coordinate: { type: 'theta' },
        scale: {
          color: { palette: 'spectral' },
        },
        encode: {
          y: 'value',
          color: 'name',
          enterDelay: '{a.value>10000000 ? a.value>20000000 ? 2000 : 1000 : 0}',
        },
        style: {
          stroke: '{ a.value>20000000 ? "purple" : null}',
        },
        labels: [
          {
            text: '{"*" + a.name}',
            radius: '{a.value>15000000 ? a.value>20000000 ? 0.6 : 0.75 : 0.9}',
            style: {
              fontSize: '{a.value>15000000 ? a.value>20000000 ? 12 : 10 : 6}',
              fontWeight: 'bold',
            },
            transform: [{ type: 'contrastReverse' }],
          },
          {
            text: '{b < c.length - 3 ? a.value : ""}',
            radius: '{a.value>15000000 ? a.value>20000000 ? 0.6 : 0.75 : 0.9}',
            style: { fontSize: 9, dy: 12 },
            transform: [{ type: 'contrastReverse' }],
          },
        ],
        animate: { enter: { type: 'waveIn', duration: 600 } },
      },
      {
        type: 'view',
        height: 400,
        width: 540,
        y: 300,
        children: [
          {
            type: 'interval',
            height: 400,
            width: 540,
            legend: false,
            y: 300,
            scale: {
              color: { palette: 'spectral' },
            },
            encode: {
              y: 'value',
              x: 'name',
              color: 'name',
              enterDelay:
                '{a.value>10000000 ? a.value>20000000 ? 2000 : 1000 : 0}',
            },
          },
          {
            type: 'line',
            height: 400,
            width: 540,
            legend: false,
            y: 300,
            encode: { x: 'name', y: 'value' },
            scale: { y: { independent: true } },
            labels: [
              {
                text: '{a.value}',
                selector: '{a}',
              },
            ],
            axis: {
              y: {
                position: 'right',
                grid: null,
              },
            },
          },
        ],
      },
    ],
  };

  chart.options(spec);

  chart.render();

  return chart.getContainer();
})();
```
