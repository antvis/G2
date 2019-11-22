---
title: DataSet
order: 12
---

全局命名空间 `DataSet`，同时也是数据集类的构造函数。

## 常量 Constants

### DataSet.CONSTANTS

常量，譬如 `DataSet.HIERARCHY` 是树形结构的名称。

### DataSet.connectors

存储已注册的 Connector（key-value 对）。

### DataSet.transforms

存储已注册的 Transform（key-value 对）。

## 类 Classes

### DataSet

数据集构造函数。

#### new DataSet()

`new DataSet(options = {})` 创建并返回 DataSet 实例。具体参数见示例代码。

| 参数 | 类型 | 是否可选 |
| :--- | :--- | :--- |
| options | Object | 是 |

```js
const ds = new DataSet({
  state: { // 指定初始化状态量
    foo: 'bar'
  }
});
```

#### ds.isDataSet

判断是否是 DataSet 时使用，`ds.isDataSet === true`

#### ds.views

存储所有挂在数据集上的数据视图（key-value 对）。

#### ds.state

存储数据集上的状态量（key-value 对）。

#### ds.createView()

> alias ds.view()

`ds.createView([name, ]options = {})` 创建并返回一个数据视图实例。

| 参数 | 类型 | 是否可选 |
| :--- | :--- | :--- |
| name | String | 是 |
| options | Object | 是 |

```js
const dv0 = ds.createView();
const dv1 = ds.createView('foo');
const dv2 = ds.createView('bar', {
  watchingStates: [ 'fakeState' ]
});
```

##### options.watchingStates

创建数据视图实例时，传入的 `watchingStates` 是用于指定该数据视图监听的 `states` 状态量的。默认监听所有状态量（也就是任何状态量变更都会导致数据视图重新计算），如果指定为空数组 `[]`，则不监听任何状态量，如果指定为非空数组，则只监听数组元素对应的状态量变更。

#### ds.getView()

`ds.getView(name)` 返回 name 对应的数据视图实例。

| 参数 | 类型 | 是否可选 |
| :--- | :--- | :--- |
| name | String | 否 |

```js
const dv = ds.getView('foo');
```

#### ds.setView()

`ds.setView(name, dv)` 设置 name 对应的数据视图实例为 dv。

| 参数 | 类型 | 是否可选 |
| :--- | :--- | :--- |
| name | String | 否 |
| dv | DataSet.View | 否 |

```js
ds.setView('foo', new DataSet.View());
```

#### ds.setState()

`ds.setState(name, value)` 设置状态量 name 的值为 value。

> 注意！这个操作会使得关联了状态量 name 的数据视图对象重新执行所有数据处理流程。这个接口为数据集合上挂载的数据视图之间提供了通信通道。

> 注意！更改状态量必须调用这个接口，而不能直接用 `ds.state.xxx = 'yyy'` 这种方式。

| 参数 | 类型 | 是否可选 |
| :--- | :--- | :--- |
| name | String | 否 |
| value | Any | 否 |

```js
ds.setState('foo', 'bar');
```

#### ds.on()

`ds.on(name, callback)` 监听数据集上的 name 事件。

| 参数 | 类型 | 是否可选 |
| :--- | :--- | :--- |
| name | String | 否 |
| callback | Function | 否 |

目前支持的事件有

* `statechange` 状态量变化事件，在调用 `setState()` 方法后触发。

> 注意！这个事件在状态量改变后不是同步触发的，而是在 setState 被调用后__异步触发__的。

> 目前搜索监听了某个 state 值的数据视图自动监听这个事件。

