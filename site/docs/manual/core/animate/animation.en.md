---
title: 动画（Animate）
order: 6.8
---

Animate in G2 is an important part of visualization and can improve the expressiveness of visualization. Animate can be declared at the level of mark:

```js
({
  type: 'interval',
  animate: {
    enter: {
      type: 'scaleInX',
      duration: 100,
      delay: 10,
    },
    update: {
      type: 'morphing',
    },
  },
});
```

```js
// API
// First way
chart
  .interval()
  .animate('enter', { type: 'scaleInX', duration: 100, delay: 10 })
  .animate('update', { type: 'morphing' });

// Second way
chart.interval().animate({
  enter: {
    type: 'scaleInX',
    duration: 100,
    delay: 10,
  },
  update: {
    type: 'morphing',
  },
});
```

## Animate Properties

Mark specifies animation properties through `mark.animate`, there are three parts of animation that can be specified:

- **enter**- New graphics
- **update**- Updated graphics
- **exit**- deleted graphics

Each part of the animation has the following properties:

- **type**
- **duration**
- **delay**
- **easing**

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .animate('enter', {
      type: 'scaleInY', // Specify the type of entry animation
      duration: 1000, // Specify the execution time of the entrance animation
    });

  chart.render();

  return chart.getContainer();
})();
```

## Animation coding

Animation properties can be used as a channel in G2, and can also encode data. For example, in the gantt chart below, the appearance and duration of each bar are linearly related to the data.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .coordinate({ transform: [{ type: 'transpose' }] })
    .data([
      { name: 'event planning', startTime: 1, endTime: 4 },
      { name: 'layout logistics', startTime: 3, endTime: 13 },
      { name: 'select vendors', startTime: 5, endTime: 8 },
      { name: 'hire venue', startTime: 9, endTime: 13 },
      { name: 'hire caterer', startTime: 10, endTime: 14 },
      { name: 'hire event decorators', startTime: 12, endTime: 17 },
      { name: 'rehearsal', startTime: 14, endTime: 16 },
      { name: 'event celebration', startTime: 17, endTime: 18 },
    ])
    .encode('x', 'name')
    .encode('y', ['endTime', 'startTime'])
    .encode('color', 'name')
    .encode('enterDuration', (d) => d.endTime - d.startTime) // Calculate the duration and encode
    .encode('enterDelay', 'startTime'); // Specify the time of occurrence and encode

  chart.render();

  return chart.getContainer();
})();
```

## Group animation

G2 also provides the StackEnter mark transform to implement group animation. This mark transform will first group graphics, and then stack their appearance time and duration in space to achieve the effect of appearing sequentially.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { type: 'Apple', year: '2001', value: 260 },
      { type: 'Orange', year: '2001', value: 100 },
      { type: 'Banana', year: '2001', value: 90 },
      { type: 'Apple', year: '2002', value: 210 },
      { type: 'Orange', year: '2002', value: 150 },
      { type: 'Banana', year: '2002', value: 30 },
    ])
    //Group by color and appear in order
    .transform({ type: 'stackEnter', groupBy: 'color' })
    .encode('x', 'year')
    .encode('y', 'value')
    .encode('color', 'type')
    .encode('series', 'type')
    .encode('enterDuration', 1000); // The duration of each group is 1000

  chart.render();

  return chart.getContainer();
})();
```

## Keyframe Animation

The animations above are all excessive animations and do not involve data updates. G2 also provides the ability to create keyframe animations. use `chart.timingKeyframe` to create a time container that holds a series of views and applies smooth transitions to related graphical elements within those views. The corresponding relationship is specified by two channels, **key** and **groupKey**.

```js | ob
(async () => {
  const data = await fetch(
    'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  ).then((res) => res.json());

  const chart = new G2.Chart();

  // Refer to the description of css animation
  const keyframe = chart
    .timingKeyframe() // Create container
    .attr('iterationCount', 2) // Number of iterations
    .attr('direction', 'alternate') // Direction
    .attr('duration', 1000); // Duration

  keyframe
    .interval()
    .transform({ type: 'groupX', y: 'mean' })
    .data(data)
    .encode('x', 'gender')
    .encode('y', 'weight')
    .encode('color', 'gender')
    .encode('key', 'gender'); // Specify key

  keyframe
    .point()
    .data(data)
    .encode('x', 'height')
    .encode('y', 'weight')
    .encode('color', 'gender')
    .encode('shape', 'point')
    .encode('groupKey', 'gender'); // Specify groupKey

  chart.render();

  return chart.getContainer();
})();
```

## Time Series Animation

**TimingSequence** is still under development, please stay tuned.
