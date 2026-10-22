# Working with G2 Marks

This skill provides detailed information about G2 marks (geometric shapes) and how to work with them.

## What are Marks?

Marks are the fundamental visual building blocks in G2. They represent geometric shapes that encode data visually. Each mark type is implemented as a class in `src/mark/`.

## Mark Types

### Basic Marks

#### Interval (`src/mark/interval.ts`)
Rectangles for bar charts, histograms
- Used for: Bar charts, histograms, waterfall charts
- Primary channels: x, y, color, size
- Example: `chart.interval().encode('x', 'category').encode('y', 'value')`

#### Line (`src/mark/line.ts`)
Connected line segments
- Used for: Time series, trend lines
- Primary channels: x, y, color, size (stroke width)
- Shape options: line, smooth, curve, etc.
- Example: `chart.line().encode('x', 'date').encode('y', 'value')`

#### Point (`src/mark/point.ts`)
Individual points/dots
- Used for: Scatter plots, bubble charts
- Primary channels: x, y, color, size, shape
- Shape options: circle, square, triangle, diamond, etc.
- Example: `chart.point().encode('x', 'weight').encode('y', 'height').encode('size', 'age')`

#### Area (`src/mark/area.ts`)
Filled area between line and baseline
- Used for: Area charts, stacked area charts
- Primary channels: x, y, y1, color
- Example: `chart.area().encode('x', 'date').encode('y', 'value')`

#### Rect (`src/mark/rect.ts`)
Arbitrary rectangles
- Used for: Custom rectangular visualizations, bin plots
- Primary channels: x, y, x1, y1, color
- Example: `chart.rect().encode('x', 'start').encode('x1', 'end')`

#### Cell (`src/mark/cell.ts`)
Grid cells for matrix visualizations
- Used for: Heatmaps, correlation matrices
- Primary channels: x, y, color
- Example: `chart.cell().encode('x', 'category1').encode('y', 'category2').encode('color', 'value')`

#### Text (`src/mark/text.ts`)
Text labels
- Used for: Annotations, labels, tag clouds
- Primary channels: x, y, text, color, fontSize, rotate
- Example: `chart.text().encode('x', 'x').encode('y', 'y').encode('text', 'label')`

#### Image (`src/mark/image.ts`)
Images at specific positions
- Used for: Photo galleries, custom markers
- Primary channels: x, y, src, width, height
- Example: `chart.image().encode('x', 'x').encode('y', 'y').encode('src', 'imageUrl')`

#### Polygon (`src/mark/polygon.ts`)
Arbitrary polygons
- Used for: Custom shapes, geographic regions
- Primary channels: points, color
- Example: `chart.polygon().encode('points', 'coordinates').encode('color', 'region')`

#### Path (`src/mark/path.ts`)
Arbitrary paths/curves
- Used for: Custom lines, connections
- Primary channels: d (SVG path data), color
- Example: `chart.path().encode('d', 'pathData')`

### Auxiliary Marks

#### LineX (`src/mark/lineX.ts`)
Vertical reference lines
- Used for: Thresholds, reference lines
- Primary channels: x, color
- Example: `chart.lineX().data([{ x: 0 }]).style('stroke', 'red')`

#### LineY (`src/mark/lineY.ts`)
Horizontal reference lines
- Used for: Thresholds, reference lines
- Primary channels: y, color
- Example: `chart.lineY().data([{ y: 100 }]).style('stroke', 'blue')`

#### Range (`src/mark/range.ts`)
Range/band regions
- Used for: Uncertainty visualization, confidence intervals
- Primary channels: x, y, x1, y1
- Example: `chart.range().encode('x', 'date').encode('y', 'lower').encode('y1', 'upper')`

#### RangeX (`src/mark/rangeX.ts`)
Vertical range bands
- Primary channels: x, x1, y, y1

#### RangeY (`src/mark/rangeY.ts`)
Horizontal range bands
- Primary channels: y, y1, x, x1

### Statistical Marks

#### Box (`src/mark/box.ts`)
Box elements for box plots
- Used for: Distribution visualization
- Primary channels: x, y, color
- Typically used with statistical transforms

