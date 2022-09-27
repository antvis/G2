# Theta

Theta 是一种特殊的极坐标系，半径长度固定，仅将数据映射到角度，常用于饼图和柱状图之间的转换。

## 快速开始

```js
(() => {
  const chart = new G2.Chart({ height: 640 });

  chart.coordinate({ type: 'theta' });

  chart
    .interval()
    .transform({ type: 'stackY' })
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
    })
    .encode('y', 'value')
    .encode('color', 'name')
    .style('stroke', 'white')
    .scale('color', {
      guide: null,
      palette: 'spectral',
      offset: (t) => t * 0.8 + 0.1,
    })
    .label({ text: 'name', radius: 0.8, fontSize: 10, fontWeight: 'bold' })
    .label({
      text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
      radius: 0.8,
      fontSize: 9,
      dy: '0.75em',
    });

  return chart.render().node();
})();
```

## API

| 参数        | 说明                   | 类型   | 默认值             |
| ----------- | ---------------------- | ------ | ------------------ |
| startAngle  | 极坐标系起始弧度       | number | -Math.PI / 2       |
| endAngle    | 极坐标系结束弧度       | number | (Math.PI \* 3) / 2 |
| innerRadius | 极坐标内半径，范围 0-1 | number | 0                  |
| outerRadius | 极坐标半径，范围 0-1   | number | 1                  |
