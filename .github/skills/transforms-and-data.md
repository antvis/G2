# G2 Transforms and Data Processing

This skill covers data transformations in G2, including both data-level transforms (in `src/data/`) and mark-level transforms (in `src/transform/`).

## Two Types of Transforms

### 1. Data Transforms (`src/data/`)
Applied to data **before** it reaches marks. These transform the raw data.

### 2. Mark Transforms (`src/transform/`)
Applied to marks **after** data binding. These transform how data is visually represented.

## Data Transforms (`src/data/`)

Data transforms are applied in the data pipeline before visualization.

### Data Loading

#### Fetch (`src/data/fetch.ts`)
Load data from external sources
```typescript
.data({ type: 'fetch', value: 'data.json' })
.data({ type: 'fetch', value: 'https://example.com/data.csv' })
```

#### Inline (`src/data/inline.ts`)
Use inline data
```typescript
.data({ type: 'inline', value: [{ x: 1, y: 2 }, ...] })
```

### Data Manipulation

#### Filter (`src/data/filter.ts`)
Filter rows based on conditions
```typescript
.data({
  type: 'filter',
  callback: (d) => d.value > 10
})
```

#### Map (`src/data/map.ts`)
Transform each row
```typescript
.data({
  type: 'map',
  callback: (d) => ({ ...d, value: d.value * 2 })
})
```

#### Sort (`src/data/sort.ts`)
Sort data rows
```typescript
.data({
  type: 'sort',
  callback: (a, b) => a.value - b.value
})
```

#### SortBy (`src/data/sortBy.ts`)
Sort by field names
```typescript
.data({
  type: 'sortBy',
  fields: ['category', 'value'],
  order: ['asc', 'desc']
})
```

#### Slice (`src/data/slice.ts`)
Take a subset of rows
```typescript
.data({
  type: 'slice',
  start: 0,
  end: 10
})
```

#### Pick (`src/data/pick.ts`)
Select specific fields
```typescript
.data({
  type: 'pick',
  fields: ['category', 'value', 'label']
})
```

#### Rename (`src/data/rename.ts`)
Rename fields
```typescript
.data({
  type: 'rename',
  map: {
    oldName: 'newName',
    category: 'type'
  }
})
```

#### Fold (`src/data/fold.ts`)
Convert wide format to long format
```typescript
.data({
  type: 'fold',
  fields: ['Q1', 'Q2', 'Q3', 'Q4'],
  key: 'quarter',
  value: 'sales'
})
```

#### Join (`src/data/join.ts`)
Join two datasets
```typescript
.data({
  type: 'join',
  join: otherData,
  on: ['id', 'id'],
  select: ['*', 'name']
})
```

### Statistical Transforms

#### KDE (Kernel Density Estimation) (`src/data/kde.ts`)
Calculate density estimation
```typescript
.data({
  type: 'kde',
  field: 'value',
  as: ['x', 'density'],
  bandwidth: 0.5
})
```

#### WordCloud (`src/data/wordCloud.ts`)
Calculate word cloud layout
```typescript
.data({
  type: 'wordCloud',
  fields: ['text', 'value'],
  size: [640, 480],
  spiral: 'archimedean'
})
```

#### Log (`src/data/log.ts`)
Logarithmic transformation
```typescript
.data({
  type: 'log',
  field: 'value',
  base: 10
})
```

#### EMA (Exponential Moving Average) (`src/data/ema.ts`)
Calculate moving average
```typescript
.data({
  type: 'ema',
  field: 'value',
  alpha: 0.5,
  as: 'ema'
})
```

### Custom Transform

#### Custom (`src/data/custom.ts`)
Define custom data transformations
```typescript
.data({
  type: 'custom',
  callback: (data) => {
    // Custom transformation logic
    return transformedData;
  }
})
```

## Mark Transforms (`src/transform/`)

Mark transforms change how data is visually laid out and represented.

### Layout Transforms

#### StackY (`src/transform/stackY.ts`)
Stack values vertically
- Used for: Stacked bar charts, stacked area charts
- Options: `reverse`, `orderBy`, `groupBy`
```typescript
.transform({ type: 'stackY' })
.transform({ type: 'stackY', reverse: true, orderBy: 'value' })
```

#### StackEnter (`src/transform/stackEnter.ts`)
Stack with enter animation
```typescript
.transform({ type: 'stackEnter' })
```

#### DodgeX (`src/transform/dodgeX.ts`)
Dodge elements horizontally (grouped bar chart)
- Options: `padding`, `groupBy`, `orderBy`, `reverse`
```typescript
.transform({ type: 'dodgeX', padding: 0.1 })
```

#### FlexX (`src/transform/flexX.ts`)
Flexible horizontal layout
```typescript
.transform({ type: 'flexX' })
```

