# Graph

图数据是利用`实体`和`关系`的方式去描述世界，关系图（Graph）是对图数据的可视化。G2 通过多种标记组合的方式去实现图可视化，主要用到的标记包括：`Point`、`Polygon`、`Link`，这些标记提供了多种多样的图形让我们配合一些图布局算法，绘制出不同样式的关系图。

<img alt="graph" style="max-height: 150px" src="https://gw.alipayobjects.com/zos/antfincdn/ue44OyTv9L/image.png" />

## 使用方法

我们先准备两份数据，后面的图都会用到。

```js | dom "pin: false"
flare = genji.fetchJSON(
  'https://gw.alipayobjects.com/os/antfincdn/FouG0KJrBc/flare.json',
);
```

```js | dom "pin: false"
miserables = genji.fetchJSON(
  'https://gw.alipayobjects.com/os/antfincdn/agVao%26jU5l/miserables.json',
);
```


### 树图（Tree）

在树形结构中，树根结点没有前驱结点，其余每个结点有且只有一个前驱结点。 叶子结点没有后续结点，其余每个结点的后续节点数可以是一个也可以是多个。

```js | radio "options: { labels: ['polar', 'rect'], values: ['polar', 'transpose'] }; pin: false"
treeCoordinate = 'polar';
```


```js | radio "options: { labels: ['smooth', 'vhv'], values: ['smooth', 'vhv'] }; pin: false"
treeShape = 'smooth';
```

```js
(() => {
  const chart = new G2.Chart({
    width: 600,
    height: 400,
  });

  chart.data({
    value: flare,
    transform: [{ type: 'tree', y: 0.3 }],
  });

  chart.coordinate({ type: treeCoordinate });

  chart
    .link()
    .data({
      transform: [
        { type: 'custom', callback: (v) => v.edges },
      ],
    })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('shape', treeShape)
    .scale('x', { guide: null })
    .scale('y', { domain: [0, 1], guide: null })
    .style('stroke', 'grey');

  chart
    .point()
    .data({
      transform: [
        { type: 'custom', callback: (v) => v.nodes },
      ],
    })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('size', 2)

  return chart.render().node();
})();
```


### 桑基图（Sankey）

桑基图 (Sankey Diagram)，是一种特定类型的流图，用于描述一组值到另一组值的流向。桑基图的特点如下：

- 起始流量和结束流量相同，所有主支宽度的总和与所有分出去的分支宽度总和相等，保持能量的平衡；
- 在内部，不同的线条代表了不同的流量分流情况，它的宽度成比例地显示此分支占有的流量；
- 节点不同的宽度代表了特定状态下的流量大小。

桑基图通常应用于能源、材料成分、金融等数据的可视化分析。

```js | dom "pin: false"
sankeyData = {
  nodes: [
    {
      name: '首次打开',
    },
    {
      name: '结果页',
    },
    {
      name: '验证页',
    },
    {
      name: '我的',
    },
    {
      name: '朋友',
    },
    {
      name: '其他来源',
    },
    {
      name: '首页 UV',
    },
    {
      name: '我的',
    },
    {
      name: '扫一扫',
    },
    {
      name: '服务',
    },
    {
      name: '蚂蚁森林',
    },
    {
      name: '跳失',
    },
    {
      name: '借呗',
    },
    {
      name: '花呗',
    },
    {
      name: '其他流向',
    },
  ],
  links: [
    {
      source: 0,
      target: 6,
      value: 160,
    },
    {
      source: 1,
      target: 6,
      value: 40,
    },
    {
      source: 2,
      target: 6,
      value: 10,
    },
    {
      source: 3,
      target: 6,
      value: 10,
    },
    {
      source: 4,
      target: 6,
      value: 8,
    },
    {
      source: 5,
      target: 6,
      value: 27,
    },
    {
      source: 6,
      target: 7,
      value: 30,
    },
    {
      source: 6,
      target: 8,
      value: 40,
    },
    {
      source: 6,
      target: 9,
      value: 35,
    },
    {
      source: 6,
      target: 10,
      value: 25,
    },
    {
      source: 6,
      target: 11,
      value: 10,
    },
    {
      source: 6,
      target: 12,
      value: 30,
    },
    {
      source: 6,
      target: 13,
      value: 40,
    },
    {
      source: 6,
      target: 14,
      value: 45,
    },
  ],
};
```

```js
(() => {
  const chart = new G2.Chart({
    width: 600,
    height: 400,
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
  });

  chart.data({
    value: sankeyData,
    transform: [{ type: 'sankey' }],
  });

  // edge
  chart
    .polygon()
    .data({
      transform: [
        { type: 'custom', callback: (v) => v.links },
      ],
    })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('color', (d) => d.source.name)
    .encode('shape', 'ribbon')
    .scale('x', { guide: null })
    .scale('y', { guide: null })
    .scale('color', { guide: null })
    .style('fillOpacity', 0.5)
    .style('stroke', null);

  // node
  chart
    .polygon()
    .data({
      transform: [
        { type: 'custom', callback: (v) => v.nodes },
      ],
    })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('color', 'name')
    .encode('shape', 'polygon')
    .scale('x', { guide: null })
    .scale('y', { guide: null })
    .scale('color', { guide: null });

  return chart.render().node();
})();
```


