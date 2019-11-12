---
title: Connector 数据接入
order: 13
---

一个数据视图（DataSet.View）实例在接入数据时就会用到 Connector，其语法如下：

```js
dv.source(data, {
  type: connectorName,
  ...otherOptions
});
```

举个例子：

```js
const testCSV = `Expt,Run,Speed
 1,1,850
 1,2,740
 1,3,900
 1,4,1070`;

const dv = new DataSet.View().source(testCSV, {
  type: 'csv'
});

console.log(dv.rows);
/*
 * dv.rows:
 * [
 *   {Expt: " 1", Run: "1", Speed: "850"}
 *   {Expt: " 1", Run: "2", Speed: "740"}
 *   {Expt: " 1", Run: "3", Speed: "900"}
 *   {Expt: " 1", Run: "4", Speed: "1070"}
 * ]
 */
```

上述代码中，数据视图实例 `dv` 使用 `csv` 类型的 Connector 载入了一段 CSV 文本。

目前 DataSet 支持以下几种常用的 Connector：

## default 默认

直接调用 `dv.source(data)`，不通过配置项指定使用的 Connector 时，则有以下两种默认的情形：

第一种，data 传入的是具体数组数据，那么

```js
dv.rows = deepClone(data);
```

第二种，data 传入的是另一个 DataView 的实例或者实例的名称，那么

```js
dv.rows = deepClone(ds.getView(otherDv).rows);
```

## dsv

具体用法见示例：

```js
dv.source(dsvStr, {
  type: 'dsv',   // 指定使用dsv connector
  delimiter: '|' // 指定分隔符
})
```

## csv

具体用法见示例：

```js
dv.source(csvStr, {
  type: 'csv',   // 指定使用dsv connector
  delimiter: ',' // 指定分隔符
})
```

## tsv

具体用法见示例：

```js
dv.source(tsvStr, {
  type: 'tsv' // 指定使用tsv connector
})
```

## GeoJSON

具体用法见示例：

```js
dv.source(geojsonData, {
  type: 'GeoJSON', // 别名 geo / geojson
})
```

> dv.dataType 会被更改为 'geo'，从而 dv 可以执行一些 Geo 相关的实例方法。

## TopoJSON

具体用法见示例：

```js
dv.source(topojsonData, {
  type: 'TopoJSON', // 别名 topojson
  object: 'xxx'     // TopoJSON 相当于多个 GeoJSON 合并起来做了压缩，其中每一个 object 都相当于一份 GeoJSON 数据，指定 object 就是从中提取一份 Geo 数据
})
```

> dv.dataType 会被更改为 'geo'，从而 dv 可以执行一些 Geo 相关的实例方法。

## hierarchy

具体用法见示例：

```js
dv.source(tree, {
  type: 'hierarchy',        // 别名 tree
  children: d => d.children // 可选，函数，返回子树
})
```

> dv.dataType 会被变更为 'hierarchy' ，从而 dv 可以执行一些树形结构相关的实例方法和 Transform。

> dv.root 为根节点

## graph

具体用法见示例：

```js
dv.source(graph, {
  type: 'graph',
  nodes: d => d.nodes, // 节点集对应字段
  edges: d => d.edges  // 边集对应字段
})
```

> dv.dataType 会被变更为 'graph'，从而 dv 可以执行图相关的实例方法和 Transform。
