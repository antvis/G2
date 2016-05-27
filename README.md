# G2: The Grammar of Graphics

### ![G2](https://os.alipayobjects.com/rmsportal/vdzXowCvbvZCGGG.svg)

[G2](https://g2.alipay.com) 是一个由纯 javascript 编写基于 Canvas 的强大的语义化图表生成工具，它提供了一整套图形语法，可以让用户通过简单的语法搭建出无数种图表，并且集成了大量的统计工具，支持多种坐标系绘制，可以让用户自由得定制图表，是为大数据时代而准备的强大的可视化工具。

[G2](https://g2.alipay.com) is a JavaScript library for visualizing data based on the Grammar of Graphics. G2 helps you bring data to life using Canvas and HTML. It provides a set of grammars, takes users beyond a limited set of charts to an almost unlimited world of graphical forms.

Want to learn more? See the [tutorial](https://g2.alipay.com/tutorial/).

For examples, see the [demo gallery](https://g2.alipay.com/demo/).

Special thanks to Leland Wilkinson, the author of 《The Grammar Of Graphics》,  whose book served as the foundation for G2. 

## Install

```bash
npm install g2
```

## Usage

```js
var G2 = require('g2');
```

## Example

![image](https://t.alipayobjects.com/images/T1quFoXldXXXXXXXXX.png)

```js
var G2 = require('g2');
var data = [
  {action: '访问', visitor: 500},
  {action: '浏览', visitor: 400},
  {action: '交互', visitor: 300},
  {action: '下单', visitor: 200},
  {action: '付款', visitor: 100}
];
var chart = new G2.Chart({
  id: 'c1',
  width : 800,
  height : 400
}); // create the chart object
chart.source(data); // load the data source
chart.interval().position('action*visitor').color('action'); // create the detail chart
chart.render();
```

More details at [G2 site](https://g2.alipay.com).
