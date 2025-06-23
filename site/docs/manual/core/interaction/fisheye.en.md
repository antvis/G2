---
title: fisheye
order: 24
---

## Overview

The `fisheye` interaction is a distortion technique that magnifies the area around the mouse focus point while maintaining the overall view of the data. It provides a "fish-eye lens" effect that allows users to see both detailed information at the focus point and the overall context of the surrounding data simultaneously.

## Usage

To enable fisheye interaction, add it to the chart configuration:

```js
({
  interaction: { fisheye: true },
});
```

## Configuration Options

| Property   | Description         | Type     | Default | Required |
| ---------- | ------------------- | -------- | ------- | -------- |
| radius     | Fisheye lens radius | `number` | 100     |          |
| distortion | Distortion factor   | `number` | 2       |          |

## Examples

### Basic Fisheye

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: {
    x: 'weight',
    y: 'height',
    color: 'gender',
  },
  interaction: { fisheye: true },
});

chart.render();
```
