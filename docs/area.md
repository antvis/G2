# Area

## Gradient Area

```js
G2.render({
  type: 'area',
  data: [
    { year: '1991', value: 0 },
    { year: '1992', value: 632 },
    { year: '1993', value: 432 },
    { year: '1994', value: 1941 },
    { year: '1995', value: 1532 },
    { year: '1996', value: 15588 },
    { year: '1997', value: 16514 },
    { year: '1998', value: 16572 },
    { year: '1999', value: 17765 },
  ],
  encode: {
    x: 'year',
    y: 'value',
    color: 'value',
    shape: 'smoothArea',
    series: 'a',
  },
  style: {
    gradient: true,
  },
});
```
