# Square

## Row Square

```js
(() => {
  const chart = new G2.Chart({
    width: 928,
    height: 240,
    paddingLeft: 50,
    paddingBottom: 50,
  });

  const square = chart
    .square()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/a0f96c54-d1fa-46c8-b6ef-548e2f700a6d.json',
    })
    .encode('x', 'series');

  square.point().encode('x', 'x').encode('y', 'y').encode('shape', 'hollow');

  return chart.render().node();
})();
```

## Col Square

```js
(() => {
  const chart = new G2.Chart({
    height: 800,
    paddingLeft: 130,
    paddingRight: 120,
    paddingBottom: 60,
  });

  const square = chart
    .square()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/90ec29b1-c939-434e-8bbb-ce5fa27c62a7.json',
    })
    .encode('y', 'site');

  square
    .point()
    .encode('x', 'yield')
    .encode('y', 'variety')
    .encode('color', 'year')
    .encode('shape', 'hollow')
    .scale('color', { type: 'ordinal' });

  return chart.render().node();
})();
```

## Both Square

```js
(() => {
  const chart = new G2.Chart({
    paddingRight: 80,
    paddingBottom: 50,
    paddingLeft: 50,
    height: 600,
  });
  const xy = (node) => {
    node.encode('x', 'culmen_depth_mm').encode('y', 'culmen_length_mm');
  };

  const square = chart
    .square()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/3346929c-d7f4-4a81-8edc-c4c6d028ab96.json',
    })
    .encode('x', 'sex')
    .encode('y', 'species');

  square
    .point()
    .facet(false)
    .frame(false)
    .call(xy)
    .encode('size', 2)
    .style('fill', '#ddd');

  square
    .point()
    .call(xy)
    .encode('shape', 'hollow')
    .encode('color', 'island');

  return chart.render().node();
})();
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
  const chart = new G2.Chart();

  const square = chart
    .square()
    .data(mockData())
    .encode('x', 'day')
    .encode('y', 'week')
    .scale('x', { domain: days });

  square
    .interval()
    .encode('x', 'activity')
    .encode('y', 'value')
    .encode('color', 'activity');

  return chart.render().node();
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
  const chart = new G2.Chart({
    paddingRight: 100,
  });

  const square = chart
    .square()
    .data(mockData())
    .encode('x', 'day')
    .encode('y', 'week')
    .scale('x', { domain: days })
    .scale('color', { guide: { position: 'right', size: 50 } });

  square
    .view()
    .coordinate({ type: 'transpose' })
    .coordinate({ type: 'polar', outerRadius: 0.9 })
    .interval()
    .encode('y', 'value')
    .encode('color', 'activity')
    .scale('y', { facet: false });

  return chart.render().node();
})();
```

<!-- ## Facet Callback -->

<!-- G2.render({
  transform: [
    {
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/3346929c-d7f4-4a81-8edc-c4c6d028ab96.json',
    },
  ],
  type: 'square',
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
}); -->
