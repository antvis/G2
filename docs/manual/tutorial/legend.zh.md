---
title: Legend 图例
order: 10
---

图例（legend）是图表的辅助元素，使用颜色、大小、形状区分不同的数据类型，用于图表中数据的筛选。G2 会根据设置图形属性映射以及数据的类型自动生成不同的图例。

- shape, color, size 这三个图形属性如果判断接收的参数是数据源的字段时，会自动生成不同的图例；
- shape 属性，会根据不同的 shape 类型生成图例；
- color 属性，会赋予不同的图例项不同的颜色来区分图形；
- size 属性，在图例上显示图形的大小。

通过 `chart.legend([field, ]false)` 可以关闭图例。

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*9ayTQLuZGm8AAAAAAAAAAABkARQnAQ)

## 如何配置图例

调用 `chart.legend()` 进行图例的配置，使用方法如下所示：

```js
chart.legend({
  position: 'bottom', // 设置图例的显示位置
  itemGap: 20, // 图例项之间的间距
});

chart.legend('cut', false); // 不显示 cut 字段对应的图例

chart.legend('price', {
  title: null, // 不展示图例 title
});

chart.legend(false); //所有的图例都不显示
```

## 图例整体样式设置

| 属性名     | 解释                                                                                                                                                                                                                                                                                                                                               | 默认值                                           |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------- | ------ | --------- | ---------- | --------------- | --------- | -------- | ------- | ------ | ------ | -------- | --------------------------- |
| position   | 图例的显示位置，支持 12 个定位位置，配置值 'left-top','left-center','left-bottom','right-top','right-top','right-bottom','top-left','top-center','top-bottom','bottom-left','bottom-center','bottom-right'。也可使用'left'（默认为 left-bottom'),'right'（默认为'right-bottom'),'top'（默认为 top-center'),'bottom'（默认为 bottom-center') 定位。 | 'bottom-center'                                  |
| title      | 用于图例标题的显示样式配置，如果值为 null 则不展示。                                                                                                                                                                                                                                                                                               | 左右两侧图例默认展示标题，上下图例默认不展示标题 |
| background | 用于图例背景色的配置                                                                                                                                                                                                                                                                                                                               | 默认没有背景色                                   |
| offsetX    | 整个图例的水平偏移距离                                                                                                                                                                                                                                                                                                                             | --                                               |
| offsetY    | 整个图例的垂直偏移距离                                                                                                                                                                                                                                                                                                                             | --                                               |
| width      | 图例的整体宽度（用于连续图例）                                                                                                                                                                                                                                                                                                                     | 20                                               |
| height     | 图例的整体高度（用于连续图例）                                                                                                                                                                                                                                                                                                                     | 156                                              |
| autoWrap   | 图例项过多时是否自动换行（用于分类图例）                                                                                                                                                                                                                                                                                                           | true，自动换行                                   |
| marker     | 配置图例 marker 的显示样式，通过指定 `marker.symbol` 来改变不同的'circle'                                                                                                                                                                                                                                                                          | 'square'                                         | 'line' | 'diamond' | 'triangle' | 'triangle-down' | 'hexagon' | 'bowtie' | 'cross' | 'tick' | 'plus' | 'hyphen' | 不同的几何标记不同的 marker |
| attachLast | 是否启用尾部跟随图例（适用于`line`、`lineStack`、`area`、`areaStack`图表类型）                                                                                                                                                                                                                                                                     | false                                            |

![image](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*P-YLRIz37LYAAAAAAAAAAABkARQnAQ)

```javascript
const data = [
  { year: 'Year 1800', region: 'Africa', population: 107 },
  { year: 'Year 1900', region: 'Africa', population: 133 },
  { year: 'Year 2012', region: 'Africa', population: 1052 },
  { year: 'Year 1800', region: 'America', population: 31 },
  { year: 'Year 1900', region: 'America', population: 156 },
  { year: 'Year 2012', region: 'America', population: 954 },
  { year: 'Year 1800', region: 'Asia', population: 635 },
  { year: 'Year 1900', region: 'Asia', population: 947 },
  { year: 'Year 2012', region: 'Asia', population: 4250 },
  { year: 'Year 1800', region: 'Europe', population: 203 },
  { year: 'Year 1900', region: 'Europe', population: 408 },
  { year: 'Year 2012', region: 'Europe', population: 740 },
  { year: 'Year 1800', region: 'Oceania', population: 2 },
  { year: 'Year 1900', region: 'Oceania', population: 6 },
  { year: 'Year 2012', region: 'Oceania', population: 38 },
];

const chart = new G2.Chart({
  container: 'legendMarker',
  width: 600,
  height: 350,
  padding: [20, 90, 95, 80],
});

chart.data(data);
chart.coord().transpose();
chart.legend({
  title: null, // 不展示图例的标题
  marker: 'square', // 设置图例 marker 的显示样式
});
chart.intervalDodge().position('region*population').color('year').label('population');
chart.render();
```

## 各个图例项样式设置

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ZzeWRbjP5G0AAAAAAAAAAABkARQnAQ)

| 属性名           | 解释                                                                                                         | 默认值            |
| :--------------- | :----------------------------------------------------------------------------------------------------------- | :---------------- |
| allowAllCanceled | （分类图例）是否保留一项不能取消勾选，默认为 false，即最后一项不能取消勾选                                   | false             |
| unCheckColor     | 未选中时 marker 的颜色                                                                                       | '#bfbfbf'         |
| textStyle        | 图例项文本的样式配置                                                                                         | {fill: '#3c3c3c'} |
| itemWidth        | 图例项的宽度，当图例有很多图例项，并且用户想要这些图例项在同一平面内垂直对齐，此时这个属性可帮用户实现此效果 | --                |
| itemFormatter    | 用于格式化图例每项的文本显示，是个回调函数                                                                   | --                |

## 自定义图例

```javascript
import { Chart } from '@antv/g2';

const data = [
  { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
  { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
  { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
  { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
  { name: 'London', 月份: 'May', 月均降雨量: 47 },
  { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
  { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
  { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
  { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
  { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
  { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
  { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
  { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
  { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
  { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
  { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart.data(data);

// 详细配置参考 API
chart.legend({
  items: [
    {
      name: 'London',
      marker: {
        symbol: 'square',
      },
    },
    {
      name: 'Berlin',
      marker: {
        symbol: 'square',
      },
    },
  ],
});

chart
  .interval()
  .position('月份*月均降雨量')
  .color('name')
  .adjust([
    {
      type: 'dodge',
      marginRatio: 0,
    },
  ]);

chart.render();
```

## 常见问题

- 1. 隐藏图例

```javascript
chart.legend(false); // 隐藏全部图例
chart.legend('x', false); // 只隐藏 x 维度对应的图例
```

- 2. 更改图例位置

```javascript
chart.legend('x', {
  position: 'bottom',
}); // 只更改 x 维度对应的图例的显示位置
```

- 3. 图例显示位置不够

调整 padding 值（padding 的介绍详见[API](/zh/docs/api/general/legend)）。
