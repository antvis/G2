# Pack

## Uniform

The different of following examples is only the tooltip inference.

```js | dom
G2.render({
  type: 'point',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    },
  ],
  encode: {
    color: 'gender',
  },
  adjust: { type: 'pack' },
});
```

## Tooltip Inference

```js | dom
G2.render({
  type: 'point',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    },
  ],
  encode: {
    color: 'gender',
    x: 'height',
    y: 'weight',
  },
  adjust: { type: 'pack' },
});
```