```js
ds.on('statechange', (name, value) => {
  console.log(`state ${name}'s value has been changed to ${value}!`)
});
```

#### ds.emit()

`ds.emit(name, ..params)` 手动触发数据集上的 name 事件。

| 参数 | 类型 | 是否可选 |
| :--- | :--- | :--- |
| name | String | 否 |
| params | Arguments | 是 |

目前支持的事件有

* `statechange` 状态量变化事件，触发后状态量关联的数据视图会重新执行所有数据处理流程。

### DataSet.View

> alias DataSet.DataView

数据视图构造函数。

#### new View()

`const dv = new DataSet.View(ds, options = {})` 创建并返回数据视图实例，具体参数见代码。

| 参数 | 类型 | 是否可选 |
| :--- | :--- | :--- |
| ds | DataSet | 是 |
| options | Object | 是 |

```js
const dv0 = new DataSet.View();
const dv1 = new DataSet.View(ds, {
  watchingStates: [ 'foo' ] // 监听 `foo` 状态量变化，默认监听 ds 上的所有状态量
});
```

#### dv.isView

> alias dv.isDataView

#### dv.loose

是否关联了数据集。`ds.createView()`方式创建的数据视图实例为 `false`，`new DataSet.View(options)` 方式创建的则为 `true`。

#### dv.dataType

数据类型，默认为 `DataSet.TABLE`，可选值有：`DataSet.TABLE`（普通二维数据），`DataSet.GEO`（地理数据）， `DataSet.HIERARCHY`（树结构数据），和`DataSet.GRAPH`（图数据）。

#### dv.origin

存储原始数据。

#### dv.rows

存储处理后的数据。

#### dv.transforms

存储已应用的 transform（数组）。

#### dv.source()

`dv.source(data, options)` 载入数据。

| 参数 | 类型 | 是否可选 |
| :--- | :--- | :--- |
| data | String / Array / Object / DataView | 否 |
| options | Object | 是 |

`data` 是原始数据，可能是字符串，也可能是数组、对象，或者另一个数据视图实例。`options` 里指定了载入数据使用的 `connector` 和载入时使用的配置项。

详细文档见 [Connector API](/zh/docs/api/connector)

#### dv.transform()

`dv.transform(options)` 执行数据处理数据。执行完这个函数后，transform 会被

| 参数 | 类型 | 是否可选 |
| :--- | :--- | :--- |
| options | Object | 否 |

`options` 里指定了处理数据使用的 `transform` 和数据处理的配置项。

详细文档见 [Transform API](/zh/docs/api/transform)

## 方法 Functions

### DataSet.registerConnector()

`DataSet.registerConnector(name, callback)` 注册一个数据连接函数，注册后所有数据视图都可以使用 `name` 来引用这个数据连接函数，从而接入某种数据源。

| 参数 | 类型 | 是否可选 |
| :--- | :--- | :--- |
| name | String | 否 |
| callback | Function | 否 |

`callback` 接受两个参数：原始数据和配置项。返回值就是 DataView 实例所需要的数据。举个简单例子，如果要注册一个接入 CSV 数据的 Connector，则实现如下：

```js
const _ = require('lodash');
const {
  csvParse
} = require('d3-dsv');

DataSet.registerConnector('csv', (data, options = {}) => {
  const delimiter = options.delimiter || ',';
  if (!isString(delimiter)) {
    throw new TypeError('Invalid delimiter: must be a string!');
  }
  return dsvFormat(delimiter).parse(str);
});

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

### DataSet.getConnector()

`DataSet.getConnector(name)` 返回 `name` 对应的 Connector。

| 参数 | 类型 | 是否可选 |
| :--- | :--- | :--- |
| name | String | 否 |

### DataSet.registerTransform()

`DataSet.registerTransform(name, callback)` 注册一个数据处理函数，注册后所有数据视图都可以使用 `name` 来引用这个数据处理函数，从而进行某种数据处理。

| 参数 | 类型 | 是否可选 |
| :--- | :--- | :--- |
| name | String | 否 |
| callback | Function | 否 |

`callback` 接受两个参数：数据视图（DataSet.View）实例和配置项。举个简单例子，如果要注册一个过滤数据的 Transform，则实现如下：

```js
// 承接上述 Connector 的代码
DataSet.registerTransform('filter', (dv, options = {}) => {
  dv.rows = dv.rows.filter(options.callback || (row => !!row));
});

dv.transform({
  type: 'filter',
  callback(row) {
    return row.Run !== "1";
  }
})

console.log(dv.rows);
/*
 * dv.rows:
 * [
 *   {Expt: " 1", Run: "2", Speed: "740"}
 *   {Expt: " 1", Run: "3", Speed: "900"}
 *   {Expt: " 1", Run: "4", Speed: "1070"}
 * ]
 */
```

### DataSet.getTransform()

`DataSet.getTransform(name)` 返回 `name` 对应的 Transform。

| 参数 | 类型 | 是否可选 |
| :--- | :--- | :--- |
| name | String | 否 |
