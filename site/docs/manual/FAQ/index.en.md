---
title: 'Frequently Asked Questions (FAQ)'
order: 7
---

## Title Not Rendering After Manually Setting Padding

### Problem Description

When using AntV G2 to render charts, manually setting the `padding` can cause the chart title to not render properly or disappear entirely.

Related issue: [Title is not displayed after setting](https://github.com/antvis/G2/issues/6549)

### Cause Analysis

G2 dynamically calculates the space required for all components by default, but once a fixed `padding` value is specified, this automatic adjustment logic is skipped, which may lead to incomplete rendering of the components.

### Solutions

There are two ways to resolve this issue:

#### 1. Use the Default Layout (Recommended)

Allow G2 to automatically calculate the optimal spacing to ensure that all components are rendered correctly:

```javascript
chart
  .interval()
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'type');
```

#### 2. Set Padding Correctly

If you must manually set the `padding`, make sure to reserve enough space for dynamically generated components:

```javascript
chart
  .padding(50)
  .interval()
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'type');
```

### Notes

- When manually setting `padding`, it is recommended to debug and find the appropriate values.
- Consider the space requirements for titles, legends, and other components.
- If a specific layout is not required, it's better to use G2's automatic layout system.
