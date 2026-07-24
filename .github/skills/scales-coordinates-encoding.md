# G2 Scales, Coordinates, and Visual Encoding

This skill covers scales, coordinate systems, and visual encoding in G2.

## Scales (`src/scale/`)

Scales map data values (domain) to visual values (range). G2 provides various scale types for different data types.

### Quantitative Scales

#### Linear (`src/scale/linear.ts`)
Maps continuous values linearly
- Domain: Continuous numbers
- Range: Continuous values
- Best for: Most numeric data
```typescript
.scale('y', { 
  type: 'linear',
  domain: [0, 100],
  range: [0, 1]
})
```

#### Log (`src/scale/log.ts`)
Logarithmic scale
- Domain: Positive continuous numbers
- Best for: Data with exponential growth, spanning orders of magnitude
```typescript
.scale('y', { 
  type: 'log',
  base: 10,
  domain: [1, 1000]
})
```

#### Pow (`src/scale/pow.ts`)
Power scale (exponential)
- Domain: Continuous numbers
- Best for: Emphasizing differences
```typescript
.scale('size', { 
  type: 'pow',
  exponent: 2  // Square scale
})
```

#### Sqrt (`src/scale/sqrt.ts`)
Square root scale (pow with exponent 0.5)
- Domain: Continuous numbers
- Best for: Area encodings (to maintain perceptual linearity)
```typescript
.scale('size', { type: 'sqrt' })
```

#### Time (`src/scale/time.ts`)
Time scale for temporal data
- Domain: Date objects or timestamps
- Handles time zones, DST, etc.
```typescript
.scale('x', { 
  type: 'time',
  domain: [new Date('2020-01-01'), new Date('2020-12-31')],
  utc: false
})
```

#### Sequential (`src/scale/sequential.ts`)
Sequential color scale
- Domain: Continuous numbers
- Range: Interpolated colors
- Best for: Heatmaps, choropleth maps
```typescript
.scale('color', { 
  type: 'sequential',
  domain: [0, 100],
  range: ['#f7fbff', '#08519c']
})
```

### Categorical Scales

#### Ordinal (`src/scale/ordinal.ts`)
Maps discrete values to discrete outputs
- Domain: Any discrete values
- Range: Discrete values (often colors)
```typescript
.scale('color', { 
  type: 'ordinal',
  domain: ['A', 'B', 'C'],
  range: ['red', 'green', 'blue']
})
```

#### Band (`src/scale/band.ts`)
Maps discrete values to continuous bands
- Domain: Discrete categories
- Range: Continuous (position)
- Best for: Bar charts
- Includes padding between bands
```typescript
.scale('x', { 
  type: 'band',
  domain: ['Q1', 'Q2', 'Q3', 'Q4'],
  range: [0, 1],
  padding: 0.1,
  paddingInner: 0.2,
  paddingOuter: 0.1
})
```

#### Point (`src/scale/point.ts`)
Maps discrete values to points
- Domain: Discrete categories
- Range: Continuous (position)
- Best for: Line/scatter plots with categorical x-axis
```typescript
.scale('x', { 
  type: 'point',
  domain: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  padding: 0.5
})
```

### Special Scales

#### Identity (`src/scale/identity.ts`)
Pass-through scale (output = input)
- Used when data values are already in visual space
```typescript
.scale('x', { type: 'identity' })
```

#### Constant (`src/scale/constant.ts`)
Maps all values to a constant
```typescript
.scale('opacity', { 
  type: 'constant',
  value: 0.5
})
```

#### Threshold (`src/scale/threshold.ts`)
Maps continuous values to discrete bins
- Domain: Threshold boundaries
- Best for: Binning continuous data
```typescript
.scale('color', { 
  type: 'threshold',
  domain: [20, 40, 60, 80],
  range: ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641']
})
```

#### Quantile (`src/scale/quantile.ts`)
Maps values to quantiles
- Divides domain into equal-sized groups
```typescript
.scale('color', { 
  type: 'quantile',
  domain: data.map(d => d.value),
  range: ['low', 'medium', 'high']
})
```

#### Quantize (`src/scale/quantize.ts`)
Maps continuous domain to discrete range
- Similar to threshold but with uniform intervals
```typescript
.scale('color', { 
  type: 'quantize',
  domain: [0, 100],
  range: ['low', 'medium', 'high']
})
```

## Scale Configuration Options

