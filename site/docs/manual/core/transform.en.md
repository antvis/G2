---
title: 转换（Transform）
order: 6
---

**The Mark Transform** in G2 offers a convenient method for transforming data and mark options, mainly used for analyzing data. The core of mark transform, which **filters, modifies, aggregates and generates** new channel values.

Transform is an array, executed in the order when they are declared. It can be configured at the level of mark:

```js
({
  type: 'interval',
  transform: [{ type: 'stackY' }, { type: 'sortX' }],
});
```

```js
// API
// First way
chart.interval().transform({ type: 'stackY' }).transform({ type: 'sortX' });

// Second way
chart.interval().transform([{ type: 'stackY' }, { type: 'sortX' }]);
```

Transform can also configure the level of view:

```js
({
  type: 'view',
  transform: [{ type: 'stackY' }, { type: 'sortX' }],
});
```

```js
// API
// First way
chart.transform({ type: 'stackY' }).transform({ type: 'sortX' });

// Second way
chart.transform([{ type: 'stackY' }, { type: 'sortX' }]);
```

## Mark Transform

Mark transform will modify the data bound to each channel, thereby changing the display form of the chart. For example, StackY transform stacks the column data bound to bar graph y and y1 channels:

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { city: 'London', month: 'Jan.', rainfall: 18.9 },
      { city: 'London', month: 'Feb.', rainfall: 28.8 },
      { city: 'London', month: 'Mar.', rainfall: 39.3 },
      { city: 'London', month: 'Apr.', rainfall: 81.4 },
      { city: 'London', month: 'May', rainfall: 47 },
      { city: 'London', month: 'Jun.', rainfall: 20.3 },
      { city: 'London', month: 'Jul.', rainfall: 24 },
      { city: 'London', month: 'Aug.', rainfall: 35.6 },
      { city: 'Berlin', month: 'Jan.', rainfall: 12.4 },
      { city: 'Berlin', month: 'Feb.', rainfall: 23.2 },
      { city: 'Berlin', month: 'Mar.', rainfall: 34.5 },
      { city: 'Berlin', month: 'Apr.', rainfall: 99.7 },
      { city: 'Berlin', month: 'May', rainfall: 52.6 },
      { city: 'Berlin', month: 'Jun.', rainfall: 35.5 },
      { city: 'Berlin', month: 'Jul.', rainfall: 37.4 },
      { city: 'Berlin', month: 'Aug.', rainfall: 42.4 },
    ])
    .encode('x', 'month')
    .encode('y', 'rainfall')
    .encode('color', 'city')
    .transform({ type: 'stackY' });

  chart.render();

  return chart.getContainer();
})();
```

## View Transform

Transform declared on the view will be passed on to the mark declared in `children`. Set if it is not transformed, otherwise, it has no effect. For example, the following stacked area chart with transform:

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .data([
      { city: 'London', month: 'Jan.', rainfall: 18.9 },
      { city: 'London', month: 'Feb.', rainfall: 28.8 },
      { city: 'London', month: 'Mar.', rainfall: 39.3 },
      { city: 'London', month: 'Apr.', rainfall: 81.4 },
      { city: 'London', month: 'May', rainfall: 47 },
      { city: 'London', month: 'Jun.', rainfall: 20.3 },
      { city: 'London', month: 'Jul.', rainfall: 24 },
      { city: 'London', month: 'Aug.', rainfall: 35.6 },
      { city: 'Berlin', month: 'Jan.', rainfall: 12.4 },
      { city: 'Berlin', month: 'Feb.', rainfall: 23.2 },
      { city: 'Berlin', month: 'Mar.', rainfall: 34.5 },
      { city: 'Berlin', month: 'Apr.', rainfall: 99.7 },
      { city: 'Berlin', month: 'May', rainfall: 52.6 },
      { city: 'Berlin', month: 'Jun.', rainfall: 35.5 },
      { city: 'Berlin', month: 'Jul.', rainfall: 37.4 },
      { city: 'Berlin', month: 'Aug.', rainfall: 42.4 },
    ])
    .encode('x', 'month')
    .encode('y', 'rainfall')
    .encode('color', 'city')
    .transform({ type: 'stackY' }); // Transform of the level of view

  chart.area().style('fillOpacity', 0.5);

  chart.line().style('strokeWidth', 2).tooltip(false);

  chart.render();

  return chart.getContainer();
})();
```

## Common Transform

There are generally two common transform functions:

- Prevent overlap
- Data aggregation

### Prevent overlap

