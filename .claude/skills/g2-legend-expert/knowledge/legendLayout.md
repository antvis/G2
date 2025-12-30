# Legend Layout Mechanism with Manual Padding

## Problem Description
When `paddingTop` is manually set (e.g., `paddingTop: 72`), the height of `legendCategory` changes unexpectedly (e.g., from 60px to 40px).

## Cause Analysis

### 1. Layout Calculation Logic
G2's layout engine (located in `src/runtime/layout.ts`) adopts different strategies when calculating component dimensions based on the `padding` configuration. The core logic resides in the `computePadding` function:

```typescript
// src/runtime/layout.ts

const autoSizeOf = (d) => {
  if (d.size) return; // If component already has a size, return immediately
  
  // Key logic: If padding is not 'auto' (i.e., manually set value), use default size
  if (value !== 'auto') sizeOf(d); 
  else {
    // If padding is 'auto', dynamically calculate component size
    computeComponentSize(
      d,
      crossSize,
      crossPadding,
      position,
      theme,
      library,
    );
    defaultSizeOf(d);
  }
};
```

- **`value === 'auto'` (Default)**: Calls `computeComponentSize`, which measures the actual content of the component (text, icons, etc.) to calculate the precise required height (e.g., 60px).
- **`value !== 'auto'` (Manual setting, e.g., 72)**: Calls `sizeOf(d)`.

### 2. Fallback Mechanism (`sizeOf`)
When entering the `sizeOf` branch, the code directly uses the component's `defaultSize`:

```typescript
// src/runtime/layout.ts

const sizeOf = (d) => {
  if (d.type === 'group') {
    // ...handle grouping...
  } else {
    d.size = d.defaultSize; // <--- Directly assign defaultSize
  }
};
```

In `src/component/legendCategory.ts`, the default size of `LegendCategory` is defined as **40**:

```typescript
// src/component/legendCategory.ts
LegendCategory.props = {
  defaultPosition: 'top',
  // ...
  defaultSize: 40, // <--- Default height
  // ...
};
```

Therefore, when you set `paddingTop: 72`, the layout engine assumes you have taken over space allocation. To avoid redundant calculations or conflicts, it no longer measures the actual content height of the legend but directly falls back to the default value of 40px.

## Solution

If you need to fix `paddingTop` but also want to maintain a specific legend height (e.g., 60px), you must explicitly set the `size` property in the legend configuration. The explicitly set `size` has the highest priority and will be adopted immediately in the first line of `autoSizeOf`: `if (d.size) return;`.

```javascript
chart.options({
  // ...
  paddingTop: 72, // 1. Manually set padding
  legend: {
    color: {
      size: 60,   // 2. Explicitly set height to prevent fallback to default value (40)
      // ...
    },
  },
});
```
