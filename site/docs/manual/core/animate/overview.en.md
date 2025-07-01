---
title: Overview
order: 1
---

Animation is an important component of visualization that can significantly enhance the expressiveness of data visualization. G2 provides a comprehensive animation system that supports setting animation effects for graphics in three stages: enter, update, and exit. It can also perform animation encoding based on data characteristics to achieve rich interactions and transition effects.

Core features of G2's animation system:

- **State-driven**: Set different animation effects based on three graphic states (enter, update, exit)
- **Data-driven**: Map data values to animation properties such as duration, delay, etc.
- **Transition effects**: Support various transition effects including morphing, fading, scaling, etc.
- **Timing control**: Support setting animation sequence, easing functions, delay, duration, and other parameters

Animation properties can be set through the `animate` configuration option, either defined in the overall chart configuration or set for specific marks.

## Animation Configuration

Animation can be set in chart configuration through the `animate` property:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
  animate: { enter: { type: 'pathIn', duration: 1000 } },
});
chart.render();
```

You can set `type` to `null`, `undefined`, or `false` to disable animation:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
  animate: { enter: { type: 'false' } },
});
chart.render();
```

You can disable all animations with `animate: false`:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
  animate: false,
});
chart.render();
```

## Basic Usage

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  animate: {
    enter: { type: 'fadeIn', duration: 1000 },
  },
});

chart.render();
```

## Animation Properties

Marks specify animation properties through `mark.animate`, with three parts of animation that can be specified:

**enter** - New graphics

**update** - Updated graphics

**exit** - Deleted graphics

## Configuration Options

### Complete Animation Configuration Options

| Property       | Description                                          | Type                   | Default    | Required |
| -------------- | ---------------------------------------------------- | ---------------------- | ---------- | -------- |
| enter          | Enter animation configuration                        | `EnterAnimateOptions`  | -          |          |
| update         | Update animation configuration                       | `UpdateAnimateOptions` | -          |          |
| exit           | Exit animation configuration                         | `ExitAnimateOptions`   | -          |          |
| enterType      | Enter animation type                                 | `string`               | `fadeIn`   |          |
| enterDuration  | Enter animation duration (milliseconds)              | `number`               | `300`      |          |
| enterDelay     | Enter animation delay (milliseconds)                 | `number`               | `0`        |          |
| enterEasing    | Enter animation easing function                      | `string`               | `ease`     |          |
| enterFill      | Enter animation display effect in non-running state  | `Fill`                 | `both`     |          |
| updateType     | Update animation type                                | `string`               | `morphing` |          |
| updateDuration | Update animation duration (milliseconds)             | `number`               | `300`      |          |
| updateDelay    | Update animation delay (milliseconds)                | `number`               | `0`        |          |
| updateEasing   | Update animation easing function                     | `string`               | `ease`     |          |
| updateFill     | Update animation display effect in non-running state | `Fill`                 | `both`     |          |
| exitType       | Exit animation type                                  | `string`               | `fadeOut`  |          |
| exitDuration   | Exit animation duration (milliseconds)               | `number`               | `300`      |          |
| exitDelay      | Exit animation delay (milliseconds)                  | `number`               | `0`        |          |
| exitEasing     | Exit animation easing function                       | `string`               | `ease`     |          |
| exitFill       | Exit animation display effect in non-running state   | `Fill`                 | `both`     |          |

Complex type descriptions:

- `EnterAnimateOptions`: Enter animation configuration object, containing type, duration, delay, easing, fill properties
- `UpdateAnimateOptions`: Update animation configuration object, containing type, duration, delay, easing, fill properties
- `ExitAnimateOptions`: Exit animation configuration object, containing type, duration, delay, easing, fill properties
- `Fill`: Animation fill mode, options are `'auto'`, `'none'`, `'forwards'`, `'backwards'`, `'both'`

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/deaths.json',
  },
  encode: { x: 'Month', y: 'Death', color: 'Type' },
  transform: [
    { type: 'stackY' },
    { type: 'stackEnter', groupBy: ['color', 'x'], duration: 2000 },
  ],
  scale: { y: { type: 'sqrt' } },
  coordinate: { type: 'polar' },
  animate: { enter: { type: 'waveIn' } },
  axis: { y: false },
});