### Common Options

#### Domain
The input data range
```typescript
.scale('x', { domain: [0, 100] })
.scale('color', { domain: ['A', 'B', 'C'] })
```

#### Range
The output visual range
```typescript
.scale('y', { range: [0, 400] })  // pixels
.scale('color', { range: ['red', 'blue'] })
```

#### Nice
Round domain to nice values
```typescript
.scale('x', { nice: true })  // [0, 97] -> [0, 100]
```

#### Clamp
Clamp output to range
```typescript
.scale('x', { clamp: true })  // Values outside domain stay in range
```

#### Zero
Include zero in domain
```typescript
.scale('y', { zero: true })  // Ensures domain starts at 0
```

#### Padding
Add padding (band/point scales)
```typescript
.scale('x', { 
  type: 'band',
  padding: 0.1,           // Overall padding
  paddingInner: 0.1,      // Between bands
  paddingOuter: 0.05      // At edges
})
```

#### Align
Alignment for band scale
```typescript
.scale('x', { 
  type: 'band',
  align: 0.5  // 0 = left, 0.5 = center, 1 = right
})
```

### Color Scale Options

#### Palette
Use predefined color palette
```typescript
.scale('color', { palette: 'category10' })
.scale('color', { palette: 'blues' })
```

Available palettes (see `src/palette/`):
- `category10`, `category20`: Categorical colors
- Built-in: blues, reds, greens, etc. (from schemes)

#### Interpolate
Color interpolation function
```typescript
.scale('color', { 
  type: 'sequential',
  range: ['white', 'blue'],
  interpolate: 'lab'  // or 'hsl', 'rgb'
})
```

## Coordinates (`src/coordinate/`)

Coordinate systems transform the geometric space where marks are drawn.

### Cartesian (`src/coordinate/cartesian.ts`)
Standard rectangular coordinate system
- Default coordinate system
- X and Y are orthogonal
```typescript
.coordinate({ type: 'cartesian' })
```

### Transpose (`src/coordinate/transpose.ts`)
Swap X and Y axes
- Creates horizontal bar charts from vertical specs
```typescript
.coordinate({ type: 'transpose' })
```

### Polar (`src/coordinate/polar.ts`)
Convert rectangular to circular
- Used for: Pie charts, rose charts, radar charts
- Options: `innerRadius`, `outerRadius`, `startAngle`, `endAngle`
```typescript
.coordinate({ 
  type: 'polar',
  innerRadius: 0,
  outerRadius: 1,
  startAngle: -Math.PI / 2,
  endAngle: Math.PI * 3 / 2
})
```

### Theta (`src/coordinate/theta.ts`)
Specialized polar for pie/donut charts
- Automatically converts y to angle
```typescript
.coordinate({ 
  type: 'theta',
  innerRadius: 0.6  // For donut chart
})
```

### Radial (`src/coordinate/radial.ts`)
Radial coordinate system
- X becomes angle, Y becomes radius
```typescript
.coordinate({ 
  type: 'radial',
  innerRadius: 0.2,
  outerRadius: 1
})
```

### Radar (`src/coordinate/radar.ts`)
Radar/spider chart coordinate
```typescript
.coordinate({ type: 'radar' })
```

### Parallel (`src/coordinate/parallel.ts`)
Parallel coordinates
- For multivariate data
```typescript
.coordinate({ type: 'parallel' })
```

### Helix (`src/coordinate/helix.ts`)
Helix/spiral coordinate
- For temporal data in spiral form
```typescript
.coordinate({ 
  type: 'helix',
  startAngle: 0,
  endAngle: Math.PI * 10
})
```

### Fisheye (`src/coordinate/fisheye.ts`)
Fisheye distortion
- Magnifies region of focus
```typescript
.coordinate({ 
  type: 'fisheye',
  focusX: 0.5,
  focusY: 0.5,
  distortion: 2
})
```

## Visual Encoding (`src/encode/`)

Encoding maps data fields to visual channels.

### Encode Types

#### Field (`src/encode/field.ts`)
Map a data field to a channel
```typescript
.encode('x', 'fieldName')
```

#### Constant (`src/encode/constant.ts`)
Use a constant value
```typescript
.encode('color', 'red')
.encode('size', 10)
```

#### Transform (`src/encode/transform.ts`)
Apply a function to data
```typescript
.encode('y', (d) => d.value * 2)
.encode('color', (d) => d.value > 0 ? 'green' : 'red')
```