#### Pack (`src/transform/pack.ts`)
Circle packing layout
```typescript
.transform({ type: 'pack', padding: 2 })
```

### Aggregation Transforms

#### Group (`src/transform/group.ts`)
Group data
```typescript
.transform({ type: 'group', color: 'sum' })
```

#### GroupX (`src/transform/groupX.ts`)
Group by X and aggregate Y
- Common for: Creating aggregated bar charts
```typescript
.transform({ type: 'groupX', y: 'sum' })
.transform({ type: 'groupX', y: 'mean' })
```

#### GroupY (`src/transform/groupY.ts`)
Group by Y and aggregate X
```typescript
.transform({ type: 'groupY', x: 'sum' })
```

#### GroupColor (`src/transform/groupColor.ts`)
Group by color channel
```typescript
.transform({ type: 'groupColor' })
```

#### GroupN (`src/transform/groupN.ts`)
Count occurrences in groups
```typescript
.transform({ type: 'groupN' })
```

#### Bin (`src/transform/bin.ts`)
Create bins for continuous data
```typescript
.transform({ type: 'bin', thresholds: 10 })
```

#### BinX (`src/transform/binX.ts`)
Bin on X axis and aggregate Y
- Used for: Histograms
```typescript
.transform({ type: 'binX', y: 'count', thresholds: 20 })
```

### Statistical Transforms

#### NormalizeY (`src/transform/normalizeY.ts`)
Normalize Y values to [0, 1] or percentages
```typescript
.transform({ type: 'normalizeY' })
.transform({ type: 'normalizeY', basis: 'sum', groupBy: 'x' })
```

#### SymmetryY (`src/transform/symmetryY.ts`)
Create symmetric values around zero
- Used for: Diverging bar charts, population pyramids
```typescript
.transform({ type: 'symmetryY' })
```

#### DiffY (`src/transform/diffY.ts`)
Calculate differences between adjacent values
```typescript
.transform({ type: 'diffY' })
```

### Positioning Transforms

#### Jitter (`src/transform/jitter.ts`)
Add random noise to positions
```typescript
.transform({ type: 'jitter', padding: 0.1 })
```

#### JitterX (`src/transform/jitterX.ts`)
Jitter only X positions
```typescript
.transform({ type: 'jitterX', padding: 0.2 })
```

#### JitterY (`src/transform/jitterY.ts`)
Jitter only Y positions
```typescript
.transform({ type: 'jitterY', padding: 0.2 })
```

### Filtering Transforms

#### Filter (`src/transform/filter.ts`)
Filter data points
```typescript
.transform({ type: 'filter', callback: (d) => d.value > 0 })
```

#### Select (`src/transform/select.ts`)
Select specific data points
```typescript
.transform({ type: 'select', selector: 'last' })
.transform({ type: 'select', selector: 'first' })
```

#### SelectX (`src/transform/selectX.ts`)
Select points by X value
```typescript
.transform({ type: 'selectX', x: 5 })
```

#### SelectY (`src/transform/selectY.ts`)
Select points by Y value
```typescript
.transform({ type: 'selectY', y: 10 })
```

#### Sample (`src/transform/sample.ts`)
Randomly sample data points
```typescript
.transform({ type: 'sample', thresholds: 100 })
```

### Sorting Transforms

#### Sort (`src/transform/sort.ts`)
Sort data for marks
```typescript
.transform({ type: 'sort', callback: (a, b) => a.value - b.value })
```

#### SortX (`src/transform/sortX.ts`)
Sort by X channel
```typescript
.transform({ type: 'sortX', reverse: true })
```

#### SortY (`src/transform/sortY.ts`)
Sort by Y channel
```typescript
.transform({ type: 'sortY', reverse: false })
```

#### SortColor (`src/transform/sortColor.ts`)
Sort by color channel
```typescript
.transform({ type: 'sortColor' })
```

### Auto-inference Transforms (Maybe*)

These transforms are automatically applied by G2 when appropriate:

#### MaybeStackY (`src/transform/maybeStackY.ts`)
Auto-apply stackY when appropriate

#### MaybeZeroY (`src/transform/maybeZeroY.ts`)
Auto-include zero in Y domain

#### MaybeZeroY1 (`src/transform/maybeZeroY1.ts`)
Auto-include zero for Y1 channel

#### MaybeDefaultX / MaybeDefaultY
Auto-assign default X/Y values

#### MaybeIdentityX / MaybeIdentityY
Use identity mapping when appropriate

#### MaybeSeries (`src/transform/maybeSeries.ts`)
Auto-create series grouping

#### MaybeKey (`src/transform/maybeKey.ts`)
Auto-generate unique keys

#### MaybeTitle (`src/transform/maybeTitle.ts`)
Auto-generate titles