#### Boxplot (`src/mark/boxplot.ts`)
Complete box-and-whisker plots
- Used for: Five-number summary visualization
- Primary channels: x, y, color
- Auto-calculates quartiles and outliers

#### Density (`src/mark/density.ts`)
Density contours
- Used for: Density estimation visualization
- Primary channels: x, y, color
- Example: `chart.density().encode('x', 'x').encode('y', 'y')`

#### Heatmap (`src/mark/heatmap.ts`)
Specialized heatmap implementation
- Used for: Dense matrix visualizations
- Primary channels: x, y, color
- Optimized for performance with large datasets

#### Beeswarm (`src/mark/beeswarm.ts`)
Beeswarm/swarm plots
- Used for: Categorical distribution without overlap
- Primary channels: x, y, color
- Auto-layouts points to avoid overlap

### Connection Marks

#### Link (`src/mark/link.ts`)
Links between two points
- Used for: Network edges, connections
- Primary channels: x, y, x1, y1, color
- Shape options: line, arc, smooth-arc

#### Connector (`src/mark/connector.ts`)
Connectors with arrow/decorations
- Used for: Directed connections, flow diagrams
- Primary channels: x, y, x1, y1, color

#### Vector (`src/mark/vector.ts`)
Directional vectors/arrows
- Used for: Vector fields, directional data
- Primary channels: x, y, rotate, size, color
- Example: `chart.vector().encode('x', 'x').encode('y', 'y').encode('rotate', 'angle')`

### Specialized Marks

#### WordCloud (`src/mark/wordCloud.ts`)
Word clouds
- Used for: Text frequency visualization
- Primary channels: text, value, color
- Auto-layouts words to fit space

#### Gauge (`src/mark/gauge.ts`)
Gauge/dial charts
- Used for: Single value with min/max context
- Primary channels: value, color

#### Liquid (`src/mark/liquid.ts`)
Liquid fill gauges
- Used for: Percentage/ratio visualization
- Primary channels: value, color

### Hierarchical Marks

#### Tree (`src/mark/tree.ts`)
Tree layouts
- Used for: Hierarchical data visualization
- Primary channels: value, color
- Layout options: tree, dendrogram

#### Treemap (`src/mark/treemap.ts`)
Treemap rectangles
- Used for: Hierarchical data as nested rectangles
- Primary channels: value, color
- Layout options: squarify, binary, dice, slice

#### Pack (`src/mark/pack.ts`)
Circle packing layouts
- Used for: Hierarchical data as nested circles
- Primary channels: value, color

#### Partition (`src/mark/partition.ts`)
Partition/sunburst layouts
- Used for: Hierarchical data as radial partitions
- Primary channels: value, color

#### Sankey (`src/mark/sankey.ts`)
Sankey/alluvial diagrams
- Used for: Flow visualization
- Primary channels: source, target, value, color

### Graph Marks

#### ForceGraph (`src/mark/forceGraph.ts`)
Force-directed graph layouts
- Used for: Network visualization
- Primary channels: nodes, links, color

#### Chord (`src/mark/chord.ts`)
Chord diagrams
- Used for: Relationship matrices
- Primary channels: source, target, value, color

## Mark Structure

Each mark implementation follows this pattern:

```typescript
export const MarkName = (options) => {
  return {
    type: 'markName',
    ...options,
  };
};

// Type definition
export type MarkNameOptions = {
  // Mark-specific options
};
```

## Common Mark Operations

### Creating a Mark
```typescript
// Fluent API
chart.markType()

// Spec API
{ type: 'markType' }
```

### Binding Data
```typescript
// Direct data
mark.data([{ x: 1, y: 2 }, { x: 2, y: 4 }])

// Data from parent
mark.data({ type: 'fetch', value: 'data.json' })
```

### Encoding Channels
```typescript
// Single encoding
mark.encode('x', 'fieldName')

// Multiple encodings
mark.encode({
  x: 'field1',
  y: 'field2',
  color: 'field3',
  size: 'field4'
})

// Constant values
mark.encode('color', '#ff0000')

// Transform functions
mark.encode('y', (d) => d.value * 2)
```

