---
title: Spec Function Expression Support (Available in 5.3.0)
order: 13
---

## Background

G2 introduced the spec configuration method in version 5.0, which will become the mainstream usage method in the future. However, there is a key issue with the current spec:

To provide more flexible graphic style configuration capabilities, G2 supports numerous function callback methods that allow users to customize styles. However, this brings a hidden danger — **function configurations in spec cannot be serialized**. In SSR scenarios, users expect to be able to persistently store spec configurations, which requires a string expression to describe function behavior.

```js
const spec = {
  style: {
    // Using callback functions for flexible customization, but cannot be persistently stored
    fill: (d) => (d.value > 100 ? 'red' : 'green'),
  },
};
```

To solve this problem, we designed and open-sourced [expr](https://github.com/antvis/expr). The function above can be equivalently converted to a string expression: `{d.value > 100 ? 'red' : 'green'}`.

## Using expr Expressions

To use expressions in G2, you need to wrap the expression content with `{` and `}` so that G2 can recognize it as an expression to be parsed rather than an ordinary string. For example: `{d.value > 100 ? "red" : "green"}`.

## expr Expression Syntax

As developers, we are most concerned with expression syntax. We have designed a concise and intuitive template syntax. For complete details, please refer to the [expr documentation](https://github.com/antvis/expr#readme), which will not be repeated here.

## Parameter Naming Conventions

Currently, G2 supports expr expressions wherever function callbacks are supported. The system will parse the expressions into functions that the renderer can understand before rendering.

This presents a challenge: different functions have different parameters with varying semantics. How can we support expressions uniformly?

The expr design requires that parameters in the template syntax strictly correspond to keys in the context. However, in G2, callback function parameters are diverse. If they were simply set as datum, i, data, options, etc., the semantics would not be clear enough and would be difficult to adapt to various scenarios.

After comprehensive consideration, we adopted a non-semantic variable naming scheme — using letter variable names like a, b, c, d to represent the position order of function parameters.

### Parameter Mapping Examples

In different callback functions, the actual meanings of parameters `a`, `b`, `c`, `d` will vary:

1. In most callbacks, such as `fill` in `style` and `text` in `labels`, `a` represents the data item, `b` represents the index, `c` represents the entire dataset, and `d` represents options:

   ```js
   labels: [
     {
       // Function method
       text: (datum, index, data, options) => `${datum.name}: ${datum.value}`,
       // Expression method - a corresponds to datum, b corresponds to index, c corresponds to data
       text: "{ a.name + ': ' + a.value }",
     },
   ];
   ```

2. In `selector` of `labels`, `a` represents the entire dataset:

   ```js
   labels: [
     {
       // Function method
       selector: (data) => data,
       // Expression method
       selector: '{a}',
     },
   ];
   ```

Through this unified parameter naming convention, we can consistently use expressions in different scenarios without worrying about semantic differences in parameter names.

## Comparison of Function and Expression Approaches

To help developers better understand how to use expressions, here are some comparison examples of function and expression approaches in common scenarios:

### Style Configuration (style)

```js
// Function approach
style: {
  fill: (datum) => (datum.value > 1000 ? 'red' : 'blue'),
  opacity: (datum) => datum.value / 2000,
  stroke: (datum) => (datum.category === 'A' ? 'black' : 'gray'),
  lineWidth: (datum) => (datum.important ? 2 : 1),
}

// Expression approach
style: {
  fill: '{a.value > 1000 ? "red" : "blue"}',
  opacity: '{a.value / 2000}',
  stroke: '{a.category === "A" ? "black" : "gray"}',
  lineWidth: '{a.important ? 2 : 1}',
}
```

### Encoding Mapping (encode)

```js
// Function approach
encode: {
  x: 'category',
  y: 'value',
  color: (datum) => (datum.value > 500 ? 'category1' : 'category2'),
  opacity: (datum, index) => 1 - index * 0.1,
}

// Expression approach
encode: {
  x: 'category',
  y: 'value',
  color: '{a.value > 500 ? "category1" : "category2"}',
  opacity: '{1 - b * 0.1}',
}
```

### Label Configuration (labels)

```js
// Function approach
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

// Expression approach
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

## ⚠️ Usage Limitations

Currently, G2 only supports expr expression writing for callback functions in the following APIs:

- `style`
- `encode`
- `labels`
- `children`

If you need to use expressions in other APIs, please submit an issue for feedback.

## Complete Example

Here is a complete example demonstrating the powerful capabilities of expressions in practical applications:

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