#### MaybeTooltip (`src/transform/maybeTooltip.ts`)
Auto-configure tooltip

#### MaybeTuple / MaybeTupleX / MaybeTupleY
Handle tuple encodings

#### MaybeSize (`src/transform/maybeSize.ts`)
Auto-configure size channel

#### MaybeGradient (`src/transform/maybeGradient.ts`)
Auto-apply gradients

#### MaybeVisualPosition (`src/transform/maybeVisualPosition.ts`)
Auto-configure visual positioning

#### MaybeZeroPadding (`src/transform/maybeZeroPadding.ts`)
Auto-add padding to include zero

#### MaybeZeroX / MaybeZeroZ
Auto-include zero for X and Z channels

#### MaybeFunctionAttribute (`src/transform/maybeFunctionAttribute.ts`)
Handle function-based attributes

## Transform Pipeline

Transforms can be chained:

```typescript
chart
  .interval()
  .data([...])
  .transform({ type: 'groupX', y: 'sum' })  // First: aggregate
  .transform({ type: 'sortY', reverse: true }) // Then: sort
  .transform({ type: 'stackY' })               // Finally: stack
```

## Data Transform Pipeline

Data transforms are also chainable:

```typescript
chart
  .interval()
  .data([
    { type: 'fetch', value: 'data.csv' },
    { type: 'filter', callback: (d) => d.value > 0 },
    { type: 'sortBy', fields: ['value'], order: ['desc'] },
    { type: 'slice', start: 0, end: 10 }
  ])
```

## Common Transform Patterns

### Creating a histogram
```typescript
chart
  .rect()
  .data(data)
  .encode('x', 'value')
  .transform({ type: 'binX', y: 'count' });
```

### Creating a stacked bar chart
```typescript
chart
  .interval()
  .data(data)
  .encode('x', 'date')
  .encode('y', 'value')
  .encode('color', 'category')
  .transform({ type: 'stackY' });
```

### Creating a grouped bar chart
```typescript
chart
  .interval()
  .data(data)
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'subcategory')
  .transform({ type: 'dodgeX' });
```

### Creating a normalized stacked area
```typescript
chart
  .area()
  .data(data)
  .encode('x', 'date')
  .encode('y', 'value')
  .encode('color', 'category')
  .transform({ type: 'stackY' })
  .transform({ type: 'normalizeY' });
```

### Aggregating data
```typescript
chart
  .interval()
  .data(data)
  .encode('x', 'category')
  .encode('y', 'value')
  .transform({ type: 'groupX', y: 'mean' });
```

### Adding jitter to scatter plot
```typescript
chart
  .point()
  .data(data)
  .encode('x', 'category')
  .encode('y', 'value')
  .transform({ type: 'jitterX', padding: 0.5 });
```

## Transform Options

Most transforms support these common options:

- **groupBy**: Field(s) to group by before applying transform
- **orderBy**: Field(s) to order by
- **reverse**: Reverse the order
- **callback**: Custom function for filtering/sorting

### GroupBy Examples
```typescript
// Stack by x, with separate stacks per color
.transform({ type: 'stackY', groupBy: 'color' })

// Normalize within each x group
.transform({ type: 'normalizeY', groupBy: 'x' })
```

### OrderBy Examples
```typescript
// Stack in order of value
.transform({ type: 'stackY', orderBy: 'value' })

// Dodge in alphabetical order
.transform({ type: 'dodgeX', orderBy: 'category' })
```

## Performance Considerations

1. **Order matters**: Apply filtering/sampling early in the pipeline
2. **Avoid redundant transforms**: Use efficient transforms (e.g., `groupX` instead of `group` + `selectX`)
3. **Data vs Mark transforms**: Data transforms are often more efficient for large datasets
4. **Use built-in aggregations**: Built-in aggregations (sum, mean, etc.) are optimized

## Testing Transforms

When testing transforms:
1. Test with edge cases (empty data, single value, etc.)
2. Verify correct output shape and values
3. Test groupBy and orderBy options
4. Verify interaction with other transforms
5. Check performance with large datasets

## Transform Utilities

Helper functions in `src/transform/utils/`:
- Channel value extraction
- Grouping utilities
- Sorting utilities
- Data manipulation helpers

## Debugging Transforms

To debug transform output:
```typescript
chart
  .interval()
  .data(data)
  .transform({ type: 'stackY' })
  .on('afterrender', () => {
    console.log(chart.getData()); // See transformed data
  });
```

## Custom Transforms

To create custom transforms, implement the transform interface and register:

```typescript
function customTransform(options) {
  return (I, mark) => {
    // Transform logic
    // I = indices array
    // mark = mark node with data
    return transformedIndices;
  };
}

register('transform.custom', customTransform);
```

Then use it:
```typescript
.transform({ type: 'custom', ...options })
```
