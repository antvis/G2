# Pack

## Uniform

The different of following examples is only the tooltip inference.

```js
(() => {
  const view = new G2.Chart();

  view
    .point()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    })
    .adjust({ type: 'pack' })
    .encode('color', 'gender');

  return view.render().node();
})();
```

## Tooltip Inference

```js
(() => {
  const view = new G2.Chart();

  view
    .point()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    })
    .adjust({ type: 'pack' })
    .encode('x', 'height')
    .encode('y', 'weight')
    .encode('color', 'gender');

  return view.render().node();
})();
```
