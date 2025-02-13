---
title: fisheye
order: 16
---

鱼眼交互，用于聚焦于局部数据。

## 开始使用

<img alt="example" src="https://gw.alipayobjects.com/zos/raptor/1669041902028/fisheye.gif" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .point()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  })
  .encode('x', 'GDP')
  .encode('y', 'LifeExpectancy')
  .encode('size', 'Population')
  .encode('color', 'continent')
  .encode('shape', 'point')
  .scale('size', { type: 'log', range: [4, 20] })
  .style('fillOpacity', 0.3)
  .style('lineWidth', 1);

chart.interaction('fisheye');

chart.render();
```

## 选项

| 属性     | 描述                             | 类型      | 默认值 |
| -------- | -------------------------------- | --------- | ------ |
| wait     | 鱼眼更新的时间间隔，单位为毫秒   | `number`  | 30     |
| leading  | 是否在时间间隔开始的时候更新鱼眼 | `boolean` | true   |
| trailing | 是否在时间间隔结束的时候更新鱼眼 | `boolean` | false  |