chart.render();
```

### Animation Type

Animation `Type` determines the visual effect of the animation. G2 provides various built-in animation types, and can also be set to `null`, `undefined`, or `false` to disable animation. Common animation types include:

| Animation Type | Function                                              |
| -------------- | ----------------------------------------------------- |
| fadeIn         | Fade-in effect, graphics from transparent to visible  |
| growInX        | Growth effect along X-axis direction                  |
| growInY        | Growth effect along Y-axis direction                  |
| scaleInX       | Scale enter effect along X-axis                       |
| scaleInY       | Scale enter effect along Y-axis                       |
| zoomIn         | Overall scale enter effect                            |
| pathIn         | Path enter effect                                     |
| waveIn         | Wave enter effect                                     |
| morphing       | Morphing effect, smooth transition of graphic changes |
| fadeOut        | Fade-out effect, graphics from visible to transparent |
| scaleOutX      | Scale exit effect along X-axis                        |
| scaleOutY      | Scale exit effect along Y-axis                        |
| zoomOut        | Overall scale exit effect                             |

### Easing Function

Easing functions control the interpolation of visual property changes during animation. G2 supports the following built-in easing functions (from [easings.net](https://easings.net/)):

| constant   | accelerate         | decelerate     | accelerate-decelerate | decelerate-accelerate |
| ---------- | ------------------ | -------------- | --------------------- | --------------------- |
| linear     | ease-in / in       | ease-out / out | ease-in-out / in-out  | ease-out-in / out-in  |
| ease       | in-sine            | out-sine       | in-out-sine           | out-in-sine           |
| steps      | in-quad            | out-quad       | in-out-quad           | out-in-quad           |
| step-start | in-cubic           | out-cubic      | in-out-cubic          | out-in-cubic          |
| step-end   | in-quart           | out-quart      | in-out-quart          | out-in-quart          |
|            | in-quint           | out-quint      | in-out-quint          | out-in-quint          |
|            | in-expo            | out-expo       | in-out-expo           | out-in-expo           |
|            | in-circ            | out-circ       | in-out-circ           | out-in-circ           |
|            | in-back            | out-back       | in-out-back           | out-in-back           |
|            | in-bounce          | out-bounce     | in-out-bounce         | out-in-bounce         |
|            | in-elastic         | out-elastic    | in-out-elastic        | out-in-elastic        |
|            | spring / spring-in | spring-out     | spring-in-out         | spring-out-in         |

### Animation Fill

Animation fill property specifies the display effect of graphics in non-running animation states (such as before start, after end):

- `auto`/`none` - Default value, animation does not affect graphic display before the first frame starts and after the last frame ends
- `forwards` - Animation stays at the end state after completion, does not revert to initial state
- `backwards` - Apply first frame effect before animation starts
- `both` - Apply both `forwards` and `backwards` effects

## Animation Encoding

G2 supports mapping data values to animation properties, making animation also have data visualization significance. Through `encode`, data fields can be mapped to animation properties such as `enterDuration`, `enterDelay`, etc.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { name: 'event planning', startTime: 1, endTime: 4 },
    { name: 'layout logistics', startTime: 3, endTime: 13 },
    { name: 'select vendors', startTime: 5, endTime: 8 },
    { name: 'hire venue', startTime: 9, endTime: 13 },
    { name: 'hire caterer', startTime: 10, endTime: 14 },
    { name: 'hire event decorators', startTime: 12, endTime: 17 },
    { name: 'rehearsal', startTime: 14, endTime: 16 },
    { name: 'event celebration', startTime: 17, endTime: 18 },
  ],
  encode: {
    x: 'name',
    y: ['endTime', 'startTime'],
    color: 'name',
    enterDuration: (d) => (d.endTime - d.startTime) * 300,
    enterDelay: (d) => d.startTime * 100,
  },
  coordinate: { transform: [{ type: 'transpose' }] },
});

chart.render();
```

