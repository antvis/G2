# Polar

Polar 是极坐标系变换，将笛卡尔直角坐标系坐标变换为极坐标系下的坐标，常用于玫瑰图和柱状图之间的转换。

## 快速开始

```js
(() => {
  const chart = new G2.Chart({ width: 720, height: 720 });

  chart.coordinate({ type: 'polar' });

  chart
    .interval()
    .transform({ type: 'groupX', y: 'sum' })
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    })
    .encode('x', 'year')
    .encode('y', 'people')
    .scale('y', {
      type: 'sqrt',
      formatter: '~s',
      tickCount: 5,
      tickFilter: (d, i) => i !== 0,
      guide: { direction: 'right' },
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
