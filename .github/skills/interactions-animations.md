# G2 Interactions and Animations

This skill covers interactions and animations in G2.

## Interactions (`src/interaction/`)

Interactions define how users can interact with visualizations. G2 provides a rich set of built-in interactions.

### Highlight Interactions

#### ElementHighlight (`src/interaction/elementHighlight.ts`)
Highlight elements on hover
- Dims non-hovered elements
- Options: `background` (highlight background), `link` (highlight connected elements)
```typescript
.interaction('elementHighlight', { 
  background: true,
  link: false
})
```

#### ElementHighlightByX (`src/interaction/elementHighlightByX.ts`)
Highlight all elements with same X value
- Used for: Highlighting categories across series
```typescript
.interaction('elementHighlightByX')
```

#### ElementHighlightByColor (`src/interaction/elementHighlightByColor.ts`)
Highlight all elements with same color
- Used for: Highlighting series
```typescript
.interaction('elementHighlightByColor')
```

#### LegendHighlight (`src/interaction/legendHighlight.ts`)
Highlight elements when hovering legend items
```typescript
.interaction('legendHighlight')
```

### Selection Interactions

#### ElementSelect (`src/interaction/elementSelect.ts`)
Select elements on click
- Keeps elements selected until clicked again
- Options: `single` (single selection), `groupBy`, `link`
```typescript
.interaction('elementSelect', { 
  single: true,
  link: false
})
```

#### ElementSelectByX (`src/interaction/elementSelectByX.ts`)
Select all elements with same X value
```typescript
.interaction('elementSelectByX')
```

#### ElementSelectByColor (`src/interaction/elementSelectByColor.ts`)
Select all elements with same color
```typescript
.interaction('elementSelectByColor')
```

### Filter Interactions

#### LegendFilter (`src/interaction/legendFilter.ts`)
Click legend to filter data
- Toggle series on/off
```typescript
.interaction('legendFilter')
```

#### BrushFilter (`src/interaction/brushFilter.ts`)
Brush to filter data in 2D
- Rectangular brush selection
- Options: `mode` ('single' or 'multiple')
```typescript
.interaction('brushFilter', { mode: 'single' })
```

#### BrushXFilter (`src/interaction/brushXFilter.ts`)
Brush to filter on X axis only
```typescript
.interaction('brushXFilter')
```

#### BrushYFilter (`src/interaction/brushYFilter.ts`)
Brush to filter on Y axis only
```typescript
.interaction('brushYFilter')
```

#### SliderFilter (`src/interaction/sliderFilter.ts`)
Use slider to filter data range
- Requires sliderX or sliderY component
```typescript
.interaction('sliderFilter')
```

#### ScrollbarFilter (`src/interaction/scrollbarFilter.ts`)
Use scrollbar to filter data range
- Requires scrollbarX or scrollbarY component
```typescript
.interaction('scrollbarFilter')
```

#### AdaptiveFilter (`src/interaction/adaptiveFilter.ts`)
Automatically filter overlapping elements
```typescript
.interaction('adaptiveFilter')
```

### Brush Highlight Interactions

#### BrushHighlight (`src/interaction/brushHighlight.ts`)
Brush to highlight in 2D
- Like brushFilter but only highlights, doesn't filter
```typescript
.interaction('brushHighlight')
```

#### BrushXHighlight (`src/interaction/brushXHighlight.ts`)
Brush to highlight on X axis
```typescript
.interaction('brushXHighlight')
```

#### BrushYHighlight (`src/interaction/brushYHighlight.ts`)
Brush to highlight on Y axis
```typescript
.interaction('brushYHighlight')
```

#### BrushAxisHighlight (`src/interaction/brushAxisHighlight.ts`)
Brush on axis to highlight
```typescript
.interaction('brushAxisHighlight')
```

### Tooltip Interactions

#### Tooltip (`src/interaction/tooltip.ts`)
Show tooltip on hover
- Options: `shared` (show all series), `position`, `title`, `items`
```typescript
.interaction('tooltip', {
  shared: true,
  title: 'Date: {x}',
  items: [
    { field: 'y', name: 'Value' }
  ]
})
```

#### Poptip (`src/interaction/poptip.ts`)
Fixed tooltip (stays visible)
```typescript
.interaction('poptip')
```

### Special Interactions

#### ElementHoverScale (`src/interaction/elementHoverScale.ts`)
Scale up element on hover
- Options: `scale` (scale factor)
```typescript
.interaction('elementHoverScale', { scale: 1.2 })
```

#### ElementPointMove (`src/interaction/elementPointMove.ts`)
Move point elements
- Allows dragging points
```typescript
.interaction('elementPointMove')
```

#### Fisheye (`src/interaction/fisheye.ts`)
Fisheye lens effect on hover
- Magnifies area around cursor
```typescript
.interaction('fisheye', { 
  distortion: 2,
  radius: 100
})
```

#### DrillDown (`src/interaction/drillDown.ts`)
Drill down into hierarchical data
```typescript
.interaction('drillDown')
```

