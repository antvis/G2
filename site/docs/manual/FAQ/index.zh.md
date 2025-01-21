---
title: '常见问题 FAQ'
order: 6
---

## 手动设置 Padding 后标题无法渲染

### 问题描述

在使用 AntV G2 绘制图表时，手动设置 `padding` 可能会导致图表标题无法正常显示或完全消失。

相关问题：[设置完 title 不显示](https://github.com/antvis/G2/issues/6549)

### 原因分析

G2 默认会动态计算所有组件所需的间距，但一旦指定了固定的 `padding` 值，这个自动调整的逻辑就会被跳过，可能导致组件显示不完整。

### 解决方案

有两种方式可以解决这个问题：

#### 1. 使用默认布局（推荐）

让 G2 自动计算最佳间距，确保所有组件正常显示：

```javascript
chart
  .interval()
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'type');
```

#### 2. 正确设置 Padding

如果确实需要手动设置 `padding`，请确保为动态生成的组件预留足够空间：

```javascript
chart
  .padding(50)
  .interval()
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'type');
```

### 注意事项

- 手动设置 `padding` 时，建议通过调试确定合适的数值
- 需要考虑标题、图例等组件的空间需求
- 在不需要特定布局时，优先使用 G2 的自动布局功能
