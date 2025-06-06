---
title: Legend
order: 7.2
---

## Overview

The **Legend** in G2 is an auxiliary element in charts that uses colors, sizes, and shapes to distinguish different data types, used for filtering data in charts. It can be understood as the visualization of scales corresponding to non-spatial channels (`color`, `opacity`, `size`, `shape`). G2 will automatically generate different legends based on the set graphic attribute mappings and data types. When a variable corresponds to multiple graphic attributes, G2 will merge the legends to achieve simplification.

The four non-spatial channels `color`, `opacity`, `size`, `shape` will automatically generate different legends when they determine that the received parameters are fields from the data source:

| Visual Channel | Description                            |
| -------------- | -------------------------------------- |
| color          | Generate legend based on different colors     |
| opacity        | Generate legend based on different opacity levels |
| size           | Generate legend based on different sizes       |
| shape          | Generate legend based on different shapes      |

### Components

<img alt="legend-overview" width=900 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*lGLWS4QUPscAAAAAAAAAAAAAemJ7AQ/original"/>

### Usage

There are two ways to configure legends:

First, pass a `boolean` to set whether to display legends.

```js
({
  type: 'interval',
  legend: false; // Hide all legends
})
```

```js
({
  type: 'interval',
  legend: {color: false}; // Hide the color channel legend
})
```

Second, pass _legendOption_ to configure the legend overall.

```js
({
  type: 'interval',
  legend: {
    color: {},
    size: {},
  },
});
```

### Configuration Levels

Legends can be configured at the Mark level. In G2, each mark has its own legend. If the scales corresponding to marks are synchronized, the legends will also be merged.

```js
({
  type: 'interval',
  legend: {
    color: {},
    size: {},
  },
});
```

Legends can also be configured at the View level. Legends have transitivity. Legends declared on views will be passed to marks declared in `children`. If the mark has a legend for the corresponding channel, they merge; otherwise, it doesn't affect.

```js
({
  type: 'view',
  legend: {
    color: {},
    size: {},
  },
});
```

## Configuration Options

Legends in G2 are divided into **continuous legends** and **categorical legends**, which have different configuration options due to their different structures.

Some configuration options distinguish between categorical legends and continuous legends:
<Badge type="success">Categorical Legend</Badge>
<Badge type="warning">Continuous Legend</Badge>

| Property                                                  | Description                                             | Type                                                               | Default Value                                | Required |
| ----------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------- | ---- |
| orientation                                           | Legend orientation, for categorical legends this is the scroll direction             | `horizontal` \| `vertical`                                         | `horizontal`                          |      |
| position                                              | Position of the legend                                       | `top` \| `right` \| `left` \| `bottom`                             | `top`                                 |      |
| layout                                                | Adjust the flex layout of the legend                         | [layout](#layout)                                                  | See [layout](#layout)                 |
| size                                                  | Size of the legend                                       | number                                                             | -                                     |
| width                                                 | Width of the legend                                       | number                                                             | -                                     |
| crossPadding                                          | Distance from legend to chart area                             | number                                                             | `12`                                  |
| order                                                 | Sort order of legend during layout                           | number                                                             | `1`                                   |
| title                                                 | Configure legend title                                   | [title](#title)                                                    | See [title](#title)                   |
| cols <Badge type="success">Categorical Legend</Badge>           | Specify the number of legend items displayed per row, empty means no column limit | number                                                             | -                                     |
| colPadding <Badge type="success">Categorical Legend</Badge>     | Specify horizontal spacing between legend items                         | number                                                             | `12`                                  |
| rowPadding <Badge type="success">Categorical Legend</Badge>     | Specify vertical spacing between legend items                         | number                                                             | `8`                                   |
| maxRows <Badge type="success">Categorical Legend</Badge>        | Specify maximum number of rows for legend                                 | number                                                             | `3`                                   |
| maxCols <Badge type="success">Categorical Legend</Badge>        | Specify maximum number of columns for legend                                 | number                                                             | `3`                                   |
| itemMarker <Badge type="success">Categorical Legend</Badge>     | Configure legend item icons                                 | [itemMarker](#itemmarker)                                          | See [itemMarker](#itemmarker)         |
| itemLabel <Badge type="success">Categorical Legend</Badge>      | Configure legend item label text                             | [itemLabel](#itemlabel)                                            | See [itemLabel](#itemlabel)           |
| itemValue <Badge type="success">Categorical Legend</Badge>      | Configure legend item values                                   | [itemValue](#itemvalue)                                            | See [itemValue](#itemvalue)           |
| itemBackground <Badge type="success">Categorical Legend</Badge> | Configure legend item background                                 | [itemBackground](#itembackground)                                  | See [itemBackground](#itembackground) |
| itemWidth <Badge type="success">Categorical Legend</Badge>      | Configure legend item width                                 | number                                                             | -                                     |
| itemSpan <Badge type="success">Categorical Legend</Badge>       | Configure space allocation for legend item icons, labels and values               | number \| number[]                                                 | `[1, 1, 1]`                           |
| itemSpacing <Badge type="success">Categorical Legend</Badge>    | Configure spacing between legend item icons, labels and values               | number \| number[]                                                 | `[8, 8]`                              |
| nav <Badge type="success">Categorical Legend</Badge>            | Configure legend pagination                                 | [nav](#nav)                                                        | See [nav](#nav)                       |
| color <Badge type="warning">Continuous Legend</Badge>          | Configure continuous legend ribbon colors                           | string[] \| [d3-interpolate](https://github.com/d3/d3-interpolate) | -                                     |
| block <Badge type="warning">Continuous Legend</Badge>          | Whether continuous legend displays in intervals                           | boolean                                                            | false                                 |
| type <Badge type="warning">Continuous Legend</Badge>           | Configure continuous legend type                               | `size` \|`color`                                                   | `color`                               |
| ribbon <Badge type="warning">Continuous Legend</Badge>         | Configure continuous legend ribbon                               | [ribbon](#ribbon)                                                  | See [ribbon](#ribbon)                 |
| handle <Badge type="warning">Continuous Legend</Badge>         | Configure continuous legend slider handles                           | [handle](#handle)                                                  | See [handle](#handle)                 |
| label <Badge type="warning">Continuous Legend</Badge>          | Configure continuous legend labels/tick values                        | [label](#label)                                                    | See [label](#label)                   |
| indicator <Badge type="warning">Continuous Legend</Badge>      | Configure continuous legend indicator                             | [indicator](#indicator)                                            | See [indicator](#indicator)           |
