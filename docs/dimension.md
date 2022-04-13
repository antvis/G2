# Dimension

- <a href="#size">Size</a>
- <a href="#padding">Padding</a>

## Size

The default width equals to 640, default height equals to 480.

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
  },
});
```

```js | dom
G2.render({
  type: "interval",
  width: 800, // Override default width.
  height: 300, // Override default height.
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
  },
});
```

## Padding

The padding will be inferred by components(e.g. axis, legend) if is not specified explicitly.

```js | dom
G2.render({
  type: "interval",
  paddingTop: 100,
  paddingRight: 100,
  paddingBottom: 100,
  paddingLeft: 100,
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
  },
});
```
