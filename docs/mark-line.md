# Line

## Basic Line

```js
(() => {
  const chart = new G2.Chart({
    paddingLeft: 60,
  });

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
    .encode('y', 'value');

  return chart.render().node();
})();
```

## Smooth Line

**Smooth line with default alpha**

```js
(() => {
  const chart = new G2.Chart({
    paddingLeft: 60,
  });

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
    .encode('shape', 'smooth');

  return chart.render().node();
})();
```

## Alpha for Smooth

```js
(() => {
  const chart = new G2.Chart({
    paddingLeft: 60,
  });
  const alpha = ({ alphas = [] }) => {
    if (!Array.isArray(alphas)) return (context) => context;
    return (data) => {
      return alphas.flatMap((alpha) =>
        data.map((d) => Object.assign({}, d, { alpha })),
      );
    };
  };

  chart
    .line()
    .data({
      value: [
        { year: '1991', value: 15468 },
        { year: '1992', value: 16100 },
        { year: '1993', value: 15900 },
        { year: '1994', value: 17409 },
        { year: '1995', value: 17000 },
        { year: '1996', value: 31056 },
        { year: '1997', value: 31982 },
        { year: '1998', value: 32040 },
        { year: '1999', value: 33233 },
      ],
      transform: [{ type: alpha, alphas: [0, 0.25, 0.5, 0.75, 1] }],
    })
    .encode('x', 'year')
    .encode('y', 'value')
    .encode('color', (d) => `${d.alpha}`)
    .encode('shape', {
      type: 'transform',
      value: (d) => ({
        type: 'smooth',
        alpha: d.alpha,
      }),
    });

  return chart.render().node();
})();
```

## Gradient Line

```js
(() => {
  const chart = new G2.Chart({
    paddingLeft: 60,
  });

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
    .encode('color', 'value')
    .encode('shape', 'smooth')
    .encode('series', 'a')
    .style('gradient', true);

  return chart.render().node();
})();
```

## Series Line

**Series channel to group line.**

```js
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data([
      { month: 'Jan', city: 'Tokyo', temperature: 7 },
      { month: 'Jan', city: 'London', temperature: 3.9 },
      { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
      { month: 'Feb', city: 'London', temperature: 4.2 },
      { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
      { month: 'Mar', city: 'London', temperature: 5.7 },
      { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
      { month: 'Apr', city: 'London', temperature: 8.5 },
      { month: 'May', city: 'Tokyo', temperature: 18.4 },
      { month: 'May', city: 'London', temperature: 11.9 },
      { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
      { month: 'Jun', city: 'London', temperature: 15.2 },
      { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
      { month: 'Jul', city: 'London', temperature: 17 },
      { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
      { month: 'Aug', city: 'London', temperature: 16.6 },
      { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
      { month: 'Sep', city: 'London', temperature: 14.2 },
      { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
      { month: 'Oct', city: 'London', temperature: 10.3 },
      { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
      { month: 'Nov', city: 'London', temperature: 6.6 },
      { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
      { month: 'Dec', city: 'London', temperature: 4.8 },
    ])
    .encode('x', 'month')
    .encode('y', 'temperature')
    .encode('series', 'city');

  return chart.render().node();
})();
```

**Color channel to group line.**

```js
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data([
      { month: 'Jan', city: 'Tokyo', temperature: 7 },
      { month: 'Jan', city: 'London', temperature: 3.9 },
      { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
      { month: 'Feb', city: 'London', temperature: 4.2 },
      { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
      { month: 'Mar', city: 'London', temperature: 5.7 },
      { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
      { month: 'Apr', city: 'London', temperature: 8.5 },
      { month: 'May', city: 'Tokyo', temperature: 18.4 },
      { month: 'May', city: 'London', temperature: 11.9 },
      { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
      { month: 'Jun', city: 'London', temperature: 15.2 },
      { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
      { month: 'Jul', city: 'London', temperature: 17 },
      { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
      { month: 'Aug', city: 'London', temperature: 16.6 },
      { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
      { month: 'Sep', city: 'London', temperature: 14.2 },
      { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
      { month: 'Oct', city: 'London', temperature: 10.3 },
      { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
      { month: 'Nov', city: 'London', temperature: 6.6 },
      { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
      { month: 'Dec', city: 'London', temperature: 4.8 },
    ])
    .encode('x', 'month')
    .encode('y', 'temperature')
    .encode('color', 'city');

  return chart.render().node();
})();
```

## Temporal Channel

```js
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/ab55d10f-24da-465a-9eba-87ac4b7a83ec.json',
    })
    .encode('x', (d) => new Date(d.Date))
    .encode('y', 'Close');

  return chart.render().node();
})();
```

## Size Channel