#### TreemapDrillDown (`src/interaction/treemapDrillDown.ts`)
Specialized drill-down for treemaps
```typescript
.interaction('treemapDrillDown')
```

#### ChartIndex (`src/interaction/chartIndex.ts`)
Navigate between chart states
```typescript
.interaction('chartIndex')
```

#### SliderWheel (`src/interaction/sliderWheel.ts`)
Use mouse wheel with slider
```typescript
.interaction('sliderWheel')
```

## Interaction Configuration

### Common Options

#### Single vs Multiple
```typescript
.interaction('elementSelect', { single: true })  // Only one element
.interaction('elementSelect', { single: false }) // Multiple elements
```

#### Link Mode
Connect related elements
```typescript
.interaction('elementHighlight', { link: true })
```

#### GroupBy
Group related elements
```typescript
.interaction('elementSelect', { groupBy: 'category' })
```

#### Background
Highlight background instead of elements
```typescript
.interaction('elementHighlight', { background: true })
```

### Tooltip Options

#### Shared Tooltip
```typescript
.interaction('tooltip', { 
  shared: true  // Show all series at X position
})
```

#### Custom Title
```typescript
.interaction('tooltip', { 
  title: (d) => `Date: ${d.date}`
})
```

#### Custom Items
```typescript
.interaction('tooltip', { 
  items: [
    { field: 'value', name: 'Sales', format: '.2f' },
    { field: 'count', name: 'Orders' }
  ]
})
```

#### Positioning
```typescript
.interaction('tooltip', { 
  position: 'top',  // 'top', 'bottom', 'left', 'right', 'auto'
  offset: [10, 10]
})
```

#### Custom Render
```typescript
.interaction('tooltip', { 
  render: (event, data) => {
    return `<div>Custom HTML</div>`;
  }
})
```

## Animations (`src/animation/`)

Animations define how marks enter, update, and exit the visualization.

### Enter Animations

#### FadeIn (`src/animation/fadeIn.ts`)
Fade in from transparent
```typescript
.animate('enter', { type: 'fadeIn', duration: 300 })
```

#### ScaleInX (`src/animation/scaleInX.ts`)
Scale in from center horizontally
```typescript
.animate('enter', { type: 'scaleInX' })
```

#### ScaleInY (`src/animation/scaleInY.ts`)
Scale in from center vertically
```typescript
.animate('enter', { type: 'scaleInY' })
```

#### GrowInX (`src/animation/growInX.ts`)
Grow from left to right
```typescript
.animate('enter', { type: 'growInX' })
```

#### GrowInY (`src/animation/growInY.ts`)
Grow from bottom to top
```typescript
.animate('enter', { type: 'growInY' })
```

#### WaveIn (`src/animation/waveIn.ts`)
Wave animation from left
```typescript
.animate('enter', { type: 'waveIn' })
```

#### ZoomIn (`src/animation/zoomIn.ts`)
Zoom in from center
```typescript
.animate('enter', { type: 'zoomIn' })
```

#### PathIn (`src/animation/pathIn.ts`)
Animate path from start to end
- Used for line/area charts
```typescript
.animate('enter', { type: 'pathIn' })
```

### Exit Animations

#### FadeOut (`src/animation/fadeOut.ts`)
Fade out to transparent
```typescript
.animate('exit', { type: 'fadeOut' })
```

#### ScaleOutX (`src/animation/scaleOutX.ts`)
Scale out horizontally to center
```typescript
.animate('exit', { type: 'scaleOutX' })
```

#### ScaleOutY (`src/animation/scaleOutY.ts`)
Scale out vertically to center
```typescript
.animate('exit', { type: 'scaleOutY' })
```

#### ZoomOut (`src/animation/zoomOut.ts`)
Zoom out to center
```typescript
.animate('exit', { type: 'zoomOut' })
```

### Update Animations

#### Morphing (`src/animation/morphing.ts`)
Smooth transition between states
- Interpolates all properties
```typescript
.animate('update', { type: 'morphing', duration: 500 })
```

## Animation Configuration

### Duration
```typescript
.animate('enter', { type: 'fadeIn', duration: 1000 })  // milliseconds
```

### Delay
```typescript
.animate('enter', { type: 'fadeIn', delay: 200 })
```

### Easing
```typescript
.animate('enter', { 
  type: 'fadeIn',
  easing: 'ease-in-out'  // 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'
})
```

### Custom Easing Function
```typescript
.animate('enter', { 
  type: 'fadeIn',
  easing: (t) => t * t  // Custom easing function
})
```

### Animation by Index
Stagger animations
```typescript
.animate('enter', { 
  type: 'scaleInY',
  delay: (i) => i * 50  // Delay based on index
})
```

### Multiple Animations
```typescript
.animate('enter', [
  { type: 'fadeIn', duration: 300 },
  { type: 'scaleInY', duration: 500, delay: 100 }
])
```

## Common Patterns

### Bar chart with interactions
```typescript
chart
  .interval()
  .data(data)
  .encode('x', 'category')
  .encode('y', 'value')
  .interaction('elementHighlight')
  .interaction('tooltip')
  .animate('enter', { type: 'scaleInY' });
```

