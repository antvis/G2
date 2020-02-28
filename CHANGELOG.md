## 4.0.0 正式发布 (2020-03-01)

作为图形语法（the Grammar of Graphics）的前端实现，G2 已经经历多个版本的迭代。本次 G2 4.0 是一个新的起点，我们对底层架构做了大量的重构工作，G2 会更加关注于：**图形语法，交互语法**以及**可视化组件体系**的建设。我们希望 G2 4.0 会成为一个专业的、给用户带来更多可能性的可视化底层引擎，在满足传统型统计图表需求的基础上，能够更好地赋能于（但不限于）：

- 让开发者基于 G2 4.0 可以更快更好地封装上层图表库
- 让交互式可视化更简单
- 成为可视化领域的专业工具

虽然我们对 G2 内部进行了大规模的重构工作，包括数据处理流程（引入数据更新机制），图表组件，view 渲染更新逻辑以及事件、交互机制改造等，但是为了保障用户项目能够更平滑得升级，G2 4.0 保持了最大程度上的兼容，但是仍然有一部分 breaking change 需要注意。

### 变更说明

#### 整体变化

- 全面拥抱 TypeScript。
- 全新的可视化组件：面向交互，体验优雅。
- 强大的 View 模块：可单独使用，具备完备的可视化组件、事件，支持 View 嵌套以及自动布局。
- 全新的交互语法。
- 绘图引擎升级至 G 0.4 版本，支持双引擎切换。
- 引入数据更新机制。
- 动画机制改造，更细粒度，体验更好。
- 模块化管理，提供更加灵活的扩展机制。

#### API 变更

G2 4.0 在功能上全面兼容 3.x 的功能，在 API 接口上，我们进行了一些优化，在最大程度兼容 3.x 语法的基础上，提供了对用户更加友好，更易理解的函数命名以及更合理的配置项结构，具体的变化记录如下：

##### 不兼容改动

- ❌ `chart.source()` 接口废弃，请使用 `chart.data()` 接口，同时列定义请通过 `chart.scale()`  接口进行定义。
- ❌ `chart.coord()` 接口废弃，请使用 `chart.coordinate()`。
- ❌ `chart.guide()` 接口废弃，请使用 `chart.annotation()`，同时不再支持 `chart.guide().html()`。
- ❌ `chart.view()`  接口废弃，请使用 `chart.createView()`。
- ❌ `chart.interact()`  接口废弃，请使用 `chart.interaction()`。
- ❌ `chart.repaint()`  接口废弃，请使用 `chart.render(update: boolean)` 接口。
- ❌ `G2.Global` 移除，默认的主题配置可以通过以下方式获取：

```typescript
// 方式 1
import { getTheme } from '@antv/g2';
const defaultTheme = getTheme();

// 方式 2，通过 chart 示例获取当前主题
const theme = chart.getTheme();
```

- ❌ `geometry.active()`  废弃，请使用 `geometry.state()` 接口。
- ❌ `geometry.select()`  废弃，请使用 `geometry.state()` 接口。
- ❌ `geometry.opacity()` 废弃，请使用 `geometry.color()`  中使用带透明度的颜色或者 `geometry.style()`  接口。
- 以下语法糖不再支持：
  - ❌ `pointJitter()`  废弃，请使用 `point().adjust('jitter')`。
  - ❌ `pointDodge()`  废弃，请使用 `point().adjust('dodge')`。
  - ❌ `intervalStack()` 废弃，请使用 `interval().adjust('stack')`。
  - ❌ `intervalDodge()` 废弃，请使用 `interval().adjust('dodge')`。
  - ❌ `intervalSymmetric()` 废弃，请使用 `interval().adjust('symmetric')`。
  - ❌ `areaStack()` 废弃，请使用 `area().adjust('stack')`。
  - ❌ `schemaDodge()` 废弃，请使用  `schema().adjust('stack')`。
- ❌ `Venn`  以及 `Violin`  几何标记暂时移除，后续考虑以更好的方式支持。
- ❌ 移除 Interval 几何标记以下两个 shape: 'top-line' 及  'liquid-fill-gauge'，用户可以通过自定义 Shape 机制自己实现。
- ❌ 移除 tail 类型的图例。
- 内置常量重命名，一致使用小写 + '-' 命名规则，比如 `shape('hollowCircle')` 变更为 `shape('hollow-circle')`。

##### 配置项以及接口变更

我们在 4.0 中对以下接口以及一些接口中的属性进行了部分变更，在兼容 3.x 原有功能的基础上，让配置项更具语义，同时结构更加合理，具体请参考 API 文档。

- `new Chart(cfg)`  接口属性更新([新老接口对比](https://github.com/simaQ/g2-v4-upgrade/pull/1/files#diff-6477dff11424caa76a176cf710e71023R16))

- `chart.data()`  接口不再支持 DataView 格式数据，只支持标准 JSON 数组，所以在使用 DataSet 时，[要取最后的 JSON 数组结果传入 G2](https://github.com/simaQ/g2-v4-upgrade/pull/1/files#diff-660f42f89c29e15f5f86a3e8c1023302R23): `chart.data(dv.rows);`

- 所有同绘图相关的配置全部定义在 style 属性中:

```ts
chart.axis('value', {
  label: {
    style: {
      textAlign: 'center',
    }, // 设置坐标轴文本样式
  },
  line: {
    style: {
      stroke: '#E9E9E9',
      lineDash: [3, 3],
    }, // 设置坐标轴线样式
  },
  grid: {
    line: {
      style: {
        lineDash: [3, 3],
      },
    }, // 设置坐标系栅格样式
  },
});
```

- `chart.tooltip()` 配置项更新，同时将 G2 3.x 版本中一些针对特定图表的内置规则删除，需要用户自己通过提供的配置项进行配置，具体配置属性详见 [API](https://g2.antv.vision/zh/api/classes/view#tooltip)。
- `chart.legend()`  配置项更新，详见 [API](https://g2.antv.vision/zh/api/classes/view#legend)。
- `chart.axis()`  配置项更新，详见 [API](https://g2.antv.vision/zh/api/classes/view#axis)。
- `chart.annotation()`  各个类型的 annotation 配置项更新，详见 [API](https://g2.antv.vision/zh/api/classes/view#annotation)。
- `geometry().style()` 方法的回调函数写法变更，不再支持一个配置属性一个回调的方式，而是使用一个回调：

```typescript
style('a', (aVal) => {
  if (a === 1) return { fill: 'red' };
  return { fill: 'blue' };
});
```

详见 [API](https://g2.antv.vision/zh/api/classes/geometry#style)。

- `geometry.label()` 接口更新，不再支持 html 类型的 label，详见 [API](https://g2.antv.vision/zh/api/classes/geometry#label)。
