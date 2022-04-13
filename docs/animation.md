# Animation

> In some cases, the animation will crash. This problem should be solved in the future.

- <a href="#animate-options">Animate Options</a>
- <a href="#encode-entertype">Encode EnterType</a>
- <a href="#encode-enterdelay-and-enterduration">Encode EnterDelay and EnterDuration</a>
- <a href="#stackenter">StackEnter</a>
- <a href="#custom">Custom</a>

## Animate Options

```js | dom
G2.render({
  type: "interval",
  data: [
    { genre: "Sports", sold: 275 },
    { genre: "Strategy", sold: 115 },
    { genre: "Action", sold: 120 },
    { genre: "Shooter", sold: 350 },
    { genre: "Other", sold: 150 },
  ],
  encode: {
    x: "genre",
    y: "sold",
    color: "genre",
  },
  animate: {
    enter: {
      duration: 1000, //  Specify effect time by animate options.
      delay: 300,
    },
  },
});
```

```js | dom
G2.render({
  type: "interval",
  data: [
    { genre: "Sports", sold: 275 },
    { genre: "Strategy", sold: 115 },
    { genre: "Action", sold: 120 },
    { genre: "Shooter", sold: 350 },
    { genre: "Other", sold: 150 },
  ],
  encode: {
    x: "genre",
    y: "sold",
    color: "genre",
  },
  animate: {
    enter: {
      type: "fadeIn", //  Specify animation type.
      duration: 2000,
    },
  },
});
```

## Encode EnterType

```js | dom
G2.render({
  type: "interval",
  data: [
    { genre: "Sports", sold: 275 },
    { genre: "Strategy", sold: 115 },
    { genre: "Action", sold: 120 },
    { genre: "Shooter", sold: 350 },
    { genre: "Other", sold: 150 },
  ],
  scale: {
    enterType: { range: ["scaleInY", "fadeIn"] }, // Specify animation types.
  },
  encode: {
    x: "genre",
    y: "sold",
    color: "genre",
    enterType: (d) => (d.sold > 200 ? "high" : "low"),
  },
  animate: {
    enter: {
      duration: 3000,
    },
  },
});
```

```js
G2.render({
  type: "interval",
  data: [
    { genre: "Sports", sold: 275 },
    { genre: "Strategy", sold: 115 },
    { genre: "Action", sold: 120 },
    { genre: "Shooter", sold: 350 },
    { genre: "Other", sold: 150 },
  ],
  scale: {
    enterType: { type: "identity" },
  },
  encode: {
    x: "genre",
    y: "sold",
    color: "genre",
    enterType: (d) => (d.sold > 200 ? "scaleInY" : "fadeIn"),
  },
  animate: {
    enter: {
      duration: 3000,
    },
  },
});
```

## Encode EnterDelay and EnterDuration

```js | dom
G2.render({
  type: "interval",
  data: [
    { name: "event planning", startTime: 1, endTime: 4 },
    { name: "layout logistics", startTime: 3, endTime: 13 },
    { name: "select vendors", startTime: 5, endTime: 8 },
    { name: "hire venue", startTime: 9, endTime: 13 },
    { name: "hire caterer", startTime: 10, endTime: 14 },
    { name: "hire event decorators", startTime: 12, endTime: 17 },
    { name: "rehearsal", startTime: 14, endTime: 16 },
    { name: "event celebration", startTime: 17, endTime: 18 },
  ],
  coordinate: [{ type: "transpose" }],
  scale: {
    // All the intervals will show up in 10s.
    // But the animation will take more than 10s to finish.
    enterDelay: { range: [0, 10000] },
  },
  encode: {
    x: "name",
    y: ["endTime", "startTime"],
    color: "name",
    // The appear time of interval is linearly related to startTime.
    enterDelay: "startTime",
    // The duration of interval animation is linearly related to duration time.
    enterDuration: (d) => d.endTime - d.startTime,
  },
});
```

## StackEnter

Intervals show group one by group.

```js | dom
G2.render({
  type: "interval",
  data: [
    { type: "Apple", year: "2001", value: 260 },
    { type: "Orange", year: "2001", value: 100 },
    { type: "Banana", year: "2001", value: 90 },
    { type: "Apple", year: "2002", value: 210 },
    { type: "Orange", year: "2002", value: 150 },
    { type: "Banana", year: "2002", value: 30 },
  ],
  statistic: [{ type: "stackEnter", by: ["x"] }],
  encode: {
    x: "year",
    y: "value",
    color: "type",
    series: "type",
    enterDuration: 1000,
  },
});
```

Intervals shows up series by series.