One function of transform is to prevent overlap. For example, the bars in the following data bar chart overlap.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { city: 'London', month: 'Jan.', rainfall: 18.9 },
      { city: 'London', month: 'Feb.', rainfall: 28.8 },
      { city: 'London', month: 'Mar.', rainfall: 39.3 },
      { city: 'London', month: 'Apr.', rainfall: 81.4 },
      { city: 'London', month: 'May', rainfall: 47 },
      { city: 'London', month: 'Jun.', rainfall: 20.3 },
      { city: 'London', month: 'Jul.', rainfall: 24 },
      { city: 'London', month: 'Aug.', rainfall: 35.6 },
      { city: 'Berlin', month: 'Jan.', rainfall: 12.4 },
      { city: 'Berlin', month: 'Feb.', rainfall: 23.2 },
      { city: 'Berlin', month: 'Mar.', rainfall: 34.5 },
      { city: 'Berlin', month: 'Apr.', rainfall: 99.7 },
      { city: 'Berlin', month: 'May', rainfall: 52.6 },
      { city: 'Berlin', month: 'Jun.', rainfall: 35.5 },
      { city: 'Berlin', month: 'Jul.', rainfall: 37.4 },
      { city: 'Berlin', month: 'Aug.', rainfall: 42.4 },
    ])
    .encode('x', 'month')
    .encode('y', 'rainfall')
    .encode('color', 'city');

  chart.render();

  return chart.getContainer();
})();
```

At this time, you can declare a DodgeX to draw a grouped bar chart:

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { city: 'London', month: 'Jan.', rainfall: 18.9 },
      { city: 'London', month: 'Feb.', rainfall: 28.8 },
      { city: 'London', month: 'Mar.', rainfall: 39.3 },
      { city: 'London', month: 'Apr.', rainfall: 81.4 },
      { city: 'London', month: 'May', rainfall: 47 },
      { city: 'London', month: 'Jun.', rainfall: 20.3 },
      { city: 'London', month: 'Jul.', rainfall: 24 },
      { city: 'London', month: 'Aug.', rainfall: 35.6 },
      { city: 'Berlin', month: 'Jan.', rainfall: 12.4 },
      { city: 'Berlin', month: 'Feb.', rainfall: 23.2 },
      { city: 'Berlin', month: 'Mar.', rainfall: 34.5 },
      { city: 'Berlin', month: 'Apr.', rainfall: 99.7 },
      { city: 'Berlin', month: 'May', rainfall: 52.6 },
      { city: 'Berlin', month: 'Jun.', rainfall: 35.5 },
      { city: 'Berlin', month: 'Jul.', rainfall: 37.4 },
      { city: 'Berlin', month: 'Aug.', rainfall: 42.4 },
    ])
    .encode('x', 'month')
    .encode('y', 'rainfall')
    .encode('color', 'city')
    .transform({ type: 'dodgeX' }); // Declare transform

  chart.render();

  return chart.getContainer();
})();
```

This is actually one of the functions of mark transform: **Prevent overlap**. In addition to DodgeX, there are also transform such as StackY and JitterX that can be used to prevent overlap.

### Data aggregation

In addition to preventing overlap, there is also a type of mark transform mainly used for data aggregation: such as Bin and Group. Different from traditional data aggregation, mark aggregation occurs in drawing, not before drawing. This eliminates the need for us to manipulate abstract raw data, but directly manipulate channel values. This greatly improves our efficiency in exploring data.

First, let's draw a scatterplot as follows, showing the correlation between penguin culmen_depth_mm and culmen_length_mm.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/penguins.json',
      transform: [
        { type: 'filter', callback: (d) => d.culmen_depth_mm !== null },
      ],
    })
    .encode('x', (d) => +d.culmen_depth_mm)
    .encode('y', (d) => +d.culmen_length_mm);

  chart.render();

  return chart.getContainer();
})();
```

At this time, if you want to see the distribution of penguin culmen_depth_mm, you can use bin to binning the data.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .rect()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/penguins.json',
      transform: [
        { type: 'filter', callback: (d) => d.culmen_depth_mm !== null },
      ],
    })
    .encode('x', (d) => +d.culmen_depth_mm)
    .transform({
      type: 'binX', // Bin the x channel value
      y: 'count', // Generate the y channel and select the count reducer to count the total number of each box
    })
    .style('insetLeft', 1);

  chart.render();

  return chart.getContainer();
})();
```

Bin is mainly used to aggregate numerical data, and Group is mainly used for discrete data.

## Multiple Transform

We can also declare multiple transform at the same time. For example, in the penguin example above, if we consider one more data dimension: the gender of the penguin, we can declare Bin and StackY transform continuously.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .rect()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/penguins.json',
      transform: [
        { type: 'filter', callback: (d) => d.culmen_depth_mm !== null },
      ],
    })
    .encode('x', (d) => +d.culmen_depth_mm)
    .encode('color', 'sex')
    .transform({ type: 'binX', y: 'count' }) // 声明 bin 转换
    .transform({ type: 'stackY', orderBy: 'sum', reverse: true }) // 声明 stack 转换
    .style('insetLeft', 1);

  chart.render();

  return chart.getContainer();
})();
```
