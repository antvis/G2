# Keyframe

> The flashing problem should be solved in the future.

Keyframe composition provide a convent mechanism to author storytelling. It can be declared as simple as css animation, expect the object which applied animation change from a simple shape to a chart. It support following options for keyframe composition.

- _duration_ - the duration for each frame
- _iterationCount_ the play count for the animation, which can be a number of _infinite_
- _direction_ - the play direction for the animation, which can be _normal_, _reverse_, _alternate_, _reverse-alternate_
- _easing_ - the easing function for each frame

## One to One

```js
(() => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];
  const chart = new G2.Chart();
  const keyframe = chart.keyframe();

  keyframe
    .point()
    .data(data)
    .encode('key', 'genre')
    .encode('size', 50)
    .scale('x', { guide: null })
    .scale('y', { guide: null });

  keyframe
    .point()
    .data(data)
    .encode('x', 'genre')
    .encode('key', 'genre')
    .encode('color', 'orange')
    .encode('size', 50)
    .scale('x', { guide: null, padding: 0.5 })
    .scale('y', { guide: null });

  keyframe
    .interval()
    .data(data)
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('key', 'genre');

  keyframe
    .interval()
    .data(data)
    .coordinate({ type: 'transpose' })
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('key', 'genre')
    .scale('x', { guide: null })
    .scale('y', { guide: null });

  keyframe
    .interval()
    .data(data)
    .coordinate({ type: 'transpose' })
    .coordinate({ type: 'polar' })
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('key', 'genre');

  keyframe
    .interval()
    .data(data)
    .coordinate({ type: 'polar' })
    .scale('x', { guide: null })
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('key', 'genre')
    .style('radius', 10);

  keyframe
    .interval()
    .data(data)
    .coordinate({ type: 'transpose' })
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('key', 'genre');

  keyframe
    .interval()
    .paddingLeft(70)
    .data(data)
    .transform({ type: 'sortBy', fields: ['sold'], order: 'DESC' })
    .coordinate({ type: 'transpose' })
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', (d, i) => i)
    .encode('key', 'genre');

  return chart.render().node();
})();
```

## Split and Merge

```js
(async () => {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/fbe4a8c1-ce04-4ba3-912a-0b26d6965333.json',
  );
  const data = await response.json();
  const chart = new G2.Chart();

  const keyframe = chart
    .keyframe()
    .direction('alternate')
    .duration(1000)
    .iterationCount(4);

  keyframe
    .interval()
    .data(data)
    .transform({ type: 'groupX', y: 'mean' })
    .encode('x', 'gender')
    .encode('y', 'weight')
    .encode('color', 'gender')
    .encode('key', 'gender');

  keyframe
    .point()
    .data(data)
    .encode('x', 'height')
    .encode('y', 'weight')
    .encode('color', 'gender')
    .encode('groupKey', 'gender');

  return chart.render().node();
})();
```

## Among Facets

```js
(async () => {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/7fbb7084-cf34-4e7c-91b3-09e4748dc5e9.json',
  );
  const data = await response.json();
  const chart = new G2.Chart();
  const padding = (node) => node.paddingRight(86).paddingLeft(54);
  const encode = (node) =>
    node
      .encode('shape', 'smooth')
      .encode('x', (d) => new Date(d.date))
      .encode('y', 'unemployed')
      .encode('color', 'industry')
      .encode('key', 'industry');
  const utcX = (node) => node.scale('x', { utc: true });

  const keyframe = chart.keyframe().direction('alternate').iterationCount('2');

  keyframe
    .rect()
    .call(padding)
    .data(data)
    .encode('y', 'industry')
    .area()
    .class('area')
    .frame(false)
    .call(encode)
    .call(utcX)
    .scale('y', { facet: false })
    .style('fillOpacity', 1)
    .animate('enter', { type: 'scaleInY' });

  keyframe
    .area()
    .call(padding)
    .data(data)
    .class('area')
    .transform({ type: 'stackY', reverse: true })
    .call(encode)
    .call(utcX)
    .style('fillOpacity', 1);

  keyframe
    .area()
    .call(padding)
    .data(data)
    .class('area')
    .call(encode)
    .call(utcX)
    .style('fillOpacity', 0.8);

  return chart.render().node();
})();
```