```js | dom
G2.render({
  type: "interval",
  data: [
    { type: "Apple", year: "2001", value: 260 },
    { type: "Orange", year: "2001", value: 100 },
    { type: "Banana", year: "2001", value: 90 },
    { type: "Apple", year: "2002", value: 210 },
    { type: "Orange", year: "2002", value: 150 },
    { type: "Banana", year: "2002", value: 30 },
  ],
  statistic: [{ type: "stackEnter", by: ["color"] }],
  encode: {
    x: "year",
    y: "value",
    color: "type",
    series: "type",
    enterDuration: 1000,
  },
});
```

Intervals shows up series by series then group by group.

```js | dom
G2.render({
  type: "interval",
  data: [
    { type: "Apple", year: "2001", value: 260 },
    { type: "Orange", year: "2001", value: 100 },
    { type: "Banana", year: "2001", value: 90 },
    { type: "Apple", year: "2002", value: 210 },
    { type: "Orange", year: "2002", value: 150 },
    { type: "Banana", year: "2002", value: 30 },
  ],
  statistic: [{ type: "stackEnter", by: ["color", "x"] }],
  encode: {
    x: "year",
    y: "value",
    color: "type",
    series: "type",
    enterDuration: 1000,
  },
});
```

Intervals shows up group by group and then series by series.

```js | dom
G2.render({
  type: "interval",
  data: [
    { type: "Apple", year: "2001", value: 260 },
    { type: "Orange", year: "2001", value: 100 },
    { type: "Banana", year: "2001", value: 90 },
    { type: "Apple", year: "2002", value: 210 },
    { type: "Orange", year: "2002", value: 150 },
    { type: "Banana", year: "2002", value: 30 },
  ],
  statistic: [{ type: "stackEnter", by: ["x", "color"] }],
  encode: {
    x: "year",
    y: "value",
    color: "type",
    series: "type",
    enterDuration: 1000,
  },
});
```

StackEnter is useful for stack intervals.

```js | dom
G2.render({
  type: "interval",
  data: [
    { type: "Apple", year: "2001", value: 260 },
    { type: "Orange", year: "2001", value: 100 },
    { type: "Banana", year: "2001", value: 90 },
    { type: "Apple", year: "2002", value: 210 },
    { type: "Orange", year: "2002", value: 150 },
    { type: "Banana", year: "2002", value: 30 },
  ],
  statistic: [{ type: "stackEnter", by: ["color"] }],
  encode: {
    x: "year",
    y: "value",
    color: "type",
    enterDuration: 1000,
  },
});
```

## Custom

```js | dom
(() => {
  const Rotate = (options) => {
    return (shape, style, coordinate, theme) => {
      const { height, width } = shape.getBoundingClientRect();
      const { enter } = theme;
      const keyframe = [
        { transform: "rotate(-90deg)" },
        { transform: "rotate(0deg)" },
      ];
      shape.setOrigin([width / 2, height / 2]);
      return shape.animate(keyframe, { ...enter, ...style, ...options });
    };
  };
  return G2.render({
    type: "interval",
    data: [
      { genre: "Sports", sold: 275 },
      { genre: "Strategy", sold: 115 },
      { genre: "Action", sold: 120 },
      { genre: "Shooter", sold: 350 },
      { genre: "Other", sold: 150 },
    ],
    scale: {
      enterType: { type: "identity" },
    },
    encode: {
      x: "genre",
      y: "sold",
      color: "genre",
    },
    animate: {
      enter: {
        type: Rotate, // Inline custom
        duration: 3000,
      },
    },
  });
})();
```

```js
(() => {
  const Rotate = (options) => {
    return (shape, style, coordinate, theme) => {
      const { height, width } = shape.getBoundingClientRect();
      const { enter } = theme;
      const keyframes = [
        { transform: "rotate(-90deg)" },
        { transform: "rotate(0deg)" },
      ];
      shape.setOrigin([width / 2, height / 2]);
      return shape.animate(keyframes, { ...enter, ...style, ...options });
    };
  };

  const context = {
    // Global custom
    library: Object.assign(G2.createLibrary(), { "animation.rotate": Rotate }),
  };

  return G2.render(
    {
      type: "interval",
      data: [
        { genre: "Sports", sold: 275 },
        { genre: "Strategy", sold: 115 },
        { genre: "Action", sold: 120 },
        { genre: "Shooter", sold: 350 },
        { genre: "Other", sold: 150 },
      ],
      scale: {
        enterType: { type: "identity" },
      },
      encode: {
        x: "genre",
        y: "sold",
        color: "genre",
      },
      animate: {
        enter: {
          type: "rotate",
          duration: 3000,
        },
      },
    },
    context
  );
})();
```