```js
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data([
      { month: 'Jan', city: 'Tokyo', temperature: 7 },
      { month: 'Jan', city: 'London', temperature: 3.9 },
      { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
      { month: 'Feb', city: 'London', temperature: 4.2 },
      { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
      { month: 'Mar', city: 'London', temperature: 5.7 },
      { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
      { month: 'Apr', city: 'London', temperature: 8.5 },
      { month: 'May', city: 'Tokyo', temperature: 18.4 },
      { month: 'May', city: 'London', temperature: 11.9 },
      { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
      { month: 'Jun', city: 'London', temperature: 15.2 },
      { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
      { month: 'Jul', city: 'London', temperature: 17 },
      { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
      { month: 'Aug', city: 'London', temperature: 16.6 },
      { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
      { month: 'Sep', city: 'London', temperature: 14.2 },
      { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
      { month: 'Oct', city: 'London', temperature: 10.3 },
      { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
      { month: 'Nov', city: 'London', temperature: 6.6 },
      { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
      { month: 'Dec', city: 'London', temperature: 4.8 },
    ])
    .encode('x', 'month')
    .encode('y', 'temperature')
    .encode('color', 'city')
    .encode('size', 'city');

  return chart.render().node();
})();
```

## Parallel Line

```js
(() => {
  const chart = new G2.Chart({
    width: 720,
    paddingLeft: 60,
  });

  chart.coordinate({ type: 'parallel' });

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/96cd81b5-54a4-4fe8-b778-502b2114df58.json',
      callback: (d) => Object.assign(d, { year: new Date(d.year) }),
      transform: [
        {
          type: 'filterBy',
          // Filter data with defined Horsepower and Miles_per_Gallon.
          fields: ['Horsepower', 'Miles_per_Gallon'],
        },
      ],
    })
    .encode('position', [
      'Cylinders',
      'Displacement',
      'Weight_in_lbs',
      'Horsepower',
      'Acceleration',
      'Miles_per_Gallon',
      'Year',
    ])
    .encode('color', 'Origin')
    .encode('size', 1.01)
    .style('strokeOpacity', 0.3)
    // zIndex of mark is default to 0.
    // zIndex of component is default to -1.
    // Set zIndex to 1 for component to draw above marks.
    .scale('position', { nice: true, guide: { zIndex: 1 } })
    .scale('position1', { nice: true, guide: { zIndex: 1 } })
    .scale('position2', { nice: true, guide: { zIndex: 1 } })
    .scale('position3', { nice: true, guide: { zIndex: 1 } })
    .scale('position4', { nice: true, guide: { zIndex: 1 } })
    .scale('position5', { nice: true, guide: { zIndex: 1 } });

  return chart.render().node();
})();
```

## Polar line

```js
(() => {
  const chart = new G2.Chart();
  const xycolor = (node) => {
    node.encode('x', 'item').encode('y', 'score').encode('color', 'user');
  };

  chart
    .data([
      { item: 'Design', user: 'a', score: 70 },
      { item: 'Design', user: 'b', score: 30 },
      { item: 'Development', user: 'a', score: 60 },
      { item: 'Development', user: 'b', score: 70 },
      { item: 'Marketing', user: 'a', score: 50 },
      { item: 'Marketing', user: 'b', score: 60 },
      { item: 'Users', user: 'a', score: 40 },
      { item: 'Users', user: 'b', score: 50 },
      { item: 'Test', user: 'a', score: 60 },
      { item: 'Test', user: 'b', score: 70 },
      { item: 'Language', user: 'a', score: 70 },
      { item: 'Language', user: 'b', score: 50 },
      { item: 'Technology', user: 'a', score: 50 },
      { item: 'Technology', user: 'b', score: 40 },
      { item: 'Support', user: 'a', score: 30 },
      { item: 'Support', user: 'b', score: 40 },
      { item: 'Sales', user: 'a', score: 60 },
      { item: 'Sales', user: 'b', score: 40 },
      { item: 'UX', user: 'a', score: 50 },
      { item: 'UX', user: 'b', score: 60 },
    ])
    .coordinate({ type: 'polar' })
    .interaction({
      type: 'tooltip',
      shared: true,
      showCrosshairs: true,
      crosshairs: { type: 'xy' },
    });

  chart
    .line()
    .call(xycolor)
    .scale('x', { padding: 0.5, align: 0 })
    .scale('y', { domain: [0, 80] })
    .scale('color', { guide: { title: null } });

  chart.point().call(xycolor);

  return chart.render().node();
})();
```

## Parallel+Polar Line

```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'parallel' }).coordinate({ type: 'polar' });

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/96cd81b5-54a4-4fe8-b778-502b2114df58.json',
      callback: (d) => Object.assign(d, { year: new Date(d.year) }),
      transform: [
        {
          type: 'filterBy',
          // Filter data with defined Horsepower and Miles_per_Gallon.
          fields: ['Horsepower', 'Miles_per_Gallon'],
        },
      ],
    })
    .encode('position', [
      'Cylinders',
      'Displacement',
      'Weight_in_lbs',
      'Horsepower',
      'Acceleration',
      'Miles_per_Gallon',
      'Year',
      'Cylinders', // Close the line
    ])
    .encode('color', 'Origin')
    .encode('size', 1.01)
    .style('strokeOpacity', 0.3)
    // zIndex of mark is default to 0.
    // zIndex of component is default to -1.
    // Set zIndex to 1 for component to draw above marks.
    .scale('position', { nice: true, guide: { zIndex: 1 } })
    .scale('position1', { nice: true, guide: { zIndex: 1 } })
    .scale('position2', { nice: true, guide: { zIndex: 1 } })
    .scale('position3', { nice: true, guide: { zIndex: 1 } })
    .scale('position4', { nice: true, guide: { zIndex: 1 } })
    .scale('position5', { nice: true, guide: { zIndex: 1 } });

  return chart.render().node();
})();
```
