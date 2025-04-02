---
title: Spec Function Expression Support (5.3.0 supported)
order: 13
---

## Background

G2 introduced the spec configuration approach in version 5.0, which will become the mainstream usage pattern in the future. However, the current spec implementation has a key issue:

To provide more flexible graphic style configuration capabilities, G2 supports numerous function callbacks that allow users to customize styles. This creates a challenge — **function configurations in spec cannot be serialized**. In SSR scenarios, users expect to persist spec configurations, which requires a string expression format to describe function behavior.

```js
const spec = {
  style: {
    // Using callback functions for flexible customization, but cannot be persisted
    fill: (d) => (d.value > 100 ? 'red' : 'green'),
  },
};
```

To solve this problem, we designed and open-sourced [expr](https://github.com/antvis/expr). The function above can be equivalently expressed as a string expression: `{d.value > 100 ? 'red' : 'green'}`.

## Using expr Expressions

To use expressions in G2, you need to wrap your expression content with `{` and `}` delimiters so G2 can recognize it as an expression to be parsed rather than a plain string. For example: `{d.value > 100 ? "red" : "green"}`.

## expr Expression Syntax

As developers, we're primarily concerned with expression syntax. We've designed a concise and intuitive template syntax system. For complete details, please refer to the [expr documentation](https://github.com/antvis/expr#readme) — this article won't repeat those specifics.

## Parameter Naming Convention

Currently, G2 supports expr expressions in all places that accept function callbacks. The system parses these expressions into renderer-compatible functions before rendering.

This presents a challenge: different functions have different parameters with varying semantics. How can we support expressions uniformly?

The expr design requires that parameters in template syntax strictly correspond to keys in the context. However, in G2, callback function parameters are diverse. Simply using names like datum, i, data, options would be semantically unclear and difficult to adapt to various scenarios.

After comprehensive consideration, we adopted a semantics-free variable naming scheme — using alphabetical variable names like a, b, c, d to represent parameter positions in functions.

```js
const spec = {
  style: {
    // Function approach, parameters conventionally named a, b, c, d...
    fill: (a, b, c, d) => (a.value > 100 ? 'red' : 'green'),
    // Expression approach, using a, b, c, d... variable names to reference parameters
    fill: "{ a.value > 10 ? 'red' : 'green' }",
  },
};
```

## ⚠️ Usage Limitations

Currently, G2 only supports expr expression syntax for callback functions in the following APIs:

- `style`
- `encode`
- `attr`
- `labels`
- `children`

If you need to use expressions in other APIs, please submit an issue to let us know.

## Complete Example

Here's a complete example demonstrating the power of expressions in practical applications:

```js | ob
(() => {
  const chart = new G2.Chart();

  const spec = {
    type: 'interval',
    height: 640,
    width: 640,
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
    },
    transform: [{ type: 'stackY' }],
    coordinate: { type: 'theta' },
    scale: {
      color: { palette: 'spectral' },
    },
    encode: { y: 'value', color: 'name' },
    style: { stroke: 'white' },
    labels: [
      {
        text: '{"*" + a.name}',
        radius: '{a.value>15000000 ? a.value>20000000 ? 0.6 : 0.75 : 0.9}',
        style: {
          fontSize: '{a.value>15000000 ? a.value>20000000 ? 20 : 15 : 9}',
          fontWeight: 'bold',
        },
      },
      {
        text: '{b < c.length - 3 ? a.value : ""}',
        radius: '{a.value>15000000 ? a.value>20000000 ? 0.6 : 0.75 : 0.9}',
        style: { fontSize: 9, dy: 12 },
      },
    ],
    animate: { enter: { type: 'waveIn', duration: 1000 } },
  };

  chart.options(spec);

  return chart.getContainer();
})();
```
