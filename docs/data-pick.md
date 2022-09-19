# Pick

根据字段名称筛选数据。

## 快速开始

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      value: [
        { genre: 'Sports', sold: '275', show: true },
        { genre: 'Strategy', sold: '115' },
        { genre: 'Action', sold: '120', show: true },
        { genre: 'Shooter', sold: '350' },
        { genre: 'Other', sold: '150' },
      ],
      transform: [{ type: 'pick', fields: ['show'] }],
    })
    .encode('x', 'genre')
    .encode('y', 'sold');

  return chart.render().node();
})();
```

## API

| 参数     	| 说明                                 	| 类型         	| 默认值 	|
|----------	|--------------------------------------	|--------------	|--------	|
| fields 	| 根据 fields 中的字段名称筛选数据。 	| string[]	| []   	|