## Unit Visualization

```js
(async () => {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/fbe4a8c1-ce04-4ba3-912a-0b26d6965333.json',
  );
  const data = await response.json();
  const chart = new G2.Chart();
  const key = (d) => `(${d.weight}, ${d.height})`;
  const keyframe = chart.keyframe().direction('alternate').iterationCount(4);

  keyframe
    .rect()
    .data(data)
    .encode('x', 'gender')
    .point()
    .class('point')
    .adjust({ type: 'pack' })
    .encode('color', 'gender')
    .encode('key', key);

  keyframe
    .point()
    .class('point')
    .data(data)
    .encode('x', 'height')
    .encode('y', 'weight')
    .encode('color', 'gender')
    .encode('key', key);

  return chart.render().node();
})();
```

## Duration

```js
(() => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];
  const chart = new G2.Chart();

  const keyframe = chart.keyframe().duration(2000);

  keyframe
    .interval()
    .data(data)
    .key('key')
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('key', 'genre');

  keyframe
    .interval()
    .coordinate({ type: 'polar' })
    .data(data)
    .key('key')
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('key', 'genre')
    .scale('x', { guide: null })
    .scale('y', { guide: null });

  return chart.render().node();
})();
```

## IterationCount

### Number

```js
(() => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];
  const chart = new G2.Chart();

  const keyframe = chart.keyframe().iterationCount(2);

  keyframe
    .interval()
    .data(data)
    .key('key')
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('key', 'genre');

  keyframe
    .interval()
    .coordinate({ type: 'polar' })
    .data(data)
    .key('key')
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('key', 'genre')
    .scale('x', { guide: null })
    .scale('y', { guide: null });

  return chart.render().node();
})();
```

### Infinite

```js
(() => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];
  const chart = new G2.Chart();

  const keyframe = chart.keyframe().iterationCount('infinite');

  keyframe
    .interval()
    .data(data)
    .key('key')
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('key', 'genre');

  keyframe
    .interval()
    .coordinate({ type: 'polar' })
    .data(data)
    .key('key')
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('key', 'genre')
    .scale('x', { guide: null })
    .scale('y', { guide: null });

  return chart.render().node();
})();
```

## Direction

### Reverse

```js
(() => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];
  const chart = new G2.Chart();

  const keyframe = chart.keyframe().direction('reverse');

  keyframe
    .interval()
    .data(data)
    .key('key')
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('key', 'genre');

  keyframe
    .interval()
    .coordinate({ type: 'polar' })
    .data(data)
    .key('key')
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('key', 'genre')
    .scale('x', { guide: null })
    .scale('y', { guide: null });

  return chart.render().node();
})();
```

### Alternate

```js
(() => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];
  const chart = new G2.Chart();
  const keyframe = chart.keyframe().direction('alternate').iterationCount(2);

  keyframe
    .point()
    .data(data)
    .encode('x', 'genre')
    .encode('key', 'genre')
    .encode('color', 'orange')
    .encode('size', 50)
    .scale('x', { guide: null, padding: 0.5 })
    .scale('y', { guide: null });

  keyframe
    .interval()
    .data(data)
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('key', 'genre')
    .encode('color', 'orange');

  keyframe
    .interval()
    .data(data)
    .coordinate([{ type: 'polar' }])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('key', 'genre')
    .scale('x', { guide: null })
    .scale('y', { guide: null });

  return chart.render().node();
})();
```

### Reverse Alternate

```js
(() => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];
  const chart = new G2.Chart();
  const keyframe = chart
    .keyframe()
    .direction('reverse-alternate')
    .iterationCount(2);

  keyframe
    .point()
    .data(data)
    .encode('x', 'genre')
    .encode('key', 'genre')
    .encode('color', 'orange')
    .encode('size', 50)
    .scale('x', { guide: null, padding: 0.5 })
    .scale('y', { guide: null });

  keyframe
    .interval()
    .data(data)
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('key', 'genre')
    .encode('color', 'orange');

  keyframe
    .interval()
    .data(data)
    .coordinate([{ type: 'polar' }])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('key', 'genre')
    .scale('x', { guide: null })
    .scale('y', { guide: null });

  return chart.render().node();
})();
```
