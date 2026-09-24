# G2 API Usage and Extension Patterns

This skill covers how to use the G2 API, extend it, and follow common patterns for building custom visualizations.

## API Styles

G2 provides two main API styles that can be used interchangeably:

### 1. Fluent API (Recommended)
Chainable method calls for building visualizations
```typescript
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 640,
  height: 480,
});

chart
  .interval()
  .data(data)
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'type')
  .transform({ type: 'stackY' })
  .interaction('elementHighlight')
  .animate('enter', { type: 'growInY' });

chart.render();
```

### 2. Specification API
Declarative object-based configuration
```typescript
import { render } from '@antv/g2';

const spec = {
  type: 'interval',
  data: data,
  encode: {
    x: 'category',
    y: 'value',
    color: 'type'
  },
  transform: [
    { type: 'stackY' }
  ],
  interaction: {
    elementHighlight: true
  },
  animate: {
    enter: { type: 'growInY' }
  }
};

render(spec, { container: 'container' });
```

## Core API Classes

### Chart (`src/api/chart.ts`)

The main entry point for creating visualizations.

#### Constructor
```typescript
const chart = new Chart({
  container: 'container',       // DOM element or ID
  width: 640,                   // Width in pixels (optional)
  height: 480,                  // Height in pixels (optional)
  autoFit: true,                // Auto-fit container (optional)
  padding: 'auto',              // Padding (optional)
  theme: 'classic',             // Theme name (optional)
  renderer: 'canvas',           // 'canvas', 'svg', or 'webgl' (optional)
});
```

#### Methods

**render()**
Render the chart
```typescript
chart.render();
```

**clear()**
Clear the chart
```typescript
chart.clear();
```

**destroy()**
Destroy the chart and free resources
```typescript
chart.destroy();
```

**changeData(data)**
Update data without re-rendering everything
```typescript
chart.changeData(newData);
```

**on(event, handler)**
Listen to events
```typescript
chart.on('element:click', (event) => {
  console.log(event.data);
});
```

**off(event, handler)**
Remove event listener
```typescript
chart.off('element:click', handler);
```

**emit(event, data)**
Emit custom events
```typescript
chart.emit('custom:event', { value: 123 });
```

**getScale(name)**
Get scale for a channel
```typescript
const xScale = chart.getScale('x');
```

**getData()**
Get current chart data
```typescript
const data = chart.getData();
```

**getOptions()**
Get chart configuration
```typescript
const options = chart.getOptions();
```

### Mark Node (`src/api/mark.ts`)

Represents a visual mark in the chart.

#### Creating Marks
```typescript
// Via chart methods (one method per mark type)
chart.interval()
chart.line()
chart.point()
chart.area()
chart.cell()
// ... etc for all mark types
```

#### Mark Methods

**data(data)**
Bind data to the mark
```typescript
mark.data([{ x: 1, y: 2 }, { x: 2, y: 4 }])
mark.data({ type: 'fetch', value: 'data.json' })
```

**encode(channel, value)**
Encode data to visual channels
```typescript
mark.encode('x', 'fieldName')
mark.encode('y', (d) => d.value * 2)
mark.encode({ x: 'field1', y: 'field2', color: 'field3' })
```

**scale(channel, options)**
Configure scale for a channel
```typescript
mark.scale('x', { domain: [0, 100] })
mark.scale('color', { palette: 'category10' })
```

**transform(options)**
Apply data transformation
```typescript
mark.transform({ type: 'stackY' })
mark.transform([
  { type: 'filter', callback: (d) => d.value > 0 },
  { type: 'sortY', reverse: true }
])
```

**style(property, value)**
Set visual styles
```typescript
mark.style('fill', 'red')
mark.style({ fill: 'red', stroke: 'blue', lineWidth: 2 })
mark.style('opacity', (d) => d.value > 50 ? 1 : 0.5)
```

**attr(property, value)**
Set mark attributes
```typescript
mark.attr('title', 'My Mark')
mark.attr('class', 'custom-mark')
```

