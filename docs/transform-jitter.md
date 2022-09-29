# Jitter

**Jitter** 会生成随机 dy 和 dx 通道对于拥有离散的 x 和 y 通道的标识。视觉上会让点在对应的空间中随机散开，形成扰动的效果。

## 开始

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
    })
    .transform({ type: 'jitter' })
    .encode('x', 'clarity')
    .encode('color', 'clarity');

  return chart.render().node();
})();
```

## 选项

| 参数     | 说明                                          | 类型           | 默认值      |
| -------- | --------------------------------------------- | -------------- | ----------- |
| padding  | 空间之间的间隔                                | `number`       | 0           |
| paddingX | 水平之间的间隔                                | `number`       | 0           |
| paddingY | 竖直之间的间隔                                | `number`       | 0           |
| random   | 自定义随机数生成器，需要返回 \[0, 1) 之间的值 | `() => number` | Math.random |

## 案例

```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'polar' });

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
    })
    .transform({ type: 'jitter', paddingX: 0.05, paddingY: 0.05 })
    .encode('x', 'clarity')
    .encode('y', 'cut')
    .encode('color', (d) => `(${d.clarity}, ${d.cut})`)
    .scale('x', { padding: 0.5 })
    .scale('y', { padding: 0.5, guide: null })
    .scale('color', { guide: null });

  return chart.render().node();
})();
```