### Line chart with shared tooltip
```typescript
chart
  .line()
  .data(data)
  .encode('x', 'date')
  .encode('y', 'value')
  .encode('color', 'series')
  .interaction('tooltip', { shared: true })
  .animate('enter', { type: 'pathIn' });
```

### Scatter plot with element selection
```typescript
chart
  .point()
  .data(data)
  .encode('x', 'weight')
  .encode('y', 'height')
  .encode('color', 'gender')
  .interaction('elementSelect', { single: false })
  .interaction('tooltip')
  .animate('enter', { type: 'fadeIn' });
```

### Brushable scatter plot
```typescript
chart
  .point()
  .data(data)
  .encode('x', 'x')
  .encode('y', 'y')
  .interaction('brushFilter')
  .interaction('tooltip');
```

### Interactive legend
```typescript
chart
  .interval()
  .data(data)
  .encode('x', 'date')
  .encode('y', 'value')
  .encode('color', 'category')
  .transform({ type: 'stackY' })
  .interaction('legendFilter')
  .interaction('legendHighlight');
```

### Staggered bar animation
```typescript
chart
  .interval()
  .data(data)
  .encode('x', 'category')
  .encode('y', 'value')
  .animate('enter', { 
    type: 'scaleInY',
    duration: 300,
    delay: (d, i) => i * 100  // Stagger by 100ms
  });
```

### Highlight series on hover
```typescript
chart
  .line()
  .data(data)
  .encode('x', 'date')
  .encode('y', 'value')
  .encode('color', 'series')
  .interaction('elementHighlightByColor');
```

### Range slider filter
```typescript
chart
  .interval()
  .data(data)
  .encode('x', 'date')
  .encode('y', 'value');

chart.sliderX({});  // Add slider component
chart.interaction('sliderFilter');  // Enable interaction
```

## Interaction Events (`src/interaction/event.ts`)

G2 emits various events that can be listened to:

### Element Events
- `element:click`
- `element:mouseenter`
- `element:mouseleave`
- `element:mousemove`
- `element:pointerdown`
- `element:pointerup`
- `element:pointermove`

### Plot Events
- `plot:click`
- `plot:mouseenter`
- `plot:mouseleave`
- `plot:mousemove`

### Legend Events
- `legend:click`
- `legend:mouseenter`
- `legend:mouseleave`

### Axis Events
- `axis:click`
- `axis:mouseenter`
- `axis:mouseleave`

### Custom Event Handlers
```typescript
chart.on('element:click', (event) => {
  console.log('Clicked element:', event.data);
});

chart.on('plot:mousemove', (event) => {
  console.log('Mouse position:', event.x, event.y);
});
```

## Animation States

G2 manages three animation states:

1. **Enter**: When marks are first added
2. **Update**: When marks change (data/style updates)
3. **Exit**: When marks are removed

Configure separately:
```typescript
chart
  .interval()
  .animate('enter', { type: 'growInY' })
  .animate('update', { type: 'morphing' })
  .animate('exit', { type: 'fadeOut' });
```

## Disabling Animations

For static exports or performance:
```typescript
// Disable all animations
chart.animate(false);

// Disable specific animation
chart
  .interval()
  .animate('enter', false);
```

## Custom Interactions

Create custom interactions by combining events:
```typescript
chart.on('element:click', (event) => {
  const element = event.target;
  const data = event.data;
  
  // Custom logic
  console.log('Custom interaction:', data);
});
```

Or register custom interaction:
```typescript
import { register } from '@antv/g2';

function customInteraction(options) {
  return (plot, coordinate) => {
    // Interaction logic
  };
}

register('interaction.custom', customInteraction);

chart.interaction('custom', { ...options });
```

## Performance Considerations

1. **Limit interactions on large datasets**: Some interactions (like brush) can be slow with many elements
2. **Use throttling for mousemove**: Throttle expensive operations on mousemove events
3. **Disable unnecessary animations**: Animations add overhead
4. **Batch updates**: Update multiple properties together to avoid multiple animations
5. **Use interaction states carefully**: Too many active states can cause performance issues

## Testing Interactions

When testing interactions:
1. Simulate user events (click, hover, etc.)
2. Verify state changes
3. Test with various data sizes
4. Verify visual feedback
5. Test edge cases (empty data, single element, etc.)
6. Test interaction combinations

## Debugging Interactions

Enable interaction debugging:
```typescript
chart.on('*', (event) => {
  console.log('Event:', event.type, event);
});
```

Check interaction state:
```typescript
chart.getInteractions();  // List active interactions
```

## Best Practices

1. **Don't overload with interactions**: Too many interactions confuse users
2. **Provide visual feedback**: Always show what's interactive
3. **Keep animations subtle**: Avoid distracting animations
4. **Test on different devices**: Touch interactions differ from mouse
5. **Consider accessibility**: Ensure keyboard navigation works
6. **Document custom interactions**: Make behavior clear to users
