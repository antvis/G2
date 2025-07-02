---
title: legendHighlight
order: 18
---

## Getting Started

The `legendHighlight` interaction targets the chart component legend.

- **Trigger**: Mouse hover over legend items.
- **End**: Mouse leaves legend items.
- **Affected States**:

Elements within the selection range become `active`.

Elements outside the selection range become `inactive`.

Built-in interaction states:

```js
({
  // Define inactive state element opacity as 0.5
  state: { inactive: { opacity: 0.5 } },
});
```

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*M4eVSKTMPs4AAAAAAAAAAAAADmJ7AQ/original" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data(profit)
  .axis('y', { labelFormatter: '~s' })
  .encode('x', 'month')
  .encode('y', ['end', 'start'])
  .encode(
    'color',
    d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
  )
  .state('inactive', { opacity: 0.5 })
  .legend('color', {
    state: { inactive: { labelOpacity: 0.5, markerOpacity: 0.5 } },
  });

chart.interaction('legendHighlight', true);

chart.render();
```

## Usage

Pass a `boolean` to enable or disable the interaction.

```js
({
  type: 'interval',
  interaction: { legendHighlight: true }, // Use default configuration
});
```

## Configuration Level

Legend highlight interaction can be configured at the View level:

```js
chart.interaction('legendHighlight', true);
```

## Configuration Options

The current version of LegendHighlight interaction has no configurable parameters.

To set the inactive state, refer to [Element State](https://g6.antv.antgroup.com/en/manual/element/state)

### Legend Component Configuration

For detailed documentation, see [Legend](/en/manual/component/legend)

## Events

### Listening to Events

- `legend:highlight` - Triggered when mouse hovers over legend items
- `legend:unhighlight` - Triggered when mouse leaves legend

```js
chart.on('legend:highlight', (e) => {
  const { nativeEvent, data } = e;
  if (!nativeEvent) return;
  console.log(data);
});

chart.on('legend:unhighlight', (e) => {
  const { nativeEvent } = e;
  if (!nativeEvent) return;
  console.log('unhighlight');
});
```

### Triggering Interaction

- `legend:highlight` - Highlight data corresponding to legend values
- `legend:unhighlight` - Cancel highlight state

```js
chart.emit('legend:highlight', {
  data: { channel: 'color', value: 'Increase' },
});

chart.emit('legend:unhighlight', {});
```

## Examples

The following example demonstrates the basic interaction functionality of `legendHighlight`.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  height: 300,
  data: [
    { name: 'London', month: 'Jan.', value: 18.9 },
    { name: 'London', month: 'Feb.', value: 28.8 },
    { name: 'London', month: 'Mar.', value: 39.3 },
    { name: 'London', month: 'Apr.', value: 81.4 },
    { name: 'London', month: 'May', value: 47 },
    { name: 'London', month: 'Jun.', value: 20.3 },
    { name: 'London', month: 'Jul.', value: 24 },
    { name: 'London', month: 'Aug.', value: 35.6 },
    { name: 'Berlin', month: 'Jan.', value: 12.4 },
    { name: 'Berlin', month: 'Feb.', value: 23.2 },
    { name: 'Berlin', month: 'Mar.', value: 34.5 },
    { name: 'Berlin', month: 'Apr.', value: 99.7 },
    { name: 'Berlin', month: 'May', value: 52.6 },
    { name: 'Berlin', month: 'Jun.', value: 35.5 },
    { name: 'Berlin', month: 'Jul.', value: 37.4 },
    { name: 'Berlin', month: 'Aug.', value: 42.4 },
  ],
  encode: {
    x: 'month',
    y: 'value',
    color: 'name',
  },
  transform: [
    {
      type: 'dodgeX',
      groupBy: 'x',
      orderBy: 'value',
      padding: 0.1,
    },
  ],
  interaction: {
    legendHighlight: {
      series: true,
    },
  },
  state: { inactive: { opacity: 0.5 } },
});

chart.render();
```
