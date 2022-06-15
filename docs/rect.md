# Facet

## Row Facet

> Add insert options for plot area to avoid outside circle for scatter?

```js | dom
G2.render({
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/a0f96c54-d1fa-46c8-b6ef-548e2f700a6d.json',
    },
  ],
  type: 'rect',
  width: 928,
  height: 240,
  paddingLeft: 50,
  paddingBottom: 50,
  encode: {
    x: 'series',
  },
  children: [
    {
      type: 'point',
      encode: {
        x: 'x',
        y: 'y',
        shape: 'hollowPoint',
      },
    },
  ],
});
```

## Col Facet

```js | dom
G2.render({
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/90ec29b1-c939-434e-8bbb-ce5fa27c62a7.json',
    },
  ],
  type: 'rect',
  height: 800,
  encode: {
    y: 'site',
  },
  paddingLeft: 130,
  paddingRight: 120,
  paddingBottom: 60,
  children: [
    {
      type: 'point',
      scale: {
        color: { type: 'ordinal' },
      },
      encode: {
        x: 'yield',
        y: 'variety',
        color: 'year',
        shape: 'hollowPoint',
      },
    },
  ],
});
```

## Rect Facet

```js | dom
G2.render({
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/3346929c-d7f4-4a81-8edc-c4c6d028ab96.json',
    },
  ],
  type: 'rect',
  paddingRight: 80,
  paddingBottom: 50,
  paddingLeft: 50,
  height: 600,
  encode: {
    x: 'sex',
    y: 'species',
  },
  children: [
    {
      type: 'point',
      facet: false, // Do not filter data.
      frame: false, // Do not draw frame for this view.
      encode: {
        x: 'culmen_depth_mm',
        y: 'culmen_length_mm',
        size: 2,
      },
      style: {
        fill: '#ddd',
      },
    },
    {
      type: 'point',
      encode: {
        x: 'culmen_depth_mm',
        y: 'culmen_length_mm',
        shape: 'hollowPoint',
        color: 'island',
      },
    },
  ],
});
```

## Calendar Interval

```js
(() => {
  // Mock Data.
  const days = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'];
  const mockData = () => {
    const names = ['A', 'B', 'C'];
    const week = (date) => {
      const currentDate = date.getDate();
      const newDate = new Date(date);
      const firstDay = new Date(newDate.setDate(1)).getDay();
      return Math.ceil((currentDate + firstDay) / 7);
    };
    const day = (date) => date.getDay();
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date(2022, 5, i + 1);
      return names.map((name) => ({
        activity: name,
        value: Math.random(),
        week: `${week(date)}`,
        day: days[day(date)],
      }));
    }).flat(Infinity);
  };

  // Render Chart.
  return G2.render({
    type: 'rect',
    data: mockData(),
    encode: { x: 'day', y: 'week' },
    scale: {
      x: { domain: days },
    },
    children: [
      {
        type: 'interval',
        encode: {
          x: 'activity',
          y: 'value',
          color: 'activity',
        },
      },
    ],
  });
})();
```

## Calendar Pie

```js
(() => {
  // Mock Data.
  const days = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'];
  const mockData = () => {
    const names = ['Eat', 'Play', 'Sleep'];
    const week = (date) => {
      const currentDate = date.getDate();
      const newDate = new Date(date);
      const firstDay = new Date(newDate.setDate(1)).getDay();
      return Math.ceil((currentDate + firstDay) / 7);
    };
    const day = (date) => date.getDay();
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date(2022, 5, i + 1);
      return names.map((name) => ({
        activity: name,
        value: Math.random(),
        week: `${week(date)}`,
        day: days[day(date)],
      }));
    }).flat(Infinity);
  };

  // Render Chart.
  return G2.render({
    type: 'rect',
    data: mockData(),
    encode: { x: 'day', y: 'week' },
    scale: {
      x: { domain: days },
      color: { guide: { position: 'right', size: 50 } },
    },
    paddingRight: 100,
    title: 'The distribution of time for June 2022',
    children: [
      {
        type: 'interval',
        coordinate: [
          { type: 'transpose' },
          { type: 'polar', outerRadius: 0.9 },
        ],
        scale: {
          // Do not sync y scales among facets.
          y: { facet: false },
        },
        encode: {
          y: 'value',
          color: 'activity',
        },
      },
    ],
  });
})();
```

## Facet Callback

```js | dom
G2.render({
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/3346929c-d7f4-4a81-8edc-c4c6d028ab96.json',
    },
  ],
  type: 'rect',
  paddingRight: 80,
  paddingBottom: 50,
  paddingLeft: 50,
  height: 600,
  encode: {
    x: 'sex',
    y: 'species',
  },
  children: (facet) => {
    const { columnIndex, rowIndex } = facet;
    return columnIndex !== rowIndex
      ? {
          type: 'point',
          encode: {
            x: 'culmen_depth_mm',
            y: 'culmen_length_mm',
            shape: 'hollowPoint',
          },
        }
      : {
          type: 'point',
          encode: {
            x: 'culmen_depth_mm',
            y: 'culmen_length_mm',
            shape: 'hollowPoint',
            color: 'red',
          },
        };
  },
});
```
