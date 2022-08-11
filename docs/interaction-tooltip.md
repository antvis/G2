# Tooltip

## Basic tooltip

```js
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
    .encode('color', 'genre');

  return chart.render().node();
})();
```

## Tooltip with custom title and tooltip

```js
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
    .encode('tooltip', ['genre', 'sold'])
    .encode('title', 'type')
    .scale('tooltip', { field: ['x', 'y'] });

  return chart.render().node();
})();
```

## Tooltip with object options

```js
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
    .encode('tooltip', ['genre', 'sold'])
    .encode('title', 'type')
    .scale('tooltip', (d) => ({
      value: `${d.genre}, ${d.sold}`,
    }));

  return chart.render().node();
})();
```

## Tooltip with custom interaction options

**Tooltip with `showMarkers` and `showCrosshairs`**

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 64 });

  chart
    .line()
    .data([
      { year: '1991', value: 15468 },
      { year: '1992', value: 16100 },
      { year: '1993', value: 15900 },
      { year: '1994', value: 17409 },
      { year: '1995', value: 17000 },
      { year: '1996', value: 31056 },
      { year: '1997', value: 31982 },
      { year: '1998', value: 32040 },
      { year: '1999', value: 33233 },
    ])
    .encode('x', 'year')
    .encode('y', 'value')
    .scale('color', { guide: { title: null } });

  chart.interaction({
    type: 'tooltip',
    shared: true,
    showCrosshairs: true,
    showMarkers: true,
  });

  return chart.render().node();
})();
```

## Tooltip in View

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 64 });
  const xy = (node) => node.encode('x', 'year').encode('y', 'value');

  chart
    .data([
      { year: '1991', value: 15468 },
      { year: '1992', value: 16100 },
      { year: '1993', value: 15900 },
      { year: '1994', value: 17409 },
      { year: '1995', value: 17000 },
      { year: '1996', value: 31056 },
      { year: '1997', value: 31982 },
      { year: '1998', value: 32040 },
      { year: '1999', value: 33233 },
    ])
    .interaction({
      type: 'tooltip',
      shared: true,
      showMarkers: true,
      showCrosshairs: true,
    });

  chart
    .line()
    .call(xy)
    .scale('color', { guide: { title: null } });

  chart.point().call(xy);

  return chart.render().node();
})();
```
