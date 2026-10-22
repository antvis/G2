---
title: "自定义渲染内容"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/tooltip/tooltip-render/"
version: "5.4.8"
---

# 自定义渲染内容

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/tooltip/tooltip-render/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  interaction: {
    tooltip: {
      render: (event, { title, items }) => `
  <div
    style="
      width: 300px;
      background: #f2f2f2;
      border-radius: 10px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px;
      margin: -12px;
    "
  >
    <h2
      style="
        margin-bottom: 9px; 
        font-size: 18px; 
        line-height: 30px; 
        font-weight: 500px"
    >
      Letter: ${title}
    </h2>
    ${items
      .map(
        (item) =>
          `<div style="font-size: 16px; color: #666">name: ${item.name}
          <br/>
          value: 
          <div style="width:${
            item.value * 1000
          }px;height:10px;display:inline-block;background:${item.color}"></div>
          ${item.value}
        </div>`,
      )
      .join('')}
  </div>
  `,
    },
  },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  transform: [{ type: 'sortX', by: 'y', reverse: true }],
  encode: { x: 'letter', y: 'frequency' },
});

chart.render();
```