### Styling
```typescript
// Style properties
mark.style('fill', 'red')
mark.style('stroke', 'blue')
mark.style('lineWidth', 2)

// Multiple styles
mark.style({
  fill: 'red',
  stroke: 'blue',
  lineWidth: 2,
  opacity: 0.5
})
```

### Transformations
```typescript
mark.transform({ type: 'stackY' })
mark.transform({ type: 'dodgeX', padding: 0.1 })
```

### Scales
```typescript
mark.scale('x', { domain: [0, 100] })
mark.scale('y', { type: 'log' })
mark.scale('color', { palette: 'category10' })
```

### Animations
```typescript
mark.animate('enter', { type: 'fadeIn' })
mark.animate('update', { type: 'morphing' })
mark.animate('exit', { type: 'fadeOut' })
```

### Interactions
```typescript
mark.interaction('elementHighlight', { background: true })
mark.interaction('tooltip')
```

## Mark Channels

Common visual channels that marks support:

### Position Channels
- `x`, `y`: Primary position
- `x1`, `y1`: Secondary position (for ranges/rects)
- `position`: Combined position encoding

### Color Channels
- `color`: Main color encoding
- `fill`: Fill color
- `stroke`: Stroke/border color

### Size Channels
- `size`: Point size, line width, or area
- `r`: Radius (for circles)
- `width`, `height`: Dimensions

### Text Channels
- `text`: Text content
- `fontSize`: Font size
- `fontWeight`: Font weight
- `fontFamily`: Font family

### Shape Channels
- `shape`: Shape type (circle, square, etc.)
- `symbol`: Symbol type

### Other Channels
- `opacity`: Transparency (0-1)
- `rotate`: Rotation angle
- `href`: Hyperlink
- `src`: Image source
- `key`: Unique identifier
- `groupKey`: Grouping identifier

## Shape Options by Mark

### Point Shapes
- circle, square, triangle, diamond, hexagon, cross, plus, hyphen, line, bowtie
- Custom symbols can be registered

### Line Shapes
- line, smooth, curve, step, stepAfter, stepBefore, vh, hv, hvh, vhv

### Interval Shapes
- rect, hollow-rect, funnel, pyramid

### Area Shapes
- area, smooth, vh, hv, hvh, vhv

## Composite Marks

Some marks are actually compositions of multiple primitives:

### Boxplot
Composed of: line (whiskers) + rect (box) + point (outliers)

### Sankey
Composed of: path (links) + rect (nodes)

### ForceGraph
Composed of: link (edges) + point (nodes)

## Performance Tips

1. **Use appropriate mark types**: Use simpler marks when possible (e.g., `cell` instead of `rect` for grid data)
2. **Limit mark count**: For large datasets, use aggregation transforms or sampling
3. **Use shape attribute carefully**: Complex shapes are slower to render
4. **Consider renderer**: WebGL is faster for many marks, Canvas for flexibility
5. **Batch operations**: Apply multiple styles/encodings together rather than one at a time

## Common Patterns

### Creating a bar chart
```typescript
chart
  .interval()
  .data(data)
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'category');
```

### Creating a line chart
```typescript
chart
  .line()
  .data(data)
  .encode('x', 'date')
  .encode('y', 'value')
  .encode('color', 'series')
  .encode('shape', 'smooth');
```

### Creating a scatter plot
```typescript
chart
  .point()
  .data(data)
  .encode('x', 'weight')
  .encode('y', 'height')
  .encode('size', 'age')
  .encode('color', 'gender')
  .encode('shape', 'circle');
```

### Creating a heatmap
```typescript
chart
  .cell()
  .data(data)
  .encode('x', 'category1')
  .encode('y', 'category2')
  .encode('color', 'value')
  .scale('color', { palette: 'blues' });
```

### Creating a network graph
```typescript
chart
  .forceGraph()
  .data({
    type: 'inline',
    value: { nodes: [...], links: [...] }
  })
  .encode('color', 'group');
```

## Testing Marks

When testing marks:
1. Test with various data shapes and sizes
2. Verify encoding works for all channels
3. Test edge cases (empty data, null values, etc.)
4. Verify transforms apply correctly
5. Test interaction behaviors
6. Validate visual output with snapshot tests (see `__tests__/` directory)