### 和弦图（Chord）

和弦图是一种显示矩阵中数据间相互关系的可视化方法，节点数据沿圆周径向排列，节点之间使用带权重（有宽度）的弧线链接。

```js
(() => {
  const chart = new G2.Chart({
    width: 600,
    height: 400,
  });

  chart.data({
    value: miserables,
    transform: [{ type: 'arc', y: 1, weight: true }],
  });

  chart.coordinate({ type: 'polar' });

  chart
    .polygon()
    .data({
      transform: [
        { type: 'custom', callback: (v) => v.edges },
      ],
    })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('color', 'source')
    .encode('shape', 'ribbon')
    .scale('x', { domain: [0, 1], guide: null })
    .scale('y', { domain: [0, 1], guide: null })
    .scale('color', { type: 'ordinal', guide: null })
    .style('opacity', 0.5);

  chart
    .polygon()
    .data({
      transform: [
        { type: 'custom', callback: (v) => v.nodes },
      ],
    })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('size', 'value')
    .encode('color', 'name')
    .encode('shape', 'polygon')
    .scale('x', { domain: [0, 1], guide: null })
    .scale('y', { domain: [0, 1], guide: null })
    .scale('color', { type: 'ordinal', guide: null });

  return chart.render().node()
})();
```

### 弧线图（Arc Diagram）

弧长链接图是节点－链接法的一个变种，节点－链接法是指用节点表示对象，用线（或边）表示关系的节点－链接布局(node-link)的一种可视化布局表示。弧长链接图在此概念的基础上，采用一维布局方式，即节点沿某个线性轴或环状排列，用圆弧表达节点之间的链接关系。这种方法不能像二维布局那样表达图的全局结构，但在节点良好排序后可清晰的呈现环和桥的结构。

```js | radio "options: { labels: ['polar', 'rect'], values: ['polar', 'rect'] }; pin: false"
arcCoordinate = 'polar';
```


```js
(() => {
  const chart = new G2.Chart({
    width: 600,
    height: 400,
  });

  chart.data({
    value: miserables,
    transform: [{ type: 'arc', y: arcCoordinate === 'polar' ? 1 : 0.3}],
  });

  if (arcCoordinate === 'polar') {
    chart.coordinate({ type: arcCoordinate });
  }

  chart
    .link()
    .data({
      transform: [
        { type: 'custom', callback: (v) => v.edges },
      ],
    })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('color', 'source')
    .encode('shape', 'arc')
    .scale('x', { domain: [0, 1], guide: null })
    .scale('y', { domain: [0, 1], guide: null })
    .scale('color', { type: 'ordinal', guide: null })
    .style('opacity', 0.5);

  chart
    .point()
    .data({
      transform: [
        { type: 'custom', callback: (v) => v.nodes },
      ],
    })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('size', 'value')
    .encode('color', 'name')

  return chart.render().node()
})();
```

### 力导图（Force-directed）

力导布局图是一种用来呈现复杂关系网络的图表。在力导布局图中，系统中的每个节点都可以看成是一个放电粒子，粒子间存在某种斥力。同时，这些粒子间被它们之间的“边”所牵连，从而产生引力。

```js
(() => {
  const flatten = (data) => {
    const root = d3.hierarchy(data);
    return {
      links: root.links(),
      nodes: root.descendants(),
    };
  };
  // @see https://bl.ocks.org/mbostock/1667139
  // compute a static force layout
  const layout = (data) => {
    const { links, nodes } = data;
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(0)
          .strength(1),
      )
      .force('charge', d3.forceManyBody().strength(-50))
      .force('x', d3.forceX())
      .force('y', d3.forceY())
      .stop();
    const n = Math.ceil(
      Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()),
    );
    for (let i = 0; i < n; ++i) simulation.tick();
    return data;
  };
  const links = (d) => d.links;
  const nodes = (d) => d.nodes;
  const chart = new G2.Chart({
    width: 640,
    height: 640,
  });

  chart.data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/233673d6-9c84-4ba2-98be-992fb1b34593.json',
    transform: [
      { type:'custom', callback: flatten },
      { type:'custom', callback: layout },
    ],
  });

  chart
    .link()
    .data({
      transform: [{ type:'custom', callback: links }],
    })
    .encode('x', [(d) => d.source.x, (d) => d.target.x])
    .encode('y', [(d) => d.source.y, (d) => d.target.y])
    .scale('x', { guide: null })
    .scale('y', { guide: null })
    .style('stroke', '#ddd');

  chart
    .point()
    .data({
      transform: [{ type:'custom', callback: nodes }],
    })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('size', 10)
    .encode('color', (d) => d.data.type)
    .encode('title', (d) => d.data.type)
    .encode('tooltip', (d) => d.data.name);

  return chart.render().node();
})();
```


## FAQ


## Dependance

```js | dom "pin: false"
d3 = (async () => {
  const { hierarchy } = await genji.require('d3-hierarchy');
  const { forceSimulation, forceLink, forceManyBody, forceX, forceY } =
    await genji.require('d3-force');
  return {
    hierarchy,
    forceSimulation,
    forceLink,
    forceManyBody,
    forceX,
    forceY,
  };
})();
```