**animate(type, options)**
Configure animations
```typescript
mark.animate('enter', { type: 'fadeIn' })
mark.animate('update', { type: 'morphing' })
mark.animate('exit', { type: 'fadeOut' })
```

**interaction(type, options)**
Add interactions
```typescript
mark.interaction('elementHighlight')
mark.interaction('tooltip', { shared: true })
```

**label(options)**
Configure labels
```typescript
mark.label({
  text: 'value',
  position: 'top',
  style: { fill: 'black' }
})
```

**tooltip(options)**
Configure tooltip
```typescript
mark.tooltip({
  title: 'Category: {x}',
  items: [{ field: 'y', name: 'Value' }]
})
```

**legend(options)**
Configure legend
```typescript
mark.legend({
  color: { position: 'right' }
})
```

**axis(channel, options)**
Configure axis
```typescript
mark.axis('x', { title: 'Category' })
mark.axis('y', { title: 'Value', grid: true })
```

**coordinate(options)**
Set coordinate system
```typescript
mark.coordinate({ type: 'polar' })
mark.coordinate({ type: 'transpose' })
```

**theme(options)**
Set theme
```typescript
mark.theme({ type: 'dark' })
```

### Composition Node (`src/api/composition.ts`)

Represents composed/nested visualizations.

#### Creating Compositions
```typescript
// Space compositions
chart.spaceLayer()  // Layered views
chart.spaceFlex()   // Flexible layout

// Facets
chart.facetRect()   // Rectangular facets
chart.facetCircle() // Circular facets

// Other
chart.repeatMatrix() // Repeat matrix
chart.timingKeyframe() // Keyframe animation
```

#### Composition Methods

Similar to marks but also support:

**children()**
Access child marks/compositions
```typescript
const layer = chart.spaceLayer();
layer.interval().data(data1).encode('x', 'a').encode('y', 'b');
layer.line().data(data2).encode('x', 'c').encode('y', 'd');
```

## Extension System

### Registering Custom Components

Use the `register()` function to extend G2:

```typescript
import { register } from '@antv/g2';
```

#### Register Custom Mark
```typescript
function customMark(options) {
  return (index, scale, value, coordinate) => {
    // Return visual elements
  };
}

register('mark.custom', customMark);

// Use it
chart.custom().data(data).encode('x', 'field');
```

#### Register Custom Transform
```typescript
function customTransform(options) {
  return (I, mark) => {
    // Transform logic
    return transformedIndices;
  };
}

register('transform.custom', customTransform);

// Use it
chart.interval().transform({ type: 'custom', ...options });
```

#### Register Custom Scale
```typescript
function customScale(options) {
  return {
    type: 'custom',
    domain: [...],
    range: [...],
    map: (value) => mappedValue,
    invert: (value) => originalValue,
  };
}

register('scale.custom', customScale);

// Use it
chart.interval().scale('x', { type: 'custom', ...options });
```

#### Register Custom Coordinate
```typescript
function customCoordinate(options) {
  return (x, y) => {
    // Transform coordinates
    return [newX, newY];
  };
}

register('coordinate.custom', customCoordinate);

// Use it
chart.interval().coordinate({ type: 'custom' });
```

#### Register Custom Animation
```typescript
function customAnimation(options) {
  return {
    duration: 300,
    easing: 'ease-in-out',
    // Animation properties
  };
}

register('animation.custom', customAnimation);

// Use it
chart.interval().animate('enter', { type: 'custom' });
```

#### Register Custom Interaction
```typescript
function customInteraction(options) {
  return (plot, coordinate, emitter) => {
    // Interaction logic
    plot.on('click', (event) => {
      // Handle interaction
    });
  };
}

register('interaction.custom', customInteraction);

// Use it
chart.interval().interaction('custom', { ...options });
```

#### Register Custom Component
```typescript
function customComponent(options) {
  return {
    render: (container, theme) => {
      // Render component
    },
    update: (options) => {
      // Update component
    }
  };
}

register('component.custom', customComponent);

// Use it in spec
chart.options({
  components: [
    { type: 'custom', ...options }
  ]
});
```

