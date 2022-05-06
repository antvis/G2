# Unit Visualization

- <a href="#row">Row</a>
- <a href="#sharedData-row">SharedData Row</a>
- <a href="#sharedSize-row">SharedSize Row</a>
- <a href="#rect">Rect</a>
- <a href="#sharedData-rect">SharedData Rect</a>
- <a href="#nested">Nested</a>

## Row

```js | dom
G2.render({
  type: 'rect',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/97d0b32e-97f7-49dc-b8a1-9e41fa8597a7.json',
    },
    {
      type: 'sortBy',
      fields: ['survived'],
      order: 'DESC',
    },
  ],
  paddingRight: 50,
  encode: {
    x: 'pclass',
  },
  children: [
    {
      type: 'point',
      scale: {
        color: { guide: { formatter: (d) => (d === '1' ? 'Yes' : 'No') } },
      },
      encode: {
        color: 'survived',
      },
      adjust: { type: 'pack' },
    },
  ],
});
```

## SharedData Row

```js | dom
G2.render({
  type: 'rect',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/97d0b32e-97f7-49dc-b8a1-9e41fa8597a7.json',
    },
    {
      type: 'sortBy',
      fields: ['survived'],
      order: 'DESC',
    },
  ],
  paddingRight: 50,
  shareData: true, // Share data domain.
  encode: {
    x: 'pclass',
  },
  children: [
    {
      type: 'point',
      scale: {
        color: { guide: { formatter: (d) => (d === '1' ? 'Yes' : 'No') } },
      },
      encode: {
        color: 'survived',
      },
      adjust: { type: 'pack' },
    },
  ],
});
```

## SharedSize Row

```js | dom
G2.render({
  type: 'rect',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/97d0b32e-97f7-49dc-b8a1-9e41fa8597a7.json',
    },
    {
      type: 'sortBy',
      fields: ['survived'],
      order: 'DESC',
    },
  ],
  paddingRight: 50,
  encode: {
    x: 'pclass',
  },
  shareSize: true, // Share space domain.
  children: [
    {
      type: 'point',
      scale: {
        color: { guide: { formatter: (d) => (d === '1' ? 'Yes' : 'No') } },
      },
      encode: {
        color: 'survived',
      },
      adjust: { type: 'pack' },
    },
  ],
});
```

## Rect

```js | dom
G2.render({
  type: 'rect',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/1f3410d2-5048-4d87-a1c2-4abb39da8915.json',
    },
    {
      type: 'sortBy',
      fields: ['Survived'],
      order: 'DESC',
    },
  ],
  paddingRight: 50,
  encode: {
    x: 'Class',
    y: 'Sex',
  },
  children: [
    {
      type: 'point',
      encode: {
        color: 'Survived',
      },
      adjust: { type: 'pack' },
    },
  ],
});
```

## SharedData Rect

```js | dom
G2.render({
  type: 'rect',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/1f3410d2-5048-4d87-a1c2-4abb39da8915.json',
    },
    {
      type: 'sortBy',
      fields: ['Survived'],
      order: 'DESC',
    },
  ],
  paddingRight: 50,
  shareData: true,
  encode: {
    x: 'Class',
    y: 'Sex',
  },
  children: [
    {
      type: 'point',
      encode: {
        color: 'Survived',
      },
      adjust: { type: 'pack' },
    },
  ],
});
```

## Nested

```js | dom
G2.render({
  type: 'rect',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/97d0b32e-97f7-49dc-b8a1-9e41fa8597a7.json',
    },
    {
      type: 'sortBy',
      fields: ['survived', 'sex'],
    },
  ],
  paddingRight: 50,
  paddingBottom: 50,
  paddingLeft: 50,
  encode: {
    y: 'pclass',
  },
  shareSize: true,
  children: [
    {
      type: 'rect',
      encode: { x: 'survived' },
      scale: {
        x: {
          guide: {
            formatter: (d) => (d === '1' ? 'Yes' : 'No'),
            position: 'bottom',
          },
        },
        y: { guide: null },
      },
      shareSize: true,
      children: [
        {
          type: 'rect',
          encode: { y: 'sex' },
          shareSize: true,
          scale: {
            y: {
              guide: ({ columnValue }) =>
                columnValue === '0' ? { position: 'left' } : null,
            },
            x: { guide: null },
          },
          children: [
            {
              type: 'point',
              scale: {
                color: {
                  guide: { formatter: (d) => (d === '1' ? 'Yes' : 'No') },
                },
              },
              encode: {
                color: 'survived',
              },
              adjust: { type: 'pack' },
            },
          ],
        },
      ],
    },
  ],
});
```
