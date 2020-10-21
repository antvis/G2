---
title: 数据异步加载与动态更新
order: 19
---

很多场景下图表的数据源是需要异步加载获取的，在 G2 中实现异步数据的更新也是非常的简单，你只需要通过 jquery 等工具异步获取数据后，按照正常的创建图表步骤绘制即可。

```js
$.getJSON('data.json',function (data) {
  const chart = new G2.Chart({
    container: 'c1',
    width: 1000,
    height: 500,
    padding: [ 40, 80, 80, 80 ]
  });
  chart.source(data);
  chart.point().position('x*y').color('z');
  chart.render();
});
```

## 空数据源图表绘制

有时候我们需要先绘制图表，然后再加载完整的数据，即刚开始的时候数据源是个空的。如下例：

```js
// 数据将会包含 genre 和 sold 字段
const data = [];

const chart = new G2.Chart({
  container: 'c1',  // 指定图表容器 ID
  height: 300,
  width: 400
});

chart.source(data);
chart.interval().position('genre*sold').color('genre');
chart.render();
```

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ObsiTa_A_qcAAAAAAAAAAABkARQnAQ)

当数据加载进来之后，再调用 chart.changeData(data); 即可绘制。

```js
const newData = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
];

setTimeout(function() {
  chart.changeData(newData); // 使用 setTimeout 动态模拟下
}, 1000);
```

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*fQe3S7XnzUEAAAAAAAAAAABkARQnAQ)

## 动态更新数据 chart.changeData(data)

__注意__

需要说明的是，chart.changeData(data) 方法 __只支持具备相同数据结构的数据__ 进行更新，因为不同的数据结构包含的属性不同，原先声明的图形绘制语法是不能生效做到一一映射的。

下面的例子展示了初始数据为空以及动态更新数据的例子：

* 数据源定时载入的时候调用 `chart.changeData(data)` 方法实时更新即可，非常简单。

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*T7zJTbgwcF4AAAAAAAAAAABkARQnAQ)

完整代码如下：

```javascript
// 模拟数据
const base = +new Date(2014, 9, 3);
const oneDay = 24 * 3600 * 1000;
const date = [];

const data = [];
const values = [Math.random() * 150];
let now = new Date(base);

function addData(shift) {
  const item = {};
  now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
  item.date = now;
  item.value = (Math.random() - 0.4) * 10 + values[values.length - 1];
  values.push(item.value);
  now = new Date(+new Date(now) + oneDay);
  data.push(item);
}

// 创建图表
const chart = new G2.Chart({
  container: 'c3',
  forceFit: true, // 宽度自适应
  height: 400,
  animate: false
});
// 声明字段度量类型
chart.source(data);
chart.tooltip({
  crosshairs: {
    type: 'line'
  }
});
chart.line().position('date*value').color('#f80').size(3);
chart.area().position('date*value').color('#f80');
chart.render();

let init = true;
setInterval(function () {
  if (init) { // 第一次载入数据
    for (let i = 1; i < 100; i++) {
      addData();
    }
    init = false;
  }
  addData();
  chart.changeData(data); // 动态更新数据
}, 700);
```

## 使用 DataSet 的状态量

使用 DataSet 的状态量也可以动态的进行图表的更新、联动，查看 [DataSet 章节](/zh/docs/api/data-set)
