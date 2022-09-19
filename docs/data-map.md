# Map

针对数组类型数据，可以传入 callback 对数据进行预处理。

## 快速开始

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      value: [
        { genre: 'Sports', sold: '275' },
        { genre: 'Strategy', sold: '115' },
        { genre: 'Action', sold: '120' },
        { genre: 'Shooter', sold: '350' },
        { genre: 'Other', sold: '150' },
      ],
      transform: [{ type: 'map', callback: d => Object.assign({ ...d, sold: +d.sold }) }],
    })
    .encode('x', 'genre')
    .encode('y', 'sold');

  return chart.render().node();
})();
```

## API

| 参数     	| 说明                                 	| 类型         	| 默认值 	|
|----------	|--------------------------------------	|--------------	|--------	|
| callback 	| 根据 callback 对数组数据进行预处理。 	| (d:any)=>any 	| d=>d   	|

## 使用方法

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      value: [
        { genre: 'Sports', sold: '275' },
        { genre: 'Strategy', sold: '115' },
        { genre: 'Action', sold: '120' },
        { genre: 'Shooter', sold: '350' },
        { genre: 'Other', sold: '150' },
      ],
      transform: [{ type: 'map', callback: d => Object.assign({ ...d, sold: +d.sold }) }],
    })
    .encode('x', 'genre')
    .encode('y', 'sold');

  return chart.render().node();
})();
```
