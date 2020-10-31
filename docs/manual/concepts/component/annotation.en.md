---
title: 图形标注
order: 5
---

图形标注，Annotation，作为 G2 图表的辅助元素，主要用于在图表上标识额外的标记注解。

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*B0q9R7s1v3sAAAAAAAAAAABkARQnAQ)

## 图表标注类型

G2 提供了丰富的图形标注类型：

|   **类型**   |                                                                             **描述**                                                                              |             **配置语法**              |
| :----------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------: |
|     arc      |      辅助弧线，只在**极坐标系**下生效。常用于绘制仪表盘。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*SccqSpP2hG4AAAAAAAAAAABkARQnAQ)      |     `chart.annotation().arc({})`      |
|    image     |                辅助图片，在图表上添加辅助图片。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*KYTbSbvRKHQAAAAAAAAAAABkARQnAQ)                |    `chart.annotation().image({})`     |
|     line     |     辅助线（可带文本），例如表示平均值或者预期分布的直线。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*hd7PQ4z_JS8AAAAAAAAAAABkARQnAQ)     |     `chart.annotation().line({})`     |
|     text     |                辅助文本，指定位置添加文本说明。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*PdjoSrdEhnwAAAAAAAAAAABkARQnAQ)                |     `chart.annotation().text({})`     |
|    region    |            辅助框，框选一段图区，设置背景、边框等。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*VEOZR5rXpqMAAAAAAAAAAABkARQnAQ)            |    `chart.annotation().region({})`    |
| regionFilter | 区域着色，将图表中位于矩形选区中的图形元素提取出来，重新着色。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*cp2jSJfeJDYAAAAAAAAAAABkARQnAQ) | `chart.annotation().regionFilter({})` |
|  dataMarker  |             特殊数据点标注，多用于折线图和面积图。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*h-e2TLivyI4AAAAAAAAAAABkARQnAQ)             |  `chart.annotation().dataMarker({})`  |
|  dataRegion  |            特殊数据区间标注，多用于折线图和面积图。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*NHbSRKacUesAAAAAAAAAAABkARQnAQ)            |  `chart.annotation().dataRegion({})`  |

## 配置

各个标注类型的详细配置详见 API：

- `chart.annotation().arc(cfg)`: cfg 配置详见 [API](../../api/annotation#chartannotationarcoption)。
- `chart.annotation().line(cfg)`: cfg 配置详见 [API](../../api/annotation#chartannotationlineoption)。
- `chart.annotation().text(cfg)`: cfg 配置详见 [API](../../api/annotation#chartannotationtextoption)。
- `chart.annotation().image(cfg)`: cfg 配置详见 [API](../../api/annotation#chartannotationimageoption)。
- `chart.annotation().region(cfg)`: cfg 配置详见 [API](../../api/annotation#chartannotationregionoption)。
- `chart.annotation().dataMarker(cfg)`: cfg 配置详见 [API](../../api/annotation#chartannotationdatamarkeroption)。
- `chart.annotation().dataRegion(cfg)`: cfg 配置详见 [API](../../api/annotation#chartannotationdataregionoption)。
- `chart.annotation().regionFilter(cfg)`: cfg 配置详见 [API](../../api/annotation#chartannotationregionfilteroption)。

## 清空图形标注

- `chart.annotation().clear()`  清空所有的图形标注，但是不会清空配置，当用户再次调用 chart.render() 时，所有的 annotation 会重新绘制。
- `chart.annotation().clear(true)` 清空所有的图形标注同时清空配置。

## 动态图形标注

G2 图形标注接受的位置信息的参数都是原始数据值，辅助标记一旦生成后就是固定了位置，如果数据发生改变，辅助标记就需要删除掉重新创建。

如果数据是动态更新的那么这个过程需要频繁进行，基于这种场景 Annotation 提供了如下两种解决方案：

- 可以使用 'min', 'median', 'max' 关键字，代表原始值的最小值、平均值、最大值，例如： [0, 'min'] 表示 x 轴上数值为 0，y 轴位置在数值的最小值上；
- 表示位置的数组可以换成回调函数，函数原型： `function(xScale, yScales) {return [];}`

xScale, yScales 分别对应 x 轴的度量和所有 y 轴的度量；

![](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*NHbSRKacUesAAAAAAAAAAABkARQnAQ)

```javascript
const data = [];
const time = Math.floor(new Date().getTime() / 1000) * 1000;

for (let i = -19; i <= 0; i++) {
  data.push({
    time: time + i * 3 * 1000,
    value: Math.random() + 0.25,
  });
}

// 查找最大值
function findMax() {
  let maxValue = 0;
  let maxObj = null;
  data.forEach((obj) => {
    if (obj.value > maxValue) {
      maxValue = obj.value;
      maxObj = obj;
    }
  });
  return maxObj;
}

const chart = new Chart({
  // 创建图表
  container: 'container',
  autoFit: false,
  width: 500,
  height: 450,
});
chart.data(data.concat([]));
chart.scale({
  time: {
    type: 'time',
    mask: 'HH:mm:ss',
  },
  value: {
    nice: true,
  },
});
chart.animate(false);
chart.line().position('time*value');

chart.annotation().text({
  position() {
    const obj = findMax();
    return [obj.time, obj.value];
  },
  content: '最大值',
});

chart.render();

setInterval(function () {
  data.shift();
  data.push({
    time: new Date().getTime(),
    value: Math.random() + 0.25,
  });
  chart.changeData(data.concat([]));
}, 3000);
```
