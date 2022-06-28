# Group

## GroupX

```js
G2.render({
  type: 'interval',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
    },
    {
      type: 'groupX',
      y: 'mean',
    },
  ],
  paddingLeft: 60,
  encode: {
    x: 'clarity',
    y: 'price',
    color: 'clarity',
  },
});
```
