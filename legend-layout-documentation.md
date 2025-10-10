# G2 图例布局系统文档

## 概述

G2 中的图例布局系统决定了图例在图表区域内的位置以及与其他图表组件的交互方式。图例使用基于边界框（bbox）的定位系统，结合 flexbox 布局来控制其放置和方向。

## 核心布局架构

### 位置类型

图例可以放置在图表的五个主要区域：

- **顶部（Top）**: 位于主图表区域上方
- **底部（Bottom）**: 位于主图表区域下方
- **左侧（Left）**: 位于主图表区域左侧
- **右侧（Right）**: 位于主图表区域右侧
- **中心（Center）**: 位于主图表区域内（覆盖显示）

### 布局系统组件

#### 1. 布局配置（`src/component/utils.ts:52-83`）

`inferComponentLayout()` 函数为每个位置定义了 flexbox 布局属性：

```typescript
const layout = {
  top: ['row', 'flex-start', 'center'],
  bottom: ['row', 'flex-start', 'center'],
  left: ['column', 'flex-start', 'center'],
  right: ['column', 'flex-start', 'center'],
  center: ['column', 'center', 'center'],
};
```

这决定了：
- `flexDirection`: 图例项的排列方式（行表示水平，列表示垂直）
- `justifyContent`: 主轴对齐方式
- `alignItems`: 交叉轴对齐方式

#### 2. 形状和大小计算（`src/component/utils.ts:117-144`）

`inferComponentShape()` 函数基于以下因素计算图例尺寸：
- **位置**: 确定是水平（顶部/底部/中心）还是垂直（左侧/右侧）
- **边界框**: 使用布局计算得到的边界框
- **用户定义的大小/长度**: 可选的覆盖值

```typescript
const isHorizontal = ['top', 'bottom', 'center'].includes(position);
const [bboxSize, bboxLength] = isHorizontal
  ? [bbox.height, bbox.width]
  : [bbox.width, bbox.height];
```

#### 3. 布局区域管理（`src/runtime/layout.ts`）

主布局协调器处理以下功能：

- **`computeLayout()`**（`src/runtime/layout.ts:77-82`）: 主布局计算函数
- **`placeComponents()`**（`src/runtime/layout.ts`）: 定位所有组件包括图例
- **`placePaddingArea()`**（`src/runtime/layout.ts`）: 处理填充区域中的图例（顶部/底部/左侧/右侧）
- **`placeCenter()`**（`src/runtime/layout.ts`）: 中心图例的特殊定位

## 图例分类布局

### 分类图例（`src/component/legendCategory.ts`）

分类图例使用扩展自 `G2Layout` 的 `LegendCategoryLayout` 类：

```typescript
export class LegendCategoryLayout extends G2Layout {
  update(options: any) {
    const { subOptions } = options;
    this.attr(options);
    this.child?.update(subOptions);
  }
}
```

关键定位逻辑：
- **HTML 渲染**: 直接使用边界框坐标（`x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height`）
- **中心位置**: 当位置为 'center' 时使用边界框中用户定义的宽度/高度
- **Flexbox 布局**: 应用 `inferComponentLayout()` 进行定位

### 连续图例（`src/component/legendContinuous.ts`）

连续图例遵循类似的模式，但具有专门的形状计算：

- **形状推断**: 使用 `inferContinuousShape()` 进行尺寸计算
- **边界框定位**: 从布局计算中直接映射坐标
- **组件布局**: 应用相同的基于 flexbox 的定位系统

## 组件大小计算

### 尺寸计算（`src/runtime/component.ts`）

系统基于内容和约束计算图例大小：

- **`computeCategoryLegendSize()`**: 计算分类图例的大小
- **`computeContinuousLegendSize()`**: 计算连续图例的大小
- **`groupComponents()`**: 将多个图例组合在一起并共享尺寸
- **交叉填充**: 处理布局区域中组件之间的间距

### 布局区域

图表区域被划分为特定的组件放置区域：

```
┌─────────────────────────────────────┐
│           顶部区域                  │
│  ┌─────────────────────────────────┐ │
│  │         顶部填充区域            │ │
│  │  ┌───────────────────────────┐ │ │
│  │  │                           │ │ │
│  │左 │       主图表区域          │右│ │
│  │侧 │                           │侧│ │
│  │  │                           │  │ │
│  │  └───────────────────────────┘ │ │
│  │        底部填充区域             │ │
│  └─────────────────────────────────┘ │
│          底部区域                   │
└─────────────────────────────────────┘
```

## 定位流程

1. **布局计算**: `computeLayout()` 确定每个区域的可用空间
2. **组件分组**: 图例按位置和坐标系统分组
3. **尺寸计算**: 基于内容和约束计算每个图例的大小
4. **边界框分配**: 为每个图例分配最终边界框
5. **位置应用**: 使用边界框坐标定位图例

## 坐标系统处理

布局系统适应不同的坐标系统：

- **笛卡尔坐标**: 填充区域中的标准定位
- **极坐标**: 具有基于半径计算的特殊中心定位逻辑
- **雷达图**: 径向布局的专门定位

## HTML 渲染集成

对于 HTML 渲染的图例，边界框坐标直接应用于 DOM 元素：

```typescript
{
  x: bbox.x,
  y: bbox.y,
  width: bbox.width,
  height: bbox.height
}
```

这确保了无论使用何种渲染方法都能实现像素级精确定位。

## 关键实现文件

- **`src/component/utils.ts`**: 核心布局工具和辅助函数
- **`src/runtime/layout.ts`**: 主布局协调和区域管理
- **`src/runtime/component.ts`**: 组件大小计算和分组
- **`src/component/legendCategory.ts`**: 分类图例布局实现
- **`src/component/legendContinuous.ts`**: 连续图例布局实现

## 参考资料

- [布局工具 - `src/component/utils.ts`](src/component/utils.ts)
- [布局协调 - `src/runtime/layout.ts`](src/runtime/layout.ts)
- [组件管理 - `src/runtime/component.ts`](src/runtime/component.ts)
- [分类图例布局 - `src/component/legendCategory.ts`](src/component/legendCategory.ts)
- [连续图例布局 - `src/component/legendContinuous.ts`](src/component/legendContinuous.ts)