#### Register Custom Symbol
```typescript
import { registerSymbol } from '@antv/g2';

registerSymbol('customShape', (x, y, r) => {
  return [
    ['M', x - r, y],
    ['L', x + r, y],
    ['L', x, y + r],
    ['Z']
  ];
});

// Use it
chart.point().encode('shape', 'customShape');
```

### Creating Custom Chart Types

Use `extend()` to create specialized chart classes:

```typescript
import { extend, Runtime } from '@antv/g2';
import { corelib } from '@antv/g2';

// Create custom library
const mylib = {
  ...corelib(),
  'mark.custom': CustomMark,
  'transform.custom': CustomTransform,
};

// Create custom Chart class
const MyChart = extend(Runtime, mylib);

// Use it
const chart = new MyChart({ container: 'container' });
```

## Library System (`src/lib/`)

G2 provides several pre-configured libraries:

### litelib
Minimal library with basic marks
```typescript
import { litelib, extend, Runtime } from '@antv/g2';
const Chart = extend(Runtime, litelib());
```

### corelib
Core functionality (default)
```typescript
import { corelib, extend, Runtime } from '@antv/g2';
const Chart = extend(Runtime, corelib());
```

### plotlib
Statistical plots
```typescript
import { plotlib, extend, Runtime } from '@antv/g2';
const Chart = extend(Runtime, plotlib());
```

### graphlib
Graph visualizations
```typescript
import { graphlib, extend, Runtime } from '@antv/g2';
const Chart = extend(Runtime, graphlib());
```

### geolib
Geographic visualizations
```typescript
import { geolib, extend, Runtime } from '@antv/g2';
const Chart = extend(Runtime, geolib());
```

### stdlib (Standard)
Combination of most libraries
```typescript
import { stdlib, extend, Runtime } from '@antv/g2';
const Chart = extend(Runtime, stdlib());
```

### Custom Library
Combine libraries or create custom ones
```typescript
import { corelib, plotlib, extend, Runtime } from '@antv/g2';

const mylib = {
  ...corelib(),
  ...plotlib(),
  'mark.custom': MyCustomMark,
};

const Chart = extend(Runtime, mylib);
```

## Common Patterns

### Multiple Marks (Layering)
```typescript
chart
  .interval()
  .data(data)
  .encode('x', 'category')
  .encode('y', 'value');

chart
  .line()
  .data(avgData)
  .encode('x', 'category')
  .encode('y', 'average')
  .style('stroke', 'red')
  .style('lineWidth', 2);

chart.render();
```

### Faceting
```typescript
chart
  .facetRect()
  .data(data)
  .encode('x', 'region')
  .encode('y', 'year')
  .interval()
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'category');

chart.render();
```

### Small Multiples
```typescript
chart
  .repeatMatrix()
  .data(data)
  .encode('position', ['field1', 'field2', 'field3'])
  .point()
  .encode('x', (d, i, data, { position }) => position[0])
  .encode('y', (d, i, data, { position }) => position[1]);

chart.render();
```

### Conditional Styling
```typescript
chart
  .interval()
  .data(data)
  .encode('x', 'category')
  .encode('y', 'value')
  .style('fill', (d) => d.value > 50 ? 'green' : 'red')
  .style('opacity', (d) => d.value > 80 ? 1 : 0.6);
```

### Dynamic Data Updates
```typescript
const chart = new Chart({ container: 'container' });

chart.interval().data(initialData).encode('x', 'x').encode('y', 'y');
chart.render();

// Later, update data
setInterval(() => {
  const newData = generateNewData();
  chart.changeData(newData);
}, 1000);
```

### Responsive Charts
```typescript
const chart = new Chart({
  container: 'container',
  autoFit: true,  // Auto-fit to container
});

// Or manually handle resize
window.addEventListener('resize', () => {
  chart.forceFit();
});
```

