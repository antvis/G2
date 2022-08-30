# Unit Visualization

## Row

```js
(() => {
  const chart = new G2.Chart();

  const rect = chart
    .rect()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/97d0b32e-97f7-49dc-b8a1-9e41fa8597a7.json',
      transform: [
        {
          type: 'sortBy',
          fields: ['survived'],
          order: 'DESC',
        },
      ],
    })
    .encode('x', 'pclass');

  rect
    .point()
    .adjust({ type: 'pack' })
    .encode('color', 'survived')
    .scale('color', {
      guide: { formatter: (d) => (d === '1' ? 'Yes' : 'No') },
    })
    .animate('enter', { type: null });

  return chart.render().node();
})();
```

## SharedData Row

```js
(() => {
  const chart = new G2.Chart();

  const rect = chart
    .rect()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/97d0b32e-97f7-49dc-b8a1-9e41fa8597a7.json',
      transform: [
        {
          type: 'sortBy',
          fields: ['survived'],
          order: 'DESC',
        },
      ],
    })
    .shareData(true)
    .encode('x', 'pclass');

  rect
    .point()
    .adjust({ type: 'pack' })
    .encode('color', 'survived')
    .scale('color', {
      guide: { formatter: (d) => (d === '1' ? 'Yes' : 'No') },
    });

  return chart.render().node();
})();
```

## SharedSize Row

```js
(() => {
  const chart = new G2.Chart();

  const rect = chart
    .rect()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/97d0b32e-97f7-49dc-b8a1-9e41fa8597a7.json',
      transform: [
        {
          type: 'sortBy',
          fields: ['survived'],
          order: 'DESC',
        },
      ],
    })
    .shareSize(true)
    .encode('x', 'pclass');

  rect
    .point()
    .adjust({ type: 'pack' })
    .encode('color', 'survived')
    .scale('color', {
      guide: { formatter: (d) => (d === '1' ? 'Yes' : 'No') },
    });

  return chart.render().node();
})();
```

## Rect

```js
(() => {
  const chart = new G2.Chart({ paddingRight: 80 });

  const rect = chart
    .rect()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/1f3410d2-5048-4d87-a1c2-4abb39da8915.json',
      transform: [
        {
          type: 'sortBy',
          fields: ['Survived'],
          order: 'DESC',
        },
      ],
    })
    .encode('x', 'Class')
    .encode('y', 'Sex');

  rect.point().adjust({ type: 'pack' }).encode('color', 'Survived');

  return chart.render().node();
})();
```

## SharedData Rect

```js
(() => {
  const chart = new G2.Chart({ paddingRight: 80 });

  const rect = chart
    .rect()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/1f3410d2-5048-4d87-a1c2-4abb39da8915.json',
      transform: [
        {
          type: 'sortBy',
          fields: ['Survived'],
          order: 'DESC',
        },
      ],
    })
    .shareData(true)
    .encode('x', 'Class')
    .encode('y', 'Sex');

  rect.point().adjust({ type: 'pack' }).encode('color', 'Survived');

  return chart.render().node();
})();
```

## Nested

```js
(() => {
  const chart = new G2.Chart({
    paddingRight: 50,
    paddingBottom: 50,
    paddingLeft: 80,
  });

  const r1 = chart
    .rect()
    .encode('y', 'pclass')
    .shareSize(true)
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/97d0b32e-97f7-49dc-b8a1-9e41fa8597a7.json',
      transform: [
        {
          type: 'sortBy',
          fields: ['survived', 'sex'],
        },
      ],
    });

  const r2 = r1
    .rect()
    .encode('x', 'survived')
    .scale('x', {
      guide: {
        formatter: (d) => (d === '1' ? 'Yes' : 'No'),
        position: 'bottom',
      },
    })
    .scale('y', { guide: null })
    .shareSize(true);

  const r3 = r2
    .rect()
    .encode('y', 'sex')
    .scale('x', { guide: null })
    .scale('y', { guide: { position: 'left' } })
    .shareSize(true);

  r3.point()
    .adjust({ type: 'pack' })
    .encode('color', 'survived')
    .scale('color', {
      guide: { formatter: (d) => (d === '1' ? 'Yes' : 'No') },
    });

  return chart.render().node();
})();
```