#### Column (`src/encode/column.ts`)
Access nested data
```typescript
.encode('x', 'data.nested.field')
```

## Visual Channels

### Position Channels
Map to spatial position
- **x**, **y**: Primary position
- **x1**, **y1**: Secondary position (for ranges)
- Uses quantitative or categorical scales

### Color Channels
Map to color
- **color**: General color encoding
- **fill**: Fill color
- **stroke**: Border/line color
- Uses ordinal, sequential, or threshold scales

### Size Channels
Map to size
- **size**: Point size, line width
- **r**: Radius (circles)
- Uses quantitative scales (often sqrt for area)

### Text Channels
Map to text properties
- **text**: Text content
- **fontSize**: Text size
- **fontWeight**: Text weight

### Shape Channel
Map to shape
- **shape**: Point shape, line shape, etc.
- Uses ordinal scale

### Other Channels
- **opacity**: Transparency (0-1)
- **rotate**: Rotation angle
- **series**: Grouping for lines/areas
- **key**: Unique identifier

## Common Patterns

### Creating a categorical bar chart
```typescript
chart
  .interval()
  .data(data)
  .encode('x', 'category')  // Band scale auto-applied
  .encode('y', 'value')     // Linear scale auto-applied
  .encode('color', 'category');
```

### Creating a time series
```typescript
chart
  .line()
  .data(data)
  .encode('x', 'date')      // Time scale auto-applied
  .encode('y', 'value')
  .scale('x', { nice: true });
```

### Creating a heatmap with custom colors
```typescript
chart
  .cell()
  .data(data)
  .encode('x', 'category1')
  .encode('y', 'category2')
  .encode('color', 'value')
  .scale('color', {
    type: 'sequential',
    range: ['white', 'red']
  });
```

### Creating a pie chart
```typescript
chart
  .interval()
  .data(data)
  .encode('y', 'value')
  .encode('color', 'category')
  .coordinate({ type: 'theta' })
  .transform({ type: 'stackY' });
```

### Creating a bubble chart with size
```typescript
chart
  .point()
  .data(data)
  .encode('x', 'gdp')
  .encode('y', 'happiness')
  .encode('size', 'population')
  .encode('color', 'continent')
  .scale('size', { 
    type: 'sqrt',     // For perceptual accuracy
    range: [4, 20]    // Min and max radius
  });
```

### Creating a log scale chart
```typescript
chart
  .point()
  .data(data)
  .encode('x', 'value')
  .encode('y', 'count')
  .scale('x', { 
    type: 'log',
    base: 10
  });
```

### Creating a horizontal bar chart
```typescript
chart
  .interval()
  .data(data)
  .encode('x', 'value')
  .encode('y', 'category')
  .coordinate({ type: 'transpose' });
// Or just swap x and y encodings
```

### Creating a radar chart
```typescript
chart
  .line()
  .data(data)
  .encode('x', 'category')
  .encode('y', 'value')
  .coordinate({ type: 'radar' })
  .style('lineWidth', 2);
```

## Scale Inference

G2 automatically infers appropriate scales based on:
1. **Data type**: Numbers get quantitative scales, strings get categorical
2. **Channel type**: Position uses linear/band, color uses ordinal/sequential
3. **Data domain**: Extracted from data automatically

You can override inference:
```typescript
.encode('x', 'category')
.scale('x', { type: 'point' })  // Force point scale instead of band
```

## Coordinate Transformations

Coordinates can be chained:
```typescript
.coordinate([
  { type: 'transpose' },
  { type: 'polar' }
])
```

## Testing Scales and Coordinates

When testing:
1. Verify domain/range calculations
2. Test edge cases (single value, all same values)
3. Verify coordinate transformations
4. Test scale type inference
5. Validate visual output with snapshot tests

## Performance Tips

1. **Avoid unnecessary scale updates**: Scales are computed once unless data changes
2. **Use appropriate scale types**: Band scales are optimized for categorical data
3. **Limit color palette size**: Too many colors hurt performance and perception
4. **Consider data size**: Sequential scales with many domain values can be slow

## Debugging Scales

To inspect scale configuration:
```typescript
chart.render();
const xScale = chart.getScale('x');
console.log(xScale.domain());
console.log(xScale.range());
console.log(xScale.type);
```
