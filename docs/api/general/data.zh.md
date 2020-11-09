---
title: 数据 - Data
order: 1
---

`markdown:docs/common/style.md`

### 绑定数据

绑定数据调用方法为`chart.data`，之前的调用方法为 `source`，将在 V4.1 移除。**参数格式只支持 json 数组**。

```sign
chart.data(field: Record<string, any>[]) => View;
```

```ts
chart.data([
  { city: '杭州', sale: 100 },
  { city: '上海', sale: 110 },
]);
```

### 更新数据

G2 更新数据的方式有两种：

1. 图表数据更新（**前后数据结构不发生变化**），更新后马上刷新图表。

```sign
chart.changeData(data) => View
```

2. 仅需要更新数据，但不需要马上更新图表，可以调用 `chart.data(data)`，然后在需要更新图表时调用 `chart.render()`

```typescript
chart.data(newData); // 更新数据源
// do something
chart.render(); // 更新图表
```

3. 更新数据时还可以清除图表上的所有元素，重新定义图形语法，改变图表类型和各种配置。

```typescript
chart.line().position('x*y');
chart.render();
chart.clear(); // 清理所有图形
chart.data(newData); // 加载新数据
chart.interval().position('x*y').color('z'); // 重新定义图形语法
chart.render();
```
