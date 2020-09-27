---
title: G2 4.0 Upgrade Guide
order: 9
---

## Overview

As the front-end implementation of the Grammar of Graphics, G2 has undergone multiple iterations. This time G2 4.0 is a new starting point. We have done a lot of reconstruction work on the underlying architecture. G2 will pay more attention to the construction of **graphics grammar**, **interactive grammar** and **visual component system**. We hope that G2 4.0 will become a professional visualization engine that brings more possibilities to users. On the basis of meeting the needs of traditional statistical charts, it can better empower (but not limited to):

- Allow developers to encapsulate the upper chart library faster and better based on G2 4.0
- Make interactive visualization easier
- Become a professional tool in the field of visualization

Although we have carried out a large-scale refactoring of the G2 internals, including data processing procedures (introduction of data update mechanism), chart components, view rendering update logic, event and interaction mechanism transformation, etc., in order to ensure that user projects can be upgraded more smoothly For the code of the API layer, we have basically not made major changes. Regarding the changes, we hope to help everyone upgrade better and faster through the upgrade guide, API documentation, etc.

## Change Description

### Overall change

1. Fully embrace TypeScript.
2. Brand-new visual components: interaction-oriented, elegant experience.
3. Powerful View module: It can be used alone, with complete visual components and events, and supports View nesting and automatic layout.
4. Brand new interactive syntax.
5. The graphics engine has been upgraded to version G 0.4, which supports dual engine switching.
6. Introduce a data update mechanism.
7. Animation mechanism transformation, more granular, better experience.
8. Modular management provides a more flexible expansion mechanism.

### API changes

G2 4.0 is fully functionally compatible with 3.x functions. On the API interface, we have made some optimizations. Based on the maximum compatibility with 3.x syntax, it provides more user-friendly, more understandable function naming and more Reasonable configuration item structure, the specific change records are as follows:

#### Incompatible changes

- 🗑️ `chart.source()` interface is obsolete, please use `chart.data()` interface, and for the column definitions please use `chart.scale()` interface.
- 🗑️ `chart.coord()` interface is obsolete, please use `chart.coordinate()`.
- 🗑️ `chart.guide()` interface is obsolete, please use `chart.annotation()`，and `chart.guide().html()` is no longer supported.
- 🗑️ `chart.view()` interface is obsolete, please use `chart.createView()`.
- 🗑️ `chart.interact()` interface is obsolete, please use `chart.interaction()`.
- 🗑️ `chart.repaint()` interface is obsolete, please use `chart.render(update: boolean)` interface.
- 🗑️ Taking into account the difference in the environment of G2 (browser, mobile, etc.) and v3 release, interfaces to download images `chart.toDataURL` and `chart.downloadImage()` have been abandoned; for specific programs refer to [FAQ](./faq.en.md)。
- 🗑️ `G2.Global` is removed; the default theme configuration can be obtained in the following ways:

```typescript
// Method 1
import { getTheme } from '@antv/g2';
const defaultTheme = getTheme();

// Method 2, get the current theme through the chart example
const theme = chart.getTheme();
```

- 🗑️ `geometry.active()` interface is obsolete, please use `geometry.state()` interface.
- 🗑️ `geometry.select()` interface is obsolete, please use `geometry.state()` interface.
- 🗑️ `geometry.opacity()` interface is obsolete, please use `geometry.color()`  for color or `geometry.style()` interface.
- The following syntax is no longer supported:
  - 🗑️ `pointJitter()` interface is obsolete, please use `point().adjust('jitter')`。
  - 🗑️ `pointDodge()` interface is obsolete, please use `point().adjust('dodge')`。
  - 🗑️ `intervalStack()` interface is obsolete, please use `interval().adjust('stack')`。
  - 🗑️ `intervalDodge()` interface is obsolete, please use `interval().adjust('dodge')`。
  - 🗑️ `intervalSymmetric()` interface is obsolete, please use `interval().adjust('symmetric')`。
  - 🗑️ `areaStack()` interface is obsolete, please use `area().adjust('stack')`。
  - 🗑️ `schemaDodge()` interface is obsolete, please use `schema().adjust('stack')`。