### Custom Tooltip Content
```typescript
chart
  .interval()
  .data(data)
  .encode('x', 'category')
  .encode('y', 'value')
  .interaction('tooltip', {
    render: (event, { title, items }) => {
      return `
        <div class="custom-tooltip">
          <h3>${title}</h3>
          <ul>
            ${items.map(item => `
              <li>${item.name}: ${item.value}</li>
            `).join('')}
          </ul>
        </div>
      `;
    }
  });
```

### Export Chart as Image
```typescript
chart.render().then(() => {
  const canvas = chart.getCanvas();
  const dataURL = canvas.toDataURL('image/png');
  
  // Download
  const link = document.createElement('a');
  link.download = 'chart.png';
  link.href = dataURL;
  link.click();
});
```

### Server-Side Rendering
```typescript
import { renderToMountedElement } from '@antv/g2';
import { createCanvas } from 'canvas';

const canvas = createCanvas(640, 480);
const spec = { type: 'interval', data, encode: { x: 'x', y: 'y' } };

renderToMountedElement(spec, {
  canvas,
  renderer: 'canvas',
});

const buffer = canvas.toBuffer('image/png');
// Save or send buffer
```

## Performance Optimization

### Use Appropriate Renderer
```typescript
// Canvas: Good default, flexible
const chart = new Chart({ renderer: 'canvas' });

// SVG: Good for small datasets, better DOM integration
const chart = new Chart({ renderer: 'svg' });

// WebGL: Best for large datasets (many marks)
const chart = new Chart({ renderer: 'webgl' });
```

### Limit Data Points
```typescript
// Sample large datasets
chart
  .point()
  .data(largeData)
  .transform({ type: 'sample', thresholds: 1000 })
  .encode('x', 'x')
  .encode('y', 'y');
```

### Disable Animations for Static Views
```typescript
chart.animate(false);
```

### Use changeData() for Updates
```typescript
// Efficient update
chart.changeData(newData);

// Don't do this (less efficient)
chart.clear();
chart.interval().data(newData)...;
chart.render();
```

## Testing G2 Applications

### Unit Testing Custom Components
```typescript
import { register } from '@antv/g2';

describe('Custom Mark', () => {
  it('should register correctly', () => {
    register('mark.custom', customMark);
    // Test implementation
  });
});
```

### Integration Testing
```typescript
import { Chart } from '@antv/g2';
import { JSDOM } from 'jsdom';

describe('Chart Rendering', () => {
  it('should render correctly', () => {
    const dom = new JSDOM('<!DOCTYPE html><div id="container"></div>');
    global.document = dom.window.document;
    
    const chart = new Chart({ container: 'container' });
    chart.interval().data(data).encode('x', 'x').encode('y', 'y');
    chart.render();
    
    // Assert chart rendered
    expect(chart.getCanvas()).toBeDefined();
  });
});
```

### Snapshot Testing
See `__tests__/` directory for examples of snapshot testing visual output.

## Debugging Tips

### Enable Debug Mode
```typescript
// Log all events
chart.on('*', (event) => {
  console.log(event.type, event);
});
```

### Inspect Internal State
```typescript
console.log(chart.getOptions());  // Current options
console.log(chart.getData());     // Current data
console.log(chart.getScale('x')); // Scale configuration
```

### Visual Debugging
```typescript
// Show element bounds
chart.interval().style('stroke', 'red').style('lineWidth', 1);

// Log on interaction
chart.on('element:click', (event) => {
  console.log('Data:', event.data);
  console.log('Element:', event.target);
});
```

## Best Practices

1. **Use fluent API for simple cases**: It's more concise and readable
2. **Use spec API for complex configurations**: Better for serialization and configuration
3. **Keep data transformations in data pipeline**: More efficient than mark transforms
4. **Register custom components once**: Don't register in render loops
5. **Clean up charts**: Call `chart.destroy()` when done
6. **Use appropriate scales**: Let G2 infer when possible
7. **Test with real data**: Edge cases appear with real-world data
8. **Profile performance**: Use browser dev tools for large datasets
9. **Follow theme conventions**: Use theme colors and styles
10. **Document custom extensions**: Make them reusable and maintainable
