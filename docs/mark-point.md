# Point

主要用于绘制散点图等图。

## 开始

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    })
    .encode('x', 'height')
    .encode('y', 'weight')
    .encode('color', 'gender');

  return chart.render().node();
})();
```

## 选项

> style

| 参数 | 说明                            | 类型     | 默认值 |
| ---- | ------------------------------- | -------- | ------ |
| r    | 半径，优先级比 `encode.size` 低 | `number` | -      |

## 案例

### 一维散点图

```js
(() => {
  const chart = new G2.Chart({ height: 120 });

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    })
    .encode('x', 'height');

  return chart.render().node();
})();
```

### 数据标签

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        ' https://gw.alipayobjects.com/os/bmw-prod/474e51c8-b47b-4bb6-b3ed-87813a960df2.csv',
    })
    .scale('x', { nice: true, domainMax: 38 })
    .scale('y', { nice: true })
    .encode('x', 'mpg')
    .encode('y', 'hp')
    .encode('color', 'steelblue')
    .label({
      text: 'name',
      stroke: '#fff',
      textAnchor: 'start',
      textBaseline: 'middle',
      dx: 10,
      position: 'left',
      fontSize: 10,
      lineWidth: 2,
    });

  return chart.render().node();
})();
```

### 气泡图

Point 的 Size 通道的比例尺默认是 Sqrt 比例尺，是圆的半径。

```js
(() => {
  const chart = new G2.Chart({
    paddingLeft: 150,
    paddingTop: 50,
  });

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/2b48887c-56fb-437e-a91c-6f48e80e5a91.csv',
      transform: [
        {
          type: 'filter',
          callback: (d) => d.Entity !== 'All natural disasters',
        },
      ],
    })
    .encode('x', 'Year')
    .encode('y', 'Entity')
    .encode('size', 'Deaths')
    .encode('color', 'Entity')
    .encode('shape', 'point')
    .scale('size', { rangeMax: 35 })
    .legend(false)
    .style('stroke', 'black')
    .style('opacity', 0.8)
    .style('lineWidth', 1);

  return chart.render().node();
})();
```

### 对数气泡图

当数据分布不均匀的时候可以使用 Log 比例尺。

```js
(() => {
  const chart = new G2.Chart();

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

  return chart.render().node();
})();
```

### 不同形状

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/bd73a175-4417-4749-8b88-bc04d955e899.csv',
    })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('shape', 'category')
    .encode('color', 'category')
    .scale('shape', { range: ['point', 'plus', 'diamond'] })
    .style('r', 5);

  return chart.render().node();
})();
```

### 堆叠点图

```js
(() => {
  const chart = new G2.Chart({ height: 360 });

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/88c601cd-c1ff-4c9b-90d5-740d0b710b7e.json',
    })
    .transform({ type: 'stackY' })
    .encode('x', (d) => 2021 - d.birth)
    .encode('y', (d) => (d.gender === 'M' ? 1 : -1))
    .encode('color', 'gender')
    .encode('shape', 'point')
    .axis('x', { title: 'Age →', nice: true })
    .axis('y', {
      title: '← Women · Men →',
      tickFormatter: Math.abs,
    })
    .legend('color', { title: 'Gender' });

  chart.lineY().data([0]).style('stroke', 'black');

  return chart.render().node();
})();
```

### 扰动点图

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
    })
    .transform({ type: 'sortX', by: 'x', reducer: (I, V) => +V[0] })
    .transform({ type: 'jitterX' })
    .encode('y', 'Horsepower')
    .encode('x', 'Cylinders')
    .encode('color', 'Cylinders')
    .scale('x', { type: 'point' })
    .scale('color', { type: 'ordinal' });

  return chart.render().node();
})();
```

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
    .transform({ type: 'jitter' })
    .encode('x', 'clarity')
    .encode('color', 'clarity')
    .legend(false);

  return chart.render().node();
})();
```

### 线标注

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data([
      { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
      { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
      { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
      { x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
      { x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
      { x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
      { x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
      { x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
      { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
      { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
      { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
      { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
      { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
      { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
      { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' },
    ])
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('color', '#1890ff')
    .encode('size', 'z')
    .encode('shape', 'point')
    .scale('x', { nice: true })
    .scale('y', { nice: true, domainMax: 165, zero: true })
    .scale('size', { range: [10, 40] })
    .style('stroke', '#1890ff')
    .style('fillOpacity', 0.3)
    .label({
      text: 'name',
      position: 'inside',
      fill: '#1890ff',
      stroke: '#fff',
    });

  chart.lineY().data([50]).style('stroke', '#54545').label({
    text: 'Safe sugar intake 50g/day',
    position: 'right',
    textBaseline: 'bottom',
  });

  chart.lineX().data([65]).style('stroke', '#54545').label({
    text: 'Safe fat intake 65g/day',
    position: 'top-left',
    textBaseline: 'bottom',
  });

  return chart.render().node();
})();
```

### 连接点图

```js
(() => {
  const chart = new G2.Chart({
    width: 800,
    height: 1200,
  });

  const xy = (node) => node.encode('x', 'state').encode('y', 'population');

  chart.coordinate({ type: 'transpose' });

  chart.data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/b6f2ff26-b232-447d-a613-0df5e30104a0.csv',
  });

  chart
    .link()
    .axis('y', { tickFormatter: '.0%' })
    .transform({ type: 'groupX', y: 'min', y1: 'max' })
    .call(xy)
    .style('stroke', '#000');

  chart
    .point()
    .scale('color', { palette: 'spectral' })
    .call(xy)
    .encode('shape', 'point')
    .encode('color', 'age');

  return chart.render().node();
})();
```

### 打包图

```js
(() => {
  const width = 800;
  const height = 800;
  const padding = 0;
  const layout = (data) => {
    const root = d3.hierarchy(data);
    root.count();
    d3.pack().size([width, height]).padding(5)(root);
    return root.descendants();
  };

  const chart = new G2.Chart({
    padding,
    width,
    height,
  });

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/bf0d3c4e-7369-4dfb-9e88-df5064223f18.json',
      transform: [{ type: 'custom', callback: layout }],
    })
    .axis(false)
    .legend(false)
    .scale('x', { domain: [0, width] })
    .scale('y', { domain: [0, height] })
    .scale('size', { type: 'identity' })
    .scale('color', {
      domain: [0, 5],
      range: ['hsl(152,80%,80%)', 'hsl(228,30%,40%)'],
      interpolate: d3.interpolateHcl,
    })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('size', 'r')
    .encode('color', 'depth')
    .encode('shape', 'point');

  return chart.render().node();
})();
```

### 序列散点图

```js
(() => {
  const chart = new G2.Chart({
    width: 800,
  });

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/56b6b137-e04e-4757-8af5-d75bafaef886.csv',
    })
    .encode('x', 'date')
    .encode('y', 'value')
    .encode('color', 'value')
    .encode('shape', 'point')
    .scale('color', {
      type: 'sequential',
      palette: 'rdBu',
      offset: (t) => 1 - t,
    })
    .style('stroke', '#000')
    .style('strokeOpacity', 0.2);

  chart.lineY().data([0]).style('stroke', '#000').style('strokeOpacity', 0.2);

  return chart.render().node();
})();
```

## 依赖

```js | dom "pin: false"
d3 = (async () => {
  const { hierarchy, pack } = await genji.require('d3-hierarchy');
  const { interpolateHcl } = await genji.require('d3-interpolate');
  return { hierarchy, pack, interpolateHcl };
})();
```