## Group Animation

G2 provides the `stackEnter` mark transform to implement group animations, making graphics appear sequentially according to specific rules. This transform first groups graphics and then stacks their appearance time and duration spatially.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/doughnut-purchases.json',
  },
  children: [
    {
      type: 'line',
      encode: { x: 'year', y: 'count', color: 'year', shape: 'smooth' },
      scale: { y: { zero: true, nice: true } },
      style: { gradient: 'x', gradientColor: 'start' },
      animate: { enter: { type: 'pathIn', duration: 3000 } },
      axis: { y: { labelFormatter: '~s' } },
    },
    {
      type: 'point',
      encode: { x: 'year', y: 'count', color: 'year', shape: 'point' },
      transform: [{ type: 'stackEnter' }],
      animate: { enter: { duration: 300 } },
    },
    {
      type: 'text',
      encode: { x: 'year', y: 'count', text: 'year' },
      transform: [{ type: 'stackEnter' }],
      style: { lineWidth: 5, stroke: '#fff', textAlign: 'center', dy: -8 },
      animate: { enter: { duration: 300 } },
    },
  ],
});

chart.render();
```

## Keyframe Animation

G2 provides the capability to create keyframe animations that can smoothly transition between different views to show data changes. Create timing containers through `timingKeyframe`, and use `key` and `groupKey` channels to specify correspondences between elements.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'timingKeyframe',
  autoFit: true,
  direction: 'alternate',
  iterationCount: 2,
  children: [
    {
      type: 'interval',
      data: [
        { gender: 'female', height: 161.2, weight: 51.6 },
        { gender: 'female', height: 167.5, weight: 59 },
        { gender: 'female', height: 159.5, weight: 49.2 },
        { gender: 'female', height: 157, weight: 63 },
        { gender: 'female', height: 155.8, weight: 53.6 },
        { gender: 'female', height: 170, weight: 59 },
        { gender: 'man', height: 159.1, weight: 47.6 },
        { gender: 'man', height: 166, weight: 69.8 },
        { gender: 'man', height: 176.2, weight: 66.8 },
        { gender: 'man', height: 160.2, weight: 75.2 },
        { gender: 'man', height: 172.5, weight: 55.2 },
      ],
      encode: { x: 'gender', y: 'weight', color: 'gender', key: 'gender' },
      transform: [{ type: 'groupX', y: 'mean' }],
    },
    {
      type: 'point',
      data: [
        { gender: 'female', height: 161.2, weight: 51.6 },
        { gender: 'female', height: 167.5, weight: 59 },
        { gender: 'female', height: 159.5, weight: 49.2 },
        { gender: 'female', height: 157, weight: 63 },
        { gender: 'female', height: 155.8, weight: 53.6 },
        { gender: 'female', height: 170, weight: 59 },
        { gender: 'man', height: 159.1, weight: 47.6 },
        { gender: 'man', height: 166, weight: 69.8 },
        { gender: 'man', height: 176.2, weight: 66.8 },
        { gender: 'man', height: 160.2, weight: 75.2 },
        { gender: 'man', height: 172.5, weight: 55.2 },
      ],
      encode: {
        x: 'height',
        y: 'weight',
        color: 'gender',
        shape: 'point',
        groupKey: 'gender',
      },
    },
  ],
  duration: 1000,
});

chart.render();
```

## Lottie Animation

`Lottie` can greatly enrich animation description capabilities.

<img alt="lottie" src="https://gw.alipayobjects.com/zos/raptor/1668509306888/Nov-15-2022%25252018-48-05.gif" alt="lottie animation">

For specific implementation, please refer to: [lottie](/en/manual/extra-topics/plugin/lottie).

## Timing Animation

Timing animation (timingSequence) is still under development, stay tuned.
