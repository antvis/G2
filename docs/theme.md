# Theme

G2 默认内置两套主题: `light` 和 `dark`, 通过以下方式可以进行切换主题。

```js | select "pin: false; label:'Theme'; options: { labels: ['light', 'dark'], values: ['light', 'dark'] }"
theme = 'light';
```

```js | dom "pin: false"
(() => {
  const chart = new G2.Chart();
  chart.theme({ type: theme });

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
    .encode('y', 'sold');

  return chart.render().node();
})();
```

```js
(() => {
  const chart = new G2.Chart();
  chart.theme({ type: theme });

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
    })
    .transform({ type: 'groupX', y: 'mean' })
    .encode('x', (d) => new Date(d.date).getFullYear())
    .encode('y', 'price')
    .encode('color', 'symbol')
    .label({
      text: 'price',
      fontSize: 10,
      transform: [{ type: 'dodgeY' }],
    });

  return chart.render().node();
})();
```

```js
(() => {
  const chart = new G2.Chart({
    height: 640,
  });
  chart.theme({ type: theme });

  chart
    .cell()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json',
      transform: [
        {
          type: 'sortBy',
          fields: ['y'],
        },
      ],
    })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('color', (d) => `${d.index}`)
    .style('stroke', 'black')
    .style('lineWidth', 1)
    .animate('enter', { type: null });

  return chart.render().node();
})();
```

<!-- Change canvas background color. -->

```js | dom "pin: false"
((theme) => {
  setTimeout(() => {
    document
      .querySelectorAll('canvas')
      .forEach(
        (dom) =>
          (dom.style.backgroundColor =
            theme === 'dark' ? '#141414' : 'transparent'),
      );
  }, 0);
  return '';
})(theme);
```
