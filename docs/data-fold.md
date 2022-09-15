# Fold

将数据中一个或多个数据字段折叠为两个属性：`key`（包含原始数据字段名称）和`value`（包含原始数据值）。


## 快速开始
```js
(() => {
  const chart = new G2.Chart({
    width: 640,
    height: 300,
  });

  chart.data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json',
    transform: [
      {
        type: 'fold',
        fields: ['blockchain', 'nlp'],
        as: ['metric', 'value'],
      },
    ],
  });
})
```

## API

| 参数   	| 说明                             	| 类型     	| 默认值 	|
|--------	|----------------------------------	|----------	|--------	|
| fields 	| 对 fields 中字段进行 fold 处理   	| string[] 	| []     	|
| as     	| fold 时，`key` 和 `value` 的别名 	| string[] 	| []     	|


## 使用方法

```js
(() => {
  const chart = new G2.Chart({
    width: 640,
    height: 300,
  });

  chart.data({
    value:  [
      { country: 'USA', gold: 10, silver: 20 },
      { country: 'Canada', gold: 7, silver: 26 },
    ],
    transform: [
      {
        type: 'fold',
        fields: ['gold', 'silver'],
        as: ['k', 'v'],
      },
    ],
  });
})
```
