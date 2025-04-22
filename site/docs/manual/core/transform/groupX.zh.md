---
title: groupX
order: 2
---

`groupY` 是 `group` 函数组的一个变种，专门用于对离散的 `x` 通道进行分组，并且对通道根据指定的 Reducer 进行聚合。等效于 `channels = ['x']` 的 [group](/manual/core/transform/group)，具体的使用方式和配置项与 group 函数相同。下面，只是针对 `groupX` 函数的使用场景和配置项进行说明。


## 配置项

| 属性      | 描述                                      | 类型      | 默认值 |
| --------- | ----------------------------------------- | --------- | ------ |
| [channel] | 输出到具体 mark 的 channel 数据的聚合方式 | `Reducer` |        |

有关 `Reducer` 的详细说明，请参考 [group](/manual/core/transform/group) 函数的配置项。


## 示例

下面，我们展现个人群的年龄分布情况。我们使用 `groupX` 函数对数据进行分组，并且对 `x` 通道进行聚合，计算出每个 `state` 的 `population` 折线长度和分布情况。注意在对应的 mark 中有 transform 方法可以使用数据的变换。

``` js | ob
(() => { 
  const chart = new G2.Chart();
  chart.coordinate({ transform: [{ type: 'transpose' }] });

  chart.data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/b6f2ff26-b232-447d-a613-0df5e30104a0.csv',
  });

  chart
    .link()
    .scale('y', { formatter: '.0%' })
    .transform({ type: 'groupX', y: 'min', y1: 'max' })
    .encode('x', 'state')
    .encode('y', 'population')
    .style('stroke', '#000');

  chart
    .point()
    .scale('color', { palette: 'spectral' })
    .encode('x', 'state')
    .encode('y', 'population')
    .encode('shape', 'point')
    .encode('color', 'age');

  chart.render();
  return chart.getContainer();
})();
```

说明： 

1. 在这个示例中，我们首先定义了一组销售数据 `data`，包含地区、年龄以及人口；
2. 在上述代码中，`transform` 方法中使用了 `groupX` 类型的数据转换，按 `x` channel 对数据进行分组，'y' 和 'y1' 分别取最小值和最大值；
3. 分组后，数据会按照 `x` channel 的值进行聚合，计算出每个 `state` 的 `population` 折线长度；
4. 最后通过 `encode` 方法将分组后的数据映射到图表的 `x` 和 `y` 轴上进行点状渲染。