- 🗑️ `Venn` and `Violin` geometric markers are temporarily removed, and we will consider supporting them in a better way later.
- 🗑️ Remove the following two shaped from the Interval geometry shape: 'top-line' and 'liquid-fill-gauge'，Users can implement them by customizing the Shape mechanism.
- 🗑️ Remove the tail type legend.
- Rename the built-in constants, consistent use of lowercase + '-' naming conventions, like change `shape('hollowCircle')` to `shape('hollow-circle')`.

#### Configuration and Interface changes

In 4.0, we have made some changes to the following interfaces and some of the attributes in the interfaces. Based on the compatibility with the original functions of 3.x, the configuration items are more semantic and the structure is more reasonable. Please refer to the API documentation for details.

- `new Chart(cfg)` Interface attribute update:
  - 4.0 code usage example:

```typescript
const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});
```

> Comparison of new and old interfaces: [https://github.com/simaQ/g2-v4-upgrade/pull/1/files#diff-6477dff11424caa76a176cf710e71023R16](https://github.com/simaQ/g2-v4-upgrade/pull/1/files#diff-6477dff11424caa76a176cf710e71023R16)

- `chart.data()` The interface no longer supports DataView format data, and only supports standard JSON arrays, so when using DataSet, take the final JSON array result and pass it to G2: [https://github.com/simaQ/g2-v4-upgrade/pull/1/files#diff-660f42f89c29e15f5f86a3e8c1023302R23](https://github.com/simaQ/g2-v4-upgrade/pull/1/files#diff-660f42f89c29e15f5f86a3e8c1023302R23)

```typescript
chart.data(dv.rows);
```

- All configurations related to drawing are defined in the style attribute:

```ts
chart.axis('value', {
  label: {
    style: {
      textAlign: 'center',
    }, // Set the axis text style
  },
  line: {
    style: {
      stroke: '#E9E9E9',
      lineDash: [3, 3],
    }, // Set the coordinate axis style
  },
  grid: {
    line: {
      style: {
        lineDash: [3, 3],
      },
    }, // Set the coordinate system grid style
  },
});
```

- `chart.tooltip()` configuration items are updated. At the same time, some built-in rules for specific charts in the G2 3.x version are deleted. Users need to configure themselves through the provided configuration items. For specific configuration properties, please refer to the [API](../api/classes/view#tooltip)。

  - Background tooltip support auxiliary frame configuration item is no longer necessary to use `chart.interaction('active-region');` support Cartesian coordinates and polar coordinates.

  <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*j05pRJG3ovgAAAAAAAAAAABkARQnAQ" width=600 />

- `chart.legend()` configuration items are updated, see [API](../api/classes/view#legend) for specific configuration. Here are some commonly used 3.x attributes and 4.0 alternatives:

  - 🗑️ `clickable` Property removed, If you want to cancel legend check the interaction, you can pass `chart.removeInteraction('legend-filter')` Remove the check interaction of the classification legend.
  - 🗑️ `selectedMode` Property removed,4.0 can be achieved through custom interaction behavior.
  - 🗑️ `onClick` Property removed, 4.0 4.0 can be achieved by listening to the legend event: `chart.on('legend:click', (ev) => {})`.
  - 🗑️ `slidable` Property removed, 4.0 can be achieved by removing continuous interaction from legend slider: `chart.removeInteraction('continuous-filter')` 移除连续图例的滑块交互。
  - 🗑️ `hoverable` Property removed, in 4.0 use `chart.interaction('legend-active')` and to achieve other interactive behavior , refer interaction grammar. demo: https://g2.antv.vision/en/examples/interaction/component#legend-active。
  - 🗑️ `onHover` Property removed, 4.0 can be achieved by listening to the legend event: `chart.on('legend:mousemove', (ev) => {})`。

- `chart.axis()` Configuration items are updated, see [API](../api/classes/view#axis) for details.
- `chart.annotation()` Various types of annotation configuration items are updated, see [API](../api/classes/view#annotation) for details.
- `geometry().style()` The writing method of the callback function has been changed. It no longer supports a callback method for a configuration property, but a callback:

```typescript
style('a', (aVal) => {
  if (a === 1) return { fill: 'red' };
  return { fill: 'blue' };
});
```

See [API](../api/classes/geometry#style) for details.

- `geometry.label()` The interface is updated, and the html type label is no longer supported, see [API](../api/classes/geometry#label) for details.

---

💌 If you find something missing in this upgrade guide during the upgrade process, please feel free to contact us ([contact information](./contact)), thank you very much